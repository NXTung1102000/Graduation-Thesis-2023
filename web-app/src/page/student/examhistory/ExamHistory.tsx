import React from 'react';
import { ContentHeader, PageTitle, TableComponent } from '../../../component';
import { IExamHistory } from '../../../constant';
import './index.css';

interface IExamHistoryProps {}

const header = ['#', 'Tên đề', 'Loại đề', 'Khối', 'Thời gian', 'Điểm'];

const data: IExamHistory[] = [
  {
    title: 'Ôn tập Toán 12',
    type: 'Giữa kỳ 1',
    grade: 10,
    completedDate: '17/11/2022',
    score: 10,
  },
  {
    title: 'Ôn tập Toán 12',
    type: 'Giữa kỳ 1',
    grade: 10,
    completedDate: '17/11/2022',
    score: 9,
  },
];

class ExamHistory extends React.Component<IExamHistoryProps> {
  public constructor(props: IExamHistoryProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <div className="a-student-examhistory">
        <PageTitle content="Lịch Sử Làm Đề" />
        <div className="a-student-examhistory-table">
          <ContentHeader content="Lịch Sử" />
          <TableComponent header={header} data={this.renderData()} />
        </div>
      </div>
    );
  }

  private renderData = () => {
    return data.map((item, index) => ({ index: index + 1, ...item }));
  };
}

export default ExamHistory;
