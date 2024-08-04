import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
  from: string;
  to: string;
  question: string;
  count: number;
  liked: boolean; }

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
    addQuestion(state, action: PayloadAction<Omit<Question, 'count' | 'liked'>>) {
      state.questions.push({ ...action.payload, count: 0, liked: false });
    },
    toggleLike(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (state.questions[index]) {
        const question = state.questions[index];
        if (question.liked) {
          state.questions[index].count -= 1;
        } else {
          state.questions[index].count += 1;
        }
        state.questions[index].liked = !question.liked;
      }
    },
  },
});

export const { addQuestion, toggleLike } = questionsSlice.actions;
export default questionsSlice.reducer;
