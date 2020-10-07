import { action } from "../../common"

// state
export interface getAns {
  isDone: boolean
  data: string
  error: string | null
}

const initialState = {
  isDone: false,
  data: "",
  error: null,
}

function getMAnsR(state: getAns = initialState, action: action) {
  switch (action.type) {
    case "POST_LIKE":
      return {
        ...state,
        isDone: true,
        data: action.data,
        error: null,
      }
    case "POST_LIKE_ERROR":
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
