import Countdown from 'react-countdown';
import { CommonDialog, TimerCountdown } from '..';
import { formatDateTime } from '../../util/localStorage';
import './index.css';

import React from 'react';
import { StudentRoute } from '../../constant/route/name';
import { useNavigate } from 'react-router-dom';

interface IInfoBoxProps {
  detail: { [key: string]: string };
}

function InfoBox(props: IInfoBoxProps) {
  const getInfoDetail: (key: string) => React.ReactNode = (key) => {
    switch (key) {
      case 'name':
        return (
          <div className="a-infobox-info" key={key}>
            <div className="a-infobox-info-title">{'Lớp: '}</div>
            {props.detail[key]}
          </div>
        );
      case 'description':
        return (
          <div className="a-infobox-info" key={key}>
            <div className="a-infobox-info-title">{'Mô tả:'}</div>
            {props.detail[key]}
          </div>
        );
      case 'teacherName':
        return (
          <div className="a-infobox-info" key={key}>
            <div className="a-infobox-info-title">{'Tên giáo viên:'}</div>
            {props.detail[key]}
          </div>
        );
      case 'title':
        return (
          <>
            <div className="a-infobox-info" key={key}>
              <div className="a-infobox-info-title">{'Đề:'}</div>
              {props.detail[key]}
            </div>
            <div className="a-infobox-info" key={key + 'date'}>
              <div className="a-infobox-info-title">{'Ngày:'}</div>
              {formatDateTime(new Date())}
            </div>
          </>
        );
      default:
        break;
    }
  };

  return (
    <div className="a-infobox">
      {Object.keys(props.detail).map((key) => {
        return getInfoDetail(key);
      })}
    </div>
  );
}

export default InfoBox;
