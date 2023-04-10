import { Button } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import React, { useState, useRef, useEffect } from 'react';

const urlFromFile = async (file: File) => {
  const blob = new Blob([await file.arrayBuffer()]);
  const srcBlob = URL.createObjectURL(blob);

  return srcBlob;
};

interface ImageUploaderProps {
  file: any;
  onFileChanged: (file: any) => void;
  isDisabled?: boolean;
}

export const ImageUploader = ({
  file,
  isDisabled = false,
  onFileChanged,
}: ImageUploaderProps) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const setImage = async () => {
      if (file) {
        const url = await urlFromFile(file);
        setImageUrl(url);
      } else {
        setImageUrl('');
      }
    };
    setImage();
  }, [file]);

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      onFileChanged(file);
    }
  };

  return (
    <div className="file-uploader">
      <CardMedia component="img" src={imageUrl}></CardMedia>
      <input
        ref={fileInput}
        type="file"
        onChange={handleFileInput}
        hidden
        disabled={isDisabled}
      />
      {!imageUrl && (
        <Button
          variant="outlined"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            fileInput.current && fileInput.current.click();
          }}
          disableElevation
          disabled={isDisabled}
        >
          Upload Image
        </Button>
      )}
    </div>
  );
};
