import { ReactElement, useEffect } from "react"
import Link from "next/link"
import { connect } from "react-redux"
import { useForm } from "react-hook-form"

// components
import Layout from "../../components/Layout"
import { errorHandler } from "../../components/helper/helper"

// styles
import style from "../../styles/signup.module.scss"

// redux
import { errorDispatch } from "../../store/actions/error/error"
import { login } from "../../store/actions/user/login"
import { loginReducer } from "../../store/reducers/user/loginR"

// interface
interface loginH {
  email: string
  password: string
}

interface loginProps {
  login: ({ email, password }: loginH) => void
  loginR: loginReducer
  errorDispatch: (error: string) => void
}

interface Inputs {
  email: string
  password: string
}

function LogIn({ login, loginR, errorDispatch }: loginProps): ReactElement {
  const { register, handleSubmit, errors } = useForm<Inputs>()

  // submit function
  const onSubmit = (data: Inputs) => {
    const { email, password } = data

    login({ email, password })
  }

  useEffect(() => {
    if (loginR.error) {
      errorDispatch(loginR.error)
    }
  }, [loginR.error])

  return (
    <>
      <Layout keyword="files, question, answer, login" title="| Login">
        <div className={style.signup}>
          <div className={style.container}>
            <div className={style.signup_heading}>Login</div>
            <div className={style.signup_container}>
              <form onSubmit={handleSubmit(onSubmit)}>
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
              <Link href="/account/singup">
                <a>Signup</a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

const mapStateToProps = ({ loginR }: { loginR: loginReducer }) => ({
  loginR,
})

const mapDispatchToProps = (dispatch) => ({
  login: ({ email, password }: loginH) => dispatch(login({ email, password })),
  errorDispatch: (error: string) => dispatch(errorDispatch({ error })),
})

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
