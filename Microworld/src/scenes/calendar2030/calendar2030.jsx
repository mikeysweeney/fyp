import React, { useState, useEffect, useCallback } from "react";
import "./calendar2030.css";

function Popup({ handleClose, handleMaxValueChange }) {
  const [selectedValue, setSelectedValue] = useState("1250");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    handleMaxValueChange(event.target.value);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Welcome to Transport Planner Part 2 (2030)</h2>
        <p>
          This is a simulation where you can plan your transportation choices
          in 2030 comparing to our national 2030 goals!
        </p>
        <p>Selected value: {selectedValue}</p>
        <p>Make a change in your decisions so that you stay below our goals</p>
        <p>Good Luck!</p>
        <label>
          Max Value:
          <select onChange={handleChange}>
            <option value="1250">2030 Goals</option>
            <option value="750">2050 Goals</option>
            <option value="450">Net Zero</option>
          </select>
        </label>
        <button onClick={handleClose}>OK</button>
      </div>
    </div>
  );
}



function Calendar2030() {
  let totalCounttest = 0;

  const [totalCount, setTotalCount] = useState(0);
  const [maxValue, setMaxValue] = useState(1250);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    localStorage.setItem("totalCount", JSON.stringify(totalCount));
  }, [totalCount]);


  useEffect(() => {
    const storedtotalCount = localStorage.getItem("totalCount");
    if (storedtotalCount) {
      setTotalCount(JSON.parse(storedtotalCount));
    }
  }, []);

  function allowDrop(ev) {
    ev.preventDefault();
    //console.log(ev.target + "allowDrop");
  }

  function dragStart(ev) {
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.setData("Text", ev.target.getAttribute("id"));
    ev.dataTransfer.setDragImage(ev.target, 0, 0);
    //console.log(ev.dataTransfer.effectAllowed + "dragStart" + ev.dataTransfer.setData("Text", ev.target.getAttribute("id")));
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var originalElement = document.getElementById(data);
    var cloneElement = originalElement.cloneNode(true);
    cloneElement.setAttribute("src", originalElement.getAttribute("src")); // set the src attribute for the cloned element

    cloneElement.addEventListener("dblclick", () =>
      cloneElement.remove()
    ); // add dblclick event listener

    // set the src attribute for the cloned element

    ev.target.appendChild(cloneElement); // append the clone to the dropzone

    var imgValueKm = originalElement.getAttribute("data-value-km");
    var imgValueFreq = originalElement.getAttribute("data-value-freq");
    if (originalElement.getAttribute("c02value") === "0") {
      totalCounttest = totalCounttest + imgValueKm * imgValueFreq * 0.101
      console.log("Total CO2 emissions :" + totalCounttest);

    } else if (originalElement.getAttribute("c02value") === "1") {
      totalCounttest = totalCounttest + imgValueKm * imgValueFreq * 0.3485
      console.log("Total CO2 emissions :" + totalCounttest);
    }


    // check if there is enough space in the dropzone to add another image
    var dropzone = ev.target;
    var dropzoneHeight = dropzone.clientHeight;
    var dropzoneScrollHeight = dropzone.scrollHeight;
    if (dropzoneScrollHeight > dropzoneHeight) {
      dropzone.classList.add("extended-dropzone"); // add CSS class to extend dropzone
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

  return (
    <div style={{ color: "#3366ff", fontFamily: "arial" }} align="center">
      {showPopup && (
        <div className="popup-overlay">
          <Popup handleClose={() => setShowPopup(false)} />
        </div>
      )}
      <div>
        Total CO2 emissions : <span id="totalCount">{totalCount}</span>KG CO2 / 1250KG (projected national average per person in 2030)
        <br />
        <progress value={totalCount} max={maxValue}></progress>
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
      </div>

    </div >
  );
}

export default Calendar2030;