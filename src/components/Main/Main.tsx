/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { CardsList } from '../CardsList/CardsList';
import { TypeKitty } from '../../types/TypeKitty';
import { BackToTopButton } from '../BackToTopButton/BackToTopButton';
import { SortType } from '../../types/SortType';
import { CardsPerPageType } from '../../types/CardsPerPageType';
import { SortBar } from '../SortBar/SortBar';
import { Loader } from '../Loaders/Loader';
import { wait } from '../../utils/wait';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import './Main.scss';

const BASE_URL = 'https://ftl-cryptokitties.fly.dev/api/crypto_kitties';
const LOADING_DELAY = 1000; // Delay to demonstrate the data loading process

export const Main = () => {
  const [visibleCards, setVisibleCards] =useState<TypeKitty[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [addedPages, setAddedPages] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState<CardsPerPageType>({
    value: 24, 
    label: '24',
  });
  const [sortBy, setSortBy] = useState<SortType | null>(null);
  const [sortDir, setSortDir] = useState<SortType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null)

  const getParamsSort = useCallback(() => (
    `${sortBy ? `&sort_by=${sortBy.value}`: ''} 
    ${sortDir ? `&sort_dir=${sortDir.value}` : ''}`
  ), [sortBy?.value, sortDir?.value]);

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    setAddedPages(0);

    wait(LOADING_DELAY)
      .then(() => 
        axios.get(BASE_URL 
        + `?page=${currentPage + 1}&per_page=${cardsPerPage.value}${getParamsSort()}`)
          .then(response => {
            setPageCount(response.data.pagination_info.total_pages);
            setVisibleCards(response.data.cats);
        })
      )
      .catch((Error) => {
        setError(Error);
      })
      .finally(() => setIsLoading(false));
  }, [currentPage, cardsPerPage, sortBy, sortDir]);

  const handlePageClick = useCallback(({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  }, []);

  const addPageOfCards = () => {
    setError(null);
    wait(LOADING_DELAY)
      .then(() => 
        axios.get(BASE_URL 
        + `?page=${currentPage + addedPages+ 2}&per_page=${cardsPerPage.value}${getParamsSort()}`)
          .then((response) => {
            setAddedPages(prevState => prevState + 1);
            setVisibleCards(prevState => [...prevState, ...response.data.cats])
          })
      )
      .catch((Error) => {
        setError(Error);
      });
  }

  const handlerChangeCardsPerPage = useCallback((event: CardsPerPageType | null) => {
    if (event) { 
      setCurrentPage(0);
      setCardsPerPage(event)
    }
  }, []);

  const handlerChangeSortBy = useCallback((event: SortType | null) => {
    setCurrentPage(0);
    setSortBy(event)
  }, []);

  const handlerChangeSortDir = useCallback((event: SortType | null) => {
    setCurrentPage(0);
    setSortDir(event)
  }, []);

  return (
    <>
      <div className='container'>
        <ReactPaginate
          forcePage={currentPage}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          containerClassName="Pagination"
          activeClassName="Pagination__active"
          pageLinkClassName="Pagination__page-link"
          breakLinkClassName="Pagination__page-link"
          nextLinkClassName="Pagination__page-link"
          previousLinkClassName="Pagination__page-link"
          pageClassName="Pagination__page-item"
          breakClassName="Pagination__page-item"
          nextClassName="Pagination__page-item"
          previousClassName="Pagination__page-item"
        />
      
        <SortBar 
          cardsPerPage={cardsPerPage}
          sortBy={sortBy}
          sortDir={sortDir}
          handlerChangeCardsPerPage={handlerChangeCardsPerPage}
          handlerChangeSortBy={handlerChangeSortBy}
          handlerChangeSortDir={handlerChangeSortDir}
        />
      </div>
      
      {isLoading  && !error && <Loader />}

      {!isLoading && !error &&
        <CardsList 
          listOfCards={visibleCards}
          addPageOfCards={addPageOfCards}
          hasMore={(currentPage + addedPages) < pageCount}
        />}

      {error && (
        <ErrorMessage error={error}/>
      )}
      
      <BackToTopButton />
    </>
  );
}