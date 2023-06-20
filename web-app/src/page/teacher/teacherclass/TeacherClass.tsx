import './index.css';

import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { getAllClassesTeacherJoined } from '../../../api/classes';
import { ContentHeader, PageTitle, TableComponent } from '../../../component';
import { IClass } from '../../../constant';
import { TeacherRoute } from '../../../constant/route/name';
import { useAppSelector } from '../../../store/hook';
import { selectAuth } from '../../account/AuthSlice';
import DialogCreateClass from './DialogCreateClass';

// interface ITeacherClassProps {}

const header = ['Tên lớp', 'Mô tả', 'Chủ sở hữu'];

export default function TeacherClass() {
  const auth = useAppSelector(selectAuth);
  const [data, setData] = React.useState<IClass[]>([]);
  const [openDialogCreateClass, setOpenDialogCreateClass] = React.useState(false);

  const reFreshData = () => {
    getAllClassesTeacherJoined(auth.user.user_id)
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
  };

  React.useEffect(() => {
    reFreshData();
  }, []);

  const renderData = () => {
    return data.map((item) => ({
      name: (
        <Link to={TeacherRoute.MANAGE_CLASS_DETAIL} state={item}>
          {item.name}
        </Link>
      ),
      description: item.description,
      owner: item.owner?.name,
    }));
  };

  return (
    <>
      <DialogCreateClass
        open={openDialogCreateClass}
        setOpen={setOpenDialogCreateClass}
        doAction={() => {
          reFreshData();
        }}
      />
      <div className="a-teacher-teacherclass">
        <PageTitle content="Quản Lý Lớp" />
        <div className="a-teacher-teacherclass-table">
          <ContentHeader content="Danh Sách Lớp Quản Lý" />
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              setOpenDialogCreateClass(true);
            }}
          >
            {'Tạo lớp mới'}
          </Button>
          <TableComponent header={header} data={renderData()} />
        </div>
      </div>
    </>
  );
}
