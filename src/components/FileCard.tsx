
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'lucide-react';

interface FileCardProps {
  file: {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
    uploadDate: string;
  };
}

export const FileCard: React.FC<FileCardProps> = ({ file }) => {
  const { toast } = useToast();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(file.url);
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this link with anyone.",
    });
  };

  const getFileIcon = () => {
    if (file.type.includes('image')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      );
    } else if (file.type.includes('pdf')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
    } else if (file.type.includes('video')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
          <path d="m22 8-6 4 6 4V8Z" />
          <rect x="2" y="6" width="14" height="12" rx="2" ry="2" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 bg-brand-50 rounded flex items-center justify-center flex-shrink-0">
            {getFileIcon()}
          </div>
          <div className="flex-grow overflow-hidden">
            <h3 className="font-medium truncate" title={file.name}>
              {file.name}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mt-1 gap-2">
              <span>{formatFileSize(file.size)}</span>
              <span>•</span>
              <span>{formatDate(file.uploadDate)}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={copyToClipboard}
            className="flex items-center gap-1.5"
          >
            <Link className="w-4 h-4" />
            <span>Copy Link</span>
          </Button>
          <a 
            href={file.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-brand-600 hover:text-brand-700 hover:underline"
          >
            View
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
