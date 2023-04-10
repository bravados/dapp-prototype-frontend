import {
  Button,
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
  actionText?: string;
  closeText?: string;
  onAction?: () => void;
  onClose?: () => void;
};

const KirunaDialog = ({
  isOpen,
  titleText,
  contentText,
  actionText,
  closeText,
  onAction,
  onClose,
}: KirunaDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{titleText}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {closeText && onClose && <Button onClick={onClose}>{closeText}</Button>}
        {actionText && onAction && (
          <Button onClick={onAction} autoFocus>
            {actionText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export { KirunaDialog };
