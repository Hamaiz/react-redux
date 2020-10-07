import Link from "next/link"
import { ReactElement, useEffect, useState } from "react"
import { connect } from "react-redux"

// import
import Layout from "../../components/Layout"
import { thumbupIcon, thumbdownIcon } from "../../components/svg"
import Error from "../../components/error"
import { convertDate } from "../../components/helper/helper"

// style
import style from "../../styles/q.module.scss"

// redux
import { answer, getAns } from "../../store/reducers/answer/getMAnsR"
import { getMAns } from "../../store/actions/answer/getMAns"
import { postLike } from "../../store/actions/question/postLike"
import { getLikeQuestion } from "../../store/reducers/question/postLikeRed"
import { getQ } from "../../store/actions/question/getQ"
import { getQs } from "../../store/reducers/question/getQR"

interface qProps {
  getMAnsR: getAns
  getMAns: (slug: string) => void
  slug: string
  postLike: (slug: string) => void
  postLikeRed: getLikeQuestion
  getQ: (slug: string) => void
  getQR: getQs
}

function q({
  getMAnsR,
  getMAns,
  slug,
  postLike,
  postLikeRed,
  getQ,
  getQR,
}: qProps): ReactElement {
  // get question
  useEffect(() => {
    getQ(slug)
  }, [slug])

  // get answers
  useEffect(() => {
    if (getQR.question.id) {
      getMAns(getQR.question.id)
    }
  }, [getQR.question.id, slug])

  // get likes
  useEffect(() => {
    if (getQR.question.id) {
      postLike(getQR.question.id)
    }
  }, [getQR.question.id, slug])

  return (
    <>
      {getMAnsR.error && <Error error={getMAnsR.error} />}
      {postLikeRed.error && <Error error={postLikeRed.error} />}
      <Layout
        title={
          "| " +
          (getQR.question.question ? getQR.question.question : " question")
        }>
        <div className={style.q}>
          {slug === getQR.question.slug ? (
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className={style.q_container}>
                    <div className={style.q_main}>
                      <div className={style.q_question}>
                        {getQR.question.question}
                      </div>
                      <div className={style.q_date}>
                        {convertDate(getQR.question.createdAt)}
                      </div>

                      {!getMAnsR.isDone ? (
                        <div className="pre-loader text-info">
                          <div
                            className="spinner-grow"
                            style={{ width: "3rem", height: "3rem" }}
                            role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      ) : getMAnsR.answer.length > 0 ? (
                        getMAnsR.answer.map((a: answer, i: number) => (
                          <div className={style.q_answer} key={i}>
                            <div className={style.q_answer_a}>{a.answer}</div>
                            <hr />
                            <div className={style.q_answer_ap}>
                              <Link href="/u/[user]" as={`/u/${a.uniqueName}`}>
                                <a>{a.username} </a>
                              </Link>
                              - {convertDate(a.createdAt)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className={style.q_answer}>Not answered yet</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className={style.q_container}>
                    <div className={style.q_side}>
                      <div className={style.q_poster}>
                        <Link
                          href={"/u/[user]"}
                          as={`/u/${
                            getQR.question.uniqueName
                              ? getQR.question.uniqueName
                              : ""
                          }`}>
                          <a>{getQR.question.username}</a>
                        </Link>
                      </div>
                      <div className={style.q_votes}>
                        {postLikeRed.like < 1000
                          ? postLikeRed.like
                          : Math.floor(postLikeRed.like) + "k"}
                      </div>
                      <div className={style.q_thumbs}>
                        <div className={style.q_thumbs_up}>{thumbupIcon}</div>
                        <div className={style.q_thumbs_up}>{thumbdownIcon}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      </Layout>
    </>
  )
}

export async function getServerSideProps({ query, res }) {
  const { slug }: { slug: string } = query

  if (!slug) {
    res.writeHead(301, {
      Location: "/",
    })
    res.end()
  } else {
    return {
      props: {
        slug,
      },
    }
  }
}

const mapStateToProps = ({
  getMAnsR,
  postLikeRed,
  getQR,
}: {
  getMAnsR: getAns
  postLikeRed: getLikeQuestion
  getQR: getQs
}) => ({
  getMAnsR,
  postLikeRed,
  getQR,
})

const mapDispatchToProps = (dispatch) => ({
  getMAns: (slug: string) => dispatch(getMAns({ slug })),
  postLike: (slug: string) => dispatch(postLike({ slug })),
  getQ: (slug: string) => dispatch(getQ({ slug })),
})

export default connect(mapStateToProps, mapDispatchToProps)(q)
