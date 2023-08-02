import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Management from '../assets/homepage/quan-ly-b-1.png';
import TakeExam from '../assets/homepage/college-entrance-exam-concept-illustration_114360-13742.avif';
import PublicExam from '../assets/homepage/2903631.jpg';
import './index.css';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { selectAuth } from './account/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { AdminRoute, GuestRoute, StudentRoute, TeacherRoute } from '../constant/route/name';
import { setOpenSignIn } from './account/SignInSlice';

export default function Home() {
  const auth = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleManagement = () => {
    if (auth.access_token) {
      switch (auth.user.role) {
        case 0:
          navigate(AdminRoute.MANAGE_USER);
          break;
        case 1:
          navigate(StudentRoute.SEE_CLASS);
          break;
        case 2:
          navigate(TeacherRoute.MANAGE_CLASS);
          break;
      }
    } else dispatch(setOpenSignIn({ open: true }));
  };

  const handleTakeExam = () => {
    if (auth.access_token) {
      navigate(StudentRoute.SEE_CLASS);
    } else dispatch(setOpenSignIn({ open: true }));
  };

  const handlePublicExam = () => {
    navigate(GuestRoute.SEARCH_EXAM_INTEGRATION);
  };

  return (
    <div className="a-homepage">
      <div className="a-homepage-welcome">{'Chào Mừng Bạn Đến Với Hệ Thống Quản Lý Lớp'}</div>
      <div className="a-homepage-paper">
        <Card sx={{ maxWidth: 345 }} onClick={handleManagement}>
          <CardActionArea>
            <CardMedia component="img" height="270" image={Management} alt="Management" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Hệ Thống Quản Lý
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hệ thống hỗ trợ người dùng trong việc quản lý lớp.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 345 }} onClick={handleTakeExam}>
          <CardActionArea>
            <CardMedia component="img" height="270" image={TakeExam} alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Làm Đề Thi
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Làm đề thi theo lớp hoặc đề thi công khai trực tuyến.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 345 }} onClick={handlePublicExam}>
          <CardActionArea>
            <CardMedia component="img" height="270" image={PublicExam} alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Kho Đề Công Khai
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tổng hợp đề thi công khai từ nhiều nguồn khác nhau.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}
