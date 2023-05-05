import { Box, Link } from '@mui/material';

import TableComponent from '../../component/table/TableComponent';
import { NameSourceExam, UrlSourceExam } from '../../constant/name';

const header = ['Tên đề thi', 'Nguồn', 'Thời gian'];
const randomDate = (start: Date, end: Date) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toDateString();
};

const getUrlSource = (name: NameSourceExam) => {
  switch (name) {
    case NameSourceExam.MATH_VN:
      return UrlSourceExam.MATH_VN;
    case NameSourceExam.ON_LUYEN:
      return UrlSourceExam.ON_LUYEN;
    case NameSourceExam.TIM_DAP_AN:
      return UrlSourceExam.TIM_DAP_AN;
    case NameSourceExam.TOAN_MATH:
      return UrlSourceExam.TOAN_MATH;
  }
};

const data = [
  {
    name: 'Đề kiểm tra học kỳ 2 Toán 12 năm 2022 – 2023 sở GD&ĐT Đồng Nai',
    url: 'https://toanmath.com/2023/05/de-kiem-tra-hoc-ky-2-toan-12-nam-2022-2023-so-gddt-dong-nai.html',
    source: 'toanmath',
    time: randomDate(new Date(2022, 12, 30), new Date()),
  },
  {
    name: 'Đề thi khảo sát Toán 12 năm 2023 lần 1 trường THPT Thái Phiên – Hải Phòng',
    url: 'https://toanmath.com/2023/05/de-thi-khao-sat-toan-12-nam-2023-lan-1-truong-thpt-thai-phien-hai-phong.html',
    source: 'toanmath',
    time: randomDate(new Date(2022, 12, 30), new Date()),
  },
  {
    name: 'Đề thi thử tốt nghiệp THPT năm 2023 môn Toán sở GD&ĐT Quảng Bình',
    url: 'https://toanmath.com/2023/05/de-thi-thu-tot-nghiep-thpt-nam-2023-mon-toan-so-gddt-quang-binh.html',
    source: 'toanmath',
    time: randomDate(new Date(2022, 12, 30), new Date()),
  },
  {
    name: 'Đề Toán 12 kiểm tra giữa kì năm học 2020 - 2021 có đáp án',
    url: 'https://www.mathvn.com/2020/11/e-toan-12-kiem-tra-giua-ki-nam-hoc-2020.html',
    source: 'mathvn',
    time: randomDate(new Date(2022, 12, 30), new Date()),
  },
  {
    name: 'Đề kiểm tra giữa kì 1 Toán 12 có đáp án (trắc nghiệm)',
    url: 'https://www.mathvn.com/2020/10/e-kiem-tra-giua-ki-1-toan-12-co-ap-trac.html',
    source: 'mathvn',
    time: randomDate(new Date(2022, 12, 30), new Date()),
  },
  {
    name: 'Đề thi giữa kỳ 2 môn Hóa lớp 12 Trường THPT Bình Chiểu năm 2021-2022',
    url: 'https://www.onluyen.vn/tai_lieu/de-thi-giua-ky-2-mon-hoa-lop-12-truong-thpt-binh-chieu-nam-2021-2022/',
    source: 'onluyen',
    time: randomDate(new Date(2022, 12, 30), new Date()),
  },
  {
    name: 'Đề ôn tập giữa kỳ 2 môn Toán lớp 12 Trường THPT Lê Lợi năm 2021-2022',
    url: 'https://www.onluyen.vn/tai_lieu/de-on-tap-giua-ky-2-mon-toan-lop-12-truong-thpt-le-loi-nam-2021-2022/',
    source: 'onluyen',
    time: randomDate(new Date(2022, 12, 30), new Date()),
  },
  {
    name: 'Đề kiểm tra học kì 2 lớp 12 môn Toán trường THPT Trần Phú, Phú Yên năm học 2021-2022',
    url: 'https://timdapan.com/de-thi/de-thi-hoc-ki-2-lop-12-mon-toan-truong-thpt-tran-phu-phu-yen-nam-hoc-2021-2022',
    source: 'timdapan',
    time: randomDate(new Date(2022, 12, 30), new Date()),
  },
  {
    name: 'Đề kiểm tra học kì 2 lớp 12 môn Toán Sở GD&ĐT Bắc Ninh năm học 2021-2022',
    url: 'https://timdapan.com/de-thi/de-thi-hoc-ki-2-lop-12-mon-toan-so-gd-dt-bac-ninh-nam-hoc-2021-2022',
    source: 'timdapan',
    time: randomDate(new Date(2022, 12, 30), new Date()),
  },
];

export default function SearchExamIntegration() {
  const mapData = () => {
    return data.map((item) => {
      return {
        // ...item,
        name: (
          <Box>
            <Link href={item.url} target="_blank">
              {item.name}
            </Link>
          </Box>
        ),
        source: (
          <Box>
            <Link href={getUrlSource(item.source as NameSourceExam)} target="_blank">
              {item.source}
            </Link>
          </Box>
        ),
        time: item.time,
      };
    });
  };
  return <TableComponent header={header} data={mapData()} />;
}
