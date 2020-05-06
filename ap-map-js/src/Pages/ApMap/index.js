import React, { useState, useEffect } from "react";
import { ApMapContainer, Controls, ApInstance, Scale } from "./styles";
import backgroundImg from "../ApMap/img/base.png";
import { AiOutlineWifi } from "react-icons/ai";
import { GiCrosshair } from "react-icons/gi";

export default function ApMap() {
  const [apWidth, setApWidth] = useState(30);
  const [apHeight, setApHeight] = useState(30);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [imgWidth, setImgWidth] = useState(1280);
  const [imgHeight, setImgHeight] = useState(648);
  const [apCount, setApCount] = useState(1);
  const [apInstances, setApInstance] = useState([]);
  const [scaleMode, setScaleMode] = useState(true);
  const [scaleWidth, setScaleWidth] = useState(20);
  const [scaleHeight, setScaleHeight] = useState(20);
  const [scaleX, setScaleX] = useState(0);
  const [scaleY, setScaleY] = useState(0);
  const [scaleXEnd, setScaleXEnd] = useState(0);
  const [scaleYEnd, setScaleYEnd] = useState(0);
  const [scaleDistance, setScaleDistance] = useState(0);
  const [scaleAngle, setScaleAngle] = useState(0);
  const [apsDraggable, setApsDraggable] = useState(true);
  const [scaleFirstClick, setScaleFirstClick] = useState(false);
  const [scaleInitialVisible, setScaleInitialVisible] = useState(false);
  const [scaleEndVisible, setScaleEndVisible] = useState(false);

  useEffect(() => {
    calcDistance();
  });

  const calcDistance = () => {
    let distance = Math.sqrt(
      Math.pow(scaleXEnd - scaleX, 2) + Math.pow(scaleYEnd - scaleY, 2)
    );

    console.log("X initial:" + scaleX);
    console.log("X Final:" + scaleXEnd);
    console.log("Y initial:" + scaleY);
    console.log("Y Final:" + scaleYEnd);
    console.log("Distance:" + distance);
    calcAngle();
    setScaleDistance(distance);
  };

  const calcAngle = () => {
    let angle = 0;
    let angleDegree = 0;
    try {
      angle = Math.atan((scaleYEnd - scaleY) / (scaleXEnd - scaleX));
      angleDegree = (360 * angle) / (2 * Math.PI);
    } catch (error) {
      console.log("Error:" + error);
    }
    setScaleAngle(angleDegree);
    console.log("Angle: " + angleDegree);
  };

  const addScale = (e) => {
    let x = e.clientX;
    let y = e.clientY;
    let offsetY = e.target.parentNode.offsetTop;
    let offsetX = e.target.parentNode.offsetLeft;
    let posX = x - offsetX + window.scrollX - scaleWidth / 2;
    let posY = y - offsetY + window.scrollY - scaleHeight / 2;

    if (scaleFirstClick === false) {
      setScaleX(posX);
      setScaleY(posY);
      setScaleFirstClick(true);
      setScaleInitialVisible(true);
    } else {
      setScaleXEnd(posX);
      setScaleYEnd(posY);
      setScaleFirstClick(false);
      setScaleEndVisible(true);
    }
  };

  const addAp = (e) => {
    let apName = "AP_" + apCount;
    let apCountPlus = apCount + 1;
    setApCount(apCountPlus);

    let x = e.clientX;
    let y = e.clientY;
    let offsetY = e.target.parentNode.offsetTop;
    let offsetX = e.target.parentNode.offsetLeft;
    let posX = x - offsetX + window.scrollX - apWidth / 2;
    let posY = y - offsetY + window.scrollY - apHeight / 2;
    let ap = { apName, posX, posY };

    setApInstance([...apInstances, ap]);
  };

  const scaleToggle = () => {
    if (scaleMode === true) {
      setApsDraggable(true);
    } else {
      setApsDraggable(false);
    }

    setScaleMode(!scaleMode);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onClickAp = (e, apName) => {
    e.stopPropagation();
    console.log("Clicked: " + apName);
  };

  function updatePosition(type, offset1 = 0, offset2 = 0) {
    let tempArray = apInstances;
    let fator = 1;
    if (type === "zoomIn") {
      fator = 2;
    }
    if (type === "zoomOut") {
      fator = 0.5;
    }

    apInstances.map((Ap) => {
      let posX = Ap.posX + offset2;
      let posY = Ap.posY + offset2;
      let newValueX = posX * fator + offset1;
      let newValueY = posY * fator + offset1;

      try {
        let instanceToBeChanged = tempArray.find((entry) => {
          return entry.apName === Ap.apName;
        });
        instanceToBeChanged.posX = newValueX;
        instanceToBeChanged.posY = newValueY;
      } catch (error) {
        console.log("Erro: " + error);
      }
      setApInstance(tempArray);
    });
  }

  const zoomIn = (e) => {
    if (zoomLevel < 3) {
      setZoomLevel(zoomLevel + 1);
      setImgWidth(imgWidth * 2);
      setImgHeight(imgHeight * 2);
      updatePosition("zoomIn", apWidth / 2);
    }
  };
  const zoomOut = (e) => {
    if (zoomLevel > 0) {
      setZoomLevel(zoomLevel - 1);
      setImgWidth(imgWidth / 2);
      setImgHeight(imgHeight / 2);
      updatePosition("zoomOut", 0, -1 * (apWidth / 2));
    }
  };

  const onDragEndAp = (e, apName) => {
    let adjustedX = e.clientX - e.target.parentNode.offsetLeft;
    let adjustedY = e.clientY - e.target.parentNode.offsetTop;
    //e.target.style.left = adjustedX - startX + "px";
    //e.target.style.top = adjustedY - startY + "px";
    e.target.style.display = "flex";

    if (
      adjustedX < 0 ||
      adjustedX > imgWidth - window.scrollX ||
      adjustedY < 0 ||
      adjustedY > imgHeight - window.scrollY
    ) {
      return false;
    }

    let tempArray = apInstances;

    try {
      let instanceToBeChanged = tempArray.find((entry) => {
        return entry.apName === apName;
      });
      instanceToBeChanged.posX = adjustedX - startX;
      instanceToBeChanged.posY = adjustedY - startY;
    } catch (error) {
      console.log("Erro: " + error);
    }
    setApInstance([...tempArray]);
  };

  const onDragStart = (e) => {
    const valueStartX =
      e.clientX - e.target.parentNode.offsetLeft - e.target.offsetLeft;
    const valueStartY =
      e.clientY - e.target.parentNode.offsetTop - e.target.offsetTop;

    setStartX(valueStartX);
    setStartY(valueStartY);
  };
  return (
    <>
      <h1>ApMap</h1>

      <Controls>
        <button onClick={(e) => zoomIn(e)}>Zoom In</button>
        <button onClick={(e) => zoomOut(e)}>Zoom Out</button>
        <button onClick={(e) => scaleToggle()}>Scale</button>
      </Controls>
      <ApMapContainer
        className="ApMapContainer"
        width={imgWidth + "px"}
        height={imgHeight + "px"}
        onClick={(e) => {
          if (scaleMode === true) {
            addScale(e);
            return false;
          }
          addAp(e);
        }}
        onDragOver={(e) => {
          onDragOver(e);
        }}
        draggable="false"
      >
        <Scale
          width={scaleWidth + "px"}
          height={scaleHeight + "px"}
          scaleX={scaleX + "px"}
          scaleY={scaleY + "px"}
          visible={scaleInitialVisible}
        >
          <GiCrosshair />
        </Scale>
        <Scale
          width={scaleWidth + "px"}
          height={scaleHeight + "px"}
          scaleX={scaleXEnd + "px"}
          scaleY={scaleYEnd + "px"}
          visible={scaleEndVisible}
        >
          <GiCrosshair />
        </Scale>
        <Scale
          width={scaleDistance - scaleWidth + "px"}
          height={scaleHeight + "px"}
          scaleX={scaleX + scaleWidth + "px"}
          scaleY={scaleY + "px"}
          visible={scaleEndVisible}
          rotate={scaleAngle}
        />
        <img src={backgroundImg} />

        {apInstances.map((Ap) => {
          return (
            <ApInstance
              key={Ap.apName}
              apWidth={apWidth}
              apHeight={apHeight}
              posX={Ap.posX}
              posY={Ap.posY}
              onClick={(e) => {
                onClickAp(e, Ap.apName);
              }}
              className="Ap"
              draggable={apsDraggable}
              onDrag={(e) => {
                e.target.style.display = "none";
              }}
              onDragStart={(e) => {
                onDragStart(e);
              }}
              onDragEnd={(e) => {
                onDragEndAp(e, Ap.apName);
              }}
            >
              <AiOutlineWifi size={14} />
            </ApInstance>
          );
        })}
      </ApMapContainer>
    </>
  );
}
