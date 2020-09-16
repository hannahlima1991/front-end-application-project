import React, { useState, useEffect, useRef } from "react";
import "./Color.css";
import BackGround from "../Particles";

function TypeAhead(props) {
  const list = props.list;
  const colorOption = useRef(null);
  const onAction = () => {
    colorOption.current.focus();
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [listOpen, setListOpen] = useState(false);
  const [showColor, setShowColor] = useState(false);

  useEffect(() => {
    let newTerm = searchTerm.split(" ").join("");
    let num = newTerm.length;
    if (newTerm.length > 0) {
      const results = list.filter((color) =>
        color.toLowerCase().startsWith(newTerm)
      );

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  console.log(searchResults);

  return (
    <div
      className="wrapper"
      onClick={() => setListOpen(false)}
      style={{ background: searchTerm === "" ? "#CCCCCC" : "#CCCCCC" }}
    >
      {showColor && <BackGround colorName={searchTerm} />}

      <div className="userInput">
        <input
          placeholder="Enter a color"
          ref={colorOption}
          type="text"
          value={searchTerm}
          className="inputBox"
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setListOpen(true);
          }}
        />
      </div>

      {listOpen && (
        <div className="resultList">
          {searchResults.map((colorInput, i) => (
            <p
              key={i}
              tabIndex="0"
              className="optionsList"
              onClick={() => {
                setSearchTerm(colorInput);
                setListOpen(false);
                setShowColor(true);
                onAction();
              }}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  setListOpen(false);
                  setSearchTerm(colorInput);
                  setShowColor(true);
                  onAction();
                }
                if (event.keyCode === 27) {
                  setListOpen(false);
                  console.log(listOpen);
                }
              }}
            >
              <b>{searchTerm}</b>
              {colorInput.substring(searchTerm.length, colorInput.length)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default TypeAhead;
