import { useState, useEffect, ReactElement } from "react"
import { connect } from "react-redux"

// redux
// import {errorDispatch} from "../store/actions/error/error"
import { errorState } from "../store/reducers/error/errorR"

interface error {
  errorR: errorState
  time?: number
  type?: boolean
}

function Error({ errorR, time = 5000, type = false }: error): ReactElement {
  const [show, setShow] = useState<boolean>(false)
  const [trans, setTrans] = useState<boolean>(false)

  //  console.log("error", errorR)

  useEffect(() => {
    if (!show) {
      setShow(true)
    }
  }, [errorR])
  if (show) {
    setTimeout(() => {
      setTrans(true)
    }, time - 1000)

    setTimeout(() => {
      setShow(false)
      setTrans(false)
    }, time)
  }

  if (show && errorR.error) {
    return (
      <>
        <div
          className={
            "error " + (!type ? " red " : " blue ") + (trans && " trans ")
          }>
          {errorR.error}
        </div>
      </>
    )
  } else {
    return <></>
  }
}

const mapStateToProps = ({ errorR }: { errorR: errorState }) => ({
  errorR,
})

export default connect(mapStateToProps)(Error)
