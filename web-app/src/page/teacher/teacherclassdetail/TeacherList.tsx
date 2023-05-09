import React from 'react';
import { TableComponent } from '../../../component';
import { ITeacher } from '../../../constant';
import { Button } from '@mui/material';
import './index.css';

interface ITeacherListProps {}

const header = ['Tên học sinh', 'Email'];

const data: ITeacher[] = [
  {
    name: 'Ng Văn A',
    email: 'ngvana@gmail.com',
  },
  {
    name: 'Ng Văn A',
    email: 'ngvana@gmail.com',
  },
  {
    name: 'Ng Văn A',
    email: 'ngvana@gmail.com',
  },
  {
    name: 'Ng Văn A',
    email: 'ngvana@gmail.com',
  },
  {
    name: 'Ng Văn A',
    email: 'ngvana@gmail.com',
  },
];

class TeacherList extends React.Component<ITeacherListProps> {
  public constructor(props: ITeacherListProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <div className="a-teacherclass-teacherlist">
        <Button size="small" variant="contained">
          {'Thêm giáo viên mới'}
        </Button>
        <TableComponent header={header} data={this.renderData()} />
      </div>
    );
  }

  private renderData = () => {
    return data.map((item) => ({
      ...item,
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
}

export default TeacherList;
