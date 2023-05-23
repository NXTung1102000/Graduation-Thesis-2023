import * as React from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './index.css';

interface IQuestionListProps {
  answerArray: number[];
  onClick: (event: React.MouseEvent<HTMLElement>, value: any) => void;
}

export default function QuestionList(props: IQuestionListProps) {
  const [alignment, setAlignment] = React.useState<string | null>('left');

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      className="a-questionlist"
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      {props.answerArray.map((item, index) => {
        return (
          <ToggleButton
            className={item != 0 ? 'a-question-completed' : 'a-question-uncompleted'}
            value={index}
            onClick={props.onClick}
          >
            {index + 1}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}
