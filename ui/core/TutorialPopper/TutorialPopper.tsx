import {
  Button,
  Grid,
  Paper,
  Popper,
  PopperPlacementType,
  Typography,
} from '@mui/material';

type Props = {
  children?: React.ReactNode;
  message?: string;
  placement: PopperPlacementType;
  anchorEl?: any;
  isOpen: boolean;
  onClose: () => void;
};

const TutorialPopper = ({
  children,
  message,
  placement,
  anchorEl,
  isOpen,
  onClose,
}: Props) => {
  return (
    <Popper open={isOpen} placement={placement} anchorEl={anchorEl}>
      <Grid container justifyContent="center">
        <Grid item md={6}>
          <Paper sx={{ border: 1, p: 1, bgcolor: 'grey' }}>
            {children ?? (
              <Typography textAlign={'center'}>{message}</Typography>
            )}

            <br />
            <Grid container justifyContent="center">
              <Grid item>
                <Button variant="outlined" onClick={onClose}>
                  Ok
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Popper>
  );
};

export { TutorialPopper };
