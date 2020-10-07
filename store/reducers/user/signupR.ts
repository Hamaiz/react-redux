import { action } from "../../common"

// state
export interface signupReducers {
  isDone: boolean
  res: string
  error: string | null
}

const initialState = {
  isDone: false,
  res: "",
  error: null,
}

function signupR(state: signupReducers = initialState, action: action) {
  switch (action.type) {
    case "POST_SIGNUP":
      return {
        ...state,
        isDone: true,
        res: action.data,
        error: null,
      }
    case "POST_SIGNUP_ERROR":
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

export default signupR
