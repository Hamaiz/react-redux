import { useEffect, useState } from "react"
import Link from "next/link"
import { ReactElement } from "react"
import { connect } from "react-redux"

// components
import Layout from "../components/Layout"
import Question from "../components/home/question"
import Clock from "../components/home/clock"
import { checkQuestionMark } from "../components/helper/helper"

// redux getting items
import { errorDispatch } from "../store/actions/error/error"
import { get } from "../store/actions/question/get"
import { getQuestion } from "../store/reducers/question/getReducer"

// style
import style from "../styles/index.module.scss"

function Home({
  get,
  getReducer,
  errorDispatch,
}: {
  get: () => void
  getReducer: getQuestion
  errorDispatch: (error: string) => void
}): ReactElement {
  useEffect(() => {
    if (!getReducer.isDone) {
      get()
    }
    errorDispatch(getReducer.error)
  }, [getReducer.isDone])

  return (
    <>
      <Layout>
        <div className={style.home}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className={style.home_container}>
                  <div className={style.home_main}>
                    <div className={style.home_main_heading}>Questions</div>
                    {getReducer.isDone ? (
                      getReducer.questions.map((q, i) => (
                        <Question style={style} q={q} key={i} />
                      ))
                    ) : (
                      <div className="pre-loader text-info">
                        <div
                          className="spinner-grow"
                          style={{ width: "3rem", height: "3rem" }}
                          role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className={style.home_containers}>
                  <div className={style.home_side}>
                    <Clock style={style} />
                    <div className={style.home_side_trending}>
                      <div className={style.home_side_trending_h}>Trending</div>
                      <div className={style.home_side_trending_q}>
                        <Link href={"/q/[slug]"} as={`/q/how-to-make-money`}>
                          <a>{checkQuestionMark(`How to make money?`)}</a>
                        </Link>
                        <br />
                        <Link href="/q/">
                          <a>{checkQuestionMark(`How to make money hard?`)}</a>
                        </Link>{" "}
                        <br />
                        <Link href="/q/">
                          <a>{checkQuestionMark(`How to make money hard?`)}</a>
                        </Link>{" "}
                        <br />
                        <Link href="/q/">
                          <a>{checkQuestionMark(`How to make money hard?`)}</a>
                        </Link>{" "}
                        <br />
                        <Link href="/q/">
                          <a>{checkQuestionMark(`How to make money hard?`)}</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

const mapStateToProps = ({ getReducer }: { getReducer: getQuestion }) => ({
  getReducer,
})

const mapDispatchToProps = (dispatch) => ({
  get: () => dispatch(get()),
  errorDispatch: (error: string) => dispatch(errorDispatch({ error })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
