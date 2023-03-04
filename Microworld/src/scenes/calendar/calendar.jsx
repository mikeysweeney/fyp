import React, { useState } from "react";
import "./calendar.css";

function Calendar() {
  const [imgValues, setImgValues] = useState({});
  const [totalCount, setTotalCount] = useState(0);

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
    var cloneElement = originalElement.cloneNode(true);
    cloneElement.removeAttribute("data-value"); // remove the data-value attribute from the clone
    var imgValue = originalElement.getAttribute("data-value"); // get the value from the original element
    if (imgValue) {
      var totalCount = document.getElementById("totalCount");
      totalCount.innerText = parseInt(totalCount.innerText) + parseInt(imgValue); // update the total count
    }
    ev.target.appendChild(cloneElement); // append the clone to the dropzone
  }

  function hover(element) {
    element.style.opacity = "0.7";
  }

  function leave(element) {
    element.style.opacity = "1.0";
  }

  function handleContextMenu(e, imgId) {
    e.preventDefault();
    const imgValue = prompt("Enter value for image:");
    if (imgValue) {
      setImgValues((prevImgValues) => ({
        ...prevImgValues,
        [imgId]: imgValue,
      }));
    }
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
      <div>Total Count: <span id="totalCount">{totalCount}</span></div>
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
          alt=""
          onContextMenu={(e) => {
            e.preventDefault();
            const value = window.prompt("Enter a value for Flight:");
            if (value !== null) {
              e.target.setAttribute("data-value", value);
            }
          }}
        />
        <img
          id="Electric Car"
          draggable="true"
          onMouseOver={(e) => hover(e.target)}
          onMouseLeave={(e) => leave(e.target)}
          onDragStart={dragStart}
          title="Electric Car"
          src="https://images.vexels.com/media/users/3/127596/isolated/preview/cc6b12c9c4b3bb5fac4e4a64255337ef-carro-el--trico-charging-svg-by-vexels.png"
          alt=""
          onContextMenu={(e) => {
            e.preventDefault();
            const value = window.prompt("Enter a value for Electric Car:");
            if (value !== null) {
              e.target.setAttribute("data-value", value);
            }
          }}
          onDrop={(ev) => {
            ev.preventDefault();
            const imgId = ev.dataTransfer.getData("Text");
            const imgValue = ev.target.getAttribute("data-value");
            const totalCountElement = document.getElementById("totalCount");
            let totalCount = parseInt(totalCountElement.textContent);
            totalCount += parseInt(imgValue);
            totalCountElement.textContent = totalCount;
            const originalElement = document.getElementById(imgId);
            const cloneElement = originalElement.cloneNode(true);
            cloneElement.removeAttribute("id");
            ev.target.appendChild(cloneElement);

          }}
        />
      </div>

    </div>
  );
}

export default Calendar;