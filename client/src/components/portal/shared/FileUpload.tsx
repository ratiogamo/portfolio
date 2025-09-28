import React, { useState, useRef, useCallback } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { FILE_UPLOAD_CONFIG } from '../../../types/tickets';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  onFileRemove: (index: number) => void;
  selectedFiles: File[];
  maxFiles?: number;
  maxFileSize?: number;
  allowedTypes?: string[];
  disabled?: boolean;
  className?: string;
}

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  disabled?: boolean;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove, disabled = false }) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string): string => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType === 'application/pdf') return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType === 'text/plain') return '📄';
    if (fileType === 'text/csv') return '📊';
    if (fileType.includes('json') || fileType.includes('xml')) return '⚙️';
    return '📎';
  };

  const isImage = file.type.startsWith('image/');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  React.useEffect(() => {
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, [file, isImage]);

  return (
    <Card className="p-3">
      <div className="flex items-start space-x-3">
        {/* File Icon or Image Preview */}
        <div className="flex-shrink-0">
          {isImage && imagePreview ? (
            <img 
              src={imagePreview} 
              alt={file.name}
              className="w-12 h-12 object-cover rounded border"
            />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded border">
              <span className="text-2xl">{getFileIcon(file.type)}</span>
            </div>
          )}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
            {file.name}
          </p>
          <p className="text-xs text-gray-500">
            {formatFileSize(file.size)} • {file.type || 'Unknown type'}
          </p>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          disabled={disabled}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
          aria-label={`Remove ${file.name}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      </div>
    </Card>
  );
};

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  onFileRemove,
  selectedFiles,
  maxFiles = FILE_UPLOAD_CONFIG.maxFiles,
  maxFileSize = FILE_UPLOAD_CONFIG.maxFileSize,
  allowedTypes = FILE_UPLOAD_CONFIG.allowedTypes,
  disabled = false,
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validateFile = useCallback((file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize) {
      return `File "${file.name}" is too large. Maximum size is ${Math.round(maxFileSize / (1024 * 1024))}MB.`;
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      const allowedExtensions = FILE_UPLOAD_CONFIG.allowedExtensions.join(', ');
      return `File "${file.name}" has an unsupported format. Allowed types: ${allowedExtensions}`;
    }

    return null;
  }, [maxFileSize, allowedTypes]);

  const processFiles = useCallback((files: FileList) => {
    const fileArray = Array.from(files);
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    // Check total file count
    if (selectedFiles.length + fileArray.length > maxFiles) {
      newErrors.push(`Cannot upload more than ${maxFiles} files total.`);
      setErrors(newErrors);
      return;
    }

    // Validate each file
    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else {
        // Check for duplicates
        const isDuplicate = selectedFiles.some(existingFile => 
          existingFile.name === file.name && existingFile.size === file.size
        );
        if (isDuplicate) {
          newErrors.push(`File "${file.name}" is already selected.`);
        } else {
          validFiles.push(file);
        }
      }
    });

    setErrors(newErrors);

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  }, [selectedFiles, maxFiles, validateFile, onFilesSelected]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [processFiles]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formatFileSize = (bytes: number): string => {
    return `${Math.round(bytes / (1024 * 1024))}MB`;
  };

  const canAddMoreFiles = selectedFiles.length < maxFiles;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      {canAddMoreFiles && (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
            ${dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-300 hover:border-gray-400'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={disabled ? undefined : openFileDialog}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={allowedTypes.join(',')}
            onChange={handleFileSelect}
            disabled={disabled}
            className="hidden"
          />

          <div className="space-y-2">
            <div className="text-4xl">📎</div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {dragActive ? 'Drop files here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Maximum {maxFiles} files, up to {formatFileSize(maxFileSize)} each
              </p>
              <p className="text-xs text-gray-500">
                Supported: Images, PDFs, Documents, Logs
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
              {error}
            </p>
          ))}
        </div>
      )}

      {/* File List */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">
              Selected Files ({selectedFiles.length}/{maxFiles})
            </h4>
            {selectedFiles.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  selectedFiles.forEach((_, index) => onFileRemove(index));
                }}
                disabled={disabled}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Remove All
              </Button>
            )}
          </div>
          
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <FilePreview
                key={`${file.name}-${index}`}
                file={file}
                onRemove={() => onFileRemove(index)}
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upload Guidelines */}
      {selectedFiles.length === 0 && (
        <div className="text-xs text-gray-500 space-y-1">
          <p><strong>File Guidelines:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Images: Screenshots, photos of hardware issues</li>
            <li>Documents: Error logs, configuration files, manuals</li>
            <li>Maximum file size: {formatFileSize(maxFileSize)}</li>
            <li>Maximum {maxFiles} files per ticket</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;