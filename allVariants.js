const timerShow = document.getElementById('timer')
const timerInput = document.getElementById('time')
const buttonRun = document.getElementById('start')
const buttonFinish = document.getElementById('finish')
const buttReset = document.getElementById('reset')

// const timerShow2 = document.getElementById('timer2')
// const timerInput2 = document.getElementById('time2')
// const buttonRun2 = document.getElementById('start2')
// const buttonFinish2 = document.getElementById('finish2')
// const buttReset2 = document.getElementById('reset2')

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
      let arr = this.timerEnter.value.trim().split(' ')
      let lastMinutes = 0
      let lastSec = 0
      let lastMls = 0
      console.log(arr)

      for (let i = 0; i < arr.length; i++) {

        if (!isNaN(+arr[i][arr[i].length - 2])) {
          if (arr[i][arr[i].length - 1] === 'm') {
            lastMinutes = parseInt(arr[i])
          } else {
            lastSec = parseInt(arr[i])
          }
        } else {
          lastMls = parseInt(arr[i])
        }
      }

      return (lastMinutes * 60 + lastSec) * 1000 + lastMls
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

// const timer2 = new Timer({
// 	timerWindow: timerShow2,
// 	timerEnter: timerInput2,
// 	buttonStart: buttonRun2,
// 	buttonStop: buttonFinish2,
// 	buttonReset: buttReset2
// }).start()
