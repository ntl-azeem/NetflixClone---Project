'use client';

import { useFavorites } from '../../hooks/useFavorites';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FavoritesPage() {
  const router = useRouter();
  const {
    data: favorites,
    isLoading,
    removeFavorite,
    isFavoriting,
    } = useFavorites();

  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
    } else {
      setTokenChecked(true);
    }
  }, []);

  if (!tokenChecked || isLoading) {
    return <div className="container mt-5">Loading favorites...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">⭐ Your Favorite Shows</h2>
      {favorites?.length === 0 ? (
        <p>You haven't added any favorites yet.</p>
      ) : (
        <div className="row">
            {favorites.map((item) => (
            <div className="col-md-3 mb-4" key={item.movieId}>
                <div className="card h-100 shadow-sm">
                {item.poster && (
                    <img src={item.poster} className="card-img-top" alt={item.title} />
                )}
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <button
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={() => removeFavorite(item.movieId)}
                    >
                    ❌ Remove
                    </button>
                </div>
                </div>
            </div>
            ))}
        </div>
      )}
    </div>
  );
}
