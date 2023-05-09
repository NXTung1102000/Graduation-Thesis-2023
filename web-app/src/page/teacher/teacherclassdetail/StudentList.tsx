import React from 'react';
import { TableComponent } from '../../../component';
import { IStudent } from '../../../constant';
import { Button } from '@mui/material';
import './index.css';

interface IStudentListProps {}

const header = ['Tên học sinh', 'Email'];

const data: IStudent[] = [
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

class StudentList extends React.Component<IStudentListProps> {
  public constructor(props: IStudentListProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <div className="a-teacherclass-studentlist">
        <Button size="small" variant="contained">
          {'Thêm học sinh mới'}
        </Button>
        <TableComponent header={header} data={this.renderData()} />
      </div>
    );
  }

  private renderData = () => {
    return data.map((item) => ({
      ...item,
      email: (
        <div className="a-teacherclass-studentlist-email">
          <div className="a-studentlist-email-detail">{item.email?.toString()}</div>
          <Button color="error" size="small" variant="contained">
            {'Xóa'}
          </Button>
        </div>
      ),
    }));
  };
}

export default StudentList;
