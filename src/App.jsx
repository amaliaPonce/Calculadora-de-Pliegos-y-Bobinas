import { useState } from "react";
import "./App.css";
import CalculadoraPliegos from "./components/pliegos/CalculadoraPliegos";
import CalculadoraPliegosNecesarios from "./components/pliegos/CalculadoraPliegosNecesarios";
import ComponenteDeCostos from "./components/pliegos/ComponenteDeCostos";
import ComponenteDeSumaTotal from "./components/pliegos/ComponenteDeSumaTotal";
import ComponenteNav from "./components/nav/ComponenteNav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CalculadoraBobinas from "./components/bobinas/CalculadoraBobinas";
import Tickets from "./components/tickets/Tickets";
import Copiativos from "./components/copiativos/Copiativos";
function App() {
  const [resultadoHorizontal, setResultadoHorizontal] = useState(0);
  const [resultadoVertical, setResultadoVertical] = useState(0);
  const [pliegosNecesarios, setPliegosNecesarios] = useState(0);
  const [costos, setCostos] = useState({
    costoTotalTinta: 0,
    costoTotalPapel: 0,
    costoTotalLaminado: 0,
  });
  
  
  const actualizarResultados = (horizontal, vertical) => {
    setResultadoHorizontal(horizontal);
    setResultadoVertical(vertical);
  };

  const actualizarPliegosNecesarios = (nuevosPliegosNecesarios) => {
    setPliegosNecesarios(nuevosPliegosNecesarios);
  };

  const actualizarCostos = (nuevosCostos) => {
    // Compara los nuevos costos con los costos existentes
    if (
      nuevosCostos.costoTotalTinta !== costos.costoTotalTinta ||
      nuevosCostos.costoTotalPapel !== costos.costoTotalPapel ||
      nuevosCostos.costoTotalLaminado !== costos.costoTotalLaminado
    ) {
      // Actualiza el estado solo si los costos han cambiado
      setCostos(nuevosCostos);
    }
  };
  
  const onResultadosActualizados = (resultado) => {
    console.log("Resultado actualizado:", resultado);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ComponenteNav />} />
          <Route
            path="/pliegos"
            element={
              <>
                <CalculadoraPliegos
                  onResultadosActualizados={actualizarResultados}
                  resultadoHorizontal={resultadoHorizontal}
                  resultadoVertical={resultadoVertical}
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
                <ComponenteDeSumaTotal
                  costos={costos}
                  onCostosChange={actualizarCostos}
                  onResultadosActualizados={onResultadosActualizados}
                />
              </>
            }
          />
          <Route
            path="/bobinas"
            element={
              <>
              <CalculadoraBobinas />

              </>
            }
          />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/copiativos" element={<Copiativos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
