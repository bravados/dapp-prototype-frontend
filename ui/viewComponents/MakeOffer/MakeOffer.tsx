import * as React from 'react';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AmountField } from '@ui/core/AmountField';

interface Props {
  title: string;
  media: string;
  price: string;
  currencyName: string;
  balance?: string;
  isOpen: boolean;
  amount: string;
  amountWithFees: string;
  onAmountChange: (amount: string) => void;
  onBuy: (amount: string) => void;
  onClose: () => void;
}

export const MakeOffer = ({
  title,
  media,
  price,
  currencyName,
  balance,
  isOpen,
  amount,
  amountWithFees,
  onAmountChange,
  onBuy,
  onClose,
}: Props) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));

  const isOfferButtonDisabled = () => {
    return !amount || !price || parseFloat(amount) < parseFloat(price);
  };

  return (
    <Dialog fullScreen={md} open={isOpen} onClose={onClose}>
      <DialogTitle id="responsive-dialog-title">
        {'Make an Offer on '}
        {title}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          p={3}
        >
          <Grid item p={3} xs={6}>
            <CardMedia component="img" image={media} alt={title} />
          </Grid>
          <Grid item p={3} xs={6}>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <FormControl sx={{ width: '150px' }} variant="standard">
                <AmountField
                  value={amount}
                  onChange={onAmountChange}
                  endAdornment={
                    <InputAdornment position="end">
                      {currencyName}
                    </InputAdornment>
                  }
                />
                <FormHelperText
                  variant="standard"
                  id="outlined-weight-helper-text"
                >
                  Your offer
                </FormHelperText>
              </FormControl>

              <DialogContentText variant="subtitle1" mt={3}>
                Your balance is {balance} {currencyName}
              </DialogContentText>
              <DialogContentText variant="subtitle1" mt={3}>
                Total offer amount: {amountWithFees} {currencyName}
              </DialogContentText>
              <DialogContentText variant="subtitle1" mt={3}>
                The fees are an estimation. Any extra fee amount will be funded
                back to your wallet.
              </DialogContentText>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" autoFocus onClick={onClose}>
          Decide later
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onBuy(amount);
          }}
          autoFocus
          disabled={isOfferButtonDisabled()}
        >
          Submit offer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
