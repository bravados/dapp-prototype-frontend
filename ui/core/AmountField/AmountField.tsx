import { TextField } from '@mui/material';
import Input from '@mui/material/Input';
import React, { useEffect, useState } from 'react';

const AMOUNT_WRONG_FORMAT =
  'The format of the amount is not valid. Examples of valid format: 0.01, 5, 10.0';

type AmountProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string, errors: string[]) => void;
  error?: boolean;
  helperText?: string;
  endAdornment?: React.ReactNode;
};

export const AmountField = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  endAdornment,
}: AmountProps) => {
  const [amount, setAmount] = useState(value);

  const [errors, setErrors] = useState([] as string[]);

  const validate = () => {
    const theErrors = [];

    const regex = /^(\d+(\.\d+)?)$/i;

    if (!amount || !regex.test(amount)) theErrors.push(AMOUNT_WRONG_FORMAT);

    setErrors(theErrors);
  };

  useEffect(() => {
    validate();
    onChange(amount || '', errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  useEffect(() => {
    onChange(amount || '', errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^(\d+\.?\d*)$/i;

    if (event.target.value === '' || regex.test(event.target.value)) {
      setAmount(event.target.value);
    }
  };

  if (label) {
    return (
      <TextField
        label={label}
        error={error}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        helperText={helperText}
        sx={{ maxWidth: '200px' }}
      />
    );
  }
  return (
    <Input
      error={error}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      endAdornment={endAdornment}
      inputProps={{
        'aria-label': 'weight',
        inputMode: 'numeric',
        pattern: '[0-9]*',
      }}
      sx={{ color: 'black' }}
    />
  );
};
