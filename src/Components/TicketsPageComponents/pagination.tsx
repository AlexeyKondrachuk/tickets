import React from 'react';
import '../../styles/pagination.scss';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setOffset } from '../../Redux/Slice/MainFormSearchSlice';

interface PaginatedListProps {
  total_count: number;
}

const PaginatedList: React.FC<PaginatedListProps> = ({ total_count }) => {
  const limit = useAppSelector((state) => state.searchMainForm.limit);
  const offset = useAppSelector((state) => state.searchMainForm.offset);
  const dispatch = useAppDispatch();

  const totalPages = total_count ? Math.ceil(total_count / limit) : 0;
  const currentPage = Math.floor(offset / limit) + 1;

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setOffset(offset + limit));
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setOffset(offset - limit));
    }
  };

  const handlePageClick = (pageNumber: number) => {
    dispatch(setOffset((pageNumber - 1) * limit));
  };

  const renderPageNumbers = () => {
    const pageButtons = [];
    const maxVisiblePages = 3; // Количество видимых страниц подряд
    const lastPage = totalPages;

    if (totalPages <= maxVisiblePages + 1) {
      // Если страниц мало, показываем все
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <button
            key={i}
            className={i === currentPage ? 'btn-pagination-active' : 'btn-pagination'}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage <= maxVisiblePages) {
        // Если текущая страница в начале диапазона
        for (let i = currentPage; i <= currentPage + 2; i++) {
          pageButtons.push(
            <button
              key={i}
              className={i === currentPage ? 'btn-pagination-active' : 'btn-pagination'}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </button>
          );
        }
        pageButtons.push(
          <div className="dot_fake_btn" key="dots-end">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        );
        pageButtons.push(
          <button
            key={lastPage}
            className="btn-pagination"
            onClick={() => handlePageClick(lastPage)}
          >
            {lastPage}
          </button>
        );
      } else if (currentPage > totalPages - maxVisiblePages) {
        // Если текущая страница в конце диапазона
        pageButtons.push(
          <button
            key={1}
            className="btn-pagination"
            onClick={() => handlePageClick(1)}
          >
            1
          </button>
        );
        pageButtons.push(
          <div className="dot_fake_btn" key="dots-start">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        );
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pageButtons.push(
            <button
              key={i}
              className={i === currentPage ? 'btn-pagination-active' : 'btn-pagination'}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </button>
          );
        }
      } else {
        // Если текущая страница в середине диапазона
        for (let i = currentPage; i <= currentPage + 2; i++) {
          pageButtons.push(
            <button
              key={i}
              className={i === currentPage ? 'btn-pagination-active' : 'btn-pagination'}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </button>
          );
        }
        pageButtons.push(
          <div className="dot_fake_btn" key="dots-end">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        );
        pageButtons.push(
          <button
            key={lastPage}
            className="btn-pagination"
            onClick={() => handlePageClick(lastPage)}
          >
            {lastPage}
          </button>
        );
      }
    }

    return pageButtons;
  };

  return (
    <div>
      {total_count > limit && (
        <div className="btn-wrapper">
          <button
            className="previous-btn"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            <svg width="18" height="29" viewBox="0 0 18 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.33625 14.5C9.82076 11.0945 13.1201 7.89424 16.3731 4.72332C17.2669 3.85207 17.1987 2.34671 16.3094 1.47083C15.4416 0.616038 14.1195 0.686134 13.2516 1.54092C9.06317 5.66637 4.86165 9.80466 0.72327 13.8808C0.325571 14.2725 0.325472 14.9137 0.723293 15.3053C4.70972 19.2293 8.86225 23.2984 12.9949 27.3844C13.8955 28.2748 15.2685 28.3485 16.1445 27.4338C16.9987 26.5419 17.0517 25.0479 16.1744 24.1785C13.0758 21.1078 9.80952 17.8945 6.33625 14.5Z" fill="#928F94" />
            </svg>
          </button>

          {renderPageNumbers()}

          <button
            className="next-btn"
            onClick={handleNext}
            disabled={currentPage >= totalPages}
          >
            <svg width="18" height="29" viewBox="0 0 18 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.6637 14.5C8.17924 11.0945 4.87989 7.89424 1.62688 4.72332C0.733082 3.85207 0.801327 2.34671 1.69059 1.47083C2.55844 0.616038 3.88051 0.686134 4.74835 1.54092C8.93683 5.66637 13.1384 9.80466 17.2767 13.8808C17.6744 14.2725 17.6745 14.9137 17.2767 15.3053C13.2903 19.2293 9.13775 23.2984 5.00506 27.3844C4.10447 28.2748 2.7315 28.3485 1.85554 27.4338C1.00133 26.5419 0.948345 25.0479 1.82557 24.1785C4.92418 21.1078 8.19048 17.8945 11.6637 14.5Z" fill="#928F94" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginatedList;
