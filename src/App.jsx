// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './components/MovieList';
// import MovieOverview from './components/MovieOverview';
import { Search, Film } from 'lucide-react';

const API_KEY = 'f2670df91b04be9ea41c364827883e16';
const API_URL = 'https://api.themoviedb.org/3';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(`${API_URL}/trending/movie/week`, {
          params: { api_key: API_KEY },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };
    fetchTrendingMovies();
  }, []);

  const searchMovies = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/search/movie`, {
        params: { api_key: API_KEY, query },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  return (
      <div className="min-h-screen bg-gray-800 text-white">
        <header className="relative p-8 bg-gradient-to-b from-gray-900 to-gray-800">
          {/* Animated background element */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse" />

          {/* Main content */}
          <div className="relative">
            {/* Title section with icon */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <Film className="w-10 h-10 text-blue-500 animate-bounce" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Movie Finder
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-gray-400 text-center mb-8 text-lg">
              Discover your next favorite movie
            </p>

            {/* Search form */}
            <form
              onSubmit={searchMovies}
              className="flex justify-center items-center max-w-2xl mx-auto">
              <div
                className={`
            relative flex-1 group
            ${isInputFocused ? 'scale-105' : 'scale-100'}
            transition-transform duration-200
          `}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="Search for movies..."
                  className="
                w-full p-4 pl-12 rounded-xl
                bg-gray-800/50 backdrop-blur-sm
                border-2 border-gray-700
                text-gray-200 placeholder-gray-500
                focus:outline-none focus:border-blue-500
                transition-all duration-200
                shadow-lg shadow-black/10
              "
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-blue-500 transition-colors duration-200" />
              </div>

              <button
                type="submit"
                className="
              ml-4 px-6 py-4 rounded-xl
              bg-blue-600 hover:bg-blue-500
              text-white font-semibold
              transform hover:scale-105 active:scale-95
              transition-all duration-200
              shadow-lg shadow-blue-500/20
              flex items-center gap-2
            ">
                <Search className="w-5 h-5" />
                Search
              </button>
            </form>
          </div>
        </header>

        <main className="p-6">
          <MovieList movies={movies} />
        </main>
      </div>
  );
};

export default App;
