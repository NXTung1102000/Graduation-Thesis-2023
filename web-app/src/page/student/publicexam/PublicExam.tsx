import React from 'react';
import { ContentHeader, PageTitle } from '../../../component';
import { IExam } from '../../../constant';
import { StudentRoute } from '../../../constant/route/name';
import { Link } from 'react-router-dom';
import { Button, MenuItem, TextField } from '@mui/material';
import { ClassExam, TypeExam } from '../../../constant/name';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './index.css';

interface IPublicExamProps {}

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
];

const examTypeOptions = Object.values(TypeExam).map((type) => {
  return { value: type, label: type };
});

const examGradeOptions = Object.values(ClassExam).map((grade) => {
  return { value: grade, label: grade };
});

class PublicExam extends React.Component<IPublicExamProps> {
  public constructor(props: IPublicExamProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <div className="a-student-publicexam">
        <PageTitle content="Đề Thi Công Khai" />
        <div className="a-student-publicexam-filter a-student-publicexam-container">
          <ContentHeader content="Bộ Lọc" />
          <div className="a-publicexam-filters">
            <TextField fullWidth label="Từ khóa" />
            <div className="a-publicexam-filters-option">
              <TextField select fullWidth label="Loại đề thi">
                {examTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField fullWidth select label="Khối">
                {examGradeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <Button size="small" variant="contained">
            {'Tìm kiếm'}
          </Button>
        </div>
        <div className="a-student-publicexam-list a-student-publicexam-container">
          <ContentHeader content="Kết Quả Tìm Kiếm" />
          {data.map((item) => {
            return (
              <div className="a-publicexam-list-exam">
                <Link to={StudentRoute.DO_EXAM}>{item.title}</Link>
                <div className="a-publicexam-exam-createddate">
                  <AccessTimeIcon fontSize="small" />
                  <div>{item.createdDate?.toString()}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PublicExam;
