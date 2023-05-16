import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { FormControlLabel } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';

import { loginAPI } from '../../api/auth';
import { changeNotice } from '../../component/loading_notice/noticeSlice';
import { handleChangeState, IState, messageOfFieldIsNotEmpty, validateState } from '../../constant/validate/message';
import { regexForNotEmpty } from '../../constant/validate/regex';
import { useAppDispatch } from '../../store/hook';
import { LogInUser } from './AuthSlice';
import ForgetPW from './ForgetPW';
import Register from './Register';
interface IOpenDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function SignIn({ open, setOpen }: IOpenDialog) {
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState<IState>({
    value: '',
    isError: false,
    message: messageOfFieldIsNotEmpty('Email'),
  });
  const [password, setPassword] = React.useState<IState>({
    value: '',
    isError: false,
    message: messageOfFieldIsNotEmpty('Mật khẩu'),
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const [openRegister, setOpenRegister] = React.useState(false);
  const [openForgetPW, setOpenForgetPW] = React.useState(false);

  const resetState = () => {
    setEmail({ ...email, value: '', isError: false });
    setPassword({ ...password, value: '', isError: false });
    setIsSubmitted(false);
  };

  const handleSubmit = async () => {
    if (!isSubmitted) setIsSubmitted(true);
    const errUsername = validateState(email, setEmail, regexForNotEmpty);
    const errPW = validateState(password, setPassword, regexForNotEmpty);
    if (errUsername || errPW) return;
    const credentials = { email: email.value, password: password.value };
    loginAPI(credentials)
      .then((req) => {
        return req.data;
      })
      .then((response) => {
        if (response.code === '200') {
          const result = response.result;
          const detail_user = {
            access_token: result?.access_token,
            user: result?.user,
          };
          dispatch(LogInUser(detail_user));
          setOpen(false);
        } else {
          dispatch(changeNotice({ message: response.message, open: true, type: 'error' }));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(changeNotice({ message: err.message, open: true, type: 'error' }));
      });
  };

  return (
    <>
      <Register open={openRegister} setOpen={setOpenRegister} />
      <ForgetPW open={openForgetPW} setOpen={setOpenForgetPW} />
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
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Chào mừng bạn
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                error={email.isError}
                helperText={email.isError ? email.message : ''}
                margin="normal"
                required
                fullWidth
                label="email"
                name="email"
                value={email.value}
                onChange={(event) => handleChangeState(email, setEmail, event.target.value, regexForNotEmpty)}
              />
              <TextField
                error={password.isError}
                helperText={password.isError ? password.message : ''}
                margin="normal"
                required
                fullWidth
                name="password"
                label="mật khẩu"
                type="password"
                value={password.value}
                onChange={(event) => handleChangeState(password, setPassword, event.target.value, regexForNotEmpty)}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
                Đăng nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" onClick={() => setOpenForgetPW(true)}>
                    Quên mật khẩu
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={() => setOpenRegister(true)}>
                    Bạn chưa có tài khoản
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
