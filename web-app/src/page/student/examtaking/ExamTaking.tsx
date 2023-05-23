import './index.css';

import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { CommonDialog, ContentHeader, InfoBox, QuestionList, RadioBoxGroup, TableComponent } from '../../../component';
import { IExam, IQuestion } from '../../../constant';
import { StudentRoute } from '../../../constant/route/name';
import { useEffect, useState } from 'react';
import QuestionOne from '../../../assets/questionExample/question1/question.jpg';
import AnswerOneQuestionOne from '../../../assets/questionExample/question1/answer1.jpg';
import AnswerTwoQuestionOne from '../../../assets/questionExample/question1/answer2.jpg';
import AnswerThreeQuestionOne from '../../../assets/questionExample/question1/answer3.jpg';
import AnswerFourQuestionOne from '../../../assets/questionExample/question1/answer4.jpg';
import QuestionTwo from '../../../assets/questionExample/question2/question.jpg';
import AnswerOneQuestionTwo from '../../../assets/questionExample/question2/answer1.jpg';
import AnswerTwoQuestionTwo from '../../../assets/questionExample/question2/answer2.jpg';
import AnswerThreeQuestionTwo from '../../../assets/questionExample/question2/answer3.jpg';
import AnswerFourQuestionTwo from '../../../assets/questionExample/question2/answer4.jpg';
import QuestionThree from '../../../assets/questionExample/question3/question.jpg';
import AnswerOneQuestionThree from '../../../assets/questionExample/question3/answer1.jpg';
import AnswerTwoQuestionThree from '../../../assets/questionExample/question3/answer2.jpg';
import AnswerThreeQuestionThree from '../../../assets/questionExample/question3/answer3.jpg';
import AnswerFourQuestionThree from '../../../assets/questionExample/question3/answer4.jpg';
import Countdown from 'react-countdown';
import React from 'react';

function ExamTaking() {
  const examState = useLocation().state;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerArray, setAnswerArray] = useState([0]);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const navigate = useNavigate();

  const fakeData: IQuestion[] = [
    {
      questionNumber: 1,
      content: QuestionOne,
      answerList: [
        { answerNumber: 1, content: AnswerOneQuestionOne },
        { answerNumber: 2, content: AnswerTwoQuestionOne },
        { answerNumber: 3, content: AnswerThreeQuestionOne },
        { answerNumber: 4, content: AnswerFourQuestionOne },
      ],
    },
    {
      questionNumber: 2,
      content: QuestionTwo,
      answerList: [
        { answerNumber: 1, content: AnswerOneQuestionTwo },
        { answerNumber: 2, content: AnswerTwoQuestionTwo },
        { answerNumber: 3, content: AnswerThreeQuestionTwo },
        { answerNumber: 4, content: AnswerFourQuestionTwo },
      ],
    },
    {
      questionNumber: 3,
      content: QuestionThree,
      answerList: [
        { answerNumber: 1, content: AnswerOneQuestionThree },
        { answerNumber: 2, content: AnswerTwoQuestionThree },
        { answerNumber: 3, content: AnswerThreeQuestionThree },
        { answerNumber: 4, content: AnswerFourQuestionThree },
      ],
    },
    {
      questionNumber: 4,
      content: QuestionThree,
      answerList: [
        { answerNumber: 1, content: AnswerOneQuestionThree },
        { answerNumber: 2, content: AnswerTwoQuestionThree },
        { answerNumber: 3, content: AnswerThreeQuestionThree },
        { answerNumber: 4, content: AnswerFourQuestionThree },
      ],
    },
    {
      questionNumber: 5,
      content: QuestionThree,
      answerList: [
        { answerNumber: 1, content: AnswerOneQuestionThree },
        { answerNumber: 2, content: AnswerTwoQuestionThree },
        { answerNumber: 3, content: AnswerThreeQuestionThree },
        { answerNumber: 4, content: AnswerFourQuestionThree },
      ],
    },
    {
      questionNumber: 6,
      content: QuestionThree,
      answerList: [
        { answerNumber: 1, content: AnswerOneQuestionThree },
        { answerNumber: 2, content: AnswerTwoQuestionThree },
        { answerNumber: 3, content: AnswerThreeQuestionThree },
        { answerNumber: 4, content: AnswerFourQuestionThree },
      ],
    },
    {
      questionNumber: 7,
      content: QuestionThree,
      answerList: [
        { answerNumber: 1, content: AnswerOneQuestionThree },
        { answerNumber: 2, content: AnswerTwoQuestionThree },
        { answerNumber: 3, content: AnswerThreeQuestionThree },
        { answerNumber: 4, content: AnswerFourQuestionThree },
      ],
    },
    {
      questionNumber: 8,
      content: QuestionThree,
      answerList: [
        { answerNumber: 1, content: AnswerOneQuestionThree },
        { answerNumber: 2, content: AnswerTwoQuestionThree },
        { answerNumber: 3, content: AnswerThreeQuestionThree },
        { answerNumber: 4, content: AnswerFourQuestionThree },
      ],
    },
    {
      questionNumber: 9,
      content: QuestionThree,
      answerList: [
        { answerNumber: 1, content: AnswerOneQuestionThree },
        { answerNumber: 2, content: AnswerTwoQuestionThree },
        { answerNumber: 3, content: AnswerThreeQuestionThree },
        { answerNumber: 4, content: AnswerFourQuestionThree },
      ],
    },
    {
      questionNumber: 10,
      content: QuestionThree,
      answerList: [
        { answerNumber: 1, content: AnswerOneQuestionThree },
        { answerNumber: 2, content: AnswerTwoQuestionThree },
        { answerNumber: 3, content: AnswerThreeQuestionThree },
        { answerNumber: 4, content: AnswerFourQuestionThree },
      ],
    },
    {
      questionNumber: 11,
      content: QuestionThree,
      answerList: [
        { answerNumber: 1, content: AnswerOneQuestionThree },
        { answerNumber: 2, content: AnswerTwoQuestionThree },
        { answerNumber: 3, content: AnswerThreeQuestionThree },
        { answerNumber: 4, content: AnswerFourQuestionThree },
      ],
    },
    {
      questionNumber: 12,
      content: QuestionThree,
      answerList: [
        { answerNumber: 1, content: AnswerOneQuestionThree },
        { answerNumber: 2, content: AnswerTwoQuestionThree },
        { answerNumber: 3, content: AnswerThreeQuestionThree },
        { answerNumber: 4, content: AnswerFourQuestionThree },
      ],
    },
    {
      questionNumber: 13,
      content: QuestionThree,
      answerList: [
        { answerNumber: 1, content: AnswerOneQuestionThree },
        { answerNumber: 2, content: AnswerTwoQuestionThree },
        { answerNumber: 3, content: AnswerThreeQuestionThree },
        { answerNumber: 4, content: AnswerFourQuestionThree },
      ],
    },
  ];

  useEffect(() => {
    setAnswerArray(Array(fakeData.length).fill(0));
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
      <div className="a-student-examtaking-container">
        <div className="a-examtaking-exam-container">
          <div className="a-exam-container-questionnumber">
            {'Câu  ' + fakeData[currentQuestion].questionNumber + ':'}
          </div>
          <div className="a-exam-container-questionanswer">
            <img src={fakeData[currentQuestion].content} />
            <RadioBoxGroup
              options={fakeData[currentQuestion].answerList!.map((item) => ({
                key: item.answerNumber!,
                label: item.content!,
              }))}
              questionNumber={currentQuestion}
              answerArray={answerArray}
              onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
            />
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
    </div>
  );
}

export default ExamTaking;
