# 📄 Resume Builder Pro

> A modern, responsive and ATS-friendly resume builder that helps you create professional resumes in minutes.

**Resume Builder Pro** is a React + TypeScript web application designed to make resume creation simple, fast and customizable. Fill in your information, choose a professional template, preview your resume in real time, and export it as a PDF.

<p align="center">
  <a href="https://github.com/Madhukar2006/Resume-Builder-Pro">
    <img src="https://img.shields.io/github/stars/Madhukar2006/Resume-Builder-Pro?style=for-the-badge&logo=github" alt="GitHub Stars">
  </a>
  <a href="https://github.com/Madhukar2006/Resume-Builder-Pro">
    <img src="https://img.shields.io/github/forks/Madhukar2006/Resume-Builder-Pro?style=for-the-badge&logo=github" alt="GitHub Forks">
  </a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
</p>

---

## ✨ Features

### 📝 Complete Resume Builder

Create and manage all major sections of your resume:

- 👤 Personal Information
- 🎓 Education
- 🛠️ Skills
- 💼 Work Experience
- 📁 Projects
- 🏆 Certifications
- 🔗 LinkedIn, GitHub and Website links
- 📋 Professional Summary

### 🎨 Professional Templates

Choose from four different resume designs:

| Template | Description |
|----------|-------------|
| **Classic** | Traditional and elegant |
| **Modern** | Clean and contemporary |
| **Minimal** | Simple and content-focused |
| **Creative** | Bold and distinctive |

You can switch templates without losing your resume data.

### 👀 Live Resume Preview

See your resume while editing it with the built-in preview panel.

The builder supports a responsive editing experience for both desktop and mobile devices.

### 📊 Profile Completion

The builder calculates your resume completion percentage so you can easily see how much information you've added.

### 📄 PDF Export

Download your completed resume as a PDF directly from the application.

PDF generation is handled using:

- `html2canvas`
- `jsPDF`

### 👁️ Section Visibility

Show or hide individual resume sections without deleting their data.

### 💾 Save & Auto-Save

Resume data is designed to remain available locally while editing.

The application also includes a **Save to Cloud** interface for server-side saving through:

```text
/api/save-resume
