import React from "react";
import usePaginator, { Paginator } from "./UsePagination";

interface HandleUpdate {
  target: HTMLInputElement;
}

type List = { paginatedArray: { entry: string }[] };

interface Args {
  arrayToPaginate: { entry: string }[];
  initialItemsPerPage: number;
}

const List = ({ arrayToPaginate, initialItemsPerPage }: Args): JSX.Element => {
  const {
    paginatedArray,
    next,
    prev,
    numOfPages,
  }: Paginator & List = usePaginator(arrayToPaginate, initialItemsPerPage);

  const handleUpdate = (e: HandleUpdate) => {
    numOfPages.update(Number(e.target.value));
  };

  const NextButton = (): JSX.Element => {
    if (next.enabled) {
      return <button onClick={next.page}>Next</button>;
    } else {
      return <button style={{ color: "dimgray" }}>Next</button>;
    }
  };

  const PrevButton = (): JSX.Element => {
    if (prev.enabled) {
      return <button onClick={prev.page}>Prev</button>;
    } else {
      return <button style={{ color: "dimgray" }}>Prev</button>;
    }
  };

  return (
    <>
      <div className="list">
        {paginatedArray.map(
          (item): JSX.Element => (
            <>
              <p className="listItem">{item.entry}</p>
            </>
          )
        )}
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
