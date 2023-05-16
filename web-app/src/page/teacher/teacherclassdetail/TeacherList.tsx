import './index.css';

import { Button } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { getAllTeachersOfClass } from '../../../api/classes';
import { TableComponent } from '../../../component';
import { ITeacher } from '../../../constant';
import { useAppSelector } from '../../../store/hook';
import { selectAuth } from '../../account/AuthSlice';

// interface ITeacherListProps {}

const header = ['Tên học sinh', 'Email'];

export default function TeacherList() {
  const auth = useAppSelector(selectAuth);
  const [data, setData] = React.useState<ITeacher[]>([]);
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
      <Button size="small" variant="contained">
        {'Thêm giáo viên mới'}
      </Button>
      <TableComponent header={header} data={renderData()} />
    </div>
  );
}
