import React from "react";
import usePaginator, { Paginator } from "./UsePagination";

interface HandleUpdate {
  target: HTMLInputElement;
}

type Users = { name: string; department: string; office: string };

type ArrayToPage = { paginatedArray: Users[] };

interface Args {
  arrayToPaginate: Users[];
  initialItemsPerPage: number;
}

const List = ({ arrayToPaginate, initialItemsPerPage }: Args): JSX.Element => {
  const {
    paginatedArray,
    next,
    prev,
    numOfPages,
  }: Paginator & ArrayToPage = usePaginator(
    arrayToPaginate,
    initialItemsPerPage
  );

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
      <div>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Office</th>
            </tr>
            {paginatedArray.map(
              (item): JSX.Element => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.department}</td>
                  <td>{item.office}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
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
