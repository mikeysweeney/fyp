import React from "react";
import "./calendar.css";
function Calendar() {
  function allowDrop(ev) {
    ev.preventDefault();
  }

  function dragStart(ev) {
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
    ev.dataTransfer.setDragImage(ev.target, 0, 0);
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var originalElement = document.getElementById(data);
    var cloneElement = originalElement.cloneNode(true); // Create a new clone of the dragged element
    ev.target.appendChild(cloneElement);
  }

  function hover(element) {
    element.style.opacity = "0.7";
  }

  function leave(element) {
    element.style.opacity = "1.0";
  }

  function SemesterBlock(props) {
    return (
      <div id="SemesterBlock" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: "10px", marginTop: "30px", marginBottom: "30px" }}>
        {props.children}
      </div>
    );
  }

  function Semester(props) {
    return (
      <div id={props.id} style={{ display: "flex", flexDirection: "column" }}>
        <div className="title" style={{ flexGrow: 1 }}>{props.title}</div>
        <div className="dropzone" onDrop={drop} onDragOver={allowDrop}></div>
      </div>
    );
  }
  return (
    <div style={{ color: "#3366ff", fontFamily: "arial" }} align="center">
      <h3>Year Transport Planner</h3>
      <SemesterBlock>
        <Semester id="jan" title="January" />
        <Semester id="feb" title="February" />
        <Semester id="mar" title="March" />
        <Semester id="apr" title="April" />
        <Semester id="may" title="May" />
        <Semester id="jun" title="June" />
        <Semester id="jul" title="July" />
        <Semester id="aug" title="August" />
        <Semester id="sep" title="September" />
        <Semester id="oct" title="October" />
        <Semester id="nov" title="November" />
        <Semester id="dec" title="December" />
      </SemesterBlock>
      <div id="Required" draggable="false" onDrop={drop} onDragOver={allowDrop}>
        <div className="title">Transport options</div>
        <img
          id="Flight"
          draggable="true"
          onMouseOver={(e) => hover(e.target)}
          onMouseLeave={(e) => leave(e.target)}
          onDragStart={dragStart}
          title="Flight"
          src="https://www.clker.com/cliparts/7/6/M/R/3/h/blue-airplane-pass-hi.png"
        />
        <img
          id="Electric Car"
          draggable="true"
          onMouseOver={(e) => hover(e.target)}
          onMouseLeave={(e) => leave(e.target)}
          onDragStart={dragStart}
          title="Electric Car"
          src="https://images.vexels.com/media/users/3/127596/isolated/preview/cc6b12c9c4b3bb5fac4e4a64255337ef-carro-el--trico-charging-svg-by-vexels.png"
        />
        <img
          id="Ferry"
          draggable="true"
          onMouseOver={(e) => hover(e.target)}
          onMouseLeave={(e) => leave(e.target)}
          onDragStart={dragStart}
          title="Ferry"
          src="http://clipart-library.com/image_gallery/603313.png"
        />
        <img
          id="Train"
          draggable="true"
          onMouseOver={(e) => hover(e.target)}
          onMouseLeave={(e) => leave(e.target)}
          onDragStart={dragStart}
          title="Train"
          src="http://www.clker.com/cliparts/U/e/x/P/y/H/train-dark-blue-hi.png"
        />
        <img
          id="Bus"
          draggable="true"
          onMouseOver={(e) => hover(e.target)}
          onMouseLeave={(e) => leave(e.target)}
          onDragStart={dragStart}
          title="Bus"
          src="http://www.clker.com/cliparts/W/A/Y/u/H/u/blue-bus-hi.png"
        />
        <img
          id="Bicyle"
          draggable="true"
          onMouseOver={(e) => hover(e.target)}
          onMouseLeave={(e) => leave(e.target)}
          onDragStart={dragStart}
          title="Bicyle"
          src="http://www.clipartbest.com/cliparts/di8/Xpq/di8Xpq4LT.png"
        />
        <img
          id="Petrol Car"
          draggable="true"
          onMouseOver={(e) => hover(e.target)}
          onMouseLeave={(e) => leave(e.target)}
          onDragStart={dragStart}
          title="Petrol Car"
          src="http://www.clipartbest.com/cliparts/aTe/ogx/aTeogx7qc.png"
        />
      </div>

    </div>
  );
}

export default Calendar;