interface ResponseModel {
  statusCode: number;
  showMessage: boolean;
  message: string;
  data?: any;
  error?: any;
}
export default ResponseModel;
