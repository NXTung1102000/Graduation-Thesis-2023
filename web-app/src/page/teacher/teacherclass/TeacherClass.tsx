import './index.css';

import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { getAllClassesTeacherJoined, teacherDeleteClass } from '../../../api/classes';
import { CommonDialog, ContentHeader, PageTitle, TableComponent } from '../../../component';
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
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);
  const [deleteBusy, setDeleteBusy] = React.useState(false);
  const [itemDeleted, setItemDeleted] = React.useState<number>(0);

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
      owner:(
        <div className="a-teacherclass-teacherlist-email">
          <div className="a-teacherlist-email-detail">{item.owner?.name}</div>
          <Button
            color="error"
            size="small"
            variant="contained"
            onClick={() => {
              setOpenDeleteAlert(true);
              setItemDeleted(item.class_id!);
            }}
          >
            {'Xóa'}
          </Button>
        </div>
      ),
    }));
  };

  const deleteClass = (class_id: number) => {
    teacherDeleteClass(auth.user.user_id, class_id)
      .then((res) => res.data)
      .then((res) => {
        if (res.code == '200') {
          reFreshData();
        }
        setOpenDeleteAlert(false);
        setDeleteBusy(false);
      });
    return;
  };

  return (
    <>
      <DialogCreateClass
        open={openDialogCreateClass}
        setOpen={setOpenDialogCreateClass}
        doAction={
          reFreshData
        }
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
          <CommonDialog
            isOpen={openDeleteAlert}
            cancelButtonText="Hủy"
            primaryButtonText="Xóa"
            isPrimaryButtonBusy={deleteBusy}
            title="Xác nhận"
            content="Xóa?"
            action={() => {
              setDeleteBusy(true);
              deleteClass(itemDeleted);
            }}
            setIsOpen={(isOpen) => setOpenDeleteAlert(isOpen)}
          />
        </div>
      </div>
    </>
  );
}
