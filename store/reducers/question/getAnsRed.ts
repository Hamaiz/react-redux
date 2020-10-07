import { action } from "../../common"

// state
export interface getOneAns {
  isDone: boolean
  answer: string
  error: string | null
}

const initialState = {
  isDone: false,
  answer: "",
  error: null,
}

function getAnsRed(state: getOneAns = initialState, action: action) {
  switch (action.type) {
    case "GET_ONE_ANS":
      return {
        ...state,
        isDone: true,
        answer: action.data,
        error: null,
      }
    case "GET_ONE_ANS_ERROR":
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

export default getAnsRed
