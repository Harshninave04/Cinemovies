import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  // Fetch data effect remains the same
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

    const fetchMovieCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=f2670df91b04be9ea41c364827883e16`,
        );
        const data = await response.json();
        setCast(data.cast.slice(0, 10));
      } catch (error) {
        console.error('Error fetching movie cast:', error);
      }
    };

    const fetchSimilarMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=f2670df91b04be9ea41c364827883e16`,
        );
        const data = await response.json();
        setSimilarMovies(data.results.slice(0, 6));
      } catch (error) {
        console.error('Error fetching similar movies:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=f2670df91b04be9ea41c364827883e16`,
        );
        const data = await response.json();
        setReviews(data.results.slice(0, 3));
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchMovieDetails();
    fetchMovieCast();
    fetchSimilarMovies();
    fetchReviews();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-800 mb-4" />
          <div className="h-4 w-32 md:w-48 bg-gray-800 rounded" />
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
    <div className="min-h-screen bg-black text-white overflow-x-hidden overflow-y-hidden">
      {/* Mobile Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-lg z-20 flex items-center p-4 text-white">
        <button onClick={() => navigate(-1)} className="flex items-center space-x-2">
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-300 hover:text-white transition-colors" />
          <span className="text-base md:text-lg">Back</span>
        </button>
        <h1 className="flex-grow text-center text-lg md:text-xl font-semibold truncate px-4">
          {movie.title}
        </h1>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen pt-16">
        {/* Background Image Section */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full min-h-screen">
            <img
              src={imageUrl}
              alt=""
              className="absolute w-full h-[600px] md:h-fit object-cover object-center 
                 sm:object-center md:object-center
                 opacity-60 transition-opacity duration-300"
            />
            {/* Mobile-optimized gradient overlays */}
            <div
              className="absolute inset-0 bg-gradient-to-t 
                    from-black via-black/90 to-black/40 
                    sm:via-black/80 sm:to-black/20"
            />

            <div
              className="absolute inset-0 bg-gradient-to-r 
                    from-black/20 via-black/70 to-transparent
                    sm:via-black/50"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 ml-3 md:ml-8">
            {/* Left Column - Poster and Actions */}
            <div
              className={`lg:col-span-5 flex flex-col items-center lg:items-start space-y-6 transition-all duration-1000 ${
                isHeaderVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}>
              {/* Poster */}
              <div className="relative group w-64 md:w-80">
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-full rounded-2xl shadow-2xl transform transition-transform group-hover:scale-105"
                />
                <button className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                  <Play className="w-12 h-12 md:w-16 md:h-16 text-white" strokeWidth={1.5} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Heart className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">Favorite</span>
                </button>
                <button className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <BookmarkPlus className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">Watchlist</span>
                </button>
                <button className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>

            {/* Right Column - Movie Details */}
            <div
              className={`lg:col-span-7 flex flex-col space-y-6 md:space-y-8 transition-all duration-1000 delay-300 ${
                isHeaderVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}>
              {/* Title and Rating */}
              <div className="text-center lg:text-left">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  {movie.title}
                  <span className="text-xl md:text-2xl text-gray-400 ml-2 md:ml-4">
                    ({new Date(movie.release_date).getFullYear()})
                  </span>
                </h1>
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-current" />
                  <span className="text-xl md:text-2xl font-bold">
                    {movie.vote_average?.toFixed(1)}
                  </span>
                  <span className="text-gray-400">/ 10</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
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
                    className="bg-white/5 rounded-lg p-3 md:p-4 hover:bg-white/10 transition-colors">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 mb-2 text-gray-400" />
                    <div className="text-xs md:text-sm text-gray-400">{label}</div>
                    <div className="text-sm md:text-base font-semibold">{value}</div>
                  </div>
                ))}
              </div>

              {/* Overview */}
              <div className="text-center lg:text-left">
                <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Overview</h2>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  {movie.overview}
                </p>
                {movie.tagline && (
                  <p className="mt-4 text-lg md:text-xl italic text-gray-400">"{movie.tagline}"</p>
                )}
              </div>
            </div>
          </div>

          {/* Cast Section */}
          <div className="mt-12 md:mt-16">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {cast.map((actor) => (
                <div key={actor.id} className="flex flex-col items-center text-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                  />
                  <span className="mt-2 font-semibold text-sm md:text-base">{actor.name}</span>
                  <span className="text-xs md:text-sm text-gray-400">{actor.character}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Movies Section */}
          <div className="mt-12 md:mt-16">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Similar Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {similarMovies.map((movie) => (
                <Link
                  to={`/movie/${movie.id}`}
                  key={movie.id}
                  className="relative group aspect-[2/3]">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg shadow-lg w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                    <h3 className="text-white font-semibold text-sm md:text-base text-center px-2">
                      {movie.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12 md:mt-16">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">User Reviews</h2>
            {reviews.length > 0 ? (
              <div className="space-y-6 md:space-y-8">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-800/50 p-4 md:p-6 rounded-lg">
                    <h3 className="font-semibold text-base md:text-lg">{review.author}</h3>
                    <p className="text-sm md:text-base text-gray-300 mt-2 line-clamp-4">
                      {review.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No reviews available for this movie.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieOverview;
