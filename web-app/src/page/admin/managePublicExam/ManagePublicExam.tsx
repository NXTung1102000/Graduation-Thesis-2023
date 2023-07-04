import './index.css';

import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getAllExamsOfUser, removeExam } from '../../../api/exam';
import { CommonDialog, InfoBox, TableComponent } from '../../../component';
import { IExam } from '../../../constant';
import { TeacherRoute } from '../../../constant/route/name';
import { useAppSelector } from '../../../store/hook';
import { getDateFromString } from '../../../util/datetime';
import { selectAuth } from '../../account/AuthSlice';
import DialogCreateExam from '../../teacher/teacherexam/DialogCreateExam';

const tableColumn = ['Tên đề', 'Loại đề', 'Khối', 'Thời gian', 'Ngày tạo'];

export default function ManagePublicExam() {
  const [data, setData] = React.useState<IExam[]>([]);
  const navigate = useNavigate();
  const auth = useAppSelector(selectAuth);
  const [openDialogCreateExam, setOpenDialogCreateExam] = React.useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);
  const [deleteBusy, setDeleteBusy] = React.useState(false);
  const [itemDeleted, setItemDeleted] = React.useState<number>(0);

  const refreshData = () => {
    getAllExamsOfUser(auth.user.user_id)
      .then((res) => res.data)
      .then((res) => {
        if (res.code == '200') {
          setData(res.result);
        } else {
          setData([]);
        }
      });
    return;
  };

  const deleteExam = (exam_id: number) => {
    removeExam(auth.user.user_id, exam_id)
      .then((res) => res.data)
      .then((res) => {
        if (res.code == '200') {
          refreshData();
        } else {
        }
        setDeleteBusy(false);
        setOpenDeleteAlert(false);
      });
    return;
  };

  React.useEffect(() => {
    refreshData();
  }, []);

  const renderData = () => {
    return data.map((item) => ({
      title: item.title,
      type: item.type,
      grade: item.grade,
      time: item.time,
      created_at: (
        <div className="a-teacherclass-examlist-createddate">
          <div className="a-examlist-createddate-detail">{getDateFromString(item.created_at as string)}</div>
          <Button
            color="warning"
            size="small"
            variant="contained"
            onClick={() => {
              navigate(TeacherRoute.EDIT_EXAM, { state: item });
            }}
          >
            {'Sửa'}
          </Button>
          <Button
            color="error"
            size="small"
            variant="contained"
            onClick={() => {
              setOpenDeleteAlert(true);
              setItemDeleted(item.exam_id!);
            }}
          >
            {'Xóa'}
          </Button>
        </div>
      ),
    }));
  };
  return (
    <>
      <DialogCreateExam open={openDialogCreateExam} setOpen={setOpenDialogCreateExam} />
      <div className="a-teacher-teacherexam">
        <InfoBox detail={{ teacherName: auth.user.name }} />
        <div className="a-teacher-teacherexam-table">
          <Button size="small" variant="contained" onClick={() => setOpenDialogCreateExam(true)}>
            {'Tải lên đề mới'}
          </Button>
          <TableComponent header={tableColumn} data={renderData()} />
          <CommonDialog
            isOpen={openDeleteAlert}
            cancelButtonText="Hủy"
            primaryButtonText="Xóa"
            isPrimaryButtonBusy={deleteBusy}
            title="Xác nhận"
            content="Xóa?"
            action={() => {
              setDeleteBusy(true);
              deleteExam(itemDeleted);
            }}
            setIsOpen={(isOpen) => setOpenDeleteAlert(isOpen)}
          />
        </div>
      </div>
    </>
  );
}
