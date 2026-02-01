const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Data storage folder
const DATA_FOLDER = path.join(__dirname, 'data');
const RESUMES_FOLDER = path.join(DATA_FOLDER, 'resumes');
const USERS_FOLDER = path.join(DATA_FOLDER, 'users');

// Create folders if they don't exist
if (!fs.existsSync(DATA_FOLDER)) {
  fs.mkdirSync(DATA_FOLDER, { recursive: true });
  console.log(`Created data folder: ${DATA_FOLDER}`);
}
if (!fs.existsSync(RESUMES_FOLDER)) {
  fs.mkdirSync(RESUMES_FOLDER, { recursive: true });
  console.log(`Created resumes folder: ${RESUMES_FOLDER}`);
}
if (!fs.existsSync(USERS_FOLDER)) {
  fs.mkdirSync(USERS_FOLDER, { recursive: true });
  console.log(`Created users folder: ${USERS_FOLDER}`);
}

// Helper function to save resume data
function saveResumeData(resumeData) {
  const userId = resumeData.userId || uuidv4();
  const timestamp = new Date().toISOString();
  const filename = `${userId}_${Date.now()}.json`;
  const filepath = path.join(RESUMES_FOLDER, filename);
  
  const dataToSave = {
    userId,
    timestamp,
    filename,
    ...resumeData
  };
  
  fs.writeFileSync(filepath, JSON.stringify(dataToSave, null, 2));
  
  // Also save/update user info
  const userFilepath = path.join(USERS_FOLDER, `${userId}.json`);
  const userInfo = {
    userId,
    lastUpdated: timestamp,
    personalInfo: resumeData.personalInfo || {},
    resumeCount: fs.existsSync(userFilepath) 
      ? (JSON.parse(fs.readFileSync(userFilepath, 'utf8')).resumeCount || 0) + 1 
      : 1
  };
  fs.writeFileSync(userFilepath, JSON.stringify(userInfo, null, 2));
  
  return { userId, filename, timestamp };
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    dataFolder: DATA_FOLDER,
    resumesCount: fs.readdirSync(RESUMES_FOLDER).filter(f => f.endsWith('.json')).length,
    usersCount: fs.readdirSync(USERS_FOLDER).filter(f => f.endsWith('.json')).length
  });
});

// Save resume data
app.post('/api/save-resume', (req, res) => {
  try {
    const resumeData = req.body;
    
    if (!resumeData || Object.keys(resumeData).length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'No data provided' 
      });
    }
    
    const result = saveResumeData(resumeData);
    
    console.log(`[${new Date().toISOString()}] Resume saved: ${result.filename}`);
    
    res.json({
      success: true,
      message: 'Resume saved successfully',
      data: result
    });
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save resume',
      details: error.message
    });
  }
});

// Get all resumes (for admin)
app.get('/api/resumes', (req, res) => {
  try {
    const files = fs.readdirSync(RESUMES_FOLDER)
      .filter(f => f.endsWith('.json'))
      .map(filename => {
        const filepath = path.join(RESUMES_FOLDER, filename);
        const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
        return {
          filename,
          userId: data.userId,
          timestamp: data.timestamp,
          fullName: data.personalInfo?.fullName || 'Unknown'
        };
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.json({
      success: true,
      count: files.length,
      resumes: files
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get specific resume
app.get('/api/resumes/:filename', (req, res) => {
  try {
    const filepath = path.join(RESUMES_FOLDER, req.params.filename);
    
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }
    
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get all users
app.get('/api/users', (req, res) => {
  try {
    const files = fs.readdirSync(USERS_FOLDER)
      .filter(f => f.endsWith('.json'))
      .map(filename => {
        const filepath = path.join(USERS_FOLDER, filename);
        const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
        return {
          userId: data.userId,
          lastUpdated: data.lastUpdated,
          fullName: data.personalInfo?.fullName || 'Unknown',
          email: data.personalInfo?.email || 'N/A',
          resumeCount: data.resumeCount
        };
      })
      .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
    
    res.json({
      success: true,
      count: files.length,
      users: files
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get data folder info
app.get('/api/data-info', (req, res) => {
  try {
    const resumeFiles = fs.readdirSync(RESUMES_FOLDER).filter(f => f.endsWith('.json'));
    const userFiles = fs.readdirSync(USERS_FOLDER).filter(f => f.endsWith('.json'));
    
    // Calculate total size
    let totalSize = 0;
    resumeFiles.forEach(f => {
      totalSize += fs.statSync(path.join(RESUMES_FOLDER, f)).size;
    });
    userFiles.forEach(f => {
      totalSize += fs.statSync(path.join(USERS_FOLDER, f)).size;
    });
    
    res.json({
      success: true,
      dataFolder: DATA_FOLDER,
      resumesFolder: RESUMES_FOLDER,
      usersFolder: USERS_FOLDER,
      stats: {
        totalResumes: resumeFiles.length,
        totalUsers: userFiles.length,
        totalSizeBytes: totalSize,
        totalSizeMB: (totalSize / 1024 / 1024).toFixed(2)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Serve static files (for production)
app.use(express.static(path.join(__dirname, '../dist')));

// Catch-all handler
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ success: false, error: 'API endpoint not found' });
  } else {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  }
});

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('Resume Builder Pro - Server Started');
  console.log('='.repeat(60));
  console.log(`Server URL: http://localhost:${PORT}`);
  console.log(`Data Folder: ${DATA_FOLDER}`);
  console.log(`Resumes Folder: ${RESUMES_FOLDER}`);
  console.log(`Users Folder: ${USERS_FOLDER}`);
  console.log('='.repeat(60));
  console.log('API Endpoints:');
  console.log(`  GET  /api/health       - Health check`);
  console.log(`  POST /api/save-resume  - Save resume data`);
  console.log(`  GET  /api/resumes      - Get all resumes`);
  console.log(`  GET  /api/users        - Get all users`);
  console.log(`  GET  /api/data-info    - Get data folder info`);
  console.log('='.repeat(60));
});

module.exports = app;
