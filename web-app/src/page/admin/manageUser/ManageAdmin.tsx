import './index.css';

import { CircularProgress } from '@mui/material';
import React from 'react';

import { getAllAdmins } from '../../../api/manageUser';
import { TableComponent } from '../../../component';
import { IStudent } from '../../../constant';

const header = ['Tên quản trị', 'Email'];

export default function ManageTeacher() {
  const [data, setData] = React.useState<IStudent[]>([]);
  const [isDataLoading, setIsDataLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    handleGetTable();
  }, []);

  const handleGetTable = () => {
    setIsDataLoading(true);
    getAllAdmins()
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
