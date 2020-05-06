import styled from "styled-components";

export const ApMapContainer = styled.div`
  display: block;
  position: relative;
  top: 10%;
  left: 10%;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: white;
  border: 1px solid black;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    user-select: none;
  }
`;

export const Controls = styled.div``;
export const Scale = styled.div`
  background-color: lightyellow;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border: 1px solid black;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 15;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  top: ${(props) => props.scaleY};
  left: ${(props) => props.scaleX};
  display: ${(props) => (props.visible ? "flex" : "none")};
  transform-origin: 0% 0% 0px;
  transform: ${(props) =>
    props.rotate ? "rotate(" + props.rotate + "deg)" : "none"};
`;

export const ApInstance = styled.div`
  position: absolute;
  display: flex;
  z-index: 10;
  top: ${(props) => props.posY + "px"};
  left: ${(props) => props.posX + "px"};
  width: ${(props) => props.apWidth + "px"};
  height: ${(props) => props.apHeight + "px"};
  background-color: white;
  border-radius: 6px;
  border: 1px solid black;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;

  &:hover {
    border: 2px solid rgb(4, 159, 217);
  }
  svg {
    color: darkblue;
  }
`;
