const timerShow = document.getElementById('timer')
const timerInput = document.getElementById('time')
const buttonRun = document.getElementById('start')
const buttonFinish = document.getElementById('finish')
const buttReset = document.getElementById('reset')

const timerShow2 = document.getElementById('timer2')
const timerInput2 = document.getElementById('time2')
const buttonRun2 = document.getElementById('start2')
const buttonFinish2 = document.getElementById('finish2')
const buttReset2 = document.getElementById('reset2')

class Timer {
  constructor(elements) {
    this.timerWindow = elements.timerWindow
    this.timerEnter = elements.timerEnter
    this.buttonStart = elements.buttonStart
    this.buttonStop = elements.buttonStop
    this.buttonReset = elements.buttonReset
  }

  start() {
    let timer
    let minutes
    let seconds
    let mls
    let twoMls

    this.checkInp = () => {
      let fullNum = this.timerEnter.value
      fullNum = fullNum.replace(/\s/g, '')
      let lastMinutes = 0
      let lastSec = 0
      let lastMls = 0
      let str = fullNum.slice(fullNum.indexOf('ms'))
      let newStr = fullNum.slice(0, fullNum.indexOf('ms'))
      let arr = newStr.split('')

      arr.push(str)

      this.checkMinutes = () => {
        if (arr.includes('m')) {
          lastMinutes = arr.slice(0, arr.indexOf('m')).join('')
        }

        console.log(`lastMinutes`, lastMinutes)
        return +lastMinutes
      }

      this.checkSeconds = () => {
        let test
        if (arr.indexOf('s') === -1) {
          test = 0
        } else {
          test = arr.indexOf('s')
        }

        if (arr.includes('s') && !arr.includes('m')) {
          lastSec = arr.slice(0, test).join('')
        } else {
          lastSec = arr.slice(arr.indexOf('m') + 1, test).join('')
        }

        console.log(`lastSec`, lastSec)
        return +lastSec
      }

      this.checkMls = () => {
        if (
          arr.includes('ms') &&
          !arr.includes('s') &&
          !arr.includes('m')
        ) {
          lastMls = arr.slice(0, arr.indexOf('ms')).join('')
        } else if (
          arr.includes('ms') &&
          arr.includes('s') &&
          !arr.includes('m')
        ) {
          lastMls = arr
            .slice(arr.indexOf('s') + 1, arr.indexOf('ms'))
            .join('')
        } else if (
          arr.includes('ms') &&
          arr.includes('m') &&
          !arr.includes('s')
        ) {
          lastMls = arr
            .slice(arr.indexOf('m') + 1, arr.indexOf('ms'))
            .join('')
        }

        console.log(`lastMls`, lastMls)
        return +lastMls
      }

      console.log(arr)


      return (this.checkMinutes() * 60 + this.checkSeconds()) * 1000 +
        this.checkMls()
    }

    this.check = () => {
      if (!mls) {
        mls = this.checkInp()
        this.timerFunc(mls)
      } else {
        this.timerFunc(mls)
      }
    }

    this.innerValue = (minutes, secondsVal, ms) => {
      this.timerWindow.innerHTML = `Осталось: ${minutes} минут , секунд: ${secondsVal} , ms: ${ms} `
    }

    this.timerFunc = (mls) => {
      let ms
      let secondsVal
      timer = setInterval(() => {
        seconds = `${mls}`.slice(0, -3)
        minutes = Math.trunc(seconds / 60)
        ms = `${mls}`.slice(-3)
        secondsVal = seconds % 60

        if (ms <= 0 && secondsVal <= 0 && minutes <= 0) {
          alert('Таймер завершён !')
          clearInterval(timer)
        } else {
          this.innerValue(minutes, secondsVal, ms)
          twoMls = mls -= 250
        }
      }, 250)
      return twoMls
    }

    this.buttonStart.addEventListener('click', () => {
      if (!timer) {
        this.check()
      } else {
        clearInterval(timer)
        timer = 0
        mls = twoMls
      }
    })

    this.buttonStop.addEventListener('click', () => {
      if (timer) {
        clearInterval(timer)
        timer = 0
        mls = twoMls
      }
    })

    this.buttonReset.addEventListener('click', () => {
      clearInterval(timer)
      mls = 0
      this.innerValue(0, 0, 0)
    })
  }
}

const timer = new Timer({
  timerWindow: timerShow,
  timerEnter: timerInput,
  buttonStart: buttonRun,
  buttonStop: buttonFinish,
  buttonReset: buttReset
}).start()

const timer2 = new Timer({
  timerWindow: timerShow2,
  timerEnter: timerInput2,
  buttonStart: buttonRun2,
  buttonStop: buttonFinish2,
  buttonReset: buttReset2
}).start()
