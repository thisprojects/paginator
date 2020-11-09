import React from "react";
import WithPaginator from "./WithPaginator";

const List = ({ newArray, next, prev, numOfPages }): JSX.Element => {
  const ArrayToMap = () =>
    newArray.map((item) => (
      <>
        <p className="listItem">{item.entry}</p>
      </>
    ));

  const handleUpdate = (e: any) => {
    numOfPages.update(Number(e.target.value));
  };

  const NextButton = () => {
    if (next.enabled) {
      return <button onClick={next.page}>Next</button>;
    } else {
      return <button style={{ color: "dimgray" }}>Next</button>;
    }
  };

  const PrevButton = () => {
    if (prev.enabled) {
      return <button onClick={prev.page}>Prev</button>;
    } else {
      return <button style={{ color: "dimgray" }}>Prev</button>;
    }
  };

  return (
    <>
      <div className="list">
        <ArrayToMap />
      </div>
      <div className="controls">
        <PrevButton />
        <label>
          Per Page
          <input value={numOfPages.current} onChange={handleUpdate} />
        </label>
        <NextButton />
      </div>
    </>
  );
};
export default WithPaginator(List);
