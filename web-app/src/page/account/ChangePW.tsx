import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';

import { changePasswordAPI } from '../../api/auth';
import { changeNotice } from '../../component/loading_notice/noticeSlice';
import {
  handleChangeState,
  IState,
  messageOfConfirmPassword,
  messageOfNewPassword,
  messageOfPassword,
  validateState,
} from '../../constant/validate/message';
import { regexForPW } from '../../constant/validate/regex';
import { useAppDispatch } from '../../store/hook';

interface openForgetPW {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ChangePassword({ open, setOpen }: openForgetPW) {
  const dispatch = useAppDispatch();
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const [oldPW, setOldPW] = React.useState<IState>({ value: '', isError: false, message: messageOfPassword });
  const [newPW, setNewPW] = React.useState<IState>({
    value: '',
    isError: false,
    message: messageOfPassword + ' ' + messageOfNewPassword,
  });
  const [confirmNewPW, setConfirmNewPW] = React.useState<IState>({
    value: '',
    isError: false,
    message: messageOfConfirmPassword,
  });

  const resetState = () => {
    setIsSubmitted(false);
    setOldPW({ ...oldPW, value: '', isError: false });
    setNewPW({ ...newPW, value: '', isError: false });
    setConfirmNewPW({ ...confirmNewPW, value: '', isError: false });
  };

  const handleSubmit = async () => {
    if (!isSubmitted) setIsSubmitted(true);
    const errOldPassword = validateState(oldPW, setOldPW, regexForPW);
    const errNewPassword = validateState(newPW, setNewPW, regexForPW);
    const errConfirmNewPassword = validateState(confirmNewPW, setConfirmNewPW, regexForPW);
    if (errOldPassword || errNewPassword || errConfirmNewPassword) return;
    // changePasswordAPI(oldPW.value, newPW.value)
    //   .then((req) => {
    //     return req.data;
    //   })
    //   .then((response) => {
    //     if (response.status === 0) {
    //       setOpen(false);
    //       dispatch(changeNotice({ message: "New password was sent into your mail", open: true, type: "success" }));
    //     } else {
    //       dispatch(changeNotice({ message: response.error, open: true, type: "error" }));
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     dispatch(changeNotice({ message: err.message, open: true, type: "error" }));
    //   });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          resetState();
        }}
      >
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    error={oldPW.isError}
                    helperText={oldPW.isError ? oldPW.message : ''}
                    required
                    fullWidth
                    label="Mật khẩu hiện tại"
                    value={oldPW.value}
                    onChange={(event) => handleChangeState(oldPW, setOldPW, event.target.value, regexForPW)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    error={newPW.isError || newPW.value === oldPW.value}
                    helperText={newPW.isError || newPW.value === oldPW.value ? newPW.message : ''}
                    required
                    fullWidth
                    label="Mật khẩu mới"
                    value={newPW.value}
                    onChange={(event) => handleChangeState(newPW, setNewPW, event.target.value, regexForPW)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    error={confirmNewPW.isError || confirmNewPW.value !== newPW.value}
                    helperText={confirmNewPW.isError || confirmNewPW.value !== newPW.value ? confirmNewPW.message : ''}
                    required
                    fullWidth
                    label="Xác nhận mật khẩu mới"
                    value={confirmNewPW.value}
                    onChange={(event) =>
                      handleChangeState(confirmNewPW, setConfirmNewPW, event.target.value, regexForPW)
                    }
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 5, mb: 5 }}>
                Change
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
