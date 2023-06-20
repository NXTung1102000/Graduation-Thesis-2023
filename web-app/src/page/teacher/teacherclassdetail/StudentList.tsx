import './index.css';

import { Box, Button, CircularProgress } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { addUserListToClass, getAllStudentsOfClass, getStudentListCanAddToClass } from '../../../api/classes';
import { AutoComplete, CommonDialog, TableComponent } from '../../../component';
import { ClassStatus, IStudent } from '../../../constant';
import { useAppSelector } from '../../../store/hook';
import { selectAuth } from '../../account/AuthSlice';

const header = ['Tên học sinh', 'Email', 'Hành động'];

export default function StudentList() {
  const auth = useAppSelector(selectAuth);
  const [data, setData] = React.useState<IStudent[]>([]);
  const [isDataLoading, setIsDataLoading] = React.useState<boolean>(true);
  const [studentCanAddList, setStudentCanAddList] = React.useState<IStudent[]>([]);
  const [studentCanAddListLoading, setStudentCanAddListLoading] = React.useState<boolean>(true);
  const [studentAddList, setStudentAddList] = React.useState<number[]>([]);
  const params = useLocation().state;

  React.useEffect(() => {
    handleGetTable();
  }, []);

  const handleGetTable = () => {
    setIsDataLoading(true);
    getAllStudentsOfClass(params.class_id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.code === '200') {
          setData(res.result);
          setIsDataLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStudentListCanAddToClassList = () => {
    getStudentListCanAddToClass(params.class_id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.code === '200') {
          setStudentCanAddList(res.result);
          setStudentCanAddListLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addStudentList = (user_id: number[], teacher_id: number, class_id: number) => {
    setIsDataLoading(true);
    addUserListToClass(user_id, teacher_id, class_id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.code === '200') {
          handleGetTable();
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
            <Button
              color="success"
              size="small"
              variant="contained"
              sx={{ margin: '0 1rem 0 0' }}
              onClick={() => {
                addStudentList([item.user_id as number], auth.user.user_id, params.class_id);
              }}
            >
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
          <AutoComplete
            loading={studentCanAddListLoading}
            multiple
            options={studentCanAddList.map((item) => ({
              title: item.name + ' (' + item.email + ')',
              id: item.user_id!,
            }))}
            onChange={(value) => {
              setStudentAddList(value as number[]);
            }}
          />
        }
        cancelButtonText="Hủy"
        className="a-teacherclass-studentlist-dialog"
        onOpenButtonClick={getStudentListCanAddToClassList}
        primaryButtonText="Thêm"
        action={() => addStudentList(studentAddList, auth.user.user_id, params.class_id)}
      />
      {isDataLoading ? (
        <div className="a-table-loading">
          <CircularProgress />
        </div>
      ) : (
        <TableComponent header={header} data={renderData()} />
      )}
    </div>
  );
}
