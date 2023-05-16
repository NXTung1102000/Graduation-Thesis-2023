import './index.css';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { ContentHeader, PageTitle } from '../../../component';
import { IExam } from '../../../constant';
import { ClassExam, TypeExam } from '../../../constant/name';
import { StudentRoute } from '../../../constant/route/name';

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
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', margin: '0 0 1rem 0' }}>
            <Button size="small" variant="contained">
              {'Tìm kiếm'}
            </Button>
          </Box>
          <ContentHeader content="Kết Quả Tìm Kiếm" />
          {data.map((item, index) => {
            return (
              <div className="a-publicexam-list-exam" key={index}>
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
