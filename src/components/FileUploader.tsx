
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/lib/auth';

interface FileUploaderProps {
  onFileUploaded: (fileData: any) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelected(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !user) return;
    
    try {
      setUploading(true);
      
      // Generate a unique file path
      const fileExtension = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      const filePath = `${user.id}/${fileName}`;
      
      // Track upload progress manually
      let uploadProgress = 0;
      const intervalId = setInterval(() => {
        if (uploadProgress < 95) {
          uploadProgress += 5;
          setProgress(uploadProgress);
        }
      }, 200);
      
      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('file_uploads')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      clearInterval(intervalId);
      setProgress(100);
      
      if (uploadError) throw uploadError;
      
      // Create a public URL for the file
      const { data: publicUrlData } = supabase.storage
        .from('file_uploads')
        .getPublicUrl(filePath);
      
      if (!publicUrlData.publicUrl) {
        throw new Error('Failed to generate public URL');
      }
      
      // Save the file metadata to the database
      const { data: fileData, error: fileError } = await supabase
        .from('shared_files')
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type,
          storage_path: filePath,
          public_url: publicUrlData.publicUrl,
        })
        .select()
        .single();
      
      if (fileError) throw fileError;
      
      // Create file data object
      const fileMetadata = {
        id: fileData.id,
        name: file.name,
        size: file.size,
        type: file.type,
        url: publicUrlData.publicUrl,
        uploadDate: new Date().toISOString()
      };
      
      onFileUploaded(fileMetadata);
      
      toast({
        title: "File uploaded successfully!",
        description: "Your file is now available to share.",
      });
      
      setUploading(false);
      setProgress(0);
      setFile(null);
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "An error occurred while uploading your file.",
        variant: "destructive"
      });
      setUploading(false);
      console.error("Upload error:", error);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancel = () => {
    setFile(null);
    setProgress(0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="hidden"
        id="file-input"
      />
      
      {!file ? (
        <div
          className={`file-drop-area border-2 border-dashed border-gray-300 rounded-lg p-12 text-center ${isDragging ? 'bg-brand-50 border-brand-300' : 'bg-gray-50'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="h-16 w-16 bg-brand-50 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-brand-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Drag and drop your file here</h3>
            <p className="text-gray-500 mb-4">or</p>
            <Button onClick={handleBrowseClick}>Browse Files</Button>
            <p className="text-sm text-gray-500 mt-4">Maximum file size: 500 MB</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 bg-brand-50 rounded flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-lg truncate" title={file.name}>{file.name}</h3>
              <p className="text-gray-500 text-sm">{formatFileSize(file.size)}</p>
              
              {uploading && (
                <div className="mt-4">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-gray-500 mt-1">Uploading... {Math.round(progress)}%</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            {!uploading ? (
              <>
                <Button onClick={handleUpload} className="bg-brand-600 hover:bg-brand-700">
                  Upload File
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={handleCancel} disabled={uploading}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
