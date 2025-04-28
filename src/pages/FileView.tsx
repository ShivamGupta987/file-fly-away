
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const FileView = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call to fetch file information
    const fetchFile = () => {
      setLoading(true);
      try {
        const storedFiles = JSON.parse(localStorage.getItem('filefly_files') || '[]');
        const foundFile = storedFiles.find((f: any) => f.id === fileId);
        
        if (foundFile) {
          setFile(foundFile);
        } else {
          setError('File not found or it may have been removed.');
        }
      } catch (err) {
        setError('Error retrieving file information.');
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [fileId]);

  const handleDownload = () => {
    // In a real app, this would trigger an actual download from your server or storage
    if (!file) return;
    
    // Create a download link
    const downloadUrl = URL.createObjectURL(file.file);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    }, 100);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading file information...</p>
      </div>
    );
  }

  if (error || !file) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">File Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'This file is no longer available or may have been removed.'}</p>
          <Link to="/">
            <Button>Go to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto max-w-4xl flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M12 18v-6" />
                <path d="m9 15 3 3 3-3" />
              </svg>
            </span>
            <span className="font-bold text-xl text-gray-900">FileFly</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="h-20 w-20 mx-auto bg-brand-50 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2 break-words">{file.name}</h1>
            <p className="text-gray-500">{formatFileSize(file.size)}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-center">
            <p className="text-gray-600 mb-4">This file has been shared with you via FileFly</p>
            <Button 
              onClick={handleDownload}
              className="bg-brand-600 hover:bg-brand-700 flex mx-auto items-center gap-2"
              size="lg"
            >
              <Download className="h-5 w-5" />
              Download File
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p className="mb-1">Need to share your own files?</p>
            <Link to="/" className="text-brand-600 hover:underline">
              Create a free account on FileFly
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 px-6 border-t">
        <div className="container mx-auto max-w-4xl text-center text-sm text-gray-500">
          <p>© 2025 FileFly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FileView;
