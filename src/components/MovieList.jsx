import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 py-6">
      {movies.map((movie) => (
        <Link
          to={`/movie/${movie.id}`}
          key={movie.id}
          className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          {/* Movie Poster */}
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto object-cover rounded-t-xl"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Movie Information */}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-900/75 backdrop-blur-md transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-b-xl">
            <h2 className="text-lg font-semibold text-white truncate">{movie.title}</h2>
            <p className="text-sm text-gray-400">
              {new Date(movie.release_date).toLocaleDateString()}
            </p>
            {/* Additional Info */}
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-yellow-400 flex items-center">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
              {movie.genre_ids && (
                <span className="text-xs text-gray-500">
                  {movie.genre_ids.slice(0, 2).join(', ')}
                  {/* Adjust this based on your genres list */}
                </span>
              )}
            </div>
          </div>

          {/* Hover Details */}
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-center items-center text-center text-white">
            <h3 className="text-lg font-bold">{movie.title}</h3>
            <p className="text-sm text-gray-400 line-clamp-3">{movie.overview}</p>
            <button className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded-lg font-medium shadow-md hover:bg-yellow-600 transition">
              View Details
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
