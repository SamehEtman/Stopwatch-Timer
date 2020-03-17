import React from "react";
import Stopwatch from "./stopwatch";
import Timer from "./Timer";
import "./styles.css";

export default function App() {
  return (
    <>
      <Stopwatch />
      <Timer min={0} sec={5} ms={0} />
    </>
  );
}
