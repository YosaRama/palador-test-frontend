import "./App.css";

// Data Hook
import { useOrganizations } from "./hooks/organization";
import { useRef, useState } from "react";

function App() {
  //? ============== Organization Hook ============= ?//
  const { data } = useOrganizations();

  //? Parsing Data Function
  function parsingData(item) {
    const children = data
      .filter((child) => {
        if (child.manager_id === item.employee_id) {
          return true;
        }
      })
      .map((child) => {
        return {
          ...child,
          child: parsingData(child),
        };
      });
    return children;
  }

  //? Data Parse Result
  const dataParse =
    data &&
    data.map((item) => {
      return {
        ...item,
        child: parsingData(item),
      };
    });

  //? ============== Handle Search ============= ?//
  const [searchByName, setSearchByName] = useState(false);
  const inputRef = useRef();
  const handleSearch = () => {
    setSearchByName(inputRef.current.value);
  };
  const handleReset = () => {
    setSearchByName("");
  };
  // * ====================================== * //

  //? Show Data
  const showData =
    data &&
    dataParse.filter((item) => {
      if (searchByName ? item.name.includes(searchByName) : !item.manager_id) {
        return true;
      }
    });

  // * ====================================== * //

  //? ============== Handle Print Data ============= ?//
  function printData(item) {
    return item.child.map((child) => {
      return (
        <div style={{ marginLeft: 50 }}>
          <p>{child.name}</p>
          {printData(child)}
        </div>
      );
    });
  }
  // * ====================================== * //

  return (
    <>
      <h1>Organization Structure</h1>
      <p>Search By Name</p>
      <input
        ref={inputRef}
        onChange={handleSearch}
        placeholder="Input some employee name"
        value={searchByName}
      />
      {searchByName && <button onClick={handleReset}>Reset</button>}
      <br />
      <br />
      {data &&
        showData.map((item) => {
          return (
            <>
              <p>{item.name}</p>
              <div>{printData(item)}</div>
            </>
          );
        })}
    </>
  );
}

export default App;
