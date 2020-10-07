import { questions, getQuestion } from "./getReducer"

// action
interface action {
  type: string
  data: questions[] | string
}

// export
const initialState: getQuestion = {
  isDone: false,
  questions: [],
  error: null,
}

function postSearchR(state: getQuestion = initialState, action: action) {
  switch (action.type) {
    case "GET_S_QUESTION":
      return {
        ...state,
        isDone: true,
        questions: action.data,
        error: null,
      }
    case "GET_S_QUESTION_ERROR":
      return {
        ...state,
        isDone: false,
        questions: [],
        error: action.data,
      }
    default:
      return {
        ...state,
      }
  }
}

export default postSearchR
