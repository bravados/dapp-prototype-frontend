import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type KirunaDialogProps = {
  isOpen: boolean;
  titleText: string;
  contentText: string;
  children?: React.ReactNode;
};

const KirunaDialog = ({
  isOpen,
  titleText,
  contentText,
  children,
}: KirunaDialogProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>{titleText}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>{children}</DialogActions>
    </Dialog>
  );
};

export { KirunaDialog };
