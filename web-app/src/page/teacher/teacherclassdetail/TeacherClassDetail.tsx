import { CommonTableTab, ContentHeader, InfoBox, TableComponent } from '../../../component';
import { IExam } from '../../../constant';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import './index.css';
import ExamList from './ExamList';
import StudentList from './StudentList';
import TeacherList from './TeacherList';

interface ITeacherClassDetailProps {}

const tabTitles = ['Danh sách đề thi', 'Danh sách học sinh', 'Danh sách giáo viên'];

function TeacherClassDetail(props: ITeacherClassDetailProps) {
  const params = useLocation().state;
  return (
    <div className="a-teacher-teacherclassdetail">
      <InfoBox detail={params} />
      <div className="a-teacher-teacherclassdetail-table">
        <CommonTableTab tabTitles={tabTitles} tabContent={[<ExamList />, <StudentList />, <TeacherList />]} />
      </div>
    </div>
  );
}

export default TeacherClassDetail;
