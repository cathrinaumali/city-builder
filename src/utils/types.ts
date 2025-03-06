export type House = {
    id: number | React.Key | null;
    name: string;
    floors: number;
    color: string;
};

export type HouseListProps = House;