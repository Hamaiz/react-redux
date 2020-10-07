import { ReactElement, useEffect } from "react"
import { connect } from "react-redux"
import Link from "next/link"

// components
import Layout from "../components/Layout"
import Clock from "../components/home/clock"
import Question from "../components/home/question"

// inport helper
import { checkQuestionMark } from "../components/helper/helper"

// style
import style from "../styles/r.module.scss"
import style1 from "../styles/index.module.scss"

// redux
import { errorDispatch } from "../store/actions/error/error"
import { postSearch } from "../store/actions/question/postSearch"
import { getQuestion } from "../store/reducers/question/getReducer"

interface resultProps {
  search: string
  postSearch: (search: string) => void
  errorDispatch: (error: string) => void
  postSearchR: getQuestion
}

function result({
  search,
  postSearch,
  errorDispatch,
  postSearchR,
}: resultProps): ReactElement {
  useEffect(() => {
    if (postSearchR) {
      postSearch(search)
    }
    errorDispatch(postSearchR.error)
  }, [search])

  return (
    <>
      <Layout keyword={"files, question, answer, " + search}>
        <div className={style.r}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className={style.r_container}>
                  <div className={style.r_main}>
                    <div className={style.r_main_heading}>
                      Searched: <span>{search}</span>
                    </div>
                    <Q question={postSearchR} />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className={style.r_containers}>
                  <div className={style.r_side}>
                    <Clock style={style1} />
                    <div className={style.r_side_trending}>
                      <div className={style.r_side_trending_h}>Trending</div>
                      <div className={style.r_side_trending_q}>
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

function Q({ question }: { question: getQuestion }): ReactElement {
  return (
    <>
      {question.isDone ? (
        question.questions.length > 0 ? (
          question.questions.map((q, i) => (
            <Question style={style1} q={q} key={i} />
          ))
        ) : (
          <div className="d-flex justify-content-center m-5 w-100">
            no quesion found
          </div>
        )
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
    </>
  )
}

export async function getServerSideProps({ query, res }) {
  const { search_query }: { search_query: string } = query

  if (!search_query) {
    res.writeHead(301, {
      Location: "/",
    })
    res.end()
  } else {
    return {
      props: {
        search: search_query.replace(/'+'/g, " "),
      },
    }
  }
}

const mapStateToProps = ({ postSearchR }: { postSearchR: getQuestion }) => ({
  postSearchR,
})

const mapDispatchToProps = (dispatch) => ({
  postSearch: (search: string) => dispatch(postSearch({ search })),
  errorDispatch: (error: string) => dispatch(errorDispatch({ error })),
})

export default connect(mapStateToProps, mapDispatchToProps)(result)
