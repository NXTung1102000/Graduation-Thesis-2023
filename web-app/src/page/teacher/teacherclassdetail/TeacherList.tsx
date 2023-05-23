import './index.css';

import { Button } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { addUserListToClass, getAllTeachersOfClass, getTeacherListCanAddToClass } from '../../../api/classes';
import { ChipMultiSelect, CommonDialog, TableComponent } from '../../../component';
import { ITeacher } from '../../../constant';
import { useAppSelector } from '../../../store/hook';
import { selectAuth } from '../../account/AuthSlice';

// interface ITeacherListProps {}

const header = ['Tên học sinh', 'Email'];

export default function TeacherList() {
  const auth = useAppSelector(selectAuth);
  const [data, setData] = React.useState<ITeacher[]>([]);
  const [teacherCanAddList, setTeacherCanAddList] = React.useState<ITeacher[]>([]);
  const [teacherAddList, setTeacherAddList] = React.useState<number[]>([]);
  const params = useLocation().state;

  React.useEffect(() => {
    getAllTeachersOfClass(params.class_id)
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

  const getTeacherListCanAddToClassList = () => {
    getTeacherListCanAddToClass(params.class_id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.code === '200') {
          setTeacherCanAddList(res.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTeacherList = (user_id: number[], teacher_id: number, class_id: number) => {
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
        <div className="a-teacherclass-teacherlist-email">
          <div className="a-teacherlist-email-detail">{item.email?.toString()}</div>
          <Button color="error" size="small" variant="contained">
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
          <ChipMultiSelect
            options={teacherCanAddList.map((item) => ({
              title: item.name + ' (' + item.email + ')',
              id: item.user_id!,
            }))}
            onChange={(value) => {
              setTeacherAddList(value);
              console.log(value);
            }}
          />
        }
        cancelButtonText="Hủy"
        className="a-teacherclass-teacherlist-dialog"
        onOpenButtonClick={getTeacherListCanAddToClassList}
        primaryButtonText="Thêm"
        action={() => addTeacherList(teacherAddList, auth.user.user_id, params.class_id)}
      />
      <TableComponent header={header} data={renderData()} />
    </div>
  );
}
