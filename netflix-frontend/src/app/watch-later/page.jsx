'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWatchLater } from '../..//hooks/useWatchLater';

export default function WatchLaterPage() {
  const router = useRouter();
  const {
    data: watchLater,
    isLoading,
    removeWatchLater,
    isToggling,
    } = useWatchLater();
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
    return <div className="container mt-5">Loading Watch Later...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">⏱ Your Watch Later List</h2>

      {watchLater?.length === 0 ? (
        <p>You haven’t added anything to Watch Later yet.</p>
      ) : (
        <div className="row">
          {watchLater.map((item) => (
            <div className="col-md-3 mb-4" key={item.movieId}>
              <div className="card h-100 shadow-sm">
                {item.poster && (
                  <img
                    src={item.poster}
                    className="card-img-top"
                    alt={item.title}
                  />
                )}
                <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="text-muted small">
                    Added on {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <button
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={() => removeWatchLater(item.movieId)}
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
