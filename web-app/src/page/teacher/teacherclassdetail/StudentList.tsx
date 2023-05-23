import './index.css';

import { Box, Button } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { addUserListToClass, getAllStudentsOfClass, getStudentListCanAddToClass } from '../../../api/classes';
import { ChipMultiSelect, CommonDialog, TableComponent } from '../../../component';
import { ClassStatus, IStudent } from '../../../constant';
import { useAppSelector } from '../../../store/hook';
import { selectAuth } from '../../account/AuthSlice';

const header = ['Tên học sinh', 'Email', 'Hành động'];

export default function StudentList() {
  const auth = useAppSelector(selectAuth);
  const [data, setData] = React.useState<IStudent[]>([]);
  const [studentCanAddList, setStudentCanAddList] = React.useState<IStudent[]>([]);
  const [studentAddList, setStudentAddList] = React.useState<number[]>([]);
  const params = useLocation().state;

  React.useEffect(() => {
    getAllStudentsOfClass(params.class_id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.code === '200') {
          setData(res.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getStudentListCanAddToClassList = () => {
    getStudentListCanAddToClass(params.class_id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.code === '200') {
          setStudentCanAddList(res.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addStudentList = (user_id: number[], teacher_id: number, class_id: number) => {
    addUserListToClass(user_id, teacher_id, class_id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.code === '200') {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderData = () => {
    return data.map((item) => ({
      name: item.name,
      email: (
        <div className="a-teacherclass-studentlist-email">
          <div className="a-studentlist-email-detail">{item.email?.toString()}</div>
        </div>
      ),
      action: (
        <Box>
          {item.status === ClassStatus.Pending && (
            <Button color="success" size="small" variant="contained" sx={{ margin: '0 1rem 0 0' }}>
              {'Xác nhận'}
            </Button>
          )}
          <Button color="error" size="small" variant="contained">
            {'Xóa'}
          </Button>
        </Box>
      ),
    }));
  };

  return (
    <div className="a-teacherclass-studentlist">
      <CommonDialog
        buttonText={'Thêm học sinh mới'}
        title={'Thêm học sinh'}
        content={
          <ChipMultiSelect
            options={studentCanAddList.map((item) => ({
              title: item.name + ' (' + item.email + ')',
              id: item.user_id!,
            }))}
            onChange={(value) => {
              setStudentAddList(value);
            }}
          />
        }
        cancelButtonText="Hủy"
        className="a-teacherclass-studentlist-dialog"
        onOpenButtonClick={getStudentListCanAddToClassList}
        primaryButtonText="Thêm"
        action={() => addStudentList(studentAddList, auth.user.user_id, params.class_id)}
      />
      <TableComponent header={header} data={renderData()} />
    </div>
  );
}
