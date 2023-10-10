// ComponenteDeCostos.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function ComponenteDeCostos({ pliegosNecesarios, onCostosChange }) {
  const [costoTinta, setCostoTinta] = useState(0.1);
  const [costoPapel, setCostoPapel] = useState(0.1);
  const [costoLaminado, setCostoLaminado] = useState(0.1);

  useEffect(() => {
    const calcularCostos = () => {
      const costoTotalTinta = isNaN(costoTinta) ? 0 : pliegosNecesarios * costoTinta;
      const costoTotalPapel = isNaN(costoPapel) ? 0 : pliegosNecesarios * costoPapel;
      const costoTotalLaminado = isNaN(costoLaminado) ? 0 : pliegosNecesarios * costoLaminado;

      return {
        costoTotalTinta,
        costoTotalPapel,
        costoTotalLaminado,
      };
    };

    const nuevosCostos = calcularCostos();

    if (onCostosChange) {
      onCostosChange(nuevosCostos);
    }
  }, [costoTinta, costoPapel, costoLaminado, pliegosNecesarios, onCostosChange]);

  const handleInputChange = (e, setter) => {
    const value = parseFloat(e.target.value);
    setter(isNaN(value) ? 0 : value);
  };

  return (
    <div>
      <h1>Costos:</h1>
      <p>Pliegos a usar: {pliegosNecesarios}</p>
      <h2>Costos por tinta</h2>
      <label>
        Costo por tinta (color/bn):
        <input
          type="number"
          step="0.01"
          value={costoTinta}
          onChange={(e) => handleInputChange(e, setCostoTinta)}
        />
      </label>
      <p>Costo Total de Tinta: {(pliegosNecesarios * costoTinta).toFixed(2)} €</p>
      <h2>Costos por papel</h2>
      <label>
        Costo por papel:
        <input
          type="number"
          step="0.01"
          value={costoPapel}
          onChange={(e) => handleInputChange(e, setCostoPapel)}
        />
      </label>
      <p>Costo Total de papel: {(pliegosNecesarios * costoPapel).toFixed(2)} €</p>
      <h2>Costos por laminado</h2>
      <label>
        Costo por laminado:
        <input
          type="number"
          step="0.01"
          value={costoLaminado}
          onChange={(e) => handleInputChange(e, setCostoLaminado)}
        />
      </label>
      <p>Costo Total de laminado: {(pliegosNecesarios * costoLaminado).toFixed(2)} €</p>
    </div>
  );
}

ComponenteDeCostos.propTypes = {
  pliegosNecesarios: PropTypes.number.isRequired,
  onCostosChange: PropTypes.func.isRequired,
};

export default ComponenteDeCostos;
