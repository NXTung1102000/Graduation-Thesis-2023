import './index.css';

import { Box, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import React from 'react';
import Countdown from 'react-countdown';
import { useLocation, useNavigate } from 'react-router-dom';

import { getDetailExamForDo, userDoExam } from '../../../api/exam';
import { CommonDialog, InfoBox, QuestionList, RadioBoxGroup } from '../../../component';
import { IQuestion, IQuestionAnswer } from '../../../constant';
import { useAppSelector } from '../../../store/hook';
import { selectAuth } from '../../account/AuthSlice';

const initQuestions: IQuestion = {
  question_id: 0,
  content: '',
  answer_list: [{ answer_id: 0, answer_number: 0, content: '' }],
  true_answer_id: 0,
  question_number: 0,
};

function ExamTaking() {
  const auth = useAppSelector(selectAuth);
  const examState = useLocation().state;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionAnswerArray, setQuestionAnswerArray] = useState<IQuestionAnswer[]>([]);
  const [isOpenResult, setOpenResult] = useState(false);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const navigate = useNavigate();
  const [questionsList, setQuestionsList] = React.useState<IQuestion[]>([initQuestions]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [examTakingResult, setExamTakingResult] = useState<number>(0);
  const [isResultLoading, setIsResultLoading] = React.useState(false);

  const getData = () => {
    setIsLoading(true);
    getDetailExamForDo(examState.exam_id)
      .then((res) => res.data)
      .then((res) => {
        if (res.code == '200') {
          setQuestionsList(res.result.question_list);
          setQuestionAnswerArray(
            res.result.question_list.map((item: IQuestion) => ({
              question_id: item.question_id,
              true_answer: 0,
            })),
          );
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

  const handleAnswerChange = (questionId: number, value: number) => {
    setQuestionAnswerArray((prevArray) => {
      return prevArray.map((item) => {
        if (item.question_id === questionId) {
          return {
            question_id: questionId,
            true_answer: value,
          };
        }
        return item;
      });
    });
  };

  const handleQuestionChange = (value: string) => {
    setCurrentQuestion(Number(value));
  };

  const sendAnswerExam = (user_id: number, exam_id: number, list_questions: IQuestionAnswer[]) => {
    userDoExam(user_id, exam_id, list_questions)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.code === '200') {
          setExamTakingResult(res.result.toFixed(2));
        }
        setIsResultLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsResultLoading(false);
      });
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
                  answerArray={questionAnswerArray.map((item) => item.true_answer!)}
                  onChange={(e) =>
                    handleAnswerChange(questionsList[currentQuestion].question_id!, Number(e.target.value))
                  }
                />
              </div>
            </div>
          </div>
          <div className="a-examtaking-examlist-container">
            <div className="a-examtaking-examlist-timer">
              <div className="a-examtaking-timer-title">{'Thời gian:'}</div>
              <Countdown
                date={currentTime + Number(examState.time) * 60000}
                onComplete={() => {
                  setOpenResult(true);
                }}
              />
              <CommonDialog
                isOpen={isOpenResult}
                content={
                  isResultLoading ? (
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '.5rem 0 .5rem 0' }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    'Điểm thi: ' + examTakingResult
                  )
                }
                title="Kết quả thi"
                action={() => navigate(-1)}
                primaryButtonText="Xác nhận"
              />
              <CommonDialog
                isOpen={isOpenDialog}
                content="Xác nhận?"
                title="Hoàn thành bài thi"
                action={() => {
                  setOpenResult(true);
                  setIsResultLoading(true);
                  sendAnswerExam(auth.user.user_id, examState.exam_id, questionAnswerArray);
                }}
                primaryButtonText="Xác nhận"
              />
            </div>
            <QuestionList
              questionAnswerArray={questionAnswerArray}
              onClick={(e, value) => handleQuestionChange(value)}
            />
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
