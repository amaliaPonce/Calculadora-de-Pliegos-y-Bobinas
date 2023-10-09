// App.js
import React, { useState } from 'react';
import './App.css';
import CalculadoraPliegos from './components/CalculadoraPliegos';
import CalculadoraPliegosNecesarios from './components/CalculadoraPliegosNecesarios';

function App() {
  // Definir estado para almacenar los resultados
  const [resultadoHorizontal, setResultadoHorizontal] = useState(0);
  const [resultadoVertical, setResultadoVertical] = useState(0);

  // Función para actualizar los resultados
  const actualizarResultados = (horizontal, vertical) => {
    setResultadoHorizontal(horizontal);
    setResultadoVertical(vertical);
  };

  return (
    <div className="App">
      {/* Renderizar CalculadoraPliegos y pasar la función para actualizar resultados */}
      <CalculadoraPliegos
        onResultadosActualizados={actualizarResultados}
        resultadoHorizontal={resultadoHorizontal}
        resultadoVertical={resultadoVertical}
      />

      {/* Renderizar CalculadoraPliegosNecesarios y pasar los resultados como props */}
      <CalculadoraPliegosNecesarios
        resultadoHorizontal={resultadoHorizontal}
        resultadoVertical={resultadoVertical}
      />
    </div>
  );
}

export default App;
