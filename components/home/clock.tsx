import { useEffect } from 'react'

function Clock({ style }: { style: any }) {
  useEffect(() => {
    // Get Element
    const hr: HTMLElement = document.getElementById('hr')
    const mn: HTMLElement = document.getElementById('mn')
    const sec: HTMLElement = document.getElementById('sec')

    if (hr || mn || sec) {
      setInterval(() => {
        // Date
        const day: Date = new Date()
        const hh: number = day.getHours() * 30
        const mm: number = day.getMinutes() * 6
        const ss: number = day.getSeconds() * 6

        hr.style.transform = `rotateZ(${hh + mm / 12}deg)`
        mn.style.transform = `rotateZ(${mm}deg)`
        sec.style.transform = `rotateZ(${ss}deg)`
      })
    }
  }, [])

  return (
    <div className={style.home_clock}>
      <div className={style.home_clock_hour}>
        <div className={style.hr} id='hr'></div>
      </div>
      <div className={style.home_clock_min}>
        <div className={style.mn} id='mn'></div>
      </div>
      <div className={style.home_clock_sec}>
        <div className={style.sec} id='sec'></div>
      </div>
    </div>
  )
}

export default Clock
