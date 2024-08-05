export  interface Iuser {
  name: string;
  phone: string;
  email: string;
}


export interface Question {
    from: string;
    to: string;
    question: string;
    count: number;
    liked: boolean; }