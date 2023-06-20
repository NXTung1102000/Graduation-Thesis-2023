import { Box, Button, Dialog, DialogContent, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

import { createClass } from '../../../api/classes';
import { changeNotice } from '../../../component/loading_notice/noticeSlice';
import { handleChangeState, IState, messageOfFieldIsNotEmpty, validateState } from '../../../constant/validate/message';
import { regexForNotEmpty } from '../../../constant/validate/regex';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { selectAuth } from '../../account/AuthSlice';

interface IOpenDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
  doAction: () => void;
}

export default function DialogCreateClass({ open, setOpen, doAction }: IOpenDialog) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const [name, setName] = React.useState<IState>({
    value: '',
    isError: false,
    message: messageOfFieldIsNotEmpty('Tên lớp'),
  });
  const [description, setDescription] = React.useState<IState>({
    value: '',
    isError: false,
    message: messageOfFieldIsNotEmpty('Mô tả'),
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const resetState = () => {
    setName({ ...name, value: '', isError: false });
    setDescription({ ...description, value: '', isError: false });
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    if (!isSubmitted) setIsSubmitted(true);
    const errName = validateState(name, setName, regexForNotEmpty);
    const errDescription = validateState(description, setDescription, regexForNotEmpty);
    if (errName || errDescription) return;
    createClass(name.value, description.value, auth.user.user_id)
      .then((res) => res.data)
      .then((res) => {
        if (res.code === '200') {
          dispatch(changeNotice({ message: res.message, open: true, type: 'success' }));
        } else {
          dispatch(changeNotice({ message: res.message, open: true, type: 'error' }));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(changeNotice({ message: 'lỗi hệ thống, bạn quay lại khi khác nhé', open: true, type: 'error' }));
      });
    setOpen(false);
    resetState();
    doAction();
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
              Tạo lớp mới
            </Typography>
            <Box sx={{ mt: 5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    error={name.isError}
                    helperText={name.isError ? name.message : ''}
                    required
                    fullWidth
                    label="Tên lớp"
                    type="text"
                    value={name.value}
                    onChange={(event) => handleChangeState(name, setName, event.target.value, regexForNotEmpty)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={description.isError}
                    helperText={description.isError ? description.message : ''}
                    required
                    fullWidth
                    label="Mô tả lớp"
                    type="text"
                    value={description.value}
                    onChange={(event) =>
                      handleChangeState(description, setDescription, event.target.value, regexForNotEmpty)
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
