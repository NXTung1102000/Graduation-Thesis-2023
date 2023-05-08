import React from 'react';
import { CommonDialog, ContentHeader, PageTitle, TableComponent } from '../../../component';
import { ClassStatus, IClass, IStudentClass } from '../../../constant';
import { Link } from 'react-router-dom';
import './index.css';
import { TeacherRoute } from '../../../constant/route/name';

interface ITeacherClassProps {}

const header = ['Tên lớp', 'Mô tả', 'Môn học'];

const data: IClass[] = [
  {
    className: 'Lớp 12A1 THPT Lương Sơn',
    description: 'Ôn tập Toán 12',
    subject: 'Toán',
  },
  {
    className: 'Lớp 12A1 THPT Lương Sơn',
    description: 'Ôn tập Toán 11',
    subject: 'Toán',
  },
  {
    className: 'Lớp 12A1 THPT Lương Sơn',
    description: 'Ôn tập Toán 10',
    subject: 'Toán',
  },
];

class TeacherClass extends React.Component<ITeacherClassProps> {
  public constructor(props: ITeacherClassProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <div className="a-teacher-teacherclass">
        <PageTitle content="Quản Lý Lớp" />
        <div className="a-teacher-teacherclass-table">
          <ContentHeader content="Danh Sách Lớp Quản Lý" />
          <TableComponent header={header} data={this.renderData()} />
        </div>
      </div>
    );
  }

  private renderData = () => {
    return data.map((item) => ({
      ...item,
      className: (
        <Link to={TeacherRoute.MANAGE_CLASS_DETAIL} state={item}>
          {item.className}
        </Link>
      ),
    }));
  };
}

export default TeacherClass;
