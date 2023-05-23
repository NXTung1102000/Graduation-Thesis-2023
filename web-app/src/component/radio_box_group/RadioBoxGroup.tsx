import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './index.css';

interface IRadioBoxGroup {
  options: { key: number; label: string }[];
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
          return <FormControlLabel value={item.key} control={<Radio />} label={<img src={item.label} />} />;
        })}
      </RadioGroup>
    </FormControl>
  );
}
