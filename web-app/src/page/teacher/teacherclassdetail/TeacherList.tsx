import './index.css';

import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

import {
  addUserListToClass,
  getAllTeachersOfClass,
  getTeacherListCanAddToClass,
  teacherRemoveTeacherFromClass,
} from '../../../api/classes';
import { AutoComplete, CommonDialog, TableComponent } from '../../../component';
import { ITeacher } from '../../../constant';
import { useAppSelector } from '../../../store/hook';
import { selectAuth } from '../../account/AuthSlice';

const header = ['Tên giáo viên', 'Email'];

export default function TeacherList() {
  const auth = useAppSelector(selectAuth);
  const [data, setData] = React.useState<ITeacher[]>([]);
  const [isDataLoading, setIsDataLoading] = React.useState<boolean>(true);
  const [teacherCanAddList, setTeacherCanAddList] = React.useState<ITeacher[]>([]);
  const [teacherCanAddListLoading, setTeacherCanAddListLoading] = React.useState<boolean>(true);

  const [teacherAddList, setTeacherAddList] = React.useState<number[]>([]);
  const params = useLocation().state;
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);
  const [deleteBusy, setDeleteBusy] = React.useState(false);
  const [itemDeleted, setItemDeleted] = React.useState<number>(0);

  React.useEffect(() => {
    handleGetTable();
  }, []);

  const handleGetTable = () => {
    setIsDataLoading(true);
    getAllTeachersOfClass(params.class_id)
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

  const getTeacherListCanAddToClassList = () => {
    getTeacherListCanAddToClass(params.class_id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.code === '200') {
          setTeacherCanAddList(res.result);
          setTeacherCanAddListLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTeacherList = (user_id: number[], teacher_id: number, class_id: number) => {
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

  const deleteTeacher = (teacher_id: number) => {
    teacherRemoveTeacherFromClass(auth.user.user_id, teacher_id, params.class_id)
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
      email: (
        <div className="a-teacherclass-teacherlist-email">
          <div className="a-teacherlist-email-detail">{item.email?.toString()}</div>
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
    <div className="a-teacherclass-teacherlist">
      <CommonDialog
        buttonText={'Thêm giáo viên mới'}
        title={'Thêm giáo viên'}
        content={
          <AutoComplete
            loading={teacherCanAddListLoading}
            multiple
            options={teacherCanAddList.map((item) => ({
              title: item.name + ' (' + item.email + ')',
              id: item.user_id!,
            }))}
            onChange={(value) => {
              setTeacherAddList(value as number[]);
            }}
          />
        }
        cancelButtonText="Hủy"
        className="a-teacherclass-teacherlist-dialog"
        onOpenButtonClick={getTeacherListCanAddToClassList}
        primaryButtonText="Thêm"
        action={() => addTeacherList(teacherAddList, auth.user.user_id, params.class_id)}
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
              deleteTeacher(itemDeleted);
            }}
            setIsOpen={(isOpen) => setOpenDeleteAlert(isOpen)}
          />
        </>
      )}
    </div>
  );
}
