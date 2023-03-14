import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./calendar2030.css";
import { v4 as uuidv4 } from 'uuid';


function PopupEnter({ handleClose }) {
  return (
    <div className="popupenter">
      <div className="popup-inner">
        <h2>Welcome to Transport Planner Part 2 (2030 + 2050 Goals)</h2>
        <p>
          This is a simulation where you can plan your transportation choices
          comparing to our national 2030 and 2050 goals!
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
            Frequency per month (eg: A school trip is twice daily during weekdays so would be 40 trips per month):
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
            transform: "translate(-150%, -100%)",
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
            fontSize: "10px",
            width: "150px",
          }}
        >
          <strong>Type: </strong> {id} <br /> <strong>Name: </strong> {pictureList.find((picture) => picture.id === hoveredValue)?.title}
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
    {
      id: "Ferry",
      url:
        "http://clipart-library.com/image_gallery/603313.png",
      datavaluekm: "0",
      datavaluefreq: "0",
      title: "Ferry"
    },
    {
      id: "Train",
      url:
        "http://www.clker.com/cliparts/U/e/x/P/y/H/train-dark-blue-hi.png",
      datavaluekm: "0",
      datavaluefreq: "0",
      title: "Train"
    },
    {
      id: "Bus",
      url:
        "http://www.clker.com/cliparts/W/A/Y/u/H/u/blue-bus-hi.png",
      datavaluekm: "0",
      datavaluefreq: "0",
      title: "Bus"
    },
    {
      id: "Medium Petrol Car",
      url:
        "http://www.clipartbest.com/cliparts/aTe/ogx/aTeogx7qc.png",
      datavaluekm: "0",
      datavaluefreq: "0",
      title: "Petrol Car"
    },
    {
      id: "Medium Diesel Car",
      url:
        "http://www.clker.com/cliparts/1/3/f/6/11970920461654850943Harreck_Blue_Car.svg.med.png",
      datavaluekm: "0",
      datavaluefreq: "0",
      title: "Diesel Car"
    },
    {
      id: "Carpool",
      url:
        "http://www.clker.com/cliparts/0/1/f/7/11949846031382769588beach_trip_ganson.svg.med.png",
      datavaluekm: "0",
      datavaluefreq: "0",
      title: "Carpool"
    },
    {
      id: "Motorbike",
      url:
        "http://www.clker.com/cliparts/e/6/4/c/11970861871447741097Gerald_G_Motorcycle_Clipart.svg.med.png",
      datavaluekm: "0",
      datavaluefreq: "0",
      title: "Motorbike"
    },
    {
      id: "Tram",
      url:
        "http://www.clker.com/cliparts/Y/R/t/S/J/8/station.svg.med.png",
      datavaluekm: "0",
      datavaluefreq: "0",
      title: "Tram"
    },
    {
      id: "Bike",
      url:
        "http://www.clker.com/cliparts/a/1/7/b/1194989604419727334vtt_02.svg.med.png",
      datavaluekm: "0",
      datavaluefreq: "0",
      title: "Bike"
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

  const calculateC02Total = (id, datavaluekm, datavaluefreq) => {
    let C02total = 0;
    if (id === "Flight") {
      C02total = datavaluekm * datavaluefreq * 0.255;
    }
    if (id === "Electric Car") {
      C02total = datavaluekm + datavaluefreq * 0.0553;
    }
    if (id === "Petrol Car") {
      C02total = datavaluekm + datavaluefreq * 0.192;
    }
    if (id === "Diesel Car") {
      C02total = datavaluekm + datavaluefreq * 0.171;
    }
    if (id === "Train") {
      C02total = datavaluekm + datavaluefreq * 0.06;
    }
    if (id === "Bus") {
      C02total = datavaluekm + datavaluefreq * 0.105;
    }
    if (id === "Motorbike") {
      C02total = datavaluekm + datavaluefreq * 0.103;
    }
    if (id === "Bicycle") {
      C02total = datavaluekm + datavaluefreq * 0;
    }
    if (id === "Walking") {
      C02total = datavaluekm + datavaluefreq * 0;
    }
    if (id === "Ferry") {
      C02total = datavaluekm + datavaluefreq * 0.019;
    }
    if (id === "Tram") {
      C02total = datavaluekm + datavaluefreq * 0.035;
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
      const newPicture = { ...picture, canDelete: true }; // generate a unique ID for the picture and add canDelete property
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
  const addImageToBoard3 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    const C02total = calculateC02Total(id, datavaluekm, datavaluefreq);
    const livecount = count + C02total;
    if (livecount <= maxValue) {
      const newPicture = { ...picture, canDelete: true }; // generate a unique ID for the picture and add canDelete property
      setBoard3((board) => [...board, newPicture]);
      setCount((prevCount) => prevCount + C02total);
    } else {
      alert("If you place this you will exceed your maximum C02 limit for this year");
    }
  };
  const addImageToBoard4 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    const C02total = calculateC02Total(id, datavaluekm, datavaluefreq);
    const livecount = count + C02total;
    if (livecount <= maxValue) {
      const newPicture = { ...picture, canDelete: true }; // generate a unique ID for the picture and add canDelete property
      setBoard4((board) => [...board, newPicture]);
      setCount((prevCount) => prevCount + C02total);
    } else {
      alert("If you place this you will exceed your maximum C02 limit for this year");
    }
  };

  const addImageToBoard5 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    const C02total = calculateC02Total(id, datavaluekm, datavaluefreq);
    const livecount = count + C02total;
    if (livecount <= maxValue) {
      setBoard5((board) => [...board, picture]);
      setCount((prevCount) => prevCount + C02total);
    }
    else {
      alert("If you place this you will exceed your maximum C02 limit for this year")
    }

  };
  const addImageToBoard6 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    const C02total = calculateC02Total(id, datavaluekm, datavaluefreq);
    const livecount = count + C02total;
    if (livecount <= maxValue) {
      const newPicture = { ...picture, canDelete: true }; // generate a unique ID for the picture and add canDelete property
      setBoard6((board) => [...board, newPicture]);
      setCount((prevCount) => prevCount + C02total);
    } else {
      alert("If you place this you will exceed your maximum C02 limit for this year");
    }
  };
  const addImageToBoard7 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    const C02total = calculateC02Total(id, datavaluekm, datavaluefreq);
    const livecount = count + C02total;
    if (livecount <= maxValue) {
      const newPicture = { ...picture, canDelete: true }; // generate a unique ID for the picture and add canDelete property
      setBoard7((board) => [...board, newPicture]);
      setCount((prevCount) => prevCount + C02total);
    } else {
      alert("If you place this you will exceed your maximum C02 limit for this year");
    }
  };

  const addImageToBoard8 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    const C02total = calculateC02Total(id, datavaluekm, datavaluefreq);
    const livecount = count + C02total;
    if (livecount <= maxValue) {
      const newPicture = { ...picture, canDelete: true }; // generate a unique ID for the picture and add canDelete property
      setBoard8((board) => [...board, newPicture]);
      setCount((prevCount) => prevCount + C02total);
    } else {
      alert("If you place this you will exceed your maximum C02 limit for this year");
    }
  };

  const addImageToBoard9 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    const C02total = calculateC02Total(id, datavaluekm, datavaluefreq);
    const livecount = count + C02total;
    if (livecount <= maxValue) {
      setBoard9((board) => [...board, picture]);
      setCount((prevCount) => prevCount + C02total);
    }
    else {
      alert("If you place this you will exceed your maximum C02 limit for this year")
    }

  };
  const addImageToBoard10 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    const C02total = calculateC02Total(id, datavaluekm, datavaluefreq);
    const livecount = count + C02total;
    if (livecount <= maxValue) {
      const newPicture = { ...picture, canDelete: true }; // generate a unique ID for the picture and add canDelete property
      setBoard10((board) => [...board, newPicture]);
      setCount((prevCount) => prevCount + C02total);
    } else {
      alert("If you place this you will exceed your maximum C02 limit for this year");
    }
  };
  const addImageToBoard11 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    const C02total = calculateC02Total(id, datavaluekm, datavaluefreq);
    const livecount = count + C02total;
    if (livecount <= maxValue) {
      const newPicture = { ...picture, canDelete: true }; // generate a unique ID for the picture and add canDelete property
      setBoard11((board) => [...board, newPicture]);
      setCount((prevCount) => prevCount + C02total);
    } else {
      alert("If you place this you will exceed your maximum C02 limit for this year");
    }
  };

  const addImageToBoard12 = (id) => {
    const picture = pictureList.find((picture) => id === picture.id);
    const datavaluekm = parseFloat(picture.datavaluekm);
    const datavaluefreq = parseFloat(picture.datavaluefreq);
    const C02total = calculateC02Total(id, datavaluekm, datavaluefreq);
    const livecount = count + C02total;
    if (livecount <= maxValue) {
      setBoard12((board) => [...board, picture]);
      setCount((prevCount) => prevCount + C02total);
    }
    else {
      alert("If you place this you will exceed your maximum C02 limit for this year")
    }

  };

  const removeImageFromBoard1 = () => {
    const lastPicture = board1[board1.length - 1];
    const datavaluekm = parseFloat(lastPicture.datavaluekm);
    setBoard1(board1.slice(0, board1.length - 1));
    setCount(count => count - calculateC02Total(lastPicture.id, datavaluekm, parseFloat(lastPicture.datavaluefreq)));
  };

  const handleRemoveClick1 = () => {
    if (board1.length > 0) {
      const id = board1[board1.length - 1].id;
      removeImageFromBoard1(id);
    }
  };

  const removeImageFromBoard2 = () => {
    const lastPicture = board2[board2.length - 1];
    const datavaluekm = parseFloat(lastPicture.datavaluekm);
    setBoard2(board2.slice(0, board2.length - 1));
    setCount(count => count - calculateC02Total(lastPicture.id, datavaluekm, parseFloat(lastPicture.datavaluefreq)));
  };

  const handleRemoveClick2 = () => {
    if (board2.length > 0) {
      const id = board2[board2.length - 1].id;
      removeImageFromBoard2(id);
    }
  };

  const removeImageFromBoard3 = () => {
    const lastPicture = board3[board3.length - 1];
    const datavaluekm = parseFloat(lastPicture.datavaluekm);
    setBoard3(board3.slice(0, board3.length - 1));
    setCount(count => count - calculateC02Total(lastPicture.id, datavaluekm, parseFloat(lastPicture.datavaluefreq)));
  };

  const handleRemoveClick3 = () => {
    if (board3.length > 0) {
      const id = board3[board3.length - 1].id;
      removeImageFromBoard3(id);
    }
  };

  const removeImageFromBoard4 = () => {
    const lastPicture = board4[board4.length - 1];
    const datavaluekm = parseFloat(lastPicture.datavaluekm);
    setBoard4(board4.slice(0, board4.length - 1));
    setCount(count => count - calculateC02Total(lastPicture.id, datavaluekm, parseFloat(lastPicture.datavaluefreq)));
  };

  const handleRemoveClick4 = () => {
    if (board4.length > 0) {
      const id = board4[board4.length - 1].id;
      removeImageFromBoard4(id);
    }
  };

  const removeImageFromBoard5 = () => {
    const lastPicture = board5[board5.length - 1];
    const datavaluekm = parseFloat(lastPicture.datavaluekm);
    setBoard5(board5.slice(0, board5.length - 1));
    setCount(count => count - calculateC02Total(lastPicture.id, datavaluekm, parseFloat(lastPicture.datavaluefreq)));
  };

  const handleRemoveClick5 = () => {
    if (board5.length > 0) {
      const id = board5[board5.length - 1].id;
      removeImageFromBoard5(id);
    }
  };

  const removeImageFromBoard6 = () => {
    const lastPicture = board6[board6.length - 1];
    const datavaluekm = parseFloat(lastPicture.datavaluekm);
    setBoard6(board6.slice(0, board6.length - 1));
    setCount(count => count - calculateC02Total(lastPicture.id, datavaluekm, parseFloat(lastPicture.datavaluefreq)));
  };

  const handleRemoveClick6 = () => {
    if (board6.length > 0) {
      const id = board6[board6.length - 1].id;
      removeImageFromBoard6(id);
    }
  };

  const removeImageFromBoard7 = () => {
    const lastPicture = board7[board7.length - 1];
    const datavaluekm = parseFloat(lastPicture.datavaluekm);
    setBoard7(board7.slice(0, board7.length - 1));
    setCount(count => count - calculateC02Total(lastPicture.id, datavaluekm, parseFloat(lastPicture.datavaluefreq)));
  };

  const handleRemoveClick7 = () => {
    if (board7.length > 0) {
      const id = board7[board7.length - 1].id;
      removeImageFromBoard7(id);
    }
  };

  const removeImageFromBoard8 = () => {
    const lastPicture = board8[board8.length - 1];
    const datavaluekm = parseFloat(lastPicture.datavaluekm);
    setBoard8(board8.slice(0, board8.length - 1));
    setCount(count => count - calculateC02Total(lastPicture.id, datavaluekm, parseFloat(lastPicture.datavaluefreq)));
  };

  const handleRemoveClick8 = () => {
    if (board8.length > 0) {
      const id = board8[board8.length - 1].id;
      removeImageFromBoard8(id);
    }
  };

  const removeImageFromBoard9 = () => {
    const lastPicture = board9[board9.length - 1];
    const datavaluekm = parseFloat(lastPicture.datavaluekm);
    setBoard9(board9.slice(0, board9.length - 1));
    setCount(count => count - calculateC02Total(lastPicture.id, datavaluekm, parseFloat(lastPicture.datavaluefreq)));
  };

  const handleRemoveClick9 = () => {
    if (board9.length > 0) {
      const id = board9[board9.length - 1].id;
      removeImageFromBoard9(id);
    }
  };

  const removeImageFromBoard10 = () => {
    const lastPicture = board10[board10.length - 1];
    const datavaluekm = parseFloat(lastPicture.datavaluekm);
    setBoard10(board10.slice(0, board10.length - 1));
    setCount(count => count - calculateC02Total(lastPicture.id, datavaluekm, parseFloat(lastPicture.datavaluefreq)));
  };

  const handleRemoveClick10 = () => {
    if (board10.length > 0) {
      const id = board10[board10.length - 1].id;
      removeImageFromBoard10(id);
    }
  };

  const removeImageFromBoard11 = () => {
    const lastPicture = board11[board11.length - 1];
    const datavaluekm = parseFloat(lastPicture.datavaluekm);
    setBoard11(board11.slice(0, board11.length - 1));
    setCount(count => count - calculateC02Total(lastPicture.id, datavaluekm, parseFloat(lastPicture.datavaluefreq)));
  };

  const handleRemoveClick11 = () => {
    if (board11.length > 0) {
      const id = board11[board11.length - 1].id;
      removeImageFromBoard11(id);
    }
  };

  const removeImageFromBoard12 = () => {
    const lastPicture = board12[board12.length - 1];
    const datavaluekm = parseFloat(lastPicture.datavaluekm);
    setBoard12(board12.slice(0, board12.length - 1));
    setCount(count => count - calculateC02Total(lastPicture.id, datavaluekm, parseFloat(lastPicture.datavaluefreq)));
  };

  const handleRemoveClick12 = () => {
    if (board12.length > 0) {
      const id = board12[board12.length - 1].id;
      removeImageFromBoard12(id);
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
    const { id, title } = props;

    let button;
    if (id === "jan") {
      button = (
        <button
          onClick={handleRemoveClick1}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          &#x21B6;
        </button>
      );
    } else if (id === "feb") {
      button = (
        <button
          onClick={handleRemoveClick2}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          &#x21B6;
        </button>
      );
    } else if (id === "mar") {
      button = (
        <button
          onClick={handleRemoveClick3}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          &#x21B6;
        </button>
      );
    }
    else if (id === "apr") {
      button = (
        <button
          onClick={handleRemoveClick4}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          &#x21B6;
        </button>
      );
    } else if (id === "may") {
      button = (
        <button
          onClick={handleRemoveClick5}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          &#x21B6;
        </button>
      );
    } else if (id === "jun") {
      button = (
        <button
          onClick={handleRemoveClick6}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          &#x21B6;
        </button>
      );
    } else if (id === "jul") {
      button = (
        <button
          onClick={handleRemoveClick7}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          &#x21B6;
        </button>
      );
    } else if (id === "aug") {
      button = (
        <button
          onClick={handleRemoveClick8}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          &#x21B6;
        </button>
      );
    } else if (id === "sep") {
      button = (
        <button
          onClick={handleRemoveClick9}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          &#x21B6;
        </button>
      );
    } else if (id === "oct") {
      button = (
        <button
          onClick={handleRemoveClick10}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          &#x21B6;
        </button>
      );
    } else if (id === "nov") {
      button = (
        <button
          onClick={handleRemoveClick11}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          &#x21B6;
        </button>
      );
    } else if (id === "dec") {
      button = (
        <button
          onClick={handleRemoveClick12}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          &#x21B6;
        </button>
      );
    }

    return (
      <div id={id} style={{ display: "flex", flexDirection: "column" }}>
        <div
          className="title"
          style={{
            flexGrow: 0,
            minHeight: "25px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "15px"
          }}
        >
          {title} {button}
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
        <div style={{ border: "2px solid blue", width: "1000px", margin: "auto", padding: "10px", fontWeight: 'normal', fontSize: '14px' }}>
          <span style={{ textDecoration: "underline" }}>Instructions:</span>
          <br />
          <br />
          <span style={{ fontWeight: 'bolder' }}>1. Select your goal:</span> Choose from the <span style={{ textDecoration: "underline" }}>dropdown menu</span> the goal you want to set your carbon emissions goal to
          <br />
          <span style={{ fontWeight: 'bolder' }}>2. Find your transport:</span> <span style={{ textDecoration: "underline" }}>Hover your mouse</span> over images to see each transport type.
          <br />
          <span style={{ fontWeight: 'bolder' }}>3. Enter your data:</span> <span style={{ textDecoration: "underline" }}>Right click images</span> on right to enter the data for each travel type.
          <br />
          <span style={{ fontWeight: 'bolder' }}>4. Place your images:</span> <span style={{ textDecoration: "underline" }}>Drag your image</span> to the month you travelled, you can also drag trips between months.
          <br />
          <span style={{ fontWeight: 'bolder' }}> 5. Undo your data:</span> <span style={{ textDecoration: "underline" }}>Click the undo button on the month</span> to remove your most recent transport choice.
          <br />
          <span style={{ fontWeight: 'bolder' }}>6.Track your progress:</span> <span style={{ textDecoration: "underline" }}>The progress bar</span> will display your progress towards your selected goal. If your emissions exceed your goal, you won't be allowed to add any more.
        </div>
        <br />
        <br />
        Select your goal
        <br />
        <label htmlFor="maxValue"></label>
        <select id="maxValue" onChange={(e) => setMaxValue(parseInt(e.target.value))} style={{ backgroundColor: '#3366ff', borderRadius: '10px', fontSize: '18px' }}>
          <option value="1250">2030 Goals</option>
          <option value="450">2050 Goals</option>
          <option value="100">Net Zero</option>
        </select>
        <br />
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
          <Month id="mar" title="March" >
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
          </Month>
          <Month id="apr" title="April" >
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
          </Month>
          <Month id="may" title="May" >
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
          </Month>
          <Month id="jun" title="June" >
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
          </Month>
          <Month id="jul" title="July" >
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
          </Month>
          <Month id="aug" title="August" >
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
          </Month>
          <Month id="sep" title="September" >
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
          </Month>
          <Month id="oct" title="October" >
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
          </Month>
          <Month id="nov" title="November" >
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
          </Month>
          <Month id="dec" title="December" >
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