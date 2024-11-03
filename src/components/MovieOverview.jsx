import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, Calendar, Users, Award, Info } from 'lucide-react';

const MovieOverview = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=f2670df91b04be9ea41c364827883e16`,
        );
        const data = await response.json();
        setMovie(data);
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
      <div className="min-h-screen bg-gray-900 p-4">
        <div className="animate-pulse">
          <div className="w-full h-96 bg-gray-800 rounded-xl" />
          <div className="max-w-4xl mx-auto mt-8 space-y-4">
            <div className="h-12 bg-gray-800 rounded w-3/4" />
            <div className="h-6 bg-gray-800 rounded w-1/4" />
            <div className="h-32 bg-gray-800 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white bg-red-500/10 px-4 py-3 rounded-lg flex items-center">
          <Info className="w-5 h-5 mr-2" />
          <span>Failed to load movie details</span>
        </div>
      </div>
    );
  }

  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '/api/placeholder/800/400';

  const releaseDate = new Date(movie.release_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0">
          <img src={imageUrl} alt={movie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{movie.title}</h1>

            <div className="flex flex-wrap gap-4 text-gray-300 mb-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span>{movie.vote_average?.toFixed(1)}/10</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-1" />
                <span>{movie.runtime} min</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-1" />
                <span>{releaseDate}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-1" />
                <span>{movie.vote_count?.toLocaleString()} votes</span>
              </div>
              {movie.budget > 0 && (
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-1" />
                  <span>${(movie.budget / 1000000).toFixed(1)}M budget</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>

          {movie.tagline && (
            <blockquote className="mt-6 border-l-4 border-blue-500 pl-4 italic text-gray-400">
              {movie.tagline}
            </blockquote>
          )}
        </div>

        {movie.production_companies?.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">Production Companies</h3>
            <div className="flex flex-wrap gap-4">
              {movie.production_companies.map((company) => (
                <div key={company.id} className="px-4 py-2 bg-gray-800/30 rounded-lg text-gray-300">
                  {company.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieOverview;
