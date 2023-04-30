import React, { Fragment, useEffect, useRef } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@stitches/react';

const ActionsContainer = styled('div', { margin: '10px' });

interface ImageUploaderProps {
  fileUrl?: string;
  isEdit: boolean;
  onChange?: (file: any) => void;
  onRemove?: () => void;
}

export const ImageUploader = ({
  fileUrl,
  isEdit,
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
    <Stack className="file-uploader">
      <input
        ref={fileInput}
        hidden
        accept="image/*"
        multiple
        type="file"
        onChange={handleFileChange}
      />
      {fileUrl ? (
        <CardMedia component="img" src={fileUrl ?? ''} sx={{ maxWidth: 345 }} />
      ) : (
        <Button variant="outlined" color="primary" onClick={handleClick}>
          Upload Image
        </Button>
      )}
      {fileUrl && isEdit && (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <ActionsContainer>
            <Fragment>
              <Button
                variant="contained"
                component="label"
                onClick={handleClick}
              >
                Edit
              </Button>
              <Button variant="outlined" component="label" onClick={onRemove}>
                Remove
              </Button>
            </Fragment>
          </ActionsContainer>
        </Grid>
      )}
    </Stack>
  );
};
