import React, { useEffect, useState } from "react";
import _ from "lodash";

// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface PageProps {
  arrayToPaginate: [];
  initialItemsPerPage: number;
}

export default <Props extends PageProps>(
  Component: React.ComponentType<Props>
): React.ComponentType<Omit<Props, keyof PageProps>> => (props: PageProps) => {
  const { arrayToPaginate, initialItemsPerPage } = props;
  const [itemsPerPage, updateItemsPerPage] = useState(initialItemsPerPage);

  const [pages, updatePages] = useState([]);
  const [currentPage, updateCurrentPage] = useState(0);

  useEffect(() => {
    const itemsPerPageValueIsValid =
      typeof itemsPerPage === "number" &&
      !Number.isNaN(itemsPerPage) &&
      itemsPerPage > 0;

    if (itemsPerPageValueIsValid) {
      const paginatedArray: unknown[] = [];
      const copyOfArrayToPaginate = _.cloneDeep(arrayToPaginate);
      const numberOfPages = copyOfArrayToPaginate.length / itemsPerPage;

      // produce paginated array.
      for (let pageCount = 0; pageCount < numberOfPages; pageCount++) {
        paginatedArray.push(copyOfArrayToPaginate.splice(0, itemsPerPage));
      }

      // if there are items remaining in the array copy, push them to the paginated array.
      if (copyOfArrayToPaginate.length > 0) {
        paginatedArray.push(copyOfArrayToPaginate);
      }

      updatePages(paginatedArray);
    }
  }, [initialItemsPerPage, itemsPerPage, arrayToPaginate]);

  useEffect(() => {
    const itemsPerPageValueIsValid =
      typeof itemsPerPage === "number" &&
      !Number.isNaN(itemsPerPage) &&
      itemsPerPage > 0;

    if (currentPage > 0 && itemsPerPageValueIsValid) {
      updateCurrentPage(0);
    }
  }, [itemsPerPage]);

  const next = {
    enabled: currentPage + 1 < pages.length,
    page() {
      if (next.enabled) {
        updateCurrentPage((currentPage) => (currentPage += 1));
      }
    },
  };

  const numOfPages = {
    current: itemsPerPage,
    update(newitemsPerPage) {
      const newitemsPerPageAsNumber = Number(newitemsPerPage);
      if (!Number.isNaN(newitemsPerPageAsNumber))
        updateItemsPerPage(newitemsPerPageAsNumber);
    },
  };

  const prev = {
    enabled: currentPage - 1 >= 0,
    page() {
      if (prev.enabled) {
        updateCurrentPage((currentPage) => (currentPage -= 1));
      }
    },
  };

  return (
    <Component
      {...(props as Props)}
      newArray={pages[currentPage] || []}
      next={next}
      prev={prev}
      numOfPages={numOfPages}
    />
  );
};
