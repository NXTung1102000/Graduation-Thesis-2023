import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

interface ICommonDialogProps {
  isOpen?: boolean;
  cancelButtonText?: string;
  primaryButtonText?: string;
  title: string;
  content: string | React.ReactNode;
  buttonText?: string;
  action?: () => unknown;
  className?: string;
  onOpenButtonClick?: () => void;
}

export default function CommonDialog(props: ICommonDialogProps) {
  const [open, setOpen] = React.useState(props.isOpen != undefined ? props.isOpen : false);

  const handleClickOpen = () => {
    setOpen(true);
    props.onOpenButtonClick!();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doAction = () => {
    setOpen(false);
    props.action!();
  };

  return (
    <div>
      {props.isOpen == undefined && (
        <Button size="small" variant="contained" onClick={handleClickOpen}>
          {props.buttonText}
        </Button>
      )}
      <Dialog
        open={props.isOpen != undefined ? props.isOpen : open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={'a-commondialog' + props.className ? ' ' + props.className : ''}
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{props.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {props.cancelButtonText != undefined && (
            <Button onClick={handleClose} color="error">
              {props.cancelButtonText}
            </Button>
          )}
          {props.primaryButtonText != undefined && <Button onClick={doAction}>{props.primaryButtonText}</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
