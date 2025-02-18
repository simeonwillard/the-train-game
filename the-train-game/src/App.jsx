import React, { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import board from './assets/board.jpg'
import './App.css'

function App() {
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const imgRef = useRef(null);

  const handleZoom = (event) => {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left; // x position within the element.
      const y = event.clientY - rect.top;  // y position within the element.

      const zoom = 2; // The zoom level to apply (2x zoom in this example)

      // Calculate new scale:
      const newScale = scale * zoom;
      setScale(newScale);

      // Calculate translation to center the click point
      const newTranslateX = translateX - (x / rect.width) * (rect.width * (zoom - 1));
      const newTranslateY = translateY - (y / rect.height) * (rect.height * (zoom - 1));

      setTranslateX(newTranslateX);
      setTranslateY(newTranslateY);
    }
  };

  const resetZoom = () => {
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
  };

  return (
    <>
      <div>
          <img 
            ref={imgRef}
            src={board} 
            className="board" 
            alt="React logo" 
            style={{
              transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
              transition: 'transform 0.3s ease',
              cursor: 'zoom-in'
            }}
            onScroll={handleZoom}
          />
      </div>
      <button onClick={resetZoom}>Reset Zoom</button>
    </>
  );
}

export default App;