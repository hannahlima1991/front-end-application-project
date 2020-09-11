import React, { useState, useEffect } from "react";
import "./Color.css";

function TypeAhead(props) {
  const list = props.list;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [boldItem, setBoldItem] = useState("");

  useEffect(() => {
    let newTerm = searchTerm.split(" ").join("");
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
    <div className="wrapper">
      <div className="userInput">
        <input
          placeholder="Enter a color"
          type="text"
          value={searchTerm}
          className="inputBox"
          onChange={(event) => setSearchTerm(event.target.value)}
        ></input>
      </div>

      {searchResults.length > 0 && (
        <div className="resultList">
          {searchResults.map((colorInput, i) => (
            <p
              key={i}
              className="optionsList"
              onClick={() => setSearchTerm(colorInput)}
            >
              {colorInput}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default TypeAhead;
