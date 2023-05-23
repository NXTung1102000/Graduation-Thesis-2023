import './index.css';

import { Button } from '@mui/material';
import React from 'react';

import { TableComponent } from '../../../component';
import { IExam } from '../../../constant';

const header = ['Tên đề', 'Loại đề', 'Khối', 'Thời gian', 'Ngày tạo'];

const data: IExam[] = [
  {
    title: 'Ôn tập tích phân xác định',
    type: 'Giữa kỳ 1',
    grade: 12,
    time: 30,
    created_at: '28/11/2022',
  },
  {
    title: 'Ôn tập tích phân xác định',
    type: 'Giữa kỳ 1',
    grade: 12,
    time: 30,
    created_at: '28/11/2022',
  },
  {
    title: 'Ôn tập tích phân xác định',
    type: 'Giữa kỳ 1',
    grade: 12,
    time: 30,
    created_at: '28/11/2022',
  },
];

export default function ExamList() {
  const renderData = () => {
    return data.map((item) => ({
      ...item,
      created_at: (
        <div className="a-teacherclass-examlist-createddate">
          <div className="a-examlist-createddate-detail">{item.created_at?.toString()}</div>
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
  return (
    <div className="a-teacherclass-examlist">
      <Button size="small" variant="contained">
        {'Thêm đề mới'}
      </Button>
      <TableComponent header={header} data={renderData()} />
    </div>
  );
}
