// src/components/MovieList.jsx
import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.length ? (
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      ) : (
        <p className="col-span-full text-center text-gray-400">No movies found</p>
      )}
    </div>
  );
};

export default MovieList;
