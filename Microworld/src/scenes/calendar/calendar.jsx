import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./calendar.css";


function Popup({ handleSubmit, handleClose }) {
  const [km, setKm] = useState("");
  const [freq, setFreq] = useState("");

  const handleKmChange = (event) => {
    setKm(event.target.value);
  };

  const handleFreqChange = (event) => {
    setFreq(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(km, freq);
    handleClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Welcome to Transport Planner Part 1</h2>
        <p>This is a simulation where you can plan your transportation for the year ahead to get an accurate evaluation of your C02 emissions.</p>
        <p>Please be as accurate as possible by looking up distances online and being accurate on your monthly decisions.</p>
        <form onSubmit={handleFormSubmit}>
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


const pictureList = [
  {
    id: 1,
    url:
      "https://www.clker.com/cliparts/7/6/M/R/3/h/blue-airplane-pass-hi.png",
    datavaluekm: "0",
    datavaluefreq: "0",
  },
  {
    id: 2,
    url:
      "http://www.clker.com/cliparts/U/e/x/P/y/H/train-dark-blue-hi.png",
    datavaluekm: "0",
    datavaluefreq: "0"
  },
  {
    id: 3,
    url:
      "http://www.clker.com/cliparts/W/A/Y/u/H/u/blue-bus-hi.png",
    datavaluekm: "0",
    datavaluefreq: "0"
  },
];

function Picture({ id, url, datavaluekm, datavaluefreq, pictureList, setPictures }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id, datavaluekm: datavaluekm, datavaluefreq: datavaluefreq },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [hoveredValue, setHoveredValue] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleMouseOver = (event) => {
    setHoveredValue(event.target.dataset.valueKm);
  };

  const handleMouseOut = () => {
    setHoveredValue(null);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handlePopupSubmit = (km, freq) => {
    const updatedPictures = pictureList.map((picture) => {
      if (picture.id === id) {
        return {
          ...picture,
          datavaluekm: km,
          datavaluefreq: freq,
        };
      } else {
        return picture;
      }
    });
    setPictures(updatedPictures);
    console.log(updatedPictures);
    setShowPopup(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    setShowPopup(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <img
        ref={drag}
        src={url}
        data-value-km={datavaluekm}
        data-value-freq={datavaluefreq}
        width="150px"
        height="150px"
        style={{ border: isDragging ? "5px solid black" : "0px" }}
        alt=""
        onClick={handleClick}
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
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "5px",
            boxShadow: "0 0 5px gray",
          }}
        >
          {hoveredValue} KM
        </div>
      )}
    </div>
  );
}
function Calendar() {
  const [showPopup, setShowPopup] = useState(true);
  const [pictureList, setPictures] = useState([
    {
      id: 1,
      url:
        "https://www.clker.com/cliparts/7/6/M/R/3/h/blue-airplane-pass-hi.png",
      datavaluekm: "100",
      datavaluefreq: "0",
    },
    {
      id: 2,
      url: "http://www.clker.com/cliparts/U/e/x/P/y/H/train-dark-blue-hi.png",
      datavaluekm: "0",
      datavaluefreq: "0",
    },
    {
      id: 3,
      url: "http://www.clker.com/cliparts/W/A/Y/u/H/u/blue-bus-hi.png",
      datavaluekm: "0",
      datavaluefreq: "0",
    },
  ]);

  const [board1, setBoard1] = useState([]);
  const [board2, setBoard2] = useState([]);
  const [count, setCount] = useState(0);

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

  const addImageToBoard1 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    setBoard1((board) => [...board, picture]);
    setCount((prevCount) => prevCount + datavaluekm + datavaluefreq);
  };


  const addImageToBoard2 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    setBoard2((board) => [...board, picture]);
    setCount((prevCount) => prevCount + datavaluekm + datavaluefreq);
  };


  function SemesterBlock(props) {
    return (
      <div
        id="SemesterBlock"
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

  function Semester(props) {
    return (
      <div id={props.id} style={{ display: "flex", flexDirection: "column" }}>
        <div className="title" style={{ flexGrow: 1 }}>
          {props.title}
        </div>
        {props.children}
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
        Total CO2 emissions : <span id="totalCount">{count}</span>KG / 2500KG
        (national average per person per year)
        <br />
        <progress value={count} max="2500"></progress>
      </div>
      <div className="container">
        <SemesterBlock>
          <Semester id="jan" title="January">
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
          </Semester>
          <Semester id="feb" title="February">
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
          </Semester>
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
        <div className="Pictures">
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

export default Calendar;