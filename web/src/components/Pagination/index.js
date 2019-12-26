import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { MdArrowBack, MdArrowForward } from 'react-icons/md';

import {
  Paginator,
  PagePrev,
  PageItem,
  PageNext,
  Container,
  PaginatorInfo,
} from './styles';

export default function Pagination({
  onLoadPage,
  page,
  perPage,
  totalPage,
  total,
}) {
  const [itens, setItens] = useState([]);
  const [pageSelected, setPageSelected] = useState(1);

  useEffect(() => {
    if (totalPage > 0) {
      const fill = new Array(totalPage).fill(1);
      setItens(fill);
    }

    setPageSelected(page);
  }, [page, totalPage]);

  function handleLoadPage(pageIndex) {
    setPageSelected(pageIndex);
    onLoadPage(pageIndex);
  }

  function handlePrevPage() {
    if (pageSelected === 1) return;
    const pageIndex = pageSelected - 1;
    setPageSelected(pageIndex);
    handleLoadPage(pageIndex);
  }

  function handleNextPage() {
    if (pageSelected === totalPage) return;
    const pageIndex = pageSelected + 1;
    setPageSelected(pageIndex);
    handleLoadPage(pageIndex);
  }

  return (
    <Container>
      <Paginator>
        <PagePrev disabled={pageSelected <= 1} onClick={handlePrevPage}>
          <MdArrowBack />
        </PagePrev>

        {itens.map((item, index) => (
          <PageItem
            key={String(index)}
            active={index + 1 === pageSelected}
            onClick={() => handleLoadPage(index + 1)}
          >
            {index + 1}
          </PageItem>
        ))}
        <PageNext
          disabled={pageSelected === totalPage}
          onClick={handleNextPage}
        >
          <MdArrowForward />
        </PageNext>
      </Paginator>

      <PaginatorInfo>
        Mostrando {1 + (page > 1 ? perPage * (page - 1) : 0)} -{' '}
        {perPage * page > total ? total : perPage * page} de {total}
      </PaginatorInfo>
    </Container>
  );
}

Pagination.propTypes = {
  onLoadPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
