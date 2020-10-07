import Link from "next/link"
import { ReactElement } from "react"

// imports
import { checkQuestionMark, convertDate } from "../helper/helper"

// Redux
import { questions } from "../../store/reducers/question/getReducer"

interface questionProps {
  style: any
  q: questions
}

function Question({ style, q }: questionProps): ReactElement {
  const fullDate: string = convertDate(q.createdAt)

  return (
    <>
      <div className={style.home_q}>
        <span title="4k upvotes">
          {q.likes < 1000 ? q.likes : Math.floor(q.likes) + "k"}
        </span>
        <Link href="/q/[slug]" as={`/q/${q.slug}`}>
          <a className={style.home_q_sentence}>
            {checkQuestionMark(q.question)}
          </a>
        </Link>
        <div className={style.home_q_poster}>{fullDate}</div>
        <hr />
        <div className={style.home_q_ans}>{q.answer ? q.answer : ""}</div>
      </div>
    </>
  )
}

export default Question
