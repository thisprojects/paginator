import React, { useEffect } from "react";
import usePaginator from "./UsePagination";

interface Paginator {
  paginatedArray: any[];
  next: {
    enabled: boolean;
    page: any;
  };
  prev: {
    enabled: boolean;
    page: any;
  };
  numOfPages: {
    current: number;
    update: any;
  };
}

const List = ({ arrayToPaginate, initialItemsPerPage }): JSX.Element => {
  const { paginatedArray, next, prev, numOfPages }: Paginator = usePaginator(
    arrayToPaginate,
    initialItemsPerPage
  );

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
        {paginatedArray.map((item) => (
          <>
            <p className="listItem">{item.entry}</p>
          </>
        ))}
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
export default List;
