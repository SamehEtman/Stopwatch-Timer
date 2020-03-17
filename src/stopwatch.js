import React, { useState, useEffect } from "react";

export default function Stopwatch() {
  let [minCount, setMinCount] = useState(0);
  let [secCount, setSecCount] = useState(0);
  let [MsecCount, setMSecCount] = useState(0);
  let [flag, setflag] = useState(0);
  let [minOut, setMinOut] = useState("0");
  let [SecOut, setSecOut] = useState("0");
  let [mSecOut, setMSecOut] = useState("0");
  let [color, setColor] = useState("green");
  let [cls1, setCls1] = useState("fa fa-play");
  const startStopWatch = e => {
    if (flag === 1) {
      setflag(0);
      setColor("green");
      setCls1("fa fa-play");
    } else {
      setflag(1);
      setColor("red");
      setCls1("fa fa-pause");
    }
  };
  const resetStopWatch = e => {
    setflag(0);
    setColor("green");
    setCls1("fa fa-play");
    setMSecOut("0");
    setMinOut("0");
    setSecOut("0");
    setMinCount(0);
    setSecCount(0);
    setMSecCount(0);
  };

  useEffect(_ => {
    if (flag === 1) {
      const intervalTokenSec = setInterval(_ => {
        setMSecCount(MsecCount + 1);
        if (MsecCount === 99) {
          setSecCount(secCount + 1);
          setMSecCount(0);
        }
        if (secCount === 59 && MsecCount === 99) {
          setMinCount(minCount + 1);
          setSecCount(0);
        }
        if (MsecCount < 9 || MsecCount === 99) {
          setMSecOut("0");
        } else {
          setMSecOut("");
        }
        if (
          (secCount < 10 && MsecCount <= 99) ||
          (secCount === 59 && MsecCount === 99)
        ) {
          if (secCount === 9 && MsecCount === 99) setSecOut("");
          else setSecOut("0");
        } else {
          setSecOut("");
        }
        if (minCount < 10 && secCount <= 59 && MsecCount <= 99) {
          if (minCount === 9 && secCount === 59 && MsecCount === 99)
            setMinOut("");
          else setMinOut("0");
        } else {
          setMinOut("");
        }
      }, 10);

      return _ => {
        clearInterval(intervalTokenSec);
      };
    }
  });

  return (
    <>
      <p> Stop Watch !</p>
      <div class="StopWatch">
        {minOut}
        {minCount}:{SecOut}
        {secCount}:{mSecOut}
        {MsecCount}
      </div>
      <button style={{ backgroundColor: color }} onClick={startStopWatch}>
        <i class={cls1} />
      </button>
      <button class="res" onClick={resetStopWatch}>
        <i class="fas fa-redo" />
      </button>
    </>
  );
}
