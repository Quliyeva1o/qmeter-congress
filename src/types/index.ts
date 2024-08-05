export interface UserTypes {
  name: string;
  phone: string;
  email: string;
}

export interface QuestionTypes {
  from: string;
  to: string;
  question: string;
  count: number;
  liked: boolean;
}

export interface FormOption {
  name: keyof UserTypes;
  placeholder: string;
  rules: any[];
}
