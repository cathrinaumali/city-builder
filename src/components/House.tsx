'use client';
import { Stage, Layer, Rect, Line, Text } from 'react-konva';


type HouseProps = {
  floors: number;
  wallColor: string;
  roofColor: string;
  doorColor: string;
  houseName?: string;
};

const House = ({ floors, wallColor, roofColor, doorColor, houseName }: HouseProps) => {
  const floorHeight = 60;
  const houseWidth = 120;
  const defaultHouseName = houseName || `${floors} Floor(s) House`

  return (
    <Stage width={300} height={400}>
      <Layer>
        {/* Roof */}
        <Line
          points={[150, 50, 220, 100, 80, 100]}
          closed
          fill={roofColor}
          stroke="black"
        />
        {/* Floors */}
        {[...Array(floors)].map((_, index) => (
          <>
            <Rect
              key={index}
              x={90}
              y={100 + index * floorHeight}
              width={houseWidth}
              height={floorHeight}
              fill={wallColor}
              stroke="black"
            />
            {index !== floors - 1 && <>
              <Rect
                x={110}
                y={100 + index * floorHeight + 12}
                width={30}
                height={30}
                fill={doorColor}
                stroke="black"
              />
              <Rect
                x={160}
                y={100 + index * floorHeight + 12}
                width={30}
                height={30}
                fill={doorColor}
                stroke="black"
              />
            </>}
          </>
        ))}

        {/* Door */}
        <>
          <Rect
            x={110}
            y={100 + (floors - 1) * floorHeight + 10}
            width={30}
            height={30}
            fill={doorColor}
            stroke="black"
          />
          <Rect
            x={155}
            y={100 + (floors - 1) * floorHeight + 10}
            width={40}
            height={50}
            fill={doorColor}
            stroke="black"
          />
        </>

        {/* House Name */}
        <Text text={defaultHouseName} x={10} y={10} fontSize={20} />
      </Layer>
    </Stage>
  );
};

export default House;
