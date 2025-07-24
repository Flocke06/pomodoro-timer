import { useEffect, useState, useRef } from 'react'
import './App.css'

export default function App() {
  const [time, setTime] = useState(1500);
  const [on, setOn] = useState(false);

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
          setTime(300);
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
      <div className="text-white flex flex-col justify-center items-center w-full h-screen">

        <div className="border sm:px-12 sm:py-14 px-9 py-6 rounded-full border-5">
          <div className="flex flex-row mt-15 mb-8">
            <button ref={ref} onClick={() => { setTime(1500) }} className="focus:outline-none focus:ring-0 select-none border rounded-full py-1 px-3 hover:bg-neutral-700 focus:bg-neutral-600 border-2">pomodoro</button>
            <button onClick={() => { setTime(300) }} className="select-none border rounded-full py-1 px-3 hover:bg-neutral-700 focus:bg-neutral-600 mx-4 border-2">short break</button>
            <button onClick={() => { setTime(900) }} className="select-none border rounded-full py-1 px-3 hover:bg-neutral-700 focus:bg-neutral-600 border-2">long breack</button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <label className="text-9xl">{formatTime(time)}</label>
            <button>
              <img src={on ? "/assets/icons/pause.svg" : "/assets/icons/play.svg"} alt="test" className="w-20 h-20 focus:outline-none focus:ring-0 select-none"
                onClick={on ? clickPause : clickStart}
              />
            </button>
          </div>

        </div>



      </div>

    </>
  )
}
