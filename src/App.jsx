import { useState } from 'react';
import './App.css';
import CalculadoraPliegos from './components/CalculadoraPliegos';
import CalculadoraPliegosNecesarios from './components/CalculadoraPliegosNecesarios';
import ComponenteDeCostos from './components/ComponenteDeCostos';
import ComponenteDeSumaTotal from './components/ComponenteDeSumaTotal';

function App() {
  // Definimos estados

  // Resultado horizontal o vertical del componente CalculadoraPliegos
  const [resultadoHorizontal, setResultadoHorizontal] = useState(0);
  const [resultadoVertical, setResultadoVertical] = useState(0);

  // Resultado de la totalidad de pliegos
  const [pliegosNecesarios, setPliegosNecesarios] = useState(0);

  // Estado para almacenar los costos
  const [costos, setCostos] = useState({
    costoTotalTinta: 0,
    costoTotalPapel: 0,
    costoTotalLaminado: 0,
  });

  // Función para actualizar los resultados en horizontal y vertical
  const actualizarResultados = (horizontal, vertical) => {
    setResultadoHorizontal(horizontal);
    setResultadoVertical(vertical);
  };

  // Función para actualizar pliegos necesarios
  const actualizarPliegosNecesarios = (nuevosPliegosNecesarios) => {
    setPliegosNecesarios(nuevosPliegosNecesarios);
  };

// Función para actualizar costos desde ComponenteDeCostos
const actualizarCostos = nuevosCostos => {
  setCostos(prevCostos => {
    if (
      prevCostos.costoTotalTinta !== nuevosCostos.costoTotalTinta ||
      prevCostos.costoTotalPapel !== nuevosCostos.costoTotalPapel ||
      prevCostos.costoTotalLaminado !== nuevosCostos.costoTotalLaminado
    ) {
      return nuevosCostos;
    }
    // Si no, devolver el estado anterior para evitar un renderizado innecesario
    return prevCostos;
  });
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

      <ComponenteDeCostos
        pliegosNecesarios={pliegosNecesarios}
        onCostosChange={actualizarCostos}
      />

      <ComponenteDeSumaTotal costos={costos} onCostosChange={actualizarCostos} />
    </div>
  );
}

export default App;
