import './index.css';

import { Box, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import React from 'react';
import Countdown from 'react-countdown';
import { useLocation, useNavigate } from 'react-router-dom';

import { getDetailExamForDo } from '../../../api/exam';
import { CommonDialog, InfoBox, QuestionList, RadioBoxGroup } from '../../../component';
import { IExam, IQuestion } from '../../../constant';

const initQuestions: IQuestion = {
  question_id: 0,
  content: '',
  answer_list: [{ answer_id: 0, answer_number: 0, content: '' }],
  true_answer_id: 0,
  question_number: 0,
};

function ExamTaking() {
  const examState = useLocation().state;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerArray, setAnswerArray] = useState([0]);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const navigate = useNavigate();
  const [questionsList, setQuestionsList] = React.useState<IQuestion[]>([initQuestions]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getData = () => {
    setIsLoading(true);
    getDetailExamForDo(examState.exam_id)
      .then((res) => res.data)
      .then((res) => {
        if (res.code == '200') {
          setQuestionsList(res.result.question_list);
          setAnswerArray(Array(res.result.question_list.length).fill(0));
          setIsLoading(false);
        } else {
          setQuestionsList([]);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAnswerChange = (questionId: number, value: string) => {
    const updatedAnswers = [...answerArray];
    updatedAnswers[questionId] = Number(value);
    setAnswerArray(updatedAnswers);
  };

  const handleQuestionChange = (value: string) => {
    setCurrentQuestion(Number(value));
  };

  return (
    <div className="a-student-examtaking">
      <InfoBox detail={examState} />
      {isLoading ? (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '.5rem 0 .5rem 0' }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="a-student-examtaking-container">
          <div className="a-examtaking-exam-container">
            <div className="a-exam-container-questionnumber">
              {'Câu ' + questionsList[currentQuestion]?.question_number + ':'}
            </div>
            <div className="a-exam-container-questionanswer">
              <div>
                <img src={`data:image/jpeg;base64,${questionsList[currentQuestion]?.content}`} alt="" />
                <RadioBoxGroup
                  options={questionsList[currentQuestion].answer_list!.map((item) => ({
                    key: item.answer_id,
                    content: item.content,
                  }))}
                  questionNumber={currentQuestion}
                  answerArray={answerArray}
                  onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="a-examtaking-examlist-container">
            <div className="a-examtaking-examlist-timer">
              <div className="a-infobox-info-title">{'Thời gian:'}</div>
              <Countdown
                date={currentTime + Number(examState.time) * 60000}
                onComplete={() => {
                  setOpenDialog(true);
                }}
              />
              <CommonDialog
                isOpen={isOpenDialog}
                content="Điểm"
                title="Kết quả thi"
                action={() => navigate(-1)}
                primaryButtonText="Xác nhận"
              />
            </div>
            <QuestionList answerArray={answerArray} onClick={(e, value) => handleQuestionChange(value)} />
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              {'Nộp bài'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamTaking;
