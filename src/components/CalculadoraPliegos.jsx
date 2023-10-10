import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

function CalculadoraPliegos({
  onResultadosActualizados,
  resultadoHorizontal,
  resultadoVertical,
}) {
  const [dimensiones, setDimensiones] = useState({
    anchoPliego: '',
    altoPliego: '',
    anchoTarjeta: '',
    altoTarjeta: '',
    sangreTarjeta: '',
    medidaAdicional: '',
  });

  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      setDimensiones({
        ...dimensiones,
        [name]: value,
      });
    }
  };

  const calcularTarjetasEnPliego = useCallback(() => {
    const toMilimeters = (value) => parseFloat(value) * 10;
    const {
      anchoPliego,
      altoPliego,
      anchoTarjeta,
      altoTarjeta,
      sangreTarjeta,
      medidaAdicional,
    } = dimensiones;

    if (
      anchoPliego === '' ||
      altoPliego === '' ||
      anchoTarjeta === '' ||
      altoTarjeta === '' ||
      sangreTarjeta === '' ||
      medidaAdicional === ''
    ) {
      return;
    }

    const anchoPliegoNum = toMilimeters(anchoPliego);
    const altoPliegoNum = toMilimeters(altoPliego);
    const anchoTarjetaNum = toMilimeters(anchoTarjeta);
    const altoTarjetaNum = toMilimeters(altoTarjeta);
    const sangreTarjetaNum = toMilimeters(sangreTarjeta);
    const medidaAdicionalNum = toMilimeters(medidaAdicional);

    const anchoPliegoRestado = anchoPliegoNum - 2 * medidaAdicionalNum;
    const altoPliegoRestado = altoPliegoNum - 2 * medidaAdicionalNum;

    const tarjetasPorAncho = Math.floor(
      anchoPliegoRestado / (anchoTarjetaNum + 2 * sangreTarjetaNum)
    );
    const tarjetasPorAlto = Math.floor(
      altoPliegoRestado / (altoTarjetaNum + 2 * sangreTarjetaNum)
    );
    const totalTarjetasHorizontal = tarjetasPorAncho * tarjetasPorAlto;

    const tarjetasPorAnchoVertical = Math.floor(
      anchoPliegoRestado / (altoTarjetaNum + 2 * sangreTarjetaNum)
    );
    const tarjetasPorAltoVertical = Math.floor(
      altoPliegoRestado / (anchoTarjetaNum + 2 * sangreTarjetaNum)
    );
    const totalTarjetasVertical = tarjetasPorAnchoVertical * tarjetasPorAltoVertical;

    onResultadosActualizados(totalTarjetasHorizontal, totalTarjetasVertical);
  }, [onResultadosActualizados, dimensiones]);

  const handleCalcularClick = () => {
    // Verificar si alguno de los campos requeridos está vacío
    if (
      dimensiones.anchoPliego === '' ||
      dimensiones.altoPliego === '' ||
      dimensiones.anchoTarjeta === '' ||
      dimensiones.altoTarjeta === '' ||
      dimensiones.sangreTarjeta === '' ||
      dimensiones.medidaAdicional === ''
    ) {
      // Mostrar el mensaje de error
      setError(true);
      return;
    }

    // Si todos los campos están completos, calcular y mostrar resultados
    setError(false);
    calcularTarjetasEnPliego();
    setMostrarResultados(true);
  };

  useEffect(() => {
    calcularTarjetasEnPliego();
  }, [calcularTarjetasEnPliego]);

  return (
    <div>
      <h1>Calculadora de Tarjetas en Pliego</h1>
      <div>
        <label htmlFor="anchoPliego">Dimensiones del Pliego (mm):</label>
        <input
          type="number"
          id="anchoPliego"
          name="anchoPliego"
          placeholder="Ancho"
          value={dimensiones.anchoPliego}
          onChange={handleInputChange}
        />
        x
        <input
          type="number"
          id="altoPliego"
          name="altoPliego"
          placeholder="Alto"
          value={dimensiones.altoPliego}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="anchoTarjeta">Dimensiones de la Tarjeta (mm):</label>
        <input
          type="number"
          id="anchoTarjeta"
          name="anchoTarjeta"
          placeholder="Ancho"
          value={dimensiones.anchoTarjeta}
          onChange={handleInputChange}
        />
        x
        <input
          type="number"
          id="altoTarjeta"
          name="altoTarjeta"
          placeholder="Alto"
          value={dimensiones.altoTarjeta}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="sangreTarjeta">Sangre en la Tarjeta (mm):</label>
        <input
          type="number"
          id="sangreTarjeta"
          name="sangreTarjeta"
          placeholder="Sangre"
          value={dimensiones.sangreTarjeta}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="medidaAdicional">Medida Adicional al Pliego (mm):</label>
        <input
          type="number"
          id="medidaAdicional"
          name="medidaAdicional"
          placeholder="Medida Adicional"
          value={dimensiones.medidaAdicional}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleCalcularClick}>Calcular</button>
            {error && <p>Debe rellenar todos los campos.</p>}

      {mostrarResultados && !error && (
        <div>
          <p>Resultado Horizontal: {resultadoHorizontal} tarjetas</p>
          <p>Resultado Vertical: {resultadoVertical} tarjetas</p>
        </div>
      )}
    </div>
  );
}

CalculadoraPliegos.propTypes = {
  onResultadosActualizados: PropTypes.func.isRequired,
  resultadoHorizontal: PropTypes.number.isRequired,
  resultadoVertical: PropTypes.number.isRequired,
};

export default CalculadoraPliegos;
