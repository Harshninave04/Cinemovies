// src/components/MovieList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <Link
          to={`/movie/${movie.id}`}
          key={movie.id}
          className="block bg-gray-700 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-200 hover:scale-105">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-fit object-contain"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold">{movie.title}</h2>
            <p className="text-gray-400">{movie.release_date}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
