import './index.css';

import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { addExamToClass, getAllExamsOfClass, getExamListCanAddToClass } from '../../../api/classes';
import { AutoComplete, CommonDialog, TableComponent } from '../../../component';
import { IExam } from '../../../constant';
import { TeacherRoute } from '../../../constant/route/name';
import { useAppSelector } from '../../../store/hook';
import { getDateFromString } from '../../../util/datetime';
import { selectAuth } from '../../account/AuthSlice';
import { teacherRemoveExamFromClass } from '../../../api/classes';

const header = ['Tên đề', 'Loại đề', 'Khối', 'Thời gian', 'Ngày tạo'];

export default function ExamList() {
  const auth = useAppSelector(selectAuth);
  const [data, setData] = React.useState<IExam[]>([]);
  const [isDataLoading, setIsDataLoading] = React.useState<boolean>(true);
  const [examCanAddList, setExamCanAddList] = React.useState<IExam[]>([]);
  const [examCanAddListLoading, setExamCanAddListLoading] = React.useState<boolean>(true);
  const [examAddList, setExamAddList] = React.useState<number[]>([]);
  const params = useLocation().state;
  const navigate = useNavigate();
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);
  const [deleteBusy, setDeleteBusy] = React.useState(false);
  const [itemDeleted, setItemDeleted] = React.useState<number>(0);

  React.useEffect(() => {
    handleGetTable();
  }, []);

  const handleGetTable = () => {
    setIsDataLoading(true);
    getAllExamsOfClass(params.class_id)
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

  const getExamListCanAddToClassList = () => {
    getExamListCanAddToClass(auth.user.user_id, params.class_id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.code === '200') {
          setExamCanAddList(res.result);
          setExamCanAddListLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addExam = (exam_id_list: number[], teacher_id: number, class_id: number) => {
    setIsDataLoading(true);
    addExamToClass(exam_id_list, teacher_id, class_id)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.code === '200') {
          handleGetTable();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteExam = (exam_id: number) => {
    teacherRemoveExamFromClass(auth.user.user_id, exam_id, params.class_id)
      .then((res) => res.data)
      .then((res) => {
        if (res.code == '200') {
          handleGetTable();
        } else {
        }
        setOpenDeleteAlert(false);
        setDeleteBusy(false);
      });
    return;
  };

  const renderData = () => {
    return data.map((item) => ({
      // ...item,
      title: item.title,
      type: item.type,
      grade: item.grade,
      time: item.time,
      created_at: (
        <div className="a-teacherclass-examlist-createddate">
          <div className="a-examlist-createddate-detail">{getDateFromString(item.created_at as string)}</div>
          <Button
            color="warning"
            size="small"
            variant="contained"
            onClick={() => {
              navigate(TeacherRoute.EDIT_EXAM, { state: item });
            }}
          >
            {'Sửa'}
          </Button>
          <Button
            color="error"
            size="small"
            variant="contained"
            onClick={() => {
              setOpenDeleteAlert(true);
              setItemDeleted(item.exam_id!);
            }}
          >
            {'Xóa'}
          </Button>
        </div>
      ),
    }));
  };
  return (
    <div className="a-teacherclass-examlist">
      <CommonDialog
        buttonText={'Thêm đề mới'}
        title={'Thêm đề'}
        content={
          <AutoComplete
            loading={examCanAddListLoading}
            multiple
            options={examCanAddList.map((item) => ({
              title: item.title!,
              id: item.exam_id!,
            }))}
            onChange={(value) => {
              setExamAddList(value as number[]);
            }}
          />
        }
        cancelButtonText="Hủy"
        className="a-teacherclass-examlist-dialog"
        onOpenButtonClick={getExamListCanAddToClassList}
        primaryButtonText="Thêm"
        action={() => addExam(examAddList!, auth.user.user_id, params.class_id)}
      />
      {isDataLoading ? (
        <div className="a-table-loading">
          <CircularProgress />
        </div>
      ) : (
        <>
          <TableComponent header={header} data={renderData()} />
          <CommonDialog
            isOpen={openDeleteAlert}
            cancelButtonText="Hủy"
            primaryButtonText="Xóa"
            isPrimaryButtonBusy={deleteBusy}
            title="Xác nhận"
            content="Xóa?"
            action={() => {
              setDeleteBusy(true);
              deleteExam(itemDeleted);
            }}
            setIsOpen={(isOpen) => setOpenDeleteAlert(isOpen)}
          />
        </>
      )}
    </div>
  );
}
