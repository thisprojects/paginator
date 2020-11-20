import { useState, useEffect, FunctionComponent } from "react";
import _ from "lodash";

export interface Paginator {
  next: {
    enabled: boolean;
    page(): void;
  };
  prev: {
    enabled: boolean;
    page(): void;
  };
  numOfPages: {
    current: number;
    update(newItemsPerPage: string | number): void;
  };
}

const usePagintor = (
  arrayToPaginate: unknown[],
  initialItemsPerPage: number
) => {
  const [itemsPerPage, updateItemsPerPage] = useState(initialItemsPerPage);

  const [pages, updatePages] = useState<any[]>([]);
  const [currentPage, updateCurrentPage] = useState<number>(0);

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

    if (itemsPerPageValueIsValid) {
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
    update(newitemsPerPage: string | number) {
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

  return {
    paginatedArray: pages[currentPage] || [],
    next,
    prev,
    numOfPages,
  };
};

export default usePagintor;
