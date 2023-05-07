import { ContentHeader, InfoBox, TableComponent } from '../../../component';
import { IExam } from '../../../constant';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import './index.css';

interface IStudentExamClassProps {}

const header = ['Tên đề', 'Loại đề', 'Khối', 'Thời gian làm', 'Ngày tạo'];

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
  {
    title: 'Ôn tập tích phân xác định',
    type: 'Giữa kỳ 1',
    grade: 12,
    time: 30,
    createdDate: '28/11/2022',
  },
];

function StudentExamClass(props: IStudentExamClassProps) {
  const params = useLocation().state;
  const renderData = () => {
    return data.map((item) => ({
      ...item,
      createdDate: (
        <div className="a-studentexamclass-table-createddate">
          <div className="a-studentexamclass-createddate-detail">{item.createdDate?.toString()}</div>
          <Button size="small" variant="contained">
            {'Làm đề'}
          </Button>
        </div>
      ),
    }));
  };
  return (
    <div className="a-student-studentexamclass">
      <InfoBox detail={params} />
      <div className="a-student-studentexamclass-table">
        <ContentHeader content="Danh Sách Đề Thi" />
        <TableComponent header={header} data={renderData()} />
      </div>
    </div>
  );
}

export default StudentExamClass;
