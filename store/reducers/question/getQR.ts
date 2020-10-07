// answer
export interface oneQ {
  id: string
  question: string
  slug: string
  createdAt: string
  username: string
  uniqueName: string
}

// state
export interface getQs {
  isDone: boolean
  question: oneQ
  error: string | null
}

const question: oneQ = {
  id: "",
  question: "",
  slug: "",
  createdAt: "",
  username: "",
  uniqueName: "",
}

const initialState: getQs = {
  isDone: false,
  question,
  error: null,
}

export interface action {
  type: string
  data: oneQ
}

function getQR(state: getQs = initialState, action: action) {
  switch (action.type) {
    case "GET_Q":
      return {
        ...state,
        isDone: true,
        question: action.data,
        error: null,
      }
    case "GET_Q_ERROR":
      return {
        ...state,
        isDone: false,
        question,
        error: action.data,
      }
    default:
      return { ...state }
  }
}

export default getQR
