import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "../../App.css";
import "../../index.css";
import BackButton from "../nav/BackButton";

function CalculadoraPliegos({
  onResultadosActualizados,
  resultadoHorizontal,
  resultadoVertical,
}) {
  const [dimensiones, setDimensiones] = useState({
    anchoPliego: "",
    altoPliego: "",
    anchoTarjeta: "",
    altoTarjeta: "",
    sangreTarjeta: "",
    medidaAdicional: "",
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
      anchoPliego === "" ||
      altoPliego === "" ||
      anchoTarjeta === "" ||
      altoTarjeta === "" ||
      sangreTarjeta === "" ||
      medidaAdicional === ""
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
    const totalTarjetasVertical =
      tarjetasPorAnchoVertical * tarjetasPorAltoVertical;

    onResultadosActualizados(totalTarjetasHorizontal, totalTarjetasVertical);
  }, [onResultadosActualizados, dimensiones]);

  const handleCalcularClick = () => {
    // Verificar si alguno de los campos requeridos está vacío
    if (
      dimensiones.anchoPliego === "" ||
      dimensiones.altoPliego === "" ||
      dimensiones.anchoTarjeta === "" ||
      dimensiones.altoTarjeta === "" ||
      dimensiones.sangreTarjeta === "" ||
      dimensiones.medidaAdicional === ""
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
    <>
    <BackButton/>
    
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-bold mb-6">
      Pliegos
      </h1>
      <div className="mb-4">
        <label htmlFor="anchoPliego" className="block mb-2">
          Dimensiones del pliego (mm):
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            id="anchoPliego"
            name="anchoPliego"
            placeholder="Ancho"
            value={dimensiones.anchoPliego}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border border-blue-400 focus:outline-none focus:border-blue-600 text-gray-700 shadow-sm"
          />
          <span className="text-xl">x</span>
          <input
            type="number"
            id="altoPliego"
            name="altoPliego"
            placeholder="Alto"
            value={dimensiones.altoPliego}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border border-blue-400 focus:outline-none focus:border-blue-600 text-gray-700 shadow-sm"
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="anchoTarjeta" className="block mb-2">
          Dimensiones de la tarjeta (mm):
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            id="anchoTarjeta"
            name="anchoTarjeta"
            placeholder="Ancho"
            value={dimensiones.anchoTarjeta}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border border-blue-400 focus:outline-none focus:border-blue-600 text-gray-700 shadow-sm"
          />
          <span className="text-xl">x</span>
          <input
            type="number"
            id="altoTarjeta"
            name="altoTarjeta"
            placeholder="Alto"
            value={dimensiones.altoTarjeta}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border border-blue-400 focus:outline-none focus:border-blue-600 text-gray-700 shadow-sm"
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="sangreTarjeta" className="block mb-2">
          Sangre en la tarjeta (mm):
        </label>
        <input
          type="number"
          id="sangreTarjeta"
          name="sangreTarjeta"
          placeholder="Sangre"
          value={dimensiones.sangreTarjeta}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg border border-blue-400 focus:outline-none focus:border-blue-600 text-gray-700 shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="medidaAdicional" className="block mb-2">
          Margen adicional al pliego (mm):
        </label>
        <input
          type="number"
          id="medidaAdicional"
          name="medidaAdicional"
          placeholder="Medida Adicional"
          value={dimensiones.medidaAdicional}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg border border-blue-400 focus:outline-none focus:border-blue-600 text-gray-700 shadow-sm"
        />
      </div>
      <button
        onClick={handleCalcularClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Calcular
      </button>
      {error && <p className="text-red-500">Debe rellenar todos los campos.</p>}
      {mostrarResultados && !error && (
        <div>
          <div className="mb-4 mt-6">
            <p className="text-gray-600 mt-2">Resultado Horizontal:</p>
            <p className="text-blue-600 text-l font-bold">
              {resultadoHorizontal} tarjetas
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 mt-2">Resultado Vertical:</p>
            <p className="text-blue-600 text-l font-bold">
              {resultadoVertical} tarjetas
            </p>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

CalculadoraPliegos.propTypes = {
  onResultadosActualizados: PropTypes.func.isRequired,
  resultadoHorizontal: PropTypes.number.isRequired,
  resultadoVertical: PropTypes.number.isRequired,
};

export default CalculadoraPliegos;
