import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';

import { registerAPI } from '../../api/auth';
// import { changeNotice } from "../../component/LoadingAndNotice/noticeSlice";
import {
  handleChangeState,
  IState,
  messageOfConfirmPassword,
  messageOfEmail,
  messageOfFieldIsNotEmpty,
  messageOfPassword,
  validateState,
} from '../../constant/validate/message';
import { regexForEmail, regexForNotEmpty, regexForPW } from '../../constant/validate/regex';
import { useAppDispatch } from '../../store/hook';

interface IOpenDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateAccountTeacher({ open, setOpen }: IOpenDialog) {
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = React.useState<IState>({
    value: '',
    isError: false,
    message: messageOfFieldIsNotEmpty('Họ và tên'),
  });
  const [email, setEmail] = React.useState<IState>({ value: '', isError: false, message: messageOfEmail });
  const [password, setPassword] = React.useState<IState>({ value: '', isError: false, message: messageOfPassword });
  const [confirmPassword, setConfirmPassword] = React.useState<IState>({
    value: '',
    isError: false,
    message: messageOfConfirmPassword,
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const resetState = () => {
    setFullName({ ...fullName, value: '', isError: false });
    setEmail({ ...email, value: '', isError: false });
    setPassword({ ...password, value: '', isError: false });
    setConfirmPassword({ ...confirmPassword, value: '', isError: false });
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    if (!isSubmitted) setIsSubmitted(true);
    const errFullName = validateState(fullName, setFullName, regexForNotEmpty);
    const errEmail = validateState(email, setEmail, regexForEmail);
    const errPW = validateState(password, setPassword, regexForPW);
    const errConfirmPW = validateState(confirmPassword, setConfirmPassword, regexForPW);
    if (errFullName || errEmail || errPW || errConfirmPW) return;
    register();
  };

  const register = () => {
    const credentials = {
      full_name: fullName.value,
      email: email.value,
      password: password.value,
    };
    // registerAPI(credentials)
    //   .then((req) => {
    //     return req.data;
    //   })
    //   .then((response) => {
    //     if (response.status === 0) {
    //       setOpen(false);
    //       dispatch(changeNotice({ message: "sign up successfully", open: true, type: "success" }));
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
    <div>
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
              Tạo tài khoản cho giáo viên
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    error={fullName.isError}
                    helperText={fullName.isError ? fullName.message : ''}
                    required
                    fullWidth
                    label="Họ và tên"
                    value={fullName.value}
                    onChange={(event) => handleChangeState(fullName, setFullName, event.target.value, regexForNotEmpty)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={email.isError}
                    helperText={email.isError ? email.message : ''}
                    required
                    fullWidth
                    label="Email"
                    value={email.value}
                    onChange={(event) => handleChangeState(email, setEmail, event.target.value, regexForEmail)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={password.isError}
                    helperText={password.isError ? password.message : ''}
                    required
                    fullWidth
                    label="Mật khẩu"
                    type="password"
                    value={password.value}
                    onChange={(event) => handleChangeState(password, setPassword, event.target.value, regexForPW)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={confirmPassword.isError || confirmPassword.value !== password.value}
                    helperText={
                      confirmPassword.isError || confirmPassword.value !== password.value ? confirmPassword.message : ''
                    }
                    required
                    fullWidth
                    label="Xác nhận mật khẩu"
                    type="password"
                    value={confirmPassword.value}
                    onChange={(event) =>
                      handleChangeState(confirmPassword, setConfirmPassword, event.target.value, regexForPW)
                    }
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 5, mb: 5 }}>
                Tạo
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
