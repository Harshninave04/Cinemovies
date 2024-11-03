// src/components/MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="bg-gray-900 rounded-lg p-1 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
      <img src={imageUrl} alt={movie.title} className="w-full h-fit object-contain rounded-lg" />
      <div className="p-3">
        <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
        <p className="text-gray-400 text-sm">{movie.release_date}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
