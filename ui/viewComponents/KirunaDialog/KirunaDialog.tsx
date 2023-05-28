import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type KirunaDialogProps = {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  children?: React.ReactNode;
};

const KirunaDialog = ({
  isOpen,
  title: titleText,
  content: contentText,
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
