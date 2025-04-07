import { useState } from "react";
import styled from "styled-components";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
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

function Home() {
  const { data: topRated, isLoading } = useQuery<IMovies>({
    queryKey: ["movies", "topRated"],
    queryFn: getTopRatedMovies,
  });
  const { data: upcoming } = useQuery<IMovies>({
    queryKey: ["movies", "upcoming"],
    queryFn: getUpcomingMovies,
  });
  const { data: popular } = useQuery<IMovies>({
    queryKey: ["movies", "popular"],
    queryFn: getPopularMovies,
  });
  const { data: nowPlaying } = useQuery<IMovies>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getNowPlayingMovies,
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  const openModal = (movie: IMovie) => {
    setIsClosing(false);
    setSelectedMovie(movie);
    setModalIsOpen(true);
    navigate(`movies/${movie.id}`);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalIsOpen(false);
      setSelectedMovie(null);
      setIsClosing(false);
    }, 500);
    navigate("/");
  };

  const topRatedList = topRated?.results.slice(1, 19);
  const upcomingList = upcoming?.results.slice(0, 18);
  const popularList = popular?.results.slice(0, 18);
  const nowPlayingList = nowPlaying?.results.slice(0, 18);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>로딩중...</Loader>
      ) : (
        <>
          <Banner
            $bgPhoto={makeImagePath(topRated?.results[0].backdrop_path || "")}
          >
            <Title>{topRated?.results[0].title}</Title>
          </Banner>
          {topRatedList && (
            <MovieSlider
              title="Top Rated"
              movies={topRatedList}
              onBoxClick={openModal}
            />
          )}
          {upcomingList && (
            <MovieSlider
              title="Upcoming"
              movies={upcomingList}
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
          {nowPlayingList && (
            <MovieSlider
              title="Now Playing"
              movies={nowPlayingList}
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

export default Home;
