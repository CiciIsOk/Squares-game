import "./Style.css";
import { useRef, useState } from "react";

const App = () => {
  // states
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [squares, setSquares] = useState([]);
  const [filled, setFilled] = useState(false)

  // define constants
  const boardWidth = 1000;
  const boardHeight = 1000;
  const rectMargin = 16;
  const minRectLen = 50;

  // on click function
  const onClick = () => {
    let wasAdded = false
    if (!filled) {
      const squareLeft = Math.max(0, Math.floor(Math.random() * boardWidth) - minRectLen - rectMargin) // 👈🏼 Horizontally
      const squareTop = Math.max(0, Math.floor(Math.random() * boardHeight) - minRectLen - rectMargin) // 👈🏼 Vertically

      let dimensions = generateWidthAndHeight()
      const originalHeight = dimensions.height
      const originalWidth = dimensions.width
      wasAdded = addRectangle(squareLeft, squareTop, dimensions)

      // if space is filled for a large box, add the smallest possible height box
      if (!wasAdded) {
        dimensions = {width: originalWidth, height: minRectLen}
        wasAdded = addRectangle(squareLeft, squareTop, dimensions)
      }

      // add the smallest possible width box
      if (!wasAdded) {
        dimensions = {width: minRectLen, height: originalHeight}
        wasAdded = addRectangle(squareLeft, squareTop, dimensions)
      }

      // add the smallest possible height & width box
      if (!wasAdded) {
        const dimensions = {width: minRectLen, height: minRectLen}
        wasAdded = addRectangle(squareLeft, squareTop, dimensions)
      }
    }

    // if even the smallest possible box cannot be fit onto the board, then show an alert
    if (!wasAdded || filled) {
      alert("Board Area is filed out, you can't add any more squares")
      setFilled(true)
    }
  };

  // clear board
  const onClear = () => {
    setFilled(false)
    setSquares([]);
  };

  // generate width & height
  const generateWidthAndHeight = () => {
    // generate width & height
    let squareHeight = Math.floor(Math.random() * 200 + minRectLen); // (50, 250) range
    let squareWidth = Math.floor(Math.random() * 200 + minRectLen); // (50, 250) range
    return {width: squareWidth, height: squareHeight}
  }

  const addRectangle = (x, y, dimensions) => {
    for (let i = x; i <= boardWidth + x; i += minRectLen) {
      for (let j = y; j <= boardHeight + y; j += minRectLen) {
        let squareLeft = Math.max(0, i % boardWidth - minRectLen - rectMargin)
        let squareTop = Math.max(0, j % boardHeight - minRectLen - rectMargin)

        // fix overflow
        if (squareLeft + dimensions.width + rectMargin >= boardWidth) {
          dimensions.width = boardWidth - squareLeft - rectMargin;
        }
        if (squareTop + dimensions.height + rectMargin >= boardHeight) {
          dimensions.height = boardHeight - squareTop - rectMargin;
        }

        // create rectangle
        const rect = {
          height: dimensions.height,
          width: dimensions.width,
          x: squareLeft,
          y: squareTop,
        }

        // check for collision and add if no collision exists found
        if (!collidesWithAny(rect)) {
          setWidth(rect.width)
          setHeight(rect.height)
          setX(rect.x)
          setY(rect.y)
          squares.push(rect)
          return true;
        }
      }
    }
    return false
  }

  // check if a rectangle collides with any other rectangles
  const collidesWithAny = (rect) => {
    for (let k = 0; k < squares.length; k++) {
      const currentRect = squares[k]
      if (collides(rect, currentRect)) {
        return true
      }
    }
    return false
  }

  // if vertical and horizontal lines have common segments, then two rectangles collide.
  const collides = (rect1, rect2) => {
    const line1X = {x1: rect1.x, x2: rect1.x+rect1.width}
    const line2X = {x1: rect2.x, x2: rect2.x+rect2.width}
    const line1Y = {y1: rect1.y, y2: rect1.y+rect1.height}
    const line2Y = {y1: rect2.y, y2: rect2.y+rect2.height}
    return doLinesCollideX(line1X, line2X) && doLinesCollideY(line1Y, line2Y)
  }

  // check if two horizontal lines collide
  const doLinesCollideX = (line1, line2) => {
    return (line1.x1 <= line2.x2 && line1.x1 >= line2.x1) || (line1.x2 <= line2.x2 && line1.x2 >= line2.x1)
        || (line2.x1 <= line1.x2 && line2.x1 >= line1.x1) || (line2.x2 <= line1.x2 && line2.x2 >= line1.x1)
  }

  // check if two vertical lines collide
  const doLinesCollideY = (line1, line2) => {
    return (line1.y1 <= line2.y2 && line1.y1 >= line2.y1) || (line1.y2 <= line2.y2 && line1.y2 >= line2.y1)
        || (line2.y1 <= line1.y2 && line2.y1 >= line1.y1) || (line2.y2 <= line1.y2 && line2.y2 >= line1.y1)
  }

  return (
    <div className="main">
      <div>
        <div className="main-box">
          {squares.length > 0 ? (
            squares.map((square, i) => (
              <div
                className="boxes"
                style={{
                  height: square.height,
                  width: square.width,
                  left: square.x,
                  top: square.y,
                  position: "absolute",
                }}
                key={i}
              ></div>
            ))
          ) : (
            <div className="empty">
              <h1>Board is empty</h1>
            </div>
          )}
        </div>

        <div className="actions-div">
          <h2>Board dimensions: 1000x1000</h2>
          <h2>Box count:{squares.length}</h2>
          <div>
            <button
              className="add-btn"
              onClick={() => onClick()}
              style={{ marginInline: "18px" }}
            >
              Add
            </button>
            <button className="clear-btn" onClick={() => onClear()}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;