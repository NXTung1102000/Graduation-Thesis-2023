import './index.css';

import { Button } from '@mui/material';
import React from 'react';

import { getAllExamsOfUser } from '../../../api/exam';
import { InfoBox, TableComponent } from '../../../component';
import { IExam } from '../../../constant';
import { useAppSelector } from '../../../store/hook';
import { selectAuth } from '../../account/AuthSlice';
import DialogCreateExam from './DialogCreateExam';
import { StudentRoute, TeacherRoute } from '../../../constant/route/name';
import { useNavigate } from 'react-router-dom';

const tableColumn = ['Tên đề', 'Loại đề', 'Khối', 'Thời gian', 'Ngày tạo'];

export default function TeacherExam() {
  const [data, setData] = React.useState<IExam[]>([]);
  const navigate = useNavigate();
  const auth = useAppSelector(selectAuth);
  const [openDialogCreateExam, setOpenDialogCreateExam] = React.useState(false);

  const refreshData = () => {
    getAllExamsOfUser(auth.user.user_id)
      .then((res) => res.data)
      .then((res) => {
        if (res.code == '200') {
          console.log(res.result);
          setData(res.result);
        } else {
          setData([]);
        }
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
          <div className="a-examlist-createddate-detail">{item.created_at?.toString()}</div>
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
          <Button color="error" size="small" variant="contained">
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
        </div>
      </div>
    </>
  );
}
