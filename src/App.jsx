import { useEffect, useState, useRef } from 'react'
import './App.css'

export default function App() {
  const [time, setTime] = useState(1500);
  const [on, setOn] = useState(false);
  const [flag, setFlag] = useState(false);

  const ref = useRef(null);

  const sound = () => {
    const audio = new Audio('/assets/sounds/finish.mp3');
    audio.play();
  }

  useEffect(() => {
    ref.current.focus();
  }, []);



  useEffect(() => {
    if (!on) return;

    const timer = setInterval(() => {
      setTime(old => {

        if (old <= 0) {
          sound();
          clearInterval(timer);

          if (flag) {
            setTime(1500);
            setFlag(false);
            setOn(true);
          } else {
            setTime(300)
            setFlag(true)
            setOn(true);
          }
          setOn(false);
          return 0;
        }
        return old - 1;
      })
    }, 1000);

    return () => clearInterval(timer);
  }, [on]);


  const clickStart = () => {
    setOn(true);
  }

  const clickPause = () => {
    setOn(false);
  }

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  }


  return (
    <>
      <div className="font-mono text-white flex flex-col justify-center items-center sm:w-full w-[100%] h-screen">

        <div className="border sm:px-10 sm:py-19 px-7 py-2 rounded-full sm:border-4 border-4">

          <div className="flex flex-col sm:flex-row sm:gap-4 gap-4 items-center justify-center sm:mt-16 sm:mb-8 mt-5 mb-2">
            <button
              ref={ref}
              onClick={() => { setTime(1500) }}
              className="text-m sm:text-xl focus:outline-none focus:ring-0 select-none border rounded-full sm:py-4 sm:px-4 py-1 px-2 hover:bg-neutral-700 focus:bg-neutral-600 border-2">pomodoro</button>

            <div className="flex flex-row gap-4 sm:mr-0 mr-3 sm:gap-4">
              <button
                onClick={() => { setTime(300) }}
                className="text-m sm:text-xl select-none border rounded-full sm:py-4 sm:px-4 py-1 px-2 hover:bg-neutral-700 focus:bg-neutral-600 border-2">short break</button>
              <button
                onClick={() => { setTime(900) }}
                className="text-m sm:text-xl select-none border rounded-full sm:py-4 sm:px-4 py-1 px-2 hover:bg-neutral-700 focus:bg-neutral-600 border-2">long break</button>
            </div>

          </div>

          <div className="flex flex-col justify-center w-full items-center text-center sm:mt-10 mt-4">
            <label className="sm:text-9xl text-8xl">{formatTime(time)}</label>
            <button>
              <img src={on ? "/assets/icons/pause.svg" : "/assets/icons/play.svg"} alt="test" className="w-25 h-25 focus:outline-none focus:ring-0 select-none mt-2 sm:mt-6"
                onClick={on ? clickPause : clickStart}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
