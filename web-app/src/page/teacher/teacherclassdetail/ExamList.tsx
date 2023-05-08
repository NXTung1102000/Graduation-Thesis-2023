import React from 'react';
import { CommonDialog, ContentHeader, PageTitle, TableComponent } from '../../../component';
import { ClassStatus, IClass, IExam, IStudentClass } from '../../../constant';
import { Link } from 'react-router-dom';
import './index.css';
import { TeacherRoute } from '../../../constant/route/name';
import { Button } from '@mui/material';

interface IExamListProps {}

const header = ['Tên đề', 'Loại đề', 'Khối', 'Thời gian', 'Ngày tạo'];

const data: IExam[] = [
  {
    title: 'Ôn tập tích phân xác định',
    type: 'Giữa kỳ 1',
    grade: 12,
    time: 30,
    createdDate: '28/11/2022',
  },
  {
    title: 'Ôn tập tích phân xác định',
    type: 'Giữa kỳ 1',
    grade: 12,
    time: 30,
    createdDate: '28/11/2022',
  },
  {
    title: 'Ôn tập tích phân xác định',
    type: 'Giữa kỳ 1',
    grade: 12,
    time: 30,
    createdDate: '28/11/2022',
  },
];

class ExamList extends React.Component<IExamListProps> {
  public constructor(props: IExamListProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <div className="a-teacherclass-examlist">
        <Button size="small" variant="contained">
          {'Thêm đề mới'}
        </Button>
        <TableComponent header={header} data={this.renderData()} />
      </div>
    );
  }

  private renderData = () => {
    return data.map((item) => ({
      ...item,
      createdDate: (
        <div className="a-teacherclass-examlist-createddate">
          <div className="a-examlist-createddate-detail">{item.createdDate?.toString()}</div>
          <Button color="warning" size="small" variant="contained">
            {'Sửa'}
          </Button>
          <Button color="error" size="small" variant="contained">
            {'Xóa'}
          </Button>
        </div>
      ),
    }));
  };
}

export default ExamList;
