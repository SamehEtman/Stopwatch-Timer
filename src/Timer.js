import React, { useState, useEffect } from "react";

export default function Stopwatch(probs) {
  let [minCount, setMinCount] = useState(probs.min);
  let [secCount, setSecCount] = useState(probs.sec);
  let [MsecCount, setMSecCount] = useState(probs.ms);
  let [flag, setflag] = useState(0);
  let [minOut, setMinOut] = useState(minCount < 9 ? "0" : "");
  let [SecOut, setSecOut] = useState(secCount < 9 ? "0" : "");
  let [mSecOut, setMSecOut] = useState(MsecCount < 9 ? "0" : "");
  let [msg, setmsg] = useState("");
  let [color, setColor] = useState("green");
  let [cls1, setCls1] = useState("fa fa-play");
  const startStopWatch = e => {
    if (flag === 1) {
      setflag(0);
      setColor("green");
      setCls1("fa fa-play");
    } else if (flag === 2) {
      setMSecCount(probs.ms);
      setMinCount(probs.min);
      setSecCount(probs.sec);
      setflag(1);
      setmsg("");
      setColor("red");
      setCls1("fa fa-pause");
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
    setmsg("");
    setMSecOut(probs.ms <= 9 ? "0" : "");
    setMinOut(probs.min <= 9 ? "0" : "");
    setSecOut(probs.sec <= 9 ? "0" : "");
    setMinCount(probs.min);
    setSecCount(probs.sec);
    setMSecCount(probs.ms);
  };

  useEffect(_ => {
    if (flag === 1) {
      const intervalTokenSec = setInterval(_ => {
        if (minCount === 0 && secCount === 0 && MsecCount === 1) {
          setflag(2);
          setmsg("Time is UP !!:D");
          setColor("green");
          setCls1("fa fa-play");
        }
        if (MsecCount > 0) {
          setMSecCount(MsecCount - 1);
        } else if (MsecCount === 0) {
          setMSecCount(99);
          setSecCount(secCount - 1);
        }
        if (secCount === 0 && MsecCount === 0) {
          setMinCount(minCount - 1);
          setSecCount(59);
        }
        if (secCount <= 10) {
          if (secCount <= 10 && MsecCount === 0) setSecOut("0");
          if (secCount === 0 && MsecCount === 0) setSecOut("");
        } else {
          setSecOut("");
        }
        if (MsecCount <= 10) {
          if (MsecCount === 0) setMSecOut("");
          else setMSecOut("0");
        } else {
          setMSecOut("");
        }
        if (minCount <= 10) {
          if (secCount <= 10 && MsecCount === 0 && secCount === 0)
            setMinOut("0");
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
      <p> Timer !</p>
      <div class="StopWatch slashed">
        {minOut}
        {minCount}:{SecOut}
        {secCount}:{mSecOut}
        {MsecCount}
      </div>

      <div class="msg">{msg}</div>
      <button style={{ backgroundColor: color }} onClick={startStopWatch}>
        <i class={cls1} />
      </button>
      <button class="res" onClick={resetStopWatch}>
        <i class="fas fa-redo" />
      </button>
    </>
  );
}
