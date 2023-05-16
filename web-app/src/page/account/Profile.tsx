import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import React, { useEffect } from 'react';

import { changeNotice } from '../../component/loading_notice/noticeSlice';
import { handleChangeState, IState, messageOfFieldIsNotEmpty, validateState } from '../../constant/validate/message';
import { regexForNotEmpty } from '../../constant/validate/regex';
// import { getInfoUseAPI, updateInfoUserAPI } from "../../../api/user";
import { useAppDispatch } from '../../store/hook';
import ChangePassword from './ChangePW';

export default function Profile() {
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = React.useState<IState>({
    value: '',
    isError: false,
    message: messageOfFieldIsNotEmpty('First name'),
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [openChangePW, setOpenChangePW] = React.useState(false);

  const handleSubmit = () => {
    if (!isSubmitted) setIsSubmitted(true);
    const errFullName = validateState(fullName, setFullName, regexForNotEmpty);
    if (errFullName) return;
    updateInformation();
  };

  useEffect(() => {
    // getInfoUseAPI()
    //   .then((response) => {
    //     return response.data;
    //   })
    //   .then((response) => {
    //     if (response.status !== 0) {
    //       const result = response.data[0];
    //       setFullName({ ...firstName, value: result.first_name });
    //       setLastName({ ...lastName, value: result.last_name });
    //       setAddress({ ...address, value: result.address });
    //       setEmail({ ...email, value: result.email });
    //       setPhoneNumber({ ...phoneNumber, value: result.phone });
    //     } else {
    //       dispatch(changeNotice({ message: response.message, open: true, type: "error" }));
    //     }
    //   })
    //   .catch((err) => {
    //     dispatch(changeNotice({ message: err.message, open: true, type: "error" }));
    //     console.log(err);
    //   });
  }, [dispatch]);

  const updateInformation = () => {
    const credentials = {
      fullName: fullName.value,
    };
    // updateInfoUserAPI(credentials)
    //   .then((req) => {
    //     return req.data;
    //   })
    //   .then((response) => {
    //     if (response.status === 0) {
    //       dispatch(changeNotice({ message: "sign up successfully", open: true, type: "success" }));
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
      <ChangePassword open={openChangePW} setOpen={setOpenChangePW} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: '60%' }}>
          <CardHeader subheader="Chỉnh sửa thông tin phía dưới nếu nó chưa chính xác" title="Thông tin cá nhân" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField
                  error={fullName.isError}
                  helperText={fullName.isError ? fullName.message : ''}
                  fullWidth
                  label="Họ và tên"
                  name="full name"
                  onChange={(event) => handleChangeState(fullName, setFullName, event.target.value, regexForNotEmpty)}
                  required
                  value={fullName.value}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Chỉnh sửa
            </Button>
            <Button variant="contained" onClick={() => setOpenChangePW(true)}>
              Đổi mật khẩu
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
