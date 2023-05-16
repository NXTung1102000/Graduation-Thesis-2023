import './index.css';

import React from 'react';

interface IInfoBoxProps {
  detail: { [key: string]: string };
}

class InfoBox extends React.Component<IInfoBoxProps> {
  public constructor(props: IInfoBoxProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <div className="a-infobox">
        {Object.keys(this.props.detail).map((key) => {
          return this.getInfoDetail(key);
        })}
      </div>
    );
  }

  private getInfoDetail: (key: string) => React.ReactNode = (key) => {
    switch (key) {
      case 'name':
        return (
          <div className="a-infobox-info" key={key}>
            <div className="a-infobox-info-title">{'Lớp: '}</div>
            {this.props.detail[key]}
          </div>
        );
      case 'description':
        return (
          <div className="a-infobox-info" key={key}>
            <div className="a-infobox-info-title">{'Mô tả:'}</div>
            {this.props.detail[key]}
          </div>
        );
      case 'teacherName':
        return (
          <div className="a-infobox-info" key={key}>
            <div className="a-infobox-info-title">{'Tên giáo viên:'}</div>
            {this.props.detail[key]}
          </div>
        );
      default:
        break;
    }
  };
}

export default InfoBox;
