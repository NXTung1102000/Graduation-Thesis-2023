import './index.css';

import { useLocation } from 'react-router-dom';

import { CommonTableTab, InfoBox } from '../../../component';
import ExamList from './ExamList';
import StudentList from './StudentList';
import TeacherList from './TeacherList';

// interface ITeacherClassDetailProps {}

const tabTitles = ['Danh sách đề thi', 'Danh sách học sinh', 'Danh sách giáo viên'];

function TeacherClassDetail() {
  const params = useLocation().state;

  const customParams = {
    name: params?.name,
    description: params?.description,
    teacherName: params?.owner?.name,
  };
  return (
    <div className="a-teacher-teacherclassdetail">
      <InfoBox detail={customParams} />
      <div className="a-teacher-teacherclassdetail-table">
        <CommonTableTab
          tabTitles={tabTitles}
          tabContent={[<ExamList key={'exam'} />, <StudentList key={'student'} />, <TeacherList key={'teacher'} />]}
        />
      </div>
    </div>
  );
}

export default TeacherClassDetail;
