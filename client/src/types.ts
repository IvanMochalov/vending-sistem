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
export type TShippingFiledAddDevice = {
  id: string;
  modelName: string;
  location: string;
  userId: string;
  started: Date | null; 
}
export type TShippingFiledAddProduct = {
  id: string;
  name: string;
  count: string;
  price: string;
  userId: string;
  deviceId: string;
}