
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchHouses = () => {
  const houses = localStorage.getItem('houses');
  return houses ? JSON.parse(houses) : [];
};

export const useHouses = () => useQuery(['houses'], fetchHouses);

const saveHouses = (houses) => {
  localStorage.setItem('houses', JSON.stringify(houses));
};

export const useSaveHouses = () => {
  const queryClient = useQueryClient();
  return useMutation(saveHouses, {
    onSuccess: () => {
      queryClient.invalidateQueries(['houses']);
    },
  });
};
