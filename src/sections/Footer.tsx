import { FileText, Linkedin, Github, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Resume Builder Pro</span>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 glass-social rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </a>
            <a
              href="#"
              className="w-10 h-10 glass-social rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Github className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </a>
            <a
              href="#"
              className="w-10 h-10 glass-social rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Mail className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {currentYear} Resume Builder Pro. All rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Created by <span className="text-blue-600 dark:text-blue-400 font-medium">Madhukar Pal & Abhinit Sainger</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
