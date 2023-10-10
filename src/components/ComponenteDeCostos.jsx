import { useState } from "react";
import PropTypes from "prop-types";

function ComponenteDeCostos({ pliegosNecesarios }) {
  const [costoTinta, setCostoTinta] = useState(0.1);
  const [costoPapel, setCostoPapel] = useState(0.1);
  const [costoLaminado, setCostoLaminado] = useState(0.1);

  const costoTotalTinta = isNaN(costoTinta) ? 0 : pliegosNecesarios * costoTinta;
  const costoTotalPapel = isNaN(costoPapel) ? 0 : pliegosNecesarios * costoPapel;
  const costoTotalLaminado = isNaN(costoLaminado) ? 0 : pliegosNecesarios * costoLaminado;

  const handleTintaChange = (e) => {
    const value = parseFloat(e.target.value);
    setCostoTinta(isNaN(value) ? 0 : value);
  };

  const handlePapelChange = (e) => {
    const value = parseFloat(e.target.value);
    setCostoPapel(isNaN(value) ? 0 : value);
  };

  const handleLaminadoChange = (e) => {
    const value = parseFloat(e.target.value);
    setCostoLaminado(isNaN(value) ? 0 : value);
  };

  return (
    <div>
      <h1>Costos:</h1>
      <p>Pliegos a usar: {pliegosNecesarios}</p>
      <h2>Costos por tinta</h2>{" "}
      <label>
        Costo por tinta (color/bn):
        <input
          type="number"
          step="0.01"
          value={isNaN(costoTinta) ? "" : costoTinta} // Mostrar campo vacío en lugar de NaN
          onChange={handleTintaChange}
        />
      </label>
      <p>
        Costo Total de Tinta: {costoTotalTinta.toFixed(2)} €
      </p>
      <h2>Costos por papel</h2>
      <label>
        Costo por papel:
        <input 
          type="number" 
          step="0.01" 
          value={isNaN(costoPapel) ? "" : costoPapel} // Mostrar campo vacío en lugar de NaN
          onChange={handlePapelChange}
        />
      </label>
      <p>
        Costo Total de papel: {costoTotalPapel.toFixed(2)} €
      </p>
      <h2>Costos por laminado</h2>
      <label>
        Costo por laminado:
        <input 
          type="number" 
          step="0.01" 
          value={isNaN(costoLaminado) ? "" : costoLaminado} 
          onChange={handleLaminadoChange}
        />
      </label>
      <p>
        Costo Total de laminado: {costoTotalLaminado.toFixed(2)} €
      </p>
    </div>
  );
}

ComponenteDeCostos.propTypes = {
  pliegosNecesarios: PropTypes.number.isRequired,
};

export default ComponenteDeCostos;
