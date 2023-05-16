import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';

import { forgetPasswordAPI } from '../../api/auth';
// import { changeNotice } from "../../component/LoadingAndNotice/noticeSlice";
import {
  handleChangeState,
  IState,
  messageOfEmail,
  messageOfFieldIsNotEmpty,
  validateState,
} from '../../constant/validate/message';
import { regexForEmail, regexForNotEmpty } from '../../constant/validate/regex';
import { useAppDispatch } from '../../store/hook';

interface IOpenDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ForgetPW({ open, setOpen }: IOpenDialog) {
  const dispatch = useAppDispatch();

  const [email, setEmail] = React.useState<IState>({ value: '', isError: false, message: messageOfEmail });
  const [username, setUserName] = React.useState<IState>({
    value: '',
    isError: false,
    message: messageOfFieldIsNotEmpty('Username'),
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const resetState = () => {
    setEmail({ ...email, value: '', isError: false });
    setUserName({ ...username, value: '', isError: false });
    setIsSubmitted(false);
  };

  const handleSubmit = async () => {
    if (!isSubmitted) setIsSubmitted(true);
    const errEmail = validateState(email, setEmail, regexForEmail);
    const errUsername = validateState(username, setUserName, regexForNotEmpty);
    if (errEmail || errUsername) return;
    // forgetPasswordAPI(username.value, email.value)
    //   .then((req) => {
    //     return req.data;
    //   })
    //   .then((response) => {
    //     if (response.status === 0) {
    //       setOpen(false);
    //       dispatch(changeNotice({ message: "New password was sent into your mail", open: true, type: "success" }));
    //     } else {
    //       dispatch(changeNotice({ message: response.message, open: true, type: "error" }));
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
              Bạn quên mật khẩu
            </Typography>
            <Box sx={{ mt: 4 }}>
              <TextField
                error={email.isError}
                helperText={email.isError ? email.message : ''}
                required
                margin="normal"
                fullWidth
                label="Địa chỉ email"
                value={email.value}
                onChange={(event) => handleChangeState(email, setEmail, event.target.value, regexForEmail)}
              />
              <Button type="submit" fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 3, mb: 2 }}>
                Gửi
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
