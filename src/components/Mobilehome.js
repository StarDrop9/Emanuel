import React from "react";
import "./Mobilehome.css";

const Mobilehome = ({ currentParable }) => {
  return (
    <section className="mobile-animated-grid">
      <div
        className="mcard"
        style={{ backgroundImage: "url(/assets/sermon_on_the_mount.jpg)" }}
      ></div>
      <div className="mcard">
        <div className="mobile-fade-in-text">{currentParable}</div>
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
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1583426573939-97d09302d76a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')",
        }}
      ></div>
    </section>
  );
};

export default Mobilehome;
