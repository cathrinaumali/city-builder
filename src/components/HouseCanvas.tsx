'use client';
import { Stage, Layer, Rect, Line, Text } from 'react-konva';


type HouseProps = {
  floors: number;
  wallColor: string;
  roofColor: string;
  doorColor: string;
  houseName?: string;
};

const HouseCanvas = ({ floors, wallColor, roofColor, doorColor, houseName }: HouseProps) => {
  const floorHeight = 60;
  const houseWidth = 130;
  const defaultHouseName = houseName || `${floors} Floor(s) House`
  const totalHeight = (floorHeight * floors) + 150; 
  const canvasWidth = 140;
  const startX = (canvasWidth - houseWidth) / 2;  

  return (
    <Stage width={canvasWidth} height={totalHeight} minWidth={canvasWidth} minHeight={400}>
      <Layer>
        {/* Roof */}
        <Line
          points={[startX + 65, 50, startX + houseWidth, 100, startX, 100]}
          closed
          fill={roofColor}
          stroke="black"
        />
        {/* Floors */}
        {[...Array(floors)].map((_, index) => (
          <>
            <Rect
              key={index}
              x={startX}
              y={100 + index * floorHeight}
              width={houseWidth}
              height={floorHeight}
              fill={wallColor}
              stroke="black"
            />
            {index !== floors - 1 && <>
              <Rect
                x={startX + 20}
                y={100 + index * floorHeight + 12}
                width={32}
                height={30}
                fill={doorColor}
                stroke="black"
              />
              <Rect
                x={startX + 78}
                y={100 + index * floorHeight + 12}
                width={32}
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
            x={startX + 20}
            y={100 + (floors - 1) * floorHeight + 10}
            width={32}
            height={30}
            fill={doorColor}
            stroke="black"
          />
          <Rect
            x={startX + 70}
            y={100 + (floors - 1) * floorHeight + 10}
            width={40}
            height={50}
            fill={doorColor}
            stroke="black"
          />
        </>

        {/* House Name */}
        <Text 
          text={defaultHouseName} 
          x={0} 
          y={totalHeight - 40} 
          fontSize={16} 
          width={140}
          align="center"
        />
      </Layer>
    </Stage>
  );
};

export default HouseCanvas;
