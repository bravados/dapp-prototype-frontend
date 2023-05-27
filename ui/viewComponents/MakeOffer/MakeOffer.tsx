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
import * as Big from 'big-ts';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { AmountField } from '@ui/core/AmountField';

interface MakeOfferProps {
  title: string;
  media: string;
  price?: string;
  currencyName: string;
  balance?: string;
  gasFees?: string;
  formatAmount: Function;
  parseAmount: Function;
  open: boolean;
  onClose: (offer?: string) => void;
}

export const MakeOffer = ({
  title,
  media,
  price,
  currencyName,
  balance,
  gasFees,
  formatAmount,
  parseAmount,
  open,
  onClose,
}: MakeOfferProps) => {
  const [formattedBalance, setFormattedBalance] = useState('0');
  const [myOffer, setMyOffer] = useState('');
  const [totalAmount, setTotalAmount] = useState('0');

  useEffect(() => {
    if (price && balance && formatAmount && parseAmount) {
      setFormattedBalance(formatAmount(balance));

      const priceParsed = parseAmount(price);
      setMyOffer(formatAmount(priceParsed));
    }
  }, [price, balance, formatAmount, parseAmount]);

  useEffect(() => {
    if (gasFees && parseAmount && formatAmount) {
      const myOfferParsed = parseAmount(myOffer || '0');
      const myOfferNumber = Big.parse(myOfferParsed);
      const gasFeesNumber = Big.parse(gasFees);

      const totalAmountNumber = Big.add(myOfferNumber)(gasFeesNumber);
      const totalAmountFixed = Big.toFixed({ rm: Big.RoundingMode.Up, dp: 0 })(
        totalAmountNumber,
      );
      const totalAmountFormatted = formatAmount(totalAmountFixed);
      setTotalAmount(totalAmountFormatted);
    }
  }, [myOffer, gasFees, parseAmount, formatAmount]);

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));

  const isOfferButtonDisabled = () => {
    return !myOffer || !price || parseFloat(myOffer) < parseFloat(price);
  };

  return (
    <Dialog
      fullScreen={md}
      open={open}
      onClose={() => {
        onClose();
      }}
      aria-labelledby="responsive-dialog-title"
    >
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
                  value={myOffer}
                  onChange={(value) => setMyOffer(value)}
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
                Your balance is {formattedBalance} {currencyName}
              </DialogContentText>
              <DialogContentText variant="subtitle1" mt={3}>
                Total offer amount: {totalAmount} {currencyName}
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
        <Button
          variant="outlined"
          autoFocus
          onClick={() => {
            onClose();
          }}
        >
          Decide later
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onClose(totalAmount);
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
