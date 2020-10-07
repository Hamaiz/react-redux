import { action } from "../../common"

export interface errorState {
  error: string | null
}

function errorR(state: errorState, action: action) {
  switch (action.type) {
    case "GET_ERROR":
      return {
        ...state,
        error: action.data,
      }
    default:
      return { ...state }
  }
}

export default errorR
