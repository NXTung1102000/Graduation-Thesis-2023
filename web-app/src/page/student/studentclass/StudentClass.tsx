import React from 'react';
import { CommonDialog, ContentHeader, PageTitle, TableComponent } from '../../../component';
import { ClassStatus, IStudentClass } from '../../../constant';
import { StudentRoute } from '../../../constant/route/name';
import { Link } from 'react-router-dom';
import './index.css';

interface IStudentClassProps {}

const header = ['Tên lớp', 'Mô tả', 'Môn học', 'Trạng thái'];

const data: IStudentClass[] = [
  {
    className: 'Lớp 12A1 THPT Lương Sơn',
    description: 'Ôn tập Toán 12',
    subject: 'Toán',
    status: 1,
  },
  {
    className: 'Lớp 12A1 THPT Lương Sơn',
    description: 'Ôn tập Toán 11',
    subject: 'Toán',
    status: 2,
  },
  {
    className: 'Lớp 12A1 THPT Lương Sơn',
    description: 'Ôn tập Toán 10',
    subject: 'Toán',
    status: 0,
  },
];

class StudentClass extends React.Component<IStudentClassProps> {
  public constructor(props: IStudentClassProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <div className="a-student-studentclass">
        <PageTitle content="Danh Sách Lớp" />
        <div className="a-student-studentclass-table">
          <ContentHeader content="Danh Sách Lớp Tham Gia" />
          <TableComponent header={header} data={this.renderData()} />
        </div>
      </div>
    );
  }

  private renderData = () => {
    return data.map((item) => ({
      ...item,
      className: (
        <Link to={StudentRoute.SEE_EXAM_CLASS} state={item}>
          {item.className}
        </Link>
      ),
      status: (
        <div className="a-studentclass-table-status">
          <div className="a-studentclass-status-detail">{this.getClassStatus(item.status)}</div>
          {item.status === ClassStatus.None && (
            <CommonDialog buttonText="Xin tham gia" content="Gửi yêu cầu tham gia?" title="Xác nhận" />
          )}
        </div>
      ),
    }));
  };

  private getClassStatus: (status?: ClassStatus) => string = (status) => {
    switch (status) {
      case ClassStatus.Joined:
        return 'Đã tham gia';
      case ClassStatus.Pending:
        return 'Chờ duyệt';
      default:
        return 'Chưa tham gia';
    }
  };
}

export default StudentClass;
