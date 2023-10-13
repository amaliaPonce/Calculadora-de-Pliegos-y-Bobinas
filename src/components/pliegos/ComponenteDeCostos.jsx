import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function ComponenteDeCostos({ pliegosNecesarios, onCostosChange }) {
  const [costoTinta, setCostoTinta] = useState(0);
  const [costoPapel, setCostoPapel] = useState(0);
  const [costoLaminado, setCostoLaminado] = useState(0.1);

  useEffect(() => {
    const calcularCostos = () => {
      const costoTotalTinta = isNaN(costoTinta)
        ? 0
        : pliegosNecesarios * costoTinta;
      const costoTotalPapel = isNaN(costoPapel)
        ? 0
        : pliegosNecesarios * costoPapel;
      const costoTotalLaminado = isNaN(costoLaminado)
        ? 0
        : pliegosNecesarios * costoLaminado;

      const nuevosCostos = {
        costoTotalTinta,
        costoTotalPapel,
        costoTotalLaminado,
      };

      if (onCostosChange) {
        onCostosChange(nuevosCostos);
      }
    };

    calcularCostos();
  }, [
    costoTinta,
    costoPapel,
    costoLaminado,
    pliegosNecesarios,
    onCostosChange,
  ]);

  const handleInputChange = (e, setter) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      // Verifica que el valor sea un número o decimal
      setter(value);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Costos:</h1>
      <p>Pliegos a usar: {pliegosNecesarios}</p>
      <div className="my-4">
        <div className="mb-4">
          <label htmlFor="costoTinta" className="block mb-2">
            Costo de tinta (color/bn):
          </label>
          <input
            type="text"
            id="costoTinta"
            value={costoTinta}
            onChange={(e) => handleInputChange(e, setCostoTinta)}
            className="w-full p-3 rounded-lg border border-blue-400 focus:outline-none focus:border-blue-600 text-gray-700"
          />
        </div>
      </div>
      <div className="my-4">
        <div className="mb-4">
          <label htmlFor="costoPapel" className="block mb-2">
            Costo por papel:
          </label>
          <input
            type="text"
            id="costoPapel"
            value={costoPapel}
            onChange={(e) => handleInputChange(e, setCostoPapel)}
            className="w-full p-3 rounded-lg border border-blue-400 focus:outline-none focus:border-blue-600 text-gray-700"
          />
        </div>
      </div>
      <div className="my-4">
        <div className="mb-4">
          <label htmlFor="costoLaminado" className="block mb-2">
            Costo por laminado:
          </label>
          <input
            type="text"
            id="costoLaminado"
            value={costoLaminado}
            onChange={(e) => handleInputChange(e, setCostoLaminado)}
            className="w-full p-3 rounded-lg border border-blue-400 focus:outline-none focus:border-blue-600 text-gray-700"
          />
        </div>
      </div>
    </div>
  );
}

ComponenteDeCostos.propTypes = {
  pliegosNecesarios: PropTypes.number.isRequired,
  onCostosChange: PropTypes.func.isRequired,
};

export default ComponenteDeCostos;
