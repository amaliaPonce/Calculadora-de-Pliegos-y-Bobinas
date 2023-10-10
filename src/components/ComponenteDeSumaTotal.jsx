import PropTypes from "prop-types";

function ComponenteDeSumaTotal({ costos }) {
  return (
    <div>
      <h1>Suma de los costos:</h1>
      <p>Costo Total de Tinta: {costos.costoTotalTinta.toFixed(2)} €</p>
      <p>Costo Total de Papel: {costos.costoTotalPapel.toFixed(2)} €</p>
      <p>Costo Total de Laminado: {costos.costoTotalLaminado.toFixed(2)} €</p>
      <h2>Costo Total General:</h2>
      <p>
        {(
          costos.costoTotalTinta +
          costos.costoTotalPapel +
          costos.costoTotalLaminado
        ).toFixed(2)}{" "}
        €
      </p>
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
