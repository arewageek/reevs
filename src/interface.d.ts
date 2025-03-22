// authentication interface
export interface IRegisterWithCredentialsProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// server actions/api interface
export interface IResponse {
  status: "success" | "failed" | "error";
  message?: string;
  data?: string;
}
