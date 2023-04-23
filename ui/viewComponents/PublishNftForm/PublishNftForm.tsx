import { useState } from 'react';
import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

type Errors = { [key: string]: string };

type PublishNftFormProps = {
  onSubmit: (price: string) => void;
};

const PublishNftForm = ({ onSubmit }: PublishNftFormProps) => {
  const [price, setPrice] = useState('');

  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    let theErrors = {} as { [key: string]: string };

    if (!price) {
      theErrors['price'] = 'The price is required';
    }

    setErrors(theErrors);

    return Object.keys(theErrors).length === 0;
  };

  const onSubmitForm = () => {
    if (validate()) {
      onSubmit(price);
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
              Publish NFT
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              error={!!errors.title}
              label="Price"
              helperText={errors.title}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmitForm}
              disableElevation
              sx={{ mt: 5 }}
              disabled={!price}
            >
              Publish
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </FormGroup>
  );
};

export { PublishNftForm };
