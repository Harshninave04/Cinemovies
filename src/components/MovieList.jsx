import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 px-4 py-6">
      {movies.map((movie) => (
        <Link
          to={`/movie/${movie.id}`}
          key={movie.id}
          className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover rounded-t-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-900/75 backdrop-blur-md transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-b-xl">
            <h2 className="text-lg font-semibold text-white truncate">{movie.title}</h2>
            <p className="text-sm text-gray-400">{movie.release_date}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
