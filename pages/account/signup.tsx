import { ReactElement, useEffect } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { connect } from "react-redux"

// components
import Layout from "../../components/Layout"
import { errorHandler } from "../../components/helper/helper"

// styles
import style from "../../styles/signup.module.scss"

// redux
import { errorDispatch } from "../../store/actions/error/error"
import { signup } from "../../store/actions/user/signup"
import { signupReducers } from "../../store/reducers/user/signupR"

// interface
interface signupH {
  name: string
  email: string
  password: string
}

interface signupProps {
  signup: ({ email, password }: signupH) => void
  signupR: signupReducers
  errorDispatch: (error: string) => void
}

interface Inputs {
  name: string
  email: string
  password: string
}

function SignUp({ signup, signupR, errorDispatch }: signupProps): ReactElement {
  const { register, handleSubmit, errors } = useForm<Inputs>()

  // submit function
  const onSubmit = (data: Inputs) => {
    const { name, email, password } = data

    signup({ name, email, password })
  }

  useEffect(() => {
    if (signupR.error) {
      errorDispatch(signupR.error)
    }
  }, [signupR.error])

  return (
    <>
      <Layout keyword="files, question, answer, signup" title="| Signup">
        <div className={style.signup}>
          <div className={style.container}>
            <div className={style.signup_heading}>Signup</div>
            <div className={style.signup_container}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.signup_input}>
                  <label htmlFor="name">Username</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    ref={register({ required: true, minLength: 8 })}
                  />
                  <div className={style.signup_input_error} id="name-error">
                    {errors.email && errorHandler(errors.email.type, "n")}
                  </div>
                </div>
                <div className={style.signup_input}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    ref={register({ required: true, pattern: /\S+@\S+\.\S+/g })}
                  />
                  <div className={style.signup_input_error} id="email-error">
                    {errors.email && errorHandler(errors.email.type, "e")}
                  </div>
                </div>
                <div className={style.signup_input}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    ref={register({ required: true, minLength: 8 })}
                  />
                  <div className={style.signup_input_error} id="pass-error">
                    {errors.password && errorHandler(errors.password.type, "p")}
                  </div>
                </div>
                <div className={style.signup_button}>
                  <button className={style.signup_send}>Submit</button>
                </div>
              </form>
            </div>
            <div className={style.bottom}>
              Already logged in?
              <Link href="/account/login">
                <a>Login</a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
const mapStateToProps = ({ signupR }: { signupR: signupReducers }) => ({
  signupR,
})

const mapDispatchToProps = (dispatch) => ({
  signup: ({ name, email, password }: signupH) =>
    dispatch(signup({ name, email, password })),
  errorDispatch: (error: string) => dispatch(errorDispatch({ error })),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
