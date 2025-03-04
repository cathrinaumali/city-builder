import { useEffect, useRef } from 'react';
import House from '../HouseCanvas';
import { HouseListProps } from '../../utils/types';

type HouseListCanvasProps = {
  houses: HouseListProps[];
};

const HouseListCanvas = ({ houses }: HouseListCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the end when new house is added
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: 'smooth'
      });
    }
  }, [houses.length]); // Only run when houses array length changes

  return (
    <div 
      ref={containerRef}
      className="w-full flex gap-4 items-end flex-row h-[800px] overflow-x-auto"
    >
      {houses.map(({ id, name, floors, color }: HouseListProps) => (
        <House 
          key={id} 
          houseName={name} 
          floors={floors} 
          wallColor={color} 
          roofColor="#fff" 
          doorColor="#fff" 
        />
      ))}
    </div>
  );
};

export default HouseListCanvas; 