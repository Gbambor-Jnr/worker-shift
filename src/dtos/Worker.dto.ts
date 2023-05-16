export interface WorkerInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  salt: string;
  role: string;
}

export interface WorkerLogin {
  email: string;
  password: string;
}
