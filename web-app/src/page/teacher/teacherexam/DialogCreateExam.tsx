import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Dialog, DialogContent, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';

import { createExamAPIv1 } from '../../../api/exam';
import { changeNotice } from '../../../component/loading_notice/noticeSlice';
import { ClassExam, TypeExam } from '../../../constant/name';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { selectAuth } from '../../account/AuthSlice';

const examTypeOptions = Object.values(TypeExam).map((type) => {
  return { value: type, label: type };
});

const examGradeOptions = Object.values(ClassExam).map((grade) => {
  return { value: grade, label: grade };
});

interface IOpenDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogCreateExam({ open, setOpen }: IOpenDialog) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const [name, setName] = React.useState('');
  const [grade, setGrade] = React.useState(examGradeOptions[0].value as string);
  const [type, setType] = React.useState(examTypeOptions[0].value as string);
  const [fileExam, setFileExam] = React.useState<File>();
  const handleSubmit = () => {
    if (fileExam) {
      const form = new FormData();
      form.append('file', fileExam);
      form.append('title', name);
      form.append('type', type);
      form.append('grade', grade);
      form.append('created_by', String(auth.user.user_id));
      dispatch(
        changeNotice({
          message:
            'Chúng tôi đã ghi nhận tệp đề thi của bạn, việc trích xuất sẽ mất nhiều thời gian, bạn quay lại sửa đề thi khi trích xuất hoàn thành nhé',
          open: true,
          type: 'success',
        }),
      );
      createExamAPIv1(form)
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          dispatch(changeNotice({ message: 'lỗi hệ thống, bạn quay lại khi khác nhé', open: true, type: 'error' }));
        });
    } else {
      dispatch(changeNotice({ message: 'bạn chưa upload file', open: true, type: 'error' }));
    }
  };

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    setFileExam(fileList?.[0]);
    setName(fileList?.[0].name as string);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          //   resetState();
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
              Tạo đề thi
            </Typography>
            <Box sx={{ mt: 5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button variant="contained" component="label">
                    Upload File
                    <input
                      type="file"
                      hidden
                      accept="application/pdf"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => uploadFile(event)}
                    />
                  </Button>
                  {fileExam && (
                    <>
                      <Typography sx={{ margin: '0 .5rem 0 1rem' }}>{fileExam?.name} </Typography>
                      <DeleteIcon
                        color="error"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          setFileExam(undefined);
                        }}
                      />
                    </>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // error={password.isError}
                    // helperText={password.isError ? password.message : ''}
                    required
                    fullWidth
                    label="Tên đề thi"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Loại đề thi"
                    value={type}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setType(event.target.value as string);
                    }}
                  >
                    {examTypeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Khối"
                    value={grade}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setGrade(event.target.value);
                    }}
                  >
                    {examGradeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
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
