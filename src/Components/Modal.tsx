// Modal.tsx
import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { makeImagePath, getMovieGenreNames, getTvGenreNames } from "../utils";
import { IMovie } from "../api";
import "../styles.css";
import { Link } from "react-router-dom";

ReactModal.setAppElement("#root");

const ModalContent = styled.div`
  /* padding: 20px; */
  background-color: #191b2a;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  h2 {
    font-size: 32px;
    font-weight: 600;
  }
  ul {
    display: flex;
    gap: 5px;
    margin-bottom: 20px;
  }
  button {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    border: none;
    color: white;
    background-color: #191b2a;
    cursor: pointer;
  }
`;

const ModalImage = styled.div`
  width: 100%;
  height: 50%;
  padding-bottom: 56.25%; // 16:9 비율을 유지하기 위해 패딩을 사용합니다.
  background-size: cover;
  background-position: center center;
  margin-bottom: 20px;
  position: relative;
  border-radius: 5px;
  img {
    width: 25%;
    position: absolute;
    top: 20%;
    right: 7%;
    border-radius: 5px;
  }
`;

const VoteAndRelease = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Vote = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: rgb(50, 51, 74);
  width: 50px;
  gap: 2px;
  border-radius: 6px;
  font-size: 0.875rem;
`;

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  movie: IMovie | null;
  isClosing: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  movie,
  isClosing,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Movie Modal"
      style={{
        overlay: {
          animation: isClosing
            ? "fadeOut 0.5s ease-out"
            : "fadeIn 0.5s ease-out",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          animation: isClosing
            ? "slideOut 0.5s ease-out"
            : "slideIn 0.5s ease-out",
          width: "50%",
          height: "800px",
          margin: "auto",
          backgroundColor: "#191b2a",
          border: "none",
          overflowY: "auto",
        },
      }}
    >
      {movie && (
        <ModalImage
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${makeImagePath(
              movie.backdrop_path
            )})`,
          }}
        >
          <img src={makeImagePath(movie.poster_path)} alt="" />
        </ModalImage>
      )}
      <ModalContent>
        <VoteAndRelease>
          <Vote>
            <StarIcon width={14} height={14} />
            <span>{movie?.vote_average.toFixed(1)}</span>
          </Vote>
          <span>
            {movie?.release_date
              ? `${movie?.release_date} 개봉`
              : `${movie?.first_air_date} 첫 방영`}
          </span>
        </VoteAndRelease>
        <Link
          to="#"
          state={{
            id: movie?.id,
          }}
        >
          <h2>{movie?.title || movie?.name}</h2>
        </Link>
        <ul>
          {movie?.title
            ? movie?.genre_ids.map((i) => (
                <li key={i}>{getMovieGenreNames([i])}</li>
              ))
            : movie?.genre_ids.map((i) => (
                <li key={i}>{getTvGenreNames([i])}</li>
              ))}
        </ul>
        <p>{movie?.overview}</p>
        <button onClick={onRequestClose}>
          <XMarkIcon width={20} height={20} />
        </button>
      </ModalContent>
    </ReactModal>
  );
};

export default Modal;
