import { useState } from 'react';
import { Button, FormControl, FormGroup, Grid, TextField } from '@mui/material';

type Errors = { [key: string]: string };

type Props = {
  name: string;
  email?: string;
  onSubmit: (name: string, email?: string) => void;
};

const UserProfileDataForm = ({ name, email, onSubmit }: Props) => {
  const [newName, setNewName] = useState(name);

  const [newEmail, setNewEmail] = useState(email);

  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    let theErrors = {} as { [key: string]: string };

    if (!newName) {
      theErrors['newName'] = 'The name is required';
    }

    if (newEmail) {
      const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!newEmail.match(regex)) {
        theErrors['newEmail'] = 'The email is invalid';
      }
    }

    setErrors(theErrors);

    return Object.keys(theErrors).length === 0;
  };

  const onSubmitForm = () => {
    if (validate()) {
      onSubmit(newName, newEmail);
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
            <TextField
              InputLabelProps={{ shrink: true }}
              error={!!errors.newName}
              label="Name"
              value={newName}
              helperText={errors.newName}
              onChange={(e) => {
                setNewName(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              InputLabelProps={{ shrink: true }}
              error={!!errors.newEmail}
              label="Email"
              value={newEmail}
              helperText={errors.newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
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
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </FormGroup>
  );
};

export { UserProfileDataForm };
