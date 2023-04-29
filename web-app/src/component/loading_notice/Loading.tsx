import { Backdrop, CircularProgress } from '@mui/material';

interface IProps {
  open: boolean;
}

export default function Loading(props: IProps) {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={props.open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
