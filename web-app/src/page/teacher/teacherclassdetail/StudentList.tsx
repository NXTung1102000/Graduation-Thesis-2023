import './index.css';

import { Box, Button, CircularProgress } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

import {
  addUserListToClass,
  getAllStudentsOfClass,
  getStudentListCanAddToClass,
  teacherRemoveStudentFromClass,
} from '../../../api/classes';
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
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);
  const [deleteBusy, setDeleteBusy] = React.useState(false);
  const [itemDeleted, setItemDeleted] = React.useState<number>(0);

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

  const deleteStudent = (student_id: number) => {
    teacherRemoveStudentFromClass(auth.user.user_id, student_id, params.class_id)
      .then((res) => res.data)
      .then((res) => {
        if (res.code == '200') {
          handleGetTable();
        } else {
        }
        setOpenDeleteAlert(false);
        setDeleteBusy(false);
      });
    return;
  };

  const renderData = () => {
    return data.map((item) => ({
      name: item.name,
      email: item.email,
      action: (
        <div className="a-teacherclass-studentlist-action">
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
          <Button
            color="error"
            size="small"
            variant="contained"
            onClick={() => {
              setOpenDeleteAlert(true);
              setItemDeleted(item.user_id!);
            }}
          >
            {'Xóa'}
          </Button>
        </div>
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
        <>
          <TableComponent header={header} data={renderData()} />
          <CommonDialog
            isOpen={openDeleteAlert}
            cancelButtonText="Hủy"
            primaryButtonText="Xóa"
            isPrimaryButtonBusy={deleteBusy}
            title="Xác nhận"
            content="Xóa?"
            action={() => {
              setDeleteBusy(true);
              deleteStudent(itemDeleted);
            }}
            setIsOpen={(isOpen) => setOpenDeleteAlert(isOpen)}
          />
        </>
      )}
    </div>
  );
}
