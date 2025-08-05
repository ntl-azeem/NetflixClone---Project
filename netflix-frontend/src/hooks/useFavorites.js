import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const getToken = () => localStorage.getItem('access_token');

export function useFavorites() {
  const queryClient = useQueryClient();
  

  const favoritesQuery = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/favorites', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return res.data;
    },
  });

  const addMutation = useMutation({
    mutationFn: (movie) =>
      axios.post('http://localhost:3000/favorites', movie, {
        headers: { Authorization: `Bearer ${getToken()}` },
      }),
    onSuccess: () => queryClient.invalidateQueries(['favorites']),
  });

  const removeMutation = useMutation({
    mutationFn: (movieId) =>
      axios.delete(`http://localhost:3000/favorites/${movieId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      }),
    onSuccess: () => queryClient.invalidateQueries(['favorites']),
  });

  return {
    ...favoritesQuery,
    addFavorite: addMutation.mutate,
    removeFavorite: removeMutation.mutate,
    isFavoriting: addMutation.isLoading || removeMutation.isLoading,
  };
}
