interface InitialState {
  isDone: boolean
}
interface action {
  type: string
}

const initialState: InitialState = {
  isDone: false,
}

const userReducer = (state: InitialState = initialState, action: action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        isDone: true,
      }
    case 'GET_USER_ERROR':
      return {
        ...state,
        isDone: false,
      }
    default:
      return {
        ...state,
      }
  }
}

export default userReducer
