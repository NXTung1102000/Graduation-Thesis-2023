import { Box, Button, CircularProgress, Link, MenuItem, TextField } from '@mui/material';
import React from 'react';

import { searchIntegration, searchIntegrationOneWeb } from '../../api/exam';
import { ContentHeader, PageTitle } from '../../component';
import TableComponent from '../../component/table/TableComponent';
import { ClassExam, NameSourceExam, TypeExam, UrlSourceExam } from '../../constant/name';

interface IExamFromSource {
  title: string;
  link: string;
  type: string;
  grade: number;
  date: Date | string;
  source: string;
}

const header = ['Tên đề thi', 'Nguồn', 'Loại', 'Khối', 'Thời gian'];

const examSourceOptions = Object.values(NameSourceExam).map((type) => {
  return { value: type, label: type };
});

const examTypeOptions = Object.values(TypeExam).map((type) => {
  return { value: type, label: type };
});

const examGradeOptions = Object.values(ClassExam).map((grade) => {
  return { value: grade, label: grade };
});

const getUrlSource = (name: NameSourceExam) => {
  switch (name) {
    case NameSourceExam.MATH_VN:
      return UrlSourceExam.MATH_VN;
    case NameSourceExam.ON_LUYEN:
      return UrlSourceExam.ON_LUYEN;
    case NameSourceExam.TIM_DAP_AN:
      return UrlSourceExam.TIM_DAP_AN;
    case NameSourceExam.TOAN_MATH:
      return UrlSourceExam.TOAN_MATH;
  }
};

export default function SearchExamIntegration() {
  const [data, setData] = React.useState<IExamFromSource[]>([]);

  const [keyword, setKeyword] = React.useState('');
  const [source, setSource] = React.useState('');
  const [grade, setGrade] = React.useState('');
  const [type, setType] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  const search = () => {
    const requestBody = {
      keyword: keyword,
      type: type.trim().length > 0 ? type : undefined,
      grade: grade.trim().length > 0 ? Number(grade) : undefined,
      page: page,
    };
    setIsLoading(true);
    if (source.trim().length == 0) {
      searchIntegration(requestBody)
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
        .catch((error) => console.log(error));
    } else {
      searchIntegrationOneWeb(source, requestBody)
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
        .catch((error) => console.log(error));
    }
  };

  const mapData = () => {
    return data.map((item) => {
      return {
        // ...item,
        title: (
          <Box>
            <Link href={item.link} target="_blank">
              {item.title}
            </Link>
          </Box>
        ),
        source: (
          <Box>
            <Link href={getUrlSource(item.source as NameSourceExam)} target="_blank">
              {item.source}
            </Link>
          </Box>
        ),
        type: item.type,
        grade: item.grade,
        time: item.date,
      };
    });
  };

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

    return <TableComponent header={header} data={mapData()} />;
  };

  return (
    <div>
      <PageTitle content="Tìm kiếm đề thi tích hợp" />
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
              label="Nguồn tìm kiếm"
              value={source}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSource(event.target.value);
              }}
            >
              <MenuItem key={'default'} value={''}>
                {'Tất cả'}
              </MenuItem>
              {examSourceOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
            <TextField
              fullWidth
              label="Trang"
              type="number"
              value={page}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const _page = Number(event.target.value);
                if (_page <= 1) {
                  setPage(1);
                } else setPage(_page);
              }}
            />
          </div>
        </div>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: ' center', margin: '0 0 1rem 0' }}>
          <Button size="small" variant="contained" onClick={search}>
            {'Tìm kiếm'}
          </Button>
        </Box>
        <ContentHeader content="Kết Quả Tìm Kiếm" />
        {renderResult()}
      </div>
    </div>
  );
}
