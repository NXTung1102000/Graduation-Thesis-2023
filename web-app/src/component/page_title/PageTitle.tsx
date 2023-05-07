import { combineClassName } from '../../util/localStorage';
import * as React from 'react';
import './index.css';

interface IPageTitleProps {
  className?: string;
  content: string;
}

class PageTitle extends React.Component<IPageTitleProps> {
  public constructor(props: IPageTitleProps) {
    super(props);
  }

  public render(): React.ReactNode {
    return <div className={combineClassName('a-pagetitle', this.props.className)}>{this.props.content}</div>;
  }
}

export default PageTitle;
