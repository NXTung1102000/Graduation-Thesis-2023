import './index.css';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import * as React from 'react';

interface IRadioBoxGroup {
  options: { key?: number; content?: string }[];
  questionNumber: number;
  answerArray: number[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioBoxGroup(props: IRadioBoxGroup) {
  return (
    <FormControl className="a-radioboxgroup">
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name={'row-radio-buttons-group'}
        value={props.answerArray[props.questionNumber]}
        onChange={props.onChange}
      >
        {props.options.map((item) => {
          return (
            <FormControlLabel
              key={item.key}
              value={item.key}
              control={<Radio />}
              label={<img src={`data:image/jpeg;base64,${item.content}`} alt="" />}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
