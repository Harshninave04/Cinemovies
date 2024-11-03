import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Star,
  Clock,
  Calendar,
  Users,
  Award,
  Heart,
  Share2,
  BookmarkPlus,
  Play,
} from 'lucide-react';

const MovieOverview = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=f2670df91b04be9ea41c364827883e16`,
        );
        const data = await response.json();
        setMovie(data);
        setTimeout(() => setIsHeaderVisible(true), 100);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-gray-800 mb-4" />
          <div className="h-4 w-48 bg-gray-800 rounded" />
        </div>
      </div>
    );
  }

  if (!movie) return null;

  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '/api/placeholder/800/400';

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/api/placeholder/500/750';

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 scale-105">
          <img src={imageUrl} alt="" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>

        {/* Content Grid */}
        <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-4 py-16">
          {/* Left Column - Poster and Actions */}
          <div
            className={`flex flex-col items-start space-y-8 transition-all duration-1000 ${
              isHeaderVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
            {/* Poster Card */}
            <div className="relative group">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-80 rounded-2xl shadow-2xl transform transition-transform group-hover:scale-105"
              />
              <button className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-16 h-16 text-white" strokeWidth={1.5} />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Heart className="w-5 h-5" />
                <span>Favorite</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <BookmarkPlus className="w-5 h-5" />
                <span>Watchlist</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column - Movie Details */}
          <div
            className={`flex flex-col space-y-8 transition-all duration-1000 delay-300 ${
              isHeaderVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
            {/* Title and Rating */}
            <div>
              <h1 className="text-5xl font-bold mb-4 leading-tight">
                {movie.title}
                <span className="text-2xl text-gray-400 ml-4">
                  ({new Date(movie.release_date).getFullYear()})
                </span>
              </h1>
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <span className="text-2xl font-bold">{movie.vote_average?.toFixed(1)}</span>
                <span className="text-gray-400">/ 10</span>
              </div>
            </div>

            {/* Movie Meta */}
            <div className="flex flex-wrap gap-y-4">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="mr-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Clock, label: 'Runtime', value: `${movie.runtime} min` },
                {
                  icon: Calendar,
                  label: 'Released',
                  value: new Date(movie.release_date).toLocaleDateString(),
                },
                { icon: Users, label: 'Votes', value: movie.vote_count?.toLocaleString() },
                {
                  icon: Award,
                  label: 'Budget',
                  value: movie.budget ? `$${(movie.budget / 1000000).toFixed(0)}M` : 'N/A',
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                  <Icon className="w-5 h-5 mb-2 text-gray-400" />
                  <div className="text-sm text-gray-400">{label}</div>
                  <div className="font-semibold">{value}</div>
                </div>
              ))}
            </div>

            {/* Overview */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
              {movie.tagline && (
                <p className="mt-4 text-xl italic text-gray-400">"{movie.tagline}"</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieOverview;
