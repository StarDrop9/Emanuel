import React, { useState } from "react";
import "./Desktophome.css";
import christWalkingOnWater from "../images/ChristWalkingOnWater.jpg";

const Desktophome = ({ parables, currentParable }) => {
  const [flip, setFlip] = useState(true);
  const toggleFlip = () => setFlip((value) => !value);

  return (
    <div style={{ height: "100%" }}>
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
          style={{ backgroundImage: "url(/assets/LastSupper.png)" }}
        ></div>
        <div
          className="card"
          style={{ backgroundImage: "url(/assets/3Crossesbytf.png)" }}
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
          style={{ backgroundImage: "url(/assets/MaryOnThrone.png)" }}
        ></div>
        <div
          className="card card-wide"
          style={{ backgroundImage: `url(${christWalkingOnWater})`, backgroundPosition: "center 30%" }}
        ></div>
        <div
          className="card"
          style={{ backgroundImage: "url(/assets/BirthOfChrist.png)" }}
        ></div>
        <div
          className="card"
          style={{ backgroundImage: "url(/assets/hopeByndTheFrame33.png)" }}
        ></div>
        <div
          className="card"
          style={{ backgroundImage: "url(/assets/JesusReaching.webp)", backgroundPosition: "top" }}
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
              backgroundPosition: "top center",
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
