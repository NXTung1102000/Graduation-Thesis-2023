import * as React from 'react';
interface IContentHeaderProps {
  className?: string;
  content: string;
}
import './index.css';

import { combineClassName } from '../../util/localStorage';

class ContentHeader extends React.Component<IContentHeaderProps> {
  public constructor(props: IContentHeaderProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return <div className={combineClassName('a-contentheader', this.props.className)}>{this.props.content}</div>;
  }
}

export default ContentHeader;
