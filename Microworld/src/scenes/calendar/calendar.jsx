import React, { useState } from "react";
import "./calendar.css";

function Calendar() {
  const [imgValues, setImgValues] = useState({});
  const [totalCount, setTotalCount] = useState(0);

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function dragStart(ev) {
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.setData("Text", ev.target.getAttribute("id"));
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
    cloneElement.addEventListener("dblclick", () => cloneElement.remove()); // add dblclick event listener
    cloneElement.removeAttribute("data-value"); // remove the data-value attribute from the clone
    var imgValueKm = originalElement.getAttribute("data-value-km") || cloneElement.getAttribute("data-value-km"); // get the km value from the original element or the clone
    var imgValueFreq = originalElement.getAttribute("data-value-freq") || cloneElement.getAttribute("data-value-freq"); // get the frequency value from the original element or the clone
    if (originalElement.id === "Flight") {
      var totalCount = document.getElementById("totalCount");
      totalCount.innerText = parseInt(totalCount.innerText) + parseInt(imgValueKm) * parseInt(imgValueFreq) * 10; // update the total count
      setTotalCount(parseInt(totalCount.innerText));
    } else if (originalElement.id === "Electric Car") {
      totalCount = document.getElementById("totalCount");
      totalCount.innerText = parseInt(totalCount.innerText) + parseInt(imgValueKm) * parseInt(imgValueFreq); // update the total count
      setTotalCount(parseInt(totalCount.innerText));
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
      <div>
        Total Count: <span id="totalCount">{totalCount}</span> out of 1000
        <br />
        <progress value={totalCount} max="1000"></progress>
      </div>
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
            const valueKm = window.prompt("Enter a value (in km) for Flight:");
            const valueFreq = window.prompt("Enter a value (frequency) for Flight:");
            if (valueKm !== null && valueFreq !== null && !isNaN(parseInt(valueKm)) && !isNaN(parseInt(valueFreq))) {
              e.target.setAttribute("data-value-km", valueKm);
              e.target.setAttribute("data-value-freq", valueFreq);
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
            const valueKm = window.prompt("Enter a value (in km) for Flight:");
            const valueFreq = window.prompt("Enter a value (frequency) for Flight:");
            if (valueKm !== null && valueFreq !== null && !isNaN(parseInt(valueKm)) && !isNaN(parseInt(valueFreq))) {
              e.target.setAttribute("data-value-km", valueKm);
              e.target.setAttribute("data-value-freq", valueFreq);
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