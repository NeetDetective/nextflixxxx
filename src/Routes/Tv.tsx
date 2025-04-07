import { useState } from "react";
import styled from "styled-components";
import {
  getAiringTodayTvs,
  getOnTheAirTvs,
  getPopularTvs,
  getTopRatedTvs,
  IMovie,
  IMovies,
} from "../api";
import { makeImagePath } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import MovieSlider from "../Components/Slider";
import Modal from "../Components/Modal";

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 100vh;
  font-size: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

function Tv() {
  const { data: airingToday, isLoading } = useQuery<IMovies>({
    queryKey: ["tvs", "airingToday"],
    queryFn: getAiringTodayTvs,
  });
  const { data: onTheAir } = useQuery<IMovies>({
    queryKey: ["tvs", "onTheAir"],
    queryFn: getOnTheAirTvs,
  });
  const { data: popular } = useQuery<IMovies>({
    queryKey: ["tvs", "popular"],
    queryFn: getPopularTvs,
  });
  const { data: topRated } = useQuery<IMovies>({
    queryKey: ["tvs", "topRated"],
    queryFn: getTopRatedTvs,
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  const openModal = (movie: IMovie) => {
    setIsClosing(false);
    setSelectedMovie(movie);
    setModalIsOpen(true);
    navigate(`${movie.id}`);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalIsOpen(false);
      setSelectedMovie(null);
      setIsClosing(false);
    }, 500);
    navigate("/tv");
  };

  const airingTodayList = airingToday?.results.slice(1, 19);
  const onTheAirList = onTheAir?.results.slice(0, 18);
  const popularList = popular?.results.slice(0, 18);
  const topRatedList = topRated?.results.slice(0, 18);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>로딩중...</Loader>
      ) : (
        <>
          <Banner
            $bgPhoto={makeImagePath(
              airingToday?.results[0].backdrop_path || ""
            )}
          >
            <Title>{airingToday?.results[0].name}</Title>
          </Banner>
          {airingTodayList && (
            <MovieSlider
              title="Airing Today"
              movies={airingTodayList}
              onBoxClick={openModal}
            />
          )}
          {onTheAirList && (
            <MovieSlider
              title="On The Air"
              movies={onTheAirList}
              onBoxClick={openModal}
            />
          )}
          {popularList && (
            <MovieSlider
              title="Popular"
              movies={popularList}
              onBoxClick={openModal}
            />
          )}
          {topRatedList && (
            <MovieSlider
              title="Top Rated"
              movies={topRatedList}
              onBoxClick={openModal}
            />
          )}

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

export default Tv;
