import React, { useState, useEffect, useRef } from "react";
import "./calendar.css";

function Popup({ handleClose }) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Welcome to Transport Planner Part 1 </h2>
        <p>This is a simulation where you can plan your transportation for the year ahead to get an accurate evaluation of your C02 emissions .</p>
        <p>Please be as accurate as possible by looking up distances online and being accurate on your monthly decisions</p>
        <button onClick={handleClose}>OK</button>
      </div>
    </div>
  );
}

function Calendar() {
  const [totalCount, setTotalCount] = useState(0);
  const totalCountRef = useRef(0);
  const [showPopup, setShowPopup] = useState(true);

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
    cloneElement.setAttribute("src", originalElement.getAttribute("src"));

    cloneElement.addEventListener("dblclick", () =>
      cloneElement.remove()
    ); // add dblclick event listener

    ev.target.appendChild(cloneElement);
    console.log(ev.target)

    var imgValueKm = originalElement.getAttribute("data-value-km");
    var imgValueFreq = originalElement.getAttribute("data-value-freq");
    if (originalElement.getAttribute("c02value") === "0") {
      setTotalCount(prevTotalCount => {
        totalCountRef.current = parseFloat(prevTotalCount) + parseFloat(imgValueKm) * parseFloat(imgValueFreq) * 0.101;
        console.log("Total CO2 emissions :" + totalCountRef.current);
        return totalCountRef.current;
      });
    } else if (originalElement.getAttribute("c02value") === "1") {
      setTotalCount(prevTotalCount => {
        totalCountRef.current = parseFloat(prevTotalCount) + parseFloat(imgValueKm) * parseFloat(imgValueFreq) * 0.3485;
        console.log("Total CO2 emissions :" + totalCountRef.current);
        return totalCountRef.current;
      });
    }

    var dropzone = ev.target;
    var dropzoneHeight = dropzone.clientHeight;
    var dropzoneScrollHeight = dropzone.scrollHeight;
    if (dropzoneScrollHeight > dropzoneHeight) {
      dropzone.classList.add("extended-dropzone");
    }

    // Make the cloned image draggable in the drop zone
    cloneElement.setAttribute("draggable", "true");
    cloneElement.addEventListener("dragstart", dragStart);
    cloneElement.addEventListener("drag", drag);
  }

  function hover(element) {
    element.classList.add('shake');
    element.style.opacity = "0.7";
  }

  function leave(element) {
    element.classList.remove('shake');
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
        <div className="dropzone" onDrop={drop} onDragOver={allowDrop} style={{ resize: 'both', overflow: 'auto' }}></div>
      </div>
    );
  }

  useEffect(() => {
    const totalCountElement = document.getElementById("totalCount");
    totalCountElement.innerText = totalCount;
    console.log("Total CO2 emissions use Effect :" + totalCount);
    console.log("Total CO2 emissions use Effect 2 :" + totalCountElement.innerText);
  }, [totalCount]);

  return (
    <div style={{ color: "#3366ff", fontFamily: "arial" }} align="center">
      {showPopup && (
        <div className="popup-overlay">
          <Popup handleClose={() => setShowPopup(false)} />
        </div>
      )}
      <div>
        Total CO2 emissions : <span id="totalCount">{totalCount}</span>KG / 2500KG (national average per person per year)
        <br />
        <progress value={totalCount} max="2500"></progress>
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
      <div id="Required" draggable="false" onDrop={drop} onDragOver={allowDrop} style={{ resize: 'both', overflow: 'auto' }}>
        <div className="title">Transport options</div>
        <img
          id="Flight"
          c02value="0"
          draggable="true"
          onMouseOver={(e) => hover(e.target)}
          onMouseLeave={(e) => leave(e.target)}
          onDragStart={dragStart}
          title="Flight1"
          src="https://www.clker.com/cliparts/7/6/M/R/3/h/blue-airplane-pass-hi.png"
          data-value-km="0"
          data-value-freq="0"
          alt=""
          onContextMenu={(e) => {
            e.preventDefault();
            const newName = window.prompt("Enter a name for this flight:");
            const valueKm = window.prompt("Enter a value (in km) for Flight:");
            const valueFreq = window.prompt("Enter a value (frequency) for Flight:");
            if (valueKm !== null && valueFreq !== null && !isNaN(parseInt(valueKm)) && !isNaN(parseInt(valueFreq))) {
              e.target.setAttribute("data-value-km", valueKm);
              e.target.setAttribute("data-value-freq", valueFreq);
              e.target.setAttribute("title", newName);
              e.target.setAttribute("id", newName);
            }
          }}
        />
        <img
          id="Electric Car"
          c02value="1"
          draggable="true"
          onMouseOver={(e) => hover(e.target)}
          onMouseLeave={(e) => leave(e.target)}
          onDragStart={dragStart}
          title="Electric Car"
          src="https://images.vexels.com/media/users/3/127596/isolated/preview/cc6b12c9c4b3bb5fac4e4a64255337ef-carro-el--trico-charging-svg-by-vexels.png"
          data-value-km="0"
          data-value-freq="0"
          alt=""
          onContextMenu={(e) => {
            e.preventDefault();
            const newName = window.prompt("Enter a name for this Electric Car:");
            const valueKm = window.prompt("Enter a value (in km) for Electric Car:");
            const valueFreq = window.prompt("Enter a value (frequency) for Electric Car:");
            if (valueKm !== null && valueFreq !== null && !isNaN(parseInt(valueKm)) && !isNaN(parseInt(valueFreq))) {
              e.target.setAttribute("data-value-km", valueKm);
              e.target.setAttribute("data-value-freq", valueFreq);
              e.target.setAttribute("title", newName);
              e.target.setAttribute("id", newName);
            }
          }}
        />
        <img
          id="Ferry"
          c02value="2"
          draggable="true"
          onMouseOver={(e) => hover(e.target)}
          onMouseLeave={(e) => leave(e.target)}
          onDragStart={dragStart}
          title="Ferry"
          src="http://clipart-library.com/image_gallery/603313.png"
          data-value-km="0"
          data-value-freq="0"
          alt=""
          onContextMenu={(e) => {
            e.preventDefault();
            const newName = window.prompt("Enter a name for this Ferry:");
            const valueKm = window.prompt("Enter a value (in km) for Ferry:");
            const valueFreq = window.prompt("Enter a value (frequency) for Ferry:");
            if (valueKm !== null && valueFreq !== null && !isNaN(parseInt(valueKm)) && !isNaN(parseInt(valueFreq))) {
              e.target.setAttribute("data-value-km", valueKm);
              e.target.setAttribute("data-value-freq", valueFreq);
              e.target.setAttribute("title", newName);
              e.target.setAttribute("id", newName);
            }
          }}

        />

        <img
          id="Train"
          c02value="3"
          draggable="true"
          onMouseOver={(e) => hover(e.target)}
          onMouseLeave={(e) => leave(e.target)}
          onDragStart={dragStart}
          title="Train"
          src="http://www.clker.com/cliparts/U/e/x/P/y/H/train-dark-blue-hi.png"
          alt=""
          onContextMenu={(e) => {
            e.preventDefault();
            const newName = window.prompt("Enter a name for this Train:");
            const valueKm = window.prompt("Enter a value (in km) for Train:");
            const valueFreq = window.prompt("Enter a value (frequency) for Train:");
            if (valueKm !== null && valueFreq !== null && !isNaN(parseInt(valueKm)) && !isNaN(parseInt(valueFreq))) {
              e.target.setAttribute("data-value-km", valueKm);
              e.target.setAttribute("data-value-freq", valueFreq);
              e.target.setAttribute("title", newName);
              e.target.setAttribute("id", newName);
            }
          }}
        />
        <img
          id="Bus"
          c02value="3"
          draggable="true"
          onMouseOver={(e) => hover(e.target)}
          onMouseLeave={(e) => leave(e.target)}
          onDragStart={dragStart}
          title="Bus"
          src="http://www.clker.com/cliparts/W/A/Y/u/H/u/blue-bus-hi.png"
          data-value-km="0"
          data-value-freq="0"
          alt=""
          onContextMenu={(e) => {
            e.preventDefault();
            const newName = window.prompt("Enter a name for this Bus:");
            const valueKm = window.prompt("Enter a value (in km) for Bus:");
            const valueFreq = window.prompt("Enter a value (frequency) for Bus:");
            if (valueKm !== null && valueFreq !== null && !isNaN(parseInt(valueKm)) && !isNaN(parseInt(valueFreq))) {
              e.target.setAttribute("data-value-km", valueKm);
              e.target.setAttribute("data-value-freq", valueFreq);
              e.target.setAttribute("title", newName);
              e.target.setAttribute("id", newName);
            }
          }}
        />
        <img
          id="Bicyle"
          c02value="4"
          draggable="true"
          onMouseOver={(e) => hover(e.target)}
          onMouseLeave={(e) => leave(e.target)}
          onDragStart={dragStart}
          title="Bicyle"
          src="http://www.clipartbest.com/cliparts/di8/Xpq/di8Xpq4LT.png"
          data-value-km="0"
          data-value-freq="0"
          alt=""
          onContextMenu={(e) => {
            e.preventDefault();
            const newName = window.prompt("Enter a name for this Bicyle:");
            const valueKm = window.prompt("Enter a value (in km) for Bicyle:");
            const valueFreq = window.prompt("Enter a value (frequency) for Bicyle:");
            if (valueKm !== null && valueFreq !== null && !isNaN(parseInt(valueKm)) && !isNaN(parseInt(valueFreq))) {
              e.target.setAttribute("data-value-km", valueKm);
              e.target.setAttribute("data-value-freq", valueFreq);
              e.target.setAttribute("title", newName);
              e.target.setAttribute("id", newName);
            }
          }}
        />
        <img
          id="Petrol Car"
          c02value="5"
          draggable="true"
          onMouseOver={(e) => hover(e.target)}
          onMouseLeave={(e) => leave(e.target)}
          onDragStart={dragStart}
          title="Petrol Car"
          src="http://www.clipartbest.com/cliparts/aTe/ogx/aTeogx7qc.png"
          data-value-km="0"
          data-value-freq="0"
          alt=""
          onContextMenu={(e) => {
            e.preventDefault();
            const newName = window.prompt("Enter a name for this Petrol Car:");
            const valueKm = window.prompt("Enter a value (in km) for Petrol Car:");
            const valueFreq = window.prompt("Enter a value (frequency) for Petrol Car:");
            if (valueKm !== null && valueFreq !== null && !isNaN(parseInt(valueKm)) && !isNaN(parseInt(valueFreq))) {
              e.target.setAttribute("data-value-km", valueKm);
              e.target.setAttribute("data-value-freq", valueFreq);
              e.target.setAttribute("title", newName);
              e.target.setAttribute("id", newName);
            }
          }}
        />
      </div>

    </div >
  );
}

export default Calendar;