import { useState } from 'react';
import './App.css';
import CalculadoraPliegos from './components/CalculadoraPliegos';
import CalculadoraPliegosNecesarios from './components/CalculadoraPliegosNecesarios';
import ComponenteDeCostos from './components/ComponenteDeCostos.jsx';

function App() {
  // Definimos estados

  //Resultado horizontal o vertical del componente CalculadoraPliegos
  const [resultadoHorizontal, setResultadoHorizontal] = useState(0);
  const [resultadoVertical, setResultadoVertical] = useState(0);

  //Resultado de la totalidad de pliegos
  const [pliegosNecesarios, setPliegosNecesarios] = useState(0);

  // Función para actualizar los resultados en horizontal y vertical
  const actualizarResultados = (horizontal, vertical) => {
    setResultadoHorizontal(horizontal);
    setResultadoVertical(vertical);
  };

  // Función para actualizar pliegos necesarios
  const actualizarPliegosNecesarios = (nuevosPliegosNecesarios) => {
    setPliegosNecesarios(nuevosPliegosNecesarios);
  };

  return (
    <div className="App">
      <CalculadoraPliegos
        onResultadosActualizados={actualizarResultados}
        resultadoHorizontal={resultadoHorizontal}
        resultadoVertical={resultadoVertical}
        pliegosNecesarios={pliegosNecesarios}
      />

      <CalculadoraPliegosNecesarios
        resultadoHorizontal={resultadoHorizontal}
        resultadoVertical={resultadoVertical}
        onPliegosNecesariosChange={actualizarPliegosNecesarios}
      />

      <ComponenteDeCostos pliegosNecesarios={pliegosNecesarios} />
    </div>
  );
}

export default App;
