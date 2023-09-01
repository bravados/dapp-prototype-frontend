import { Fragment, useRef, useState } from 'react';
import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { TutorialPopper } from '@ui/core';

type Errors = { [key: string]: string };

type Props = {
  onSubmit: (amount: string, account: string) => void;
};

const FundForm = ({ onSubmit }: Props) => {
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');

  const [errors, setErrors] = useState<Errors>({});

  const [isTutorialOpen, setIsTutorialOpen] = useState(true);

  const anchorRef = useRef();

  const validate = () => {
    let theErrors = {} as { [key: string]: string };

    if (!amount) {
      theErrors['amount'] = 'The amount is required';
    }

    setErrors(theErrors);

    return Object.keys(theErrors).length === 0;
  };

  const onSubmitForm = () => {
    if (validate()) {
      onSubmit(amount, account);
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
                Fund your account
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                error={!!errors.amount}
                label="Amount"
                helperText={errors.amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Account"
                placeholder="Optional"
                onChange={(e) => {
                  setAccount(e.target.value);
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
                disabled={!amount}
              >
                Fund Account
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </FormGroup>
      <TutorialPopper
        message="Typically, in NEAR ecosystem the contract of the marketplace stores the information about which user is selling which NFT and its price. This storage must be paid by the user that is selling the NFT. When the NFT is sold, those tokens will be transferred back to the seller. You need to fund your account to freely publish and unpublish NFTs. You can have the possibility to optionally funding another accounts"
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

export { FundForm };
