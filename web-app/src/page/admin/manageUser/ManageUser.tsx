import './index.css';

import React from 'react';
import { useLocation } from 'react-router-dom';

import { CommonTableTab, InfoBox } from '../../../component';
import ManageAdmin from './ManageAdmin';
import ManageStudent from './ManageStudent';
import ManageTeacher from './ManageTeacher';

const tabTitles = ['Danh sách học sinh', 'Danh sách giáo viên', 'Danh sách quản trị'];

export default function ManageUser() {
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
          tabContent={[
            <ManageStudent key={'student'} />,
            <ManageTeacher key={'teacher'} />,
            <ManageAdmin key={'admin'} />,
          ]}
        />
      </div>
    </div>
  );
}
