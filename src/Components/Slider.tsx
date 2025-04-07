import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { getMovieGenreNames, getTvGenreNames, makeImagePath } from "../utils";
import { IMovie } from "../api";

const Wrapper = styled.div`
  margin-top: 50px;
`;

const Title = styled.h1`
  padding: 20px 0;
  margin-left: 35px;
  font-size: 28px;
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    overflow: visible;
    margin-bottom: 20px;
  }
  .slick-prev,
  .slick-next {
    z-index: 1;
    width: 100px;
    height: 100px;
    &:before {
      font-size: 30px;
      color: white;
    }
  }
  .slick-dots li button:before {
    font-size: 12px;
    color: white;
  }
  .slick-dots li.slick-active button:before {
    color: white;
  }
  .slick-slide.slick-active {
    padding-right: 5px;
  }
`;

const Box = styled(motion.div)<{
  $bgPhoto: string;
  $first: boolean;
  $last: boolean;
}>`
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  transform-origin: ${(props) =>
    props.$first ? "center left" : props.$last ? "center right" : "center"};
  border-radius: 5px;
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: #191b2a;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  gap: 5px;
  h4 {
    font-size: 14px;
  }
  ul {
    display: flex;
    gap: 5px;
  }
  li {
    font-size: 10px;
  }
`;

const BoxVariants = {
  initial: { scale: 1 },
  whileHover: {
    zIndex: 99,
    scale: 1.3,
    y: -50,
    transition: { delay: 0.5, duration: 0.3, type: "tween" },
  },
};

const infoVariants = {
  whileHover: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.3, type: "tween" },
  },
};

interface SliderProps {
  title: string;
  movies: IMovie[];
  onBoxClick: (movie: IMovie) => void;
}

function MovieSlider({ title, movies, onBoxClick }: SliderProps) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      <StyledSlider {...settings}>
        {movies.map((movie, index) => (
          <Box
            key={movie.id}
            whileHover="whileHover"
            initial="initial"
            variants={BoxVariants}
            transition={{ type: "tween" }}
            $bgPhoto={
              movie.backdrop_path
                ? makeImagePath(movie.backdrop_path)
                : makeImagePath(movie.poster_path)
            }
            $first={index % 6 === 0 ? true : false}
            $last={index % 6 === 5 ? true : false}
            onClick={() => onBoxClick(movie)}
          >
            <Info variants={infoVariants}>
              <h4>{movie.title ? movie.title : movie.name}</h4>
              <ul>
                {movie.title
                  ? movie.genre_ids.map((i) => (
                      <li key={i}>{getMovieGenreNames([i])}</li>
                    ))
                  : movie.genre_ids.map((i) => (
                      <li key={i}>{getTvGenreNames([i])}</li>
                    ))}
              </ul>
            </Info>
          </Box>
        ))}
      </StyledSlider>
    </Wrapper>
  );
}

export default MovieSlider;
