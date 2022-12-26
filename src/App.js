import "./Style.css";
import { useState } from "react";

const App = () => {
  // states
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [squares, setSquares] = useState([]);
  const [squareArea] = useState([]);
  const [squareAreaSum, setSquareAreaSum] = useState(0);

  // on click function
  const onClick = () => {
    // generate random nubers for hight and width
    const squareHeight = Math.floor(Math.random() * 200 + 100);
    const squareWidth = Math.floor(Math.random() * 200 + 100);

    //set numbers
    setHeight(squareHeight);
    setWidth(squareWidth);

    //calculate sum of squares
    setSquareAreaSum(squareArea.reduce((sum, num) => sum + num));

    // if squareAreaSum is greater than boardArea alert appears
      squareAreaSum <= boardArea
        ? squares.push({ height: squareHeight, width: squareWidth })
        : alert("Board Area is filed out, you can't add any more squares");
    
  };

  // board area
  const boardArea = 1000 * 1000;
  //get last height and width of last element from  squares
  const sumHeight = squares.map((s) => s.height).slice(-1);
  const sumWidth = squares.map((s) => s.width).slice(-1);

  //calculate area and add it to array
  squareArea.push(sumHeight * sumWidth);

  // clear board
  const onClear = () => {
    setSquares([]);
    setSquareAreaSum(0);
    squareArea.length = 0;
  };


  return (
    <div className="main">
      <div>
        <div className="main-box">
          {squareArea.length > 2 ? (
            squares.map((square, i) => (
              <div
                style={{
                  height: square.height,
                  width: square.width,
                  backgroundColor: "lightblue",
                  margin: "8px",
                  borderRadius: "4px",
                }}
                key={i}
              >
                {" "}
              </div>
            ))
          ) : (
            <div className="empty">
              <h1>Square is empty</h1>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px",
            fontSize: "18px",
          }}
        >
          <h2>max board area is 1000000</h2>
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
