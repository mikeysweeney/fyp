import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./calendar2030.css";
import { v4 as uuidv4 } from 'uuid';


function PopupEnter({ handleClose }) {
  return (
    <div className="popupenter">
      <div className="popup-inner">
        <h2>Welcome to Transport Planner Part 2 (2030)</h2>
        <p>
          This is a simulation where you can plan your transportation choices
          in 2030 comparing to our national 2030 goals!
        </p>
        <p>Make a change in your decisions so that you stay below our goals</p>
        <p>Good Luck!</p>
        <button onClick={handleClose}>OK</button>
      </div>
    </div>
  );
}

function Popup({ handleSubmit, handleClose }) {
  const [km, setKm] = useState("");
  const [freq, setFreq] = useState("");
  const [title, setTitle] = useState("");

  const handleKmChange = (event) => {
    setKm(event.target.value);
  };

  const handleFreqChange = (event) => {
    setFreq(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(km, freq, title);
    handleClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Modify your transportation values here</h2>
        <form onSubmit={handleFormSubmit}>
          <label>
            Title:
            <input type="text" value={title} onChange={handleTitleChange} required />
          </label>
          <br />
          <label>
            Distance (in km):
            <input type="number" value={km} onChange={handleKmChange} required />
          </label>
          <br />
          <label>
            Frequency:
            <input type="number" value={freq} onChange={handleFreqChange} required />
          </label>
          <br />
          <button type="submit">OK</button>
        </form>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </div>
  );
}


function Picture({ id, url, pictureList, setPictures, board, setBoard, count, setCount }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [hoveredValue, setHoveredValue] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleMouseOver = (event) => {
    setHoveredValue(event.target.id);
  };

  const handleMouseOut = () => {
    setHoveredValue(null);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handlePopupSubmit = (km, freq, title) => {
    const updatedPictures = pictureList.map((picture) => {
      if (picture.id === id) {
        return {
          ...picture,
          title: title,
          datavaluekm: km,
          datavaluefreq: freq,
        };
      } else {
        return picture;
      }
    });
    setPictures(updatedPictures);
    setShowPopup(false);
  };

  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevents the default context menu from showing up
    setShowPopup(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <img
        ref={drag}
        src={url}
        id={id}
        width="150px"
        height="150px"
        style={{ border: isDragging ? "5px solid black" : "0px" }}
        alt=""
        onContextMenu={handleContextMenu}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      {showPopup && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Popup
            handleSubmit={handlePopupSubmit}
            handleClose={handlePopupClose}
          />
        </div>
      )}
      {hoveredValue !== null && (
        <div
          style={{
            position: "absolute",
            top: "-30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "5px",
            boxShadow: "0 0 5px gray",
          }}
        >
          {pictureList.find((picture) => picture.id === hoveredValue)?.title}
        </div>
      )}
    </div>
  );
}

function Calendar2030() {
  const [showPopupEnter, setShowPopupEnter] = useState(true);
  const [pictureList, setPictures] = useState([
    {
      id: "Flight",
      url:
        "https://www.clker.com/cliparts/7/6/M/R/3/h/blue-airplane-pass-hi.png",
      datavaluekm: "0",
      datavaluefreq: "0",
      title: "Flight"
    },
    {
      id: "Electric Car",
      url:
        "https://images.vexels.com/media/users/3/127596/isolated/preview/cc6b12c9c4b3bb5fac4e4a64255337ef-carro-el--trico-charging-svg-by-vexels.png",
      datavaluekm: "0",
      datavaluefreq: "0",
      title: "Electric Car"
    },

  ]);

  const [board1, setBoard1] = useState([]);
  const [board2, setBoard2] = useState([]);
  const [count, setCount] = useState(0);
  const [maxValue, setMaxValue] = useState(1250); // added state for max value of progress bar


  const [{ isOver: isOver1 }, drop1] = useDrop({
    accept: "image",
    drop: (item) => addImageToBoard1(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isOver2 }, drop2] = useDrop({
    accept: "image",
    drop: (item) => addImageToBoard2(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const calculateC02Total = (id, datavaluekm, datavaluefreq) => {
    let C02total = 0;
    if (id === "Flight") {
      C02total = datavaluekm * datavaluefreq;
    }
    if (id === "Electric Car") {
      C02total = datavaluekm + datavaluefreq;
    }
    return C02total;
  };


  const addImageToBoard1 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    const C02total = calculateC02Total(id, datavaluekm, datavaluefreq);
    const livecount = count + C02total;
    if (livecount <= maxValue) {
      const newPicture = { ...picture, id: uuidv4(), canDelete: true }; // generate a unique ID for the picture and add canDelete property
      setBoard1((board) => [...board, newPicture]);
      setCount((prevCount) => prevCount + C02total);
    } else {
      alert("If you place this you will exceed your maximum C02 limit for this year");
    }
  };


  const addImageToBoard2 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    const C02total = calculateC02Total(id, datavaluekm, datavaluefreq);
    const livecount = count + C02total;
    if (livecount <= maxValue) {
      setBoard2((board) => [...board, picture]);
      setCount((prevCount) => prevCount + C02total);
    }
    else {
      alert("If you place this you will exceed your maximum C02 limit for this year")
    }

  };


  function CalendarBlock(props) {
    return (
      <div
        id="CalendarBlock"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "10px",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        {props.children}
      </div>
    );
  }

  function Month(props) {
    return (
      <div id={props.id} style={{ display: "flex", flexDirection: "column" }}>
        <div className="title" style={{ flexGrow: 0, minHeight: "25px", textAlign: "center", fontWeight: "bold", fontSize: "15px" }}>
          {props.title}
        </div>
        {props.children}
      </div>
    );
  }

  return (
    <div style={{ color: "#3366ff", fontFamily: "arial" }} align="center">
      {showPopupEnter && (
        <div className="popup-overlay">
          <PopupEnter handleClose={() => setShowPopupEnter(false)} />
        </div>
      )}
      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
        Select your goal
        <br />
        <label htmlFor="maxValue"></label>
        <select id="maxValue" onChange={(e) => setMaxValue(parseInt(e.target.value))} style={{ backgroundColor: '#3366ff', borderRadius: '10px', fontSize: '18px' }}>
          <option value="1250">2030 Goals</option>
          <option value="750">2050 Goals</option>
          <option value="450">Net Zero</option>
        </select>
        <br />
        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Total CO2 emissions : </span>
        <span id="totalCount" style={{ fontSize: '16px', fontWeight: 'bold' }}>{count.toLocaleString()}</span>
        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>KG / {maxValue.toLocaleString()}KG </span>
        <br />
        <progress value={count} max={maxValue} className={count > { maxValue } ? "exceeded" : ""}></progress>
      </div>
      <div className="container">
        <CalendarBlock>
          <Month id="jan" title="January">
            <div className="Board BoardColumn" ref={drop1}>
              {board1.map((picture) => {
                return <Picture
                  key={picture.id}
                  id={picture.id}
                  url={picture.url}
                  datavaluekm={picture.datavaluekm}
                  datavaluefreq={picture.datavaluefreq}
                  pictureList={pictureList}
                  setPictures={setPictures}
                />
                  ;
              })}
            </div>
          </Month>
          <Month id="feb" title="February">
            <div className="Board BoardColumn" ref={drop2}>
              {board2.map((picture) => {
                return <Picture
                  key={picture.id}
                  id={picture.id}
                  url={picture.url}
                  datavaluekm={picture.datavaluekm}
                  datavaluefreq={picture.datavaluefreq}
                  pictureList={pictureList}
                  setPictures={setPictures}
                />
                  ;
              })}
            </div>
          </Month>
        </CalendarBlock>
        <div className="Pictures">Transport options
          {pictureList.map((picture) => {
            return <Picture
              key={picture.id}
              id={picture.id}
              url={picture.url}
              datavaluekm={picture.datavaluekm}
              datavaluefreq={picture.datavaluefreq}
              pictureList={pictureList}
              setPictures={setPictures}
            />;
          })}
        </div>
      </div>
    </div >
  );
}

export default Calendar2030;