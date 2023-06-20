import './index.css';

import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getDetailExamForEdit, userUpdateExam } from '../../../../api/exam';
import { CommonDialog, InfoBox, QuestionList, RadioBoxGroup } from '../../../../component';
import { IQuestion, IQuestionAnswer } from '../../../../constant';
import { useAppSelector } from '../../../../store/hook';
import { selectAuth } from '../../../account/AuthSlice';

const initQuestions: IQuestion = {
  question_id: 0,
  content: '',
  answer_list: [{ answer_id: 0, answer_number: 0, content: '' }],
  true_answer_id: 0,
  question_number: 0,
};

function ExamEditing() {
  const auth = useAppSelector(selectAuth);
  const examState = useLocation().state;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionAnswerArray, setQuestionAnswerArray] = useState<IQuestionAnswer[]>([]);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [questionsList, setQuestionsList] = React.useState<IQuestion[]>([initQuestions]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [deleteList, setDeleteList] = useState<number[]>([]);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  const getData = () => {
    setIsLoading(true);
    getDetailExamForEdit(examState.exam_id)
      .then((res) => res.data)
      .then((res) => {
        if (res.code == '200') {
          setQuestionsList(res.result.question_list);
          setQuestionAnswerArray(
            res.result.question_list.map((item: IQuestion) => ({
              question_id: item.question_id,
              true_answer: item.true_answer_id ?? null,
            })),
          );
          setTime(res.result.time);
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

  const updateExam = (
    user_id: number,
    exam_id: number,
    time: number,
    list_questions: IQuestionAnswer[],
    list_delete_questions: number[],
  ) => {
    userUpdateExam(user_id, exam_id, time, list_questions, list_delete_questions)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.code === '200') {
          navigate(-1);
        }
      })
      .catch((error) => {
        console.log(error);
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
    if (deleteList.find((item) => item == questionsList[Number(value)].question_id!)) {
      setIsDeleted(true);
    } else {
      setIsDeleted(false);
    }
  };

  const checkUncompleted = () => {
    const notDeletedList = questionsList.filter((item) => !deleteList.includes(item.question_id!));
    return notDeletedList.some((notDeletedItem) =>
      questionAnswerArray.some((item) => item.question_id === notDeletedItem.question_id && item.true_answer == null),
    );
  };

  return (
    <div className="a-teacher-examediting">
      <InfoBox detail={examState} />
      {isLoading ? (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '.5rem 0 .5rem 0' }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="a-teacher-examediting-container">
          <div className="a-examediting-exam-container">
            <Button
              size="small"
              variant={isDeleted ? 'outlined' : 'contained'}
              color="error"
              onClick={() => {
                if (isDeleted) {
                  setDeleteList((preList) => {
                    const newDeleteList = preList.filter((item) => item != questionsList[currentQuestion].question_id!);
                    return newDeleteList;
                  });
                  setIsDeleted(false);
                } else {
                  setDeleteList((preList) => {
                    preList.push(questionsList[currentQuestion].question_id!);
                    return preList;
                  });
                  setIsDeleted(true);
                }
              }}
            >
              {isDeleted ? 'Bỏ xóa' : 'Xóa'}
            </Button>
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
                  disable={isDeleted}
                />
              </div>
            </div>
          </div>
          <div className="a-examediting-examlist-container">
            <div className="a-examediting-examlist-timer">
              <div className="a-examediting-timer-title">{'Thời gian:'}</div>
              <TextField
                inputProps={{ min: 0 }}
                id="outlined-number"
                label="Time (Phút)"
                type="number"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setTime(Number(e.target.value));
                }}
                value={time}
              />
              <CommonDialog
                isOpen={isOpenDialog}
                content="Xác nhận?"
                title="Hoàn tất chỉnh sủa"
                action={() =>
                  updateExam(
                    auth.user.user_id,
                    examState.exam_id,
                    time,
                    questionAnswerArray.filter((item) => item.true_answer != null),
                    deleteList,
                  )
                }
                primaryButtonText="Xác nhận"
                cancelButtonText="Hủy"
                setIsOpen={() => setOpenDialog(false)}
              />
            </div>
            <QuestionList
              questionAnswerArray={questionAnswerArray}
              deleteList={deleteList}
              onClick={(e, value) => handleQuestionChange(value)}
            />
            <Button
              disabled={checkUncompleted()}
              size="small"
              variant="contained"
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              {'Hoàn tất chỉnh sửa'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamEditing;
