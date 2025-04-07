import { useLocation } from "react-router-dom";
import { getMultiSearch, IMovie } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { useEffect, useState } from "react";
import Modal from "../Components/Modal";

const Wrapper = styled.div`
  padding: 0 2.875rem;
  margin: 3.5rem 0;
`;

const SearchList = styled.ul`
  padding-top: 100px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  max-width: 1600px;
  margin: 0 auto;
  column-gap: 10px;
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      object-position: center center;
    }
    span {
      font-size: 14px;
      height: 50px;
      display: flex;
      align-items: center;
    }
  }
`;

interface ISearchList {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

function Search() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ISearchList>();
  const keyword = new URLSearchParams(location.search).get("keyword");
  useEffect(() => {
    (async () => {
      const response = await getMultiSearch(keyword!);
      setData(response);
      setIsLoading(false);
    })();
  }, [keyword]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const openModal = (movie: IMovie) => {
    setIsClosing(false);
    setSelectedMovie(movie);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalIsOpen(false);
      setSelectedMovie(null);
      setIsClosing(false);
    }, 500);
  };

  return (
    <Wrapper>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <SearchList>
            {data?.results.map((result) => (
              <li
                key={result.id}
                onClick={() => openModal(result)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={
                    result.backdrop_path
                      ? makeImagePath(result.backdrop_path, "w400")
                      : makeImagePath(result.poster_path, "w400")
                  }
                  alt=""
                />
                <span>{result.title ? result.title : result.name}</span>
              </li>
            ))}
          </SearchList>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            movie={selectedMovie}
            isClosing={isClosing}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Search;
