import { action } from "../../common"

// state
export interface loginReducer {
  isDone: boolean
  res: string
  error: string | null
}

const initialState = {
  isDone: false,
  res: "",
  error: null,
}

function loginR(state: loginReducer = initialState, action: action) {
  switch (action.type) {
    case "POST_LOGIN":
      return {
        ...state,
        isDone: true,
        res: action.data,
        error: null,
      }
    case "POST_LOGIN_ERROR":
      return {
        ...state,
        isDone: false,
        res: "",
        error: action.data,
      }
    default:
      return { ...state }
  }
}

export default loginR
