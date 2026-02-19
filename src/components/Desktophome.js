import React, { useState } from "react";
import "./Desktophome.css";

const Desktophome = ({ parables, currentParable }) => {
  const [flip, setFlip] = useState(true);
  const toggleFlip = () => setFlip((value) => !value);

  return (
    <div>
      <section className="desktop-animated-grid">
        <div
          className="card"
          style={{
            backgroundImage: "url(/assets/280px-sermon_on_the_mount.jpg)",
          }}
        ></div>
        <div
          className="card"
          //style={{backgroundImage:"url(/assets/crossbluesky3.jpg)"}} way too large
          style={{ backgroundImage: "url(/assets/3Crosses.png)" }}
        ></div>
        <div
          className="card"
          style={{ backgroundImage: "url(/assets/sermon_on_the_mount.jpg)" }}
          // style={{backgroundImage:"url('https://images.unsplash.com/photo-1583426573939-97d09302d76a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')"}}
        ></div>
        <div
          className="card"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1583531172005-814191b8b6c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')",
          }}
        ></div>
        <div
          className="card"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1583267575071-d13239e37986?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')",
          }}
        ></div>
        <div
          className="card"
          style={{ backgroundImage: "url(/assets/jesus2top.png)" }}
          //style={{backgroundImage:"url('https://images.unsplash.com/photo-1583445013765-46c20c4a6772?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')"}}
        ></div>
        <div
          className="card card-wide"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1583425423320-2386622cd2e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')",
          }}
        ></div>
        <div
          className="card"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1583483425010-c566431a7710?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')",
          }}
        ></div>
        <div
          className="card"
          style={{ backgroundImage: "url(/assets/hope.png)", backgroundSize: "cover", backgroundPosition: "center" }}
        ></div>
        <div
          className="card"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1583468323330-9032ad490fed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')",
          }}
        ></div>
        <div
          className="card"
          style={{ backgroundImage: "url(/assets/angelwcross2.jpg)" }}
          //style={{backgroundImage:"url('https://images.unsplash.com/photo-1583562835057-a62d1beffbf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')"}}
        ></div>

        <div onClick={() => toggleFlip()} className="card">
          <div className="theback">
            <h1 style={{ color: "black" }}>Back of Card</h1>
            <p>You set flip to {flip} </p>
          </div>

          <div
            className="thefront"
            style={{
              backgroundImage: "url(/assets/rollawaythestone.jpeg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Remove the text from here */}
          </div>
        </div>

        <div
          className="card"
          style={{ backgroundColor: "black" }}
          // style={{backgroundImage:"url('https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')"}}
        >
          <p className="fade-in-text">{currentParable}</p>
          <div className="desktop-div1"></div>
        </div>
      </section>
    </div>
  );
};

export default Desktophome;
