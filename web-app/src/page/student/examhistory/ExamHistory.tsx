import './index.css';

import React from 'react';

import { getHistoryDoExam } from '../../../api/exam';
import { ContentHeader, PageTitle, TableComponent } from '../../../component';
import { IExamHistory } from '../../../constant';
import { useAppSelector } from '../../../store/hook';
import { getDateFromString } from '../../../util/datetime';
import { selectAuth } from '../../account/AuthSlice';

const header = ['#', 'Tên đề', 'Loại đề', 'Khối', 'Thời gian', 'Ngày làm', 'Điểm'];

export default function ExamHistory() {
  const auth = useAppSelector(selectAuth);

  const [data, setData] = React.useState<IExamHistory[]>([]);

  const refreshData = () => {
    getHistoryDoExam(auth.user.user_id)
      .then((response) => response.data)
      .then((res) => {
        if (res.code == '200') {
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

  const renderData = () => {
    return data.map((item, index) => ({
      index: `${index + 1}`,
      title: item.title,
      type: item.type,
      grade: item.grade,
      time: item.time,
      completedDate: getDateFromString(item.created_at as string),
      score: item.score,
    }));
  };

  return (
    <div className="a-student-examhistory">
      <PageTitle content="Lịch Sử Làm Đề" />
      <div className="a-student-examhistory-table">
        <ContentHeader content="Lịch Sử" />
        <TableComponent header={header} data={renderData()} />
      </div>
    </div>
  );
}
