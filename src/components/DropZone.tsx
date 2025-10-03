import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

const DropZoneContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isDragging' && prop !== 'hasFile',
})<{ isDragging: boolean; hasFile: boolean }>(({ theme, isDragging, hasFile }) => ({
  width: '100%',
  maxWidth: '600px',
  height: '300px',
  border: `3px dashed ${theme.palette.primary.main}`,
  borderRadius: `${(theme.shape.borderRadius as number) * 1.5}px`,
  backgroundColor: isDragging
    ? `${theme.palette.primary.main}14`
    : hasFile
    ? `${theme.palette.success.main}08`
    : `${theme.palette.primary.main}08`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 200ms ease-out',
  padding: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    borderStyle: 'solid',
    backgroundColor: `${theme.palette.primary.main}0D`,
    transform: 'scale(1.02)',
  },
  ...(isDragging && {
    borderStyle: 'solid',
    animation: 'pulse 1s ease-in-out infinite',
  }),
  '@media (max-width: 768px)': {
    height: '240px',
    maxWidth: '100%',
  },
}));

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  acceptedFormats: string;
  maxSize?: number;
  fileType: string;
}

export default function DropZone({ onFileSelect, acceptedFormats, maxSize = 100, fileType }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <DropZoneContainer
        isDragging={isDragging}
        hasFile={!!selectedFile}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        className={isDragging ? 'bounce' : ''}
      >
        <Stack spacing={2} alignItems="center">
          <CloudUploadOutlinedIcon
            sx={{
              fontSize: 64,
              color: 'primary.main',
              transition: 'all 200ms ease-out',
            }}
          />
          <Typography variant="h4" sx={{ fontWeight: 600, textAlign: 'center' }}>
            {selectedFile ? selectedFile.name : `Drag & drop your ${fileType} here`}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
            or click to browse
          </Typography>
          <Typography variant="caption" color="text.disabled" sx={{ textAlign: 'center' }}>
            Maximum {maxSize}MB • {acceptedFormats}
          </Typography>
        </Stack>
      </DropZoneContainer>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
    </>
  );
}