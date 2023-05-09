import { InfoBox, TableComponent } from '../../../component';
import { IExam } from '../../../constant';
import { Button } from '@mui/material';
import './index.css';
import React from 'react';

interface ITeacherExamProps {}

const tableColumn = ['Tên đề', 'Loại đề', 'Khối', 'Thời gian', 'Ngày tạo'];

const data: IExam[] = [
  { title: 'Ôn tập tích phân xác định', type: 'Giữa kỳ 1', grade: 12, time: 30, createdDate: '28/11/2022' },
];

const infoDetail = { teacherName: 'Nguyễn Văn B' };

class TeacherExam extends React.Component<ITeacherExamProps> {
  public constructor(props: ITeacherExamProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <div className="a-teacher-teacherexam">
        <InfoBox detail={infoDetail} />
        <div className="a-teacher-teacherexam-table">
          <Button size="small" variant="contained">
            {'Tải lên đề mới'}
          </Button>
          <TableComponent header={tableColumn} data={this.renderData()} />
        </div>
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

export default TeacherExam;
