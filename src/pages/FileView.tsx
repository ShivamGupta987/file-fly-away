
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const FileView = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
      if (!fileId) return;
      
      setLoading(true);
      try {
        // Fetch file metadata from the database
        const { data, error } = await supabase
          .from('shared_files')
          .select('*')
          .eq('id', fileId)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (!data) {
          setError('File not found or it may have been removed.');
          return;
        }
        
        setFile({
          id: data.id,
          name: data.file_name,
          size: data.file_size,
          type: data.file_type,
          url: data.public_url,
          uploadDate: data.created_at,
          storagePath: data.storage_path
        });
        
        // Update download count
        await supabase
          .from('shared_files')
          .update({ download_count: (data.download_count || 0) + 1 })
          .eq('id', fileId);
        
      } catch (err) {
        console.error('Error fetching file:', err);
        setError('Error retrieving file information.');
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [fileId]);

  const handleDownload = async () => {
    if (!file) return;
    
    try {
      // Using a direct download link approach
      const link = document.createElement('a');
      link.href = file.url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
    }
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
          
          <div className="ml-4 flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7"/>
                <path d="M5 12h14"/>
              </svg>
              Back to home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content - Download Card */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-md max-w-md w-full overflow-hidden">
          {/* Blue header area with file icon */}
          <div className="bg-blue-500 h-40 flex items-center justify-center">
            <div className="bg-blue-400/50 rounded-lg p-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
          </div>
          
          {/* File info and download button */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-1">{file.name}</h2>
            <p className="text-gray-500 mb-6">{formatFileSize(file.size)}</p>
            
            <Button 
              onClick={handleDownload}
              className="w-full bg-gray-900 hover:bg-gray-800 h-12 mb-3 justify-center gap-2"
            >
              <Download className="h-5 w-5" />
              Download File
            </Button>
            
            <p className="text-sm text-center text-gray-500">
              Click the button above to start your download
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 px-6 border-t mt-auto">
        <div className="container mx-auto max-w-4xl text-center text-sm text-gray-500">
          <p>© 2025 FileFly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FileView;
