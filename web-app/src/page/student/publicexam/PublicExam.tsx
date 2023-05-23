import './index.css';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Button, CircularProgress, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { searchPublicExams } from '../../../api/exam';
import { ContentHeader, PageTitle } from '../../../component';
import { IExam } from '../../../constant';
import { ClassExam, TypeExam } from '../../../constant/name';
import { StudentRoute } from '../../../constant/route/name';

const examTypeOptions = Object.values(TypeExam).map((type) => {
  return { value: type, label: type };
});

const examGradeOptions = Object.values(ClassExam).map((grade) => {
  return { value: grade, label: grade };
});

export default function PublicExam() {
  const [data, setData] = React.useState<IExam[]>([]);
  const [keyword, setKeyword] = React.useState('');
  const [grade, setGrade] = React.useState('');
  const [type, setType] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const searchExam = () => {
    setIsLoading(true);
    searchPublicExams(keyword, grade, type)
      .then((res) => res.data)
      .then((res) => {
        if (res.code == '200') {
          setIsLoading(false);
          setData(res.result);
        } else {
          setIsLoading(false);
          setData([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    searchExam();
  }, []);

  const renderResult = () => {
    if (isLoading)
      return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '.5rem 0 .5rem 0' }}>
          <CircularProgress />
        </Box>
      );
    if (data.length == 0)
      return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '.5rem 0 .5rem 0' }}>
          Không tìm thấy đề thi nào
        </Box>
      );
    return data.map((item, index) => {
      return (
        <div className="a-publicexam-list-exam" key={index}>
          <Link to={StudentRoute.DO_EXAM} state={item}>
            {item.title}
          </Link>
          <div className="a-publicexam-exam-createddate">
            <AccessTimeIcon fontSize="small" />
            <div>{`${item.time?.toString()} phút`}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="a-student-publicexam">
      <PageTitle content="Đề Thi Công Khai" />
      <div className="a-student-publicexam-filter a-student-publicexam-container">
        <ContentHeader content="Bộ Lọc" />
        <div className="a-publicexam-filters">
          <TextField
            fullWidth
            label="Từ khóa"
            value={keyword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setKeyword(event.target.value);
            }}
          />
          <div className="a-publicexam-filters-option">
            <TextField
              select
              fullWidth
              label="Loại đề thi"
              value={type}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setType(event.target.value);
              }}
            >
              <MenuItem key={'default'} value={''}>
                {'Tất cả'}
              </MenuItem>
              {examTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Khối"
              value={grade}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setGrade(event.target.value);
              }}
            >
              <MenuItem key={'default'} value={''}>
                {'Tất cả'}
              </MenuItem>
              {examGradeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', margin: '0 0 1rem 0' }}>
          <Button size="small" variant="contained" onClick={searchExam}>
            {'Tìm kiếm'}
          </Button>
        </Box>
        <ContentHeader content="Kết Quả Tìm Kiếm" />
        {renderResult()}
      </div>
    </div>
  );
}
