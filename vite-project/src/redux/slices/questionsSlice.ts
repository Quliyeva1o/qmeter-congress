import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
  from: string;
  to: string;
  question: string;
  count: number;
}

interface QuestionsState {
  questions: Question[];
}

const initialState: QuestionsState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    addQuestion(state, action: PayloadAction<Omit<Question, 'count'>>) {
      state.questions.push({ ...action.payload, count: 0 });
    },
  },
});

export const { addQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;
