
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileUploader } from '@/components/FileUploader';
import { FileCard } from '@/components/FileCard';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('filefly_user');
    if (!userData) {
      navigate('/');
      return;
    }

    setUser(JSON.parse(userData));

    // Load files from localStorage
    const storedFiles = JSON.parse(localStorage.getItem('filefly_files') || '[]');
    setFiles(storedFiles);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('filefly_user');
    navigate('/');
  };

  const handleFileUploaded = (fileData: any) => {
    setFiles(prevFiles => [fileData, ...prevFiles]);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M12 18v-6" />
                <path d="m9 15 3 3 3-3" />
              </svg>
            </span>
            <span className="font-bold text-xl text-gray-900">FileFly</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="font-medium">{user.name || user.email}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-medium">
              {(user.name || user.email).charAt(0).toUpperCase()}
            </div>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
          <p className="text-gray-600">Upload and manage your files</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload a File</h2>
          <FileUploader onFileUploaded={handleFileUploaded} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Files</h2>
          
          {files.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="flex flex-col items-center max-w-sm mx-auto">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">No files uploaded yet</h3>
                <p className="text-gray-500 mb-4">Upload your first file to get started</p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((file: any, index: number) => (
                <FileCard key={index} file={file} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
