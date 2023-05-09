import { CommonTableTab, InfoBox } from '../../../component';
import { useLocation } from 'react-router-dom';
import ExamList from './ExamList';
import StudentList from './StudentList';
import TeacherList from './TeacherList';
import './index.css';

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
