import { useState } from 'react';
import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { ImageUploader } from '@ui/viewComponents/ImageUploader';

type Errors = { [key: string]: string };

type CreateNftFormProps = {
  // eslint-disable-next-line no-unused-vars
  file: any;
  gasFees: string;
  isFileUploaded: boolean;
  onFileChanged: (file: any) => void;
  onSubmit: (title: string, description: string) => void;
};

const CreateNftForm = ({
  file,
  gasFees,
  isFileUploaded,
  onFileChanged,
  onSubmit,
}: CreateNftFormProps) => {
  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState<Errors>({});

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
    <FormGroup>
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
            <p>
              <i>
                Estimated fees: {gasFees}
                <b>
                  <span title="NEAR Tokens"> Ⓝ. </span>
                </b>
                You will not pay more than this and you will be refunded the
                unused amount
              </i>
            </p>
          </Grid>
          <Grid item>
            <ImageUploader file={file} onFileChanged={onFileChanged} />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmitForm}
              disableElevation
              sx={{ mt: 5 }}
              disabled={!isFileUploaded}
            >
              Create NFT
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </FormGroup>
  );
};

export { CreateNftForm };
