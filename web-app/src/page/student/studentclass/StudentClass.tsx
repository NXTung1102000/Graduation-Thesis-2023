import './index.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { getAllClassesStudentCanSee, studentRegisterClass } from '../../../api/classes';
import { CommonDialog, ContentHeader, PageTitle, TableComponent } from '../../../component';
import { changeNotice } from '../../../component/loading_notice/noticeSlice';
import { ClassStatus, IStudentClass } from '../../../constant';
import { StudentRoute } from '../../../constant/route/name';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { selectAuth } from '../../account/AuthSlice';

// interface IStudentClassProps {}

const header = ['Tên lớp', 'Mô tả', 'Trạng thái'];

const getClassStatus: (status?: ClassStatus) => string = (status) => {
  switch (status) {
    case ClassStatus.Joined:
      return 'Đã tham gia';
    case ClassStatus.Pending:
      return 'Chờ duyệt';
    default:
      return 'Chưa tham gia';
  }
};

export default function StudentClass() {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const [data, setData] = React.useState<IStudentClass[]>([]);

  const refreshData = () => {
    getAllClassesStudentCanSee(auth.user.user_id)
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
    refreshData();
  }, []);

  const registerClass = (student_id: number, class_id: number) => {
    studentRegisterClass(student_id, class_id)
      .then((res) => {
        return res.data;
      })
      .then((response) => {
        if (response.code === '200') {
          dispatch(changeNotice({ message: response.message, open: true, type: 'success' }));
          refreshData();
        } else {
          dispatch(changeNotice({ message: response.message, open: true, type: 'error' }));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(changeNotice({ message: err.message, open: true, type: 'error' }));
      });
  };

  const renderData = () => {
    return data.map((item) => ({
      name: (
        <Link to={StudentRoute.SEE_EXAM_CLASS} state={item}>
          {item.name}
        </Link>
      ),
      description: item.description,
      status: (
        <div className="a-studentclass-table-status">
          <div className="a-studentclass-status-detail">{getClassStatus(item.status)}</div>
          {item.status === ClassStatus.None && (
            <CommonDialog
              buttonText="Xin tham gia"
              content="Gửi yêu cầu tham gia?"
              title="Xác nhận"
              action={() => registerClass(auth.user.user_id, item.class_id)}
            />
          )}
        </div>
      ),
    }));
  };

  return (
    <div className="a-student-studentclass">
      <PageTitle content="Danh Sách Lớp" />
      <div className="a-student-studentclass-table">
        <ContentHeader content="Danh Sách Lớp Tham Gia" />
        <TableComponent header={header} data={renderData()} />
      </div>
    </div>
  );
}
