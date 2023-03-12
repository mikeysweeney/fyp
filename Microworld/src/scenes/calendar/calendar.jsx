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
    id: "Flight",
    url:
      "https://www.clker.com/cliparts/7/6/M/R/3/h/blue-airplane-pass-hi.png",
    datavaluekm: "0",
    datavaluefreq: "0",
  },
  {
    id: "Electric Car",
    url:
      "https://images.vexels.com/media/users/3/127596/isolated/preview/cc6b12c9c4b3bb5fac4e4a64255337ef-carro-el--trico-charging-svg-by-vexels.png",
    datavaluekm: "0",
    datavaluefreq: "0"
  },
  {
    id: "Ferry",
    url:
      "http://clipart-library.com/image_gallery/603313.png",
    datavaluekm: "0",
    datavaluefreq: "0"
  },
  {
    id: "Train",
    url:
      "http://www.clker.com/cliparts/U/e/x/P/y/H/train-dark-blue-hi.png",
    datavaluekm: "0",
    datavaluefreq: "0",
  },
  {
    id: "Bus",
    url:
      "http://www.clker.com/cliparts/W/A/Y/u/H/u/blue-bus-hi.png",
    datavaluekm: "0",
    datavaluefreq: "0"
  },
  {
    id: "Petrol Car",
    url:
      "http://www.clipartbest.com/cliparts/aTe/ogx/aTeogx7qc.png",
    datavaluekm: "0",
    datavaluefreq: "0"
  },
  {
    id: "Petrol Car",
    url:
      "http://www.clipartbest.com/cliparts/aTe/ogx/aTeogx7qc.png",
    datavaluekm: "0",
    datavaluefreq: "0",
  },
  {
    id: 8,
    url:
      "http://www.clker.com/cliparts/U/e/x/P/y/H/train-dark-blue-hi.png",
    datavaluekm: "0",
    datavaluefreq: "0"
  },
  {
    id: 9,
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
      id: "Flight",
      url:
        "https://www.clker.com/cliparts/7/6/M/R/3/h/blue-airplane-pass-hi.png",
      datavaluekm: "0",
      datavaluefreq: "0",
    },
    {
      id: "Electric Car",
      url:
        "https://images.vexels.com/media/users/3/127596/isolated/preview/cc6b12c9c4b3bb5fac4e4a64255337ef-carro-el--trico-charging-svg-by-vexels.png",
      datavaluekm: "0",
      datavaluefreq: "0"
    },
    {
      id: "Ferry",
      url:
        "http://clipart-library.com/image_gallery/603313.png",
      datavaluekm: "0",
      datavaluefreq: "0"
    },
    {
      id: "Train",
      url:
        "http://www.clker.com/cliparts/U/e/x/P/y/H/train-dark-blue-hi.png",
      datavaluekm: "0",
      datavaluefreq: "0",
    },
    {
      id: "Bus",
      url:
        "http://www.clker.com/cliparts/W/A/Y/u/H/u/blue-bus-hi.png",
      datavaluekm: "0",
      datavaluefreq: "0"
    },
    {
      id: "Petrol Car",
      url:
        "http://www.clipartbest.com/cliparts/aTe/ogx/aTeogx7qc.png",
      datavaluekm: "0",
      datavaluefreq: "0"
    },
    {
      id: "Petrol Car",
      url:
        "http://www.clipartbest.com/cliparts/aTe/ogx/aTeogx7qc.png",
      datavaluekm: "0",
      datavaluefreq: "0",
    },
    {
      id: 8,
      url:
        "http://www.clker.com/cliparts/U/e/x/P/y/H/train-dark-blue-hi.png",
      datavaluekm: "0",
      datavaluefreq: "0"
    },
    {
      id: 9,
      url:
        "http://www.clker.com/cliparts/W/A/Y/u/H/u/blue-bus-hi.png",
      datavaluekm: "0",
      datavaluefreq: "0"
    },
  ]);

  const [board1, setBoard1] = useState([]);
  const [board2, setBoard2] = useState([]);
  const [board3, setBoard3] = useState([]);
  const [board4, setBoard4] = useState([]);
  const [board5, setBoard5] = useState([]);
  const [board6, setBoard6] = useState([]);
  const [board7, setBoard7] = useState([]);
  const [board8, setBoard8] = useState([]);
  const [board9, setBoard9] = useState([]);
  const [board10, setBoard10] = useState([]);
  const [board11, setBoard11] = useState([]);
  const [board12, setBoard12] = useState([]);
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

  const [{ isOver: isOver3 }, drop3] = useDrop({
    accept: "image",
    drop: (item) => addImageToBoard3(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isOver4 }, drop4] = useDrop({
    accept: "image",
    drop: (item) => addImageToBoard4(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isOver5 }, drop5] = useDrop({
    accept: "image",
    drop: (item) => addImageToBoard5(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isOver6 }, drop6] = useDrop({
    accept: "image",
    drop: (item) => addImageToBoard6(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isOver7 }, drop7] = useDrop({
    accept: "image",
    drop: (item) => addImageToBoard7(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isOver8 }, drop8] = useDrop({
    accept: "image",
    drop: (item) => addImageToBoard8(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isOver9 }, drop9] = useDrop({
    accept: "image",
    drop: (item) => addImageToBoard9(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isOver10 }, drop10] = useDrop({
    accept: "image",
    drop: (item) => addImageToBoard10(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isOver11 }, drop11] = useDrop({
    accept: "image",
    drop: (item) => addImageToBoard11(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isOver12 }, drop12] = useDrop({
    accept: "image",
    drop: (item) => addImageToBoard12(item.id),
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

  const addImageToBoard3 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    setBoard3((board) => [...board, picture]);
    setCount((prevCount) => prevCount + datavaluekm + datavaluefreq);
  };


  const addImageToBoard4 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    setBoard4((board) => [...board, picture]);
    setCount((prevCount) => prevCount + datavaluekm + datavaluefreq);
  };

  const addImageToBoard5 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    setBoard5((board) => [...board, picture]);
    setCount((prevCount) => prevCount + datavaluekm + datavaluefreq);
  };


  const addImageToBoard6 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    setBoard6((board) => [...board, picture]);
    setCount((prevCount) => prevCount + datavaluekm + datavaluefreq);
  };

  const addImageToBoard7 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    setBoard7((board) => [...board, picture]);
    setCount((prevCount) => prevCount + datavaluekm + datavaluefreq);
  };


  const addImageToBoard8 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    setBoard8((board) => [...board, picture]);
    setCount((prevCount) => prevCount + datavaluekm + datavaluefreq);
  };

  const addImageToBoard9 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    setBoard9((board) => [...board, picture]);
    setCount((prevCount) => prevCount + datavaluekm + datavaluefreq);
  };


  const addImageToBoard10 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    setBoard10((board) => [...board, picture]);
    setCount((prevCount) => prevCount + datavaluekm + datavaluefreq);
  };

  const addImageToBoard11 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    setBoard11((board) => [...board, picture]);
    setCount((prevCount) => prevCount + datavaluekm + datavaluefreq);
  };


  const addImageToBoard12 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    setBoard12((board) => [...board, picture]);
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
          <Semester id="mar" title="March" >
            <div className="Board BoardColumn" ref={drop3}>
              {board3.map((picture) => {
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
          <Semester id="apr" title="April" >
            <div className="Board BoardColumn" ref={drop4}>
              {board4.map((picture) => {
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
          <Semester id="may" title="May" >
            <div className="Board BoardColumn" ref={drop5}>
              {board5.map((picture) => {
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
          <Semester id="jun" title="June" >
            <div className="Board BoardColumn" ref={drop6}>
              {board6.map((picture) => {
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
          <Semester id="jul" title="July" >
            <div className="Board BoardColumn" ref={drop7}>
              {board7.map((picture) => {
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
          <Semester id="aug" title="August" >
            <div className="Board BoardColumn" ref={drop8}>
              {board8.map((picture) => {
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
          <Semester id="sep" title="September" >
            <div className="Board BoardColumn" ref={drop9}>
              {board9.map((picture) => {
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
          <Semester id="oct" title="October" >
            <div className="Board BoardColumn" ref={drop10}>
              {board10.map((picture) => {
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
          <Semester id="nov" title="November" >
            <div className="Board BoardColumn" ref={drop11}>
              {board11.map((picture) => {
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
          <Semester id="dec" title="December" >
            <div className="Board BoardColumn" ref={drop12}>
              {board12.map((picture) => {
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