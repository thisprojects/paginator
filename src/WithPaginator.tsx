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
  const [perPage, updatePerPage] = useState(initialItemsPerPage);

  const [pages, updatePages] = useState([]);
  const [currentPage, updateCurrentPage] = useState(0);

  useEffect(() => {
    const perPageValueIsValid =
      typeof perPage === "number" && !Number.isNaN(perPage) && perPage > 0;

    if (perPageValueIsValid) {
      const pagesArray: unknown[] = [];
      const arrayCopy = _.cloneDeep(arrayToPaginate);
      const numberOfPages = arrayCopy.length / perPage;

      // produce paginated array.
      for (let pageCount = 0; pageCount < numberOfPages; pageCount++) {
        pagesArray.push(arrayCopy.splice(0, perPage));
      }

      // if there are items remaining in the array copy, push them to the paginated array.
      if (arrayCopy.length > 0) {
        pagesArray.push(arrayCopy);
      }

      updatePages(pagesArray);
    }
  }, [initialItemsPerPage, perPage, arrayToPaginate]);

  useEffect(() => {
    const perPageValueIsValid =
      typeof perPage === "number" && !Number.isNaN(perPage) && perPage > 0;

    if (currentPage > 0 && perPageValueIsValid) {
      updateCurrentPage(0);
    }
  }, [perPage]);

  const next = {
    enabled: currentPage + 1 < pages.length,
    page() {
      if (next.enabled) {
        updateCurrentPage((currentPage) => (currentPage += 1));
      }
    },
  };

  const itemsPerPage = {
    current: perPage,
    update(newPerPage) {
      const newPerPageAsNumber = Number(newPerPage);
      if (!Number.isNaN(newPerPageAsNumber)) updatePerPage(newPerPageAsNumber);
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
      itemsPerPage={itemsPerPage}
    />
  );
};
