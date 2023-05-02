import React, { Fragment, useRef } from 'react';
import { Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@stitches/react';
import { WaiterButton } from '@ui/core/WaiterButton';

const ActionsContainer = styled('div', { margin: '10px' });

interface ImageUploaderProps {
  fileUrl?: string;
  isEdit: boolean;
  isLoading?: boolean;
  onChange?: (file: any) => void;
  onRemove?: () => void;
}

export const ImageUploader = ({
  fileUrl,
  isEdit,
  isLoading,
  onChange,
  onRemove,
}: ImageUploaderProps) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = (e: any) => {
    e.preventDefault();
    fileInput.current && fileInput.current.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      onChange?.(file);
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <input
        ref={fileInput}
        hidden
        accept="image/*"
        multiple
        type="file"
        onChange={handleFileChange}
      />
      {fileUrl && (
        <CardMedia component="img" src={fileUrl ?? ''} sx={{ maxWidth: 345 }} />
      )}
      {isEdit && (
        <ActionsContainer>
          <Fragment>
            {!fileUrl && (
              <WaiterButton
                isLoading={isLoading}
                variant="contained"
                color="primary"
                onClick={handleClick}
              >
                Upload Image
              </WaiterButton>
            )}
            {fileUrl && (
              <WaiterButton
                isLoading={isLoading}
                variant="outlined"
                onClick={onRemove}
              >
                Remove
              </WaiterButton>
            )}
          </Fragment>
        </ActionsContainer>
      )}
    </Grid>
  );
};
