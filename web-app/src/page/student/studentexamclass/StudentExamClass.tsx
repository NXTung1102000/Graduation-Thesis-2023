import './index.css';

import { Button } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getAllExamsOfClass } from '../../../api/classes';
import { ContentHeader, InfoBox, TableComponent } from '../../../component';
import { IExam } from '../../../constant';
import { StudentRoute } from '../../../constant/route/name';
import { getDateFromString } from '../../../util/datetime';

const header = ['Tên đề', 'Loại đề', 'Khối', 'Thời gian làm', 'Ngày tạo'];

function StudentExamClass() {
  const [data, setData] = React.useState<IExam[]>([]);
  const navigate = useNavigate();
  const params = useLocation().state;
  const customParams = {
    name: params?.name,
    description: params?.description,
    teacherName: params?.owner?.name,
  };

  const refreshData = () => {
    console.log(params);
    getAllExamsOfClass(params.class_id)
      .then((res) => res.data)
      .then((res) => {
        if (res.code == '200') {
          setData(res.result);
        } else {
          setData([]);
        }
      })
      .catch((error) => console.log(error));
    return;
  };

  React.useEffect(() => {
    refreshData();
  }, []);

  const renderData = () => {
    return data.map((item) => ({
      // ...item,
      title: item.title,
      type: item.type,
      grade: item.grade,
      time: item.time,
      created_at: (
        <div className="a-studentexamclass-table-createddate">
          <div className="a-studentexamclass-createddate-detail">{getDateFromString(item.created_at as string)}</div>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              navigate(StudentRoute.DO_EXAM, { state: item });
            }}
          >
            {'Làm đề'}
          </Button>
        </div>
      ),
    }));
  };
  return (
    <div className="a-student-studentexamclass">
      <InfoBox detail={customParams} />
      <div className="a-student-studentexamclass-table">
        <ContentHeader content="Danh Sách Đề Thi" />
        <TableComponent header={header} data={renderData()} />
      </div>
    </div>
  );
}

export default StudentExamClass;
