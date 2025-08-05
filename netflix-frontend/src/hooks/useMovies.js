import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useMovies() {
  return useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const res = await axios.get('https://api.tvmaze.com/shows');
      return res.data.slice(0, 12); // limit to 12 shows
    },
  });
}
