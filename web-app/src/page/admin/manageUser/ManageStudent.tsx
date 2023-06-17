import './index.css';

import { Box, Button, CircularProgress } from '@mui/material';
import React from 'react';

import { getAllStudents } from '../../../api/manageUser';
import { TableComponent } from '../../../component';
import { IStudent } from '../../../constant';

const header = ['Tên học sinh', 'Email', 'Trạng thái', 'Hành động'];

export default function ManageStudent() {
  const [data, setData] = React.useState<IStudent[]>([]);
  const [isDataLoading, setIsDataLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    handleGetTable();
  }, []);

  const handleGetTable = () => {
    setIsDataLoading(true);
    getAllStudents()
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.code === '200') {
          setData(res.result);
          setIsDataLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderData = () => {
    return data.map((item) => ({
      name: item.name,
      email: (
        <div className="a-teacherclass-studentlist-email">
          <div className="a-studentlist-email-detail">{item.email?.toString()}</div>
        </div>
      ),
      status: <Box>{item.is_blocked ? <Box>Đang bị khóa</Box> : <Box>Hoạt động</Box>}</Box>,
      action: (
        <Box>
          {!item.is_blocked && (
            <Button color="warning" size="small" variant="contained">
              {'Khóa'}
            </Button>
          )}
        </Box>
      ),
    }));
  };

  return (
    <div className="a-teacherclass-studentlist">
      {isDataLoading ? (
        <div className="a-table-loading">
          <CircularProgress />
        </div>
      ) : (
        <TableComponent header={header} data={renderData()} />
      )}
    </div>
  );
}
