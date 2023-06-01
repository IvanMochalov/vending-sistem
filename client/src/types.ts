export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  }
}
export type TShippingFiledRegister = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export type TShippingFiledLogin = {
  email: string;
  password: string;
}