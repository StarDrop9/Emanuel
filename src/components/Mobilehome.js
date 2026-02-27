import React, { useState, useEffect, useRef } from "react";
import "./Mobilehome.css";

const Mobilehome = (props) => {
  // console.log(parables)
  const [parable, setParable] = useState("I AM");
  let parables = props.parables;

  const timer = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    //Goal of this code Return a random parable every 3 seconds
    // Need to clearTimeout later in code
    for (let i = 0; i < parables.length; i++) {
      (function (i) {
        timer.current = setTimeout(function () {
          // console.log("value is ", i);
          setParable(parables[i]);
        }, 5000 * (i + 1));
      })(i);
    }
    return () => {
      clearTimeout(timer.current);
    };
  }, [parables]);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    if (!parable || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(parable);
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }, [parable]);
  return (
    <section className="mobile-animated-grid">
      <div
        className="mcard"
        style={{ backgroundImage: "url(/assets/sermon_on_the_mount.jpg)" }}
      ></div>
      <div
        className="mcard"
        //  style={{backgroundColor:'black',alignItems:'center'}}
        //  style={{backgroundImage:"url('https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')"}}
      >
        <div className="mobile-fade-in-text">{parable}</div>
        <div className="mobile-div1"> </div>
      </div>

      <div
        className="mcard"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1583267575071-d13239e37986?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')",
        }}
      ></div>
      <div
        className="mcard"
        //style={{backgroundImage:"url(/assets/crossbluesky3.jpg)"}}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1583426573939-97d09302d76a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')",
        }}
      ></div>
      {/* <div
        className="mcard"
        style={{backgroundImage:"url('https://images.unsplash.com/photo-1583531172005-814191b8b6c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')"}}
        ></div> */}
      {/* <div
        className="mcard"
        style={{backgroundImage:"url(/assets/angelwcross2.jpg)"}}
        ></div>
        <div
        className="mcard"
        style={{backgroundImage:"url(/assets/cross1.jpg)"}}
        ></div> */}
      {/*}
        <div
        className="mcard mcard-wide"
        style={{backgroundImage:"url('https://images.unsplash.com/photo-1583425423320-2386622cd2e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')"}}
        ></div>
        <div
        className="mcard"
        style={{backgroundImage:"url('https://images.unsplash.com/photo-1583483425010-c566431a7710?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')"}}
        ></div>
        <div
        className="mcard"
        style={{backgroundImage:"url('https://images.unsplash.com/photo-1583500557349-fb5238f8d946?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')"}}
        ></div>
        <div
        className="mcard"
        style={{backgroundImage:"url('https://images.unsplash.com/photo-1583468323330-9032ad490fed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')"}}
        ></div>
        <div
        className="mcard"
        style={{backgroundImage:"url('https://images.unsplash.com/photo-1583562835057-a62d1beffbf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')"}}
        ></div>
        <div
        className="mcard"
        style={{backgroundImage:"url('https://images.unsplash.com/photo-1583518257225-f9a8081f6a84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')"}}
        ></div> */}
    </section>
  );
};

export default Mobilehome;
