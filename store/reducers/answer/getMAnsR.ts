import { action } from "../../common"

// answer
export interface answer {
  questionId: string
  answer: string
  createdAt: string
  username: string
  uniqueName: string
}

// state
export interface getAns {
  isDone: boolean
  answer: answer[] | []
  error: string | null
}

const initialState = {
  isDone: false,
  answer: [],
  error: null,
}

function getMAnsR(state: getAns = initialState, action: action) {
  switch (action.type) {
    case "GET_ANS":
      return {
        ...state,
        isDone: true,
        answer: action.data,
        error: null,
      }
    case "GET_ANS_ERROR":
      return {
        ...state,
        isDone: false,
        answer: "",
        error: action.data,
      }
    default:
      return { ...state }
  }
}

export default getMAnsR
