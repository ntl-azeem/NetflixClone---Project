'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useMovies } from '../../hooks/useMovies';
import { useFavorites } from '../../hooks/useFavorites';
import { useWatchLater } from '../../hooks/useWatchLater'; // add this at the top

const DEFAULT_AVATAR = 'https://www.gravatar.com/avatar/?d=mp&f=y';



export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { data: movies, isLoading: moviesLoading } = useMovies();
  const {
    data: favorites,
    addFavorite,
    removeFavorite,
    isFavoriting,
  } = useFavorites();

  const {
  data: watchLater,
  addWatchLater,
  removeWatchLater,
  isToggling: isWatchLaterToggling,
  } = useWatchLater();

  // Fetch user info from backend using token
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios
      .get('http://localhost:3000/users/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        router.push('/login');
      });
  }, []);

  if (!user) return <div className="container mt-5">Loading dashboard...</div>;

  return (
    <div className="container mt-5">
      {/* User Profile Info */}
      <div className="text-center">
        <h2>👋 {user.welcomeMessage}</h2>
        <p className="text-muted">{user.email}</p>
        <img
          src={user.avatar || DEFAULT_AVATAR}
          alt="Avatar"
          width={120}
          height={120}
          className="rounded-circle border my-3"
        />
        <p className="lead">📝 {user.bio?.trim() || 'No bio added yet.'}</p>
        <p className="text-secondary">
          📅 Member since: {new Date(user.memberSince).toLocaleDateString()}
        </p>
      </div>

      <hr className="my-5" />

      {/* Movies Section */}
      <h3 className="mb-4">🎬 Recommended TV Shows</h3>

      {moviesLoading ? (
        <p>Loading movies...</p>
      ) : (
        <div className="row">
          {movies?.map((movie) => {
            const isFav = favorites?.some((f) => f.movieId === movie.id.toString());
            const isLater = watchLater?.some((w) => w.movieId === movie.id.toString());

            const handleToggleFavorite = () => {
              if (isFav) {
                removeFavorite(movie.id.toString());
              } else {
                addFavorite({
                  movieId: movie.id.toString(),
                  title: movie.name,
                  poster: movie.image?.medium || '',
                });
              }
            };

            const handleToggleWatchLater = () => {
              if (isLater) {
                removeWatchLater(movie.id.toString());
              } else {
                addWatchLater({
                  movieId: movie.id.toString(),
                  title: movie.name,
                  poster: movie.image?.medium || '',
                });
              }
            };

            return (
              <div className="col-md-3 mb-4" key={movie.id}>
                <div className="card h-100 shadow-sm">
                  {movie.image?.medium && (
                    <img
                      src={movie.image.medium}
                      className="card-img-top"
                      alt={movie.name}
                    />
                  )}
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="card-title mb-1">{movie.name}</h5>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={handleToggleFavorite}
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {isFav ? '⭐' : '☆'}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={handleToggleWatchLater}
                      title={isLater ? 'Remove from watch later' : 'Add to watch later'}
                    >
                      {isLater ? '⏱️' : '🕒'}
                    </button>
                  </div>
                </div>

                <p className="card-text text-muted mt-2" style={{ fontSize: '14px' }}>
                  {movie.genres.join(', ')}
                </p>
              </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
