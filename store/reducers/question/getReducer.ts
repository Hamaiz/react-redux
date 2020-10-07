// question
export interface questions {
  id: string
  question: string
  poster: string
  slug: string
  createdAt: string
  answer: string
  likes: number
}

// state
export interface getQuestion {
  isDone: boolean
  questions: questions[]
  error: string | null
}

// action
interface action {
  type: string
  data: questions[] | string
}

// initial state
const initialState: getQuestion = {
  isDone: false,
  questions: [],
  error: null,
}

function getReducer(state: getQuestion = initialState, action: action) {
  switch (action.type) {
    case "GET_QUESTION":
      return {
        ...state,
        isDone: true,
        questions: action.data,
        error: null,
      }
    case "GET_QUESTION_ERROR":
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

export default getReducer
