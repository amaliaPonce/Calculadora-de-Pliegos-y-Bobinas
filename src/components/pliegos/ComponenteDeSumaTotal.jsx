import { useState } from "react";
import PropTypes from "prop-types";

function ComponenteDeSumaTotal({ costos }) {
  const [porcentaje, setPorcentaje] = useState(0); // Estado para almacenar el porcentaje

  // Calcula el costo total general con el porcentaje
  const costoTotalGeneral = (
    costos.costoTotalTinta +
    costos.costoTotalPapel +
    costos.costoTotalLaminado
  ).toFixed(2);

  // Calcula el costo total general con el porcentaje adicional
  const costoTotalGeneralConPorcentaje = (
    parseFloat(costoTotalGeneral) +
    parseFloat(costoTotalGeneral) * (porcentaje / 100)
  ).toFixed(2);

  return (
    <div className="p-4 border rounded-lg border-gray-300 mt-4">
      <h1 className="text-2xl font-semibold mb-4">Suma de los costos:</h1>
      <div className="mb-4">
        <p className="text-blue-600 text-lg font-semibold">
          Costo Total de Tinta:{" "}
          <span className="text-black">
            {costos.costoTotalTinta.toFixed(2)}€
          </span>
        </p>
      </div>
      <div className="mb-4">
        <p className="text-blue-600 text-lg font-semibold">
          Costo Total de Papel:{" "}
          <span className="text-black">
            {costos.costoTotalPapel.toFixed(2)}€
          </span>
        </p>
      </div>
      <div className="mb-4">
        <p className="text-blue-600 text-lg font-semibold">
          Costo Total de Laminado:{" "}
          <span className="text-black">
            {costos.costoTotalLaminado.toFixed(2)}€
          </span>
        </p>
      </div>
      <h2 className="text-xl font-semibold mb-2">Costo Total General:</h2>
      <div>
        <p className="text-blue-600 text-lg font-semibold">
          {costoTotalGeneral}€
        </p>
      </div>

      <div className="mt-4 items-center">
        <p className="text-blue-600 text-l font-semibold ">
          Añadir porcentaje:
        </p>
        <input
          type="number"
          value={porcentaje}
          onChange={(e) => setPorcentaje(e.target.value)}
          className="w-16 border rounded-lg border-blue-400 text-center py-1 focus:outline-none focus:border-blue-600 mt-2"
        />
        %<p className="text-blue-600 text-l font-semibold mt-2"> a cobrar:</p>
        <span className="text-black">{costoTotalGeneralConPorcentaje}€</span>
      </div>
    </div>
  );
}

ComponenteDeSumaTotal.propTypes = {
  costos: PropTypes.shape({
    costoTotalTinta: PropTypes.number.isRequired,
    costoTotalPapel: PropTypes.number.isRequired,
    costoTotalLaminado: PropTypes.number.isRequired,
  }).isRequired,
  onCostosChange: PropTypes.func.isRequired,
};

export default ComponenteDeSumaTotal;
