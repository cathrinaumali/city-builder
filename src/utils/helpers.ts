
import { House } from "./types";
export const getHouses = (): House[] => {
    const data = localStorage.getItem('houses');
    return data ? JSON.parse(data) : [];
};

export const saveHouses = (houses: Array<House>) => {
    localStorage.setItem('houses', JSON.stringify(houses));
};
