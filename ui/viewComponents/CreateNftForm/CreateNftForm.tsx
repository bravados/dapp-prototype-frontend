import { Fragment, useRef, useState } from 'react';
import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { ImageUploader } from '@ui/viewComponents/ImageUploader';
import { TutorialPopper } from '@ui/core';

type Errors = { [key: string]: string };

type CreateNftFormProps = {
  fileUrl?: string;
  estimatedCost: string;
  isFileLoading: boolean;
  onFileChange: (file: any) => void;
  onFileRemove: () => void;
  onSubmit: (title: string, description: string) => void;
};

const CreateNftForm = ({
  fileUrl,
  estimatedCost,
  isFileLoading,
  onFileChange,
  onFileRemove,
  onSubmit,
}: CreateNftFormProps) => {
  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState<Errors>({});

  const [isTutorialOpen, setIsTutorialOpen] = useState(true);

  const anchorRef = useRef();

  const validate = () => {
    let theErrors = {} as { [key: string]: string };

    if (!title) {
      theErrors['title'] = 'The title is required';
    }

    if (!description) {
      theErrors['description'] = 'The description is required';
    }

    setErrors(theErrors);

    return Object.keys(theErrors).length === 0;
  };

  const onSubmitForm = () => {
    if (validate()) {
      onSubmit(title, description);
    }
  };

  return (
    <Fragment>
      <FormGroup ref={anchorRef}>
        <FormControl margin={'normal'}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <Grid item>
              <Typography variant="h6" gutterBottom>
                Create a NFT
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                error={!!errors.title}
                label="Title"
                helperText={errors.title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                error={!!errors.description}
                label="Description"
                helperText={errors.description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <ImageUploader
                fileUrl={fileUrl}
                isEdit={true}
                isLoading={isFileLoading}
                onChange={onFileChange}
                onRemove={onFileRemove}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={onSubmitForm}
                disableElevation
                sx={{ mt: 5 }}
                disabled={!fileUrl}
              >
                Create NFT
              </Button>
            </Grid>
            <Grid item>
              <p>
                <i>
                  Estimated cost: {estimatedCost}
                  <b>
                    <span title="NEAR Tokens"> Ⓝ. </span>
                  </b>
                  Click the button to proceed to the payment
                </i>
              </p>
            </Grid>
          </Grid>
        </FormControl>
      </FormGroup>
      <TutorialPopper
        message="In this section you can specify a title and a description for your NFT. You must also upload an image from your computer that will upload to IPFS/Filecoin (https://nft.storage). You will be redirected to the Near payment page"
        placement="bottom"
        anchorEl={anchorRef.current}
        isOpen={isTutorialOpen}
        onClose={() => {
          setIsTutorialOpen(false);
        }}
      />
    </Fragment>
  );
};

export { CreateNftForm };
