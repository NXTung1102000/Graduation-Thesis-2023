export interface IState {
  value: string;
  isError: boolean;
  message: string;
}

export const messageOfFieldIsNotEmpty = (name: string) => {
  return `${name} không được để trống`;
};

export const handleChangeState = (state: IState, setState: (state: IState) => void, value: string, regex: RegExp) => {
  setState({ ...state, value: value, isError: !regex.test(value) });
};

export const validateState = (state: IState, setState: (state: IState) => void, regex: RegExp) => {
  setState({ ...state, isError: !regex.test(state.value) });
  return !regex.test(state.value);
};

export const messageOfPhoneNumber = 'phone number in Vietnamese format, example: 09xxxxxxx  or  849xxxxxxxx';
export const messageOfEmail = 'Email không đúng định dạng';
export const messageOfPassword = 'Mật khẩu có ít nhất 6 ký tự và có cả chữ và số';
export const messageOfNewPassword = 'và mật khẩu mới phải khác mật khẩu cũ';
export const messageOfConfirmPassword = 'Xác nhận mật khẩu khác mật khẩu';
export const messageOfPercentNumber = 'Percent is between 1% and 100%';
export const messageOfPositiveNumber = 'The value is greater than 0';
