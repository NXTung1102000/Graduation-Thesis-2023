import './index.css';

import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import * as React from 'react';
import { IQuestionAnswer } from '../../constant';

interface IQuestionListProps {
  questionAnswerArray: IQuestionAnswer[];
  deleteList?: number[];
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
      {props.questionAnswerArray.map((item, index) => {
        return (
          <ToggleButton
            key={index}
            className={
              props.deleteList
                ? props.deleteList.find((deleteItem) => deleteItem == item.question_id)
                  ? 'a-question-deleted'
                  : item.true_answer != 0 && item.true_answer != null
                  ? 'a-question-completed'
                  : 'a-question-uncompleted'
                : item.true_answer != 0 && item.true_answer != null
                ? 'a-question-completed'
                : 'a-question-uncompleted'
            }
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
