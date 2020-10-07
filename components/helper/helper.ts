export function checkQuestionMark(q: string): string {
  const check: RegExpMatchArray = q.match("\\?")
  if (check) {
    return q
  } else {
    return q + "?"
  }
}

export function convertDate(dateChanged: string): string {
  const d: Date = new Date(dateChanged)
  const date: string = `0${d.getDate()}`.slice(-2)
  const month: string = `0${d.getMonth()}`.slice(-2)
  const year: string = d.getFullYear().toString().substr(-2)
  const fullDate: string = `${date}/${month}/${year}`

  return fullDate
}

export function errorHandler(type: string, input: string): string {
  let message: string
  switch (input) {
    case "n":
      switch (type) {
        case "required":
          message = "name is required"
        case "minLength":
          message = "name must be 8 characters or above"
      }

    case "e":
      switch (type) {
        case "required":
          message = "email is required"
        case "pattern":
          message = "email is incorrect"
      }

    case "p":
      switch (type) {
        case "required":
          message = "password is required"
        case "minLength":
          message = "passowrd must be 8 characters or above"
      }
  }

  return message
}
