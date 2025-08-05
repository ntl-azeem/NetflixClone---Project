import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const getToken = () => localStorage.getItem('access_token');

export function useWatchLater() {
  const queryClient = useQueryClient();

  const watchLaterQuery = useQuery({
    queryKey: ['watch-later'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/watch-later', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return res.data;
    },
  });

  const addMutation = useMutation({
    mutationFn: (movie) =>
      axios.post('http://localhost:3000/watch-later', movie, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['watch-later']);
    },
  });

  const removeMutation = useMutation({
    mutationFn: (movieId) =>
      axios.delete(`http://localhost:3000/watch-later/${movieId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['watch-later']);
    },
  });

  return {
    ...watchLaterQuery,
    addWatchLater: addMutation.mutate,
    removeWatchLater: removeMutation.mutate,
    isToggling: addMutation.isLoading || removeMutation.isLoading,
  };
}
