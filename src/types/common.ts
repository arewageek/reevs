// authentication type
export type TRegisterWithCredentialsProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: "user" | "admin";
};

// server actions/api type
export type TResponse = {
  status: "success" | "failed" | "error";
  message?: string;
  data?: any;
};

// session types
export type TAuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
};
