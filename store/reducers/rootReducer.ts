import { combineReducers } from "redux"

// REDUCERS

// user
import userReducer from "./user/user"

// question
import getReducer from "./question/getReducer"
import getAnsRed from "./question/getAnsRed"
import postLikeRed from "./question/postLikeRed"
import getQR from "./question/getQR"
import postSearchR from "./question/postSearchR"

// answer
import getMAnsR from "./answer/getMAnsR"

// user
import loginR from "./user/loginR"
import signupR from "./user/signupR"

// error
import errorR from "./error/errorR"

const rootReducer = combineReducers({
  userReducer,

  // question
  getReducer,
  getAnsRed,
  postLikeRed,
  getQR,
  postSearchR,

  // answer
  getMAnsR,

  // account
  loginR,
  signupR,

  //  error
  errorR,
})

export default rootReducer
