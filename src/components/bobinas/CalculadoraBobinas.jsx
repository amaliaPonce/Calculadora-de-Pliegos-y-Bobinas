import { useState } from "react";
import BackButton from "../nav/BackButton";
import preciosBobina from "../../constants/preciosBobina";

function BobinaCalculator() {
  const [bobinaAncho, setBobinaAncho] = useState("");
  const [bobinaAlto, setBobinaAlto] = useState("");
  const [tarjetaAncho, setTarjetaAncho] = useState("");
  const [tarjetaAlto, setTarjetaAlto] = useState("");
  const [cantidadTarjetasCliente, setCantidadTarjetasCliente] = useState("");
  const [cantidadTarjetasEnBobina, setCantidadTarjetasEnBobina] =
    useState(null);
  const [metrosCuadradosNecesarios, setMetrosCuadradosNecesarios] =
    useState(null);
  const [precioSeleccionado, setPrecioSeleccionado] = useState("vinilo");
  const [costo, setCosto] = useState(null);

  const precios = preciosBobina;

  const calcularCantidadTarjetasEnBobina = () => {
    if (bobinaAncho && bobinaAlto && tarjetaAncho && tarjetaAlto) {
      const bobinaArea = bobinaAncho * bobinaAlto;
      const tarjetaArea = tarjetaAncho * tarjetaAlto;
      const cantidadTarjetas = Math.round(bobinaArea / tarjetaArea);
      setCantidadTarjetasEnBobina(cantidadTarjetas);
    } else {
      setCantidadTarjetasEnBobina(null);
    }
  };

  const calcularMetrosCuadradosNecesarios = () => {
    if (
      bobinaAncho &&
      bobinaAlto &&
      tarjetaAncho &&
      tarjetaAlto &&
      cantidadTarjetasCliente
    ) {
      const tarjetasSolicitadas = parseFloat(cantidadTarjetasCliente);
      const tarjetaArea = tarjetaAncho * tarjetaAlto;
      const bobinaArea = bobinaAncho * bobinaAlto;
      const cantidadTarjetasEnBobina = bobinaArea / tarjetaArea;
      const tarjetasPorMetrosCuadrados =
        tarjetasSolicitadas / cantidadTarjetasEnBobina;
      const metrosCuadradosNecesarios = (
        (tarjetasPorMetrosCuadrados * bobinaArea) /
        10000
      ).toFixed(2);
      setMetrosCuadradosNecesarios(metrosCuadradosNecesarios);
    } else {
      setMetrosCuadradosNecesarios(null);
    }
  };

  const calcularCosto = () => {
    if (metrosCuadradosNecesarios) {
      const costo =
        precios[precioSeleccionado] * parseFloat(metrosCuadradosNecesarios);
      setCosto(costo);
    }
  };

  return (
    <>
    <BackButton/>
    <div className="container mx-auto">
      <div className="bg-white p-6">
        <h2 className="text-5xl font-bold text-center mb-9">Bobina</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: "Ancho de la Bobina (cm):",
              state: bobinaAncho,
              setState: setBobinaAncho,
            },
            {
              label: "Alto de la Bobina (cm):",
              state: bobinaAlto,
              setState: setBobinaAlto,
            },
            {
              label: "Ancho de la Tarjeta (cm):",
              state: tarjetaAncho,
              setState: setTarjetaAncho,
            },
            {
              label: "Alto de la Tarjeta (cm):",
              state: tarjetaAlto,
              setState: setTarjetaAlto,
            },
          ].map((input, index) => (
            <div key={index} className="mb-4">
              <label htmlFor={`input${index}`} className="text-gray-600 mb-2">
                {input.label}
              </label>
              <input
                id={`input${index}`}
                type="number"
                className="w-full p-3 rounded-lg border border-blue-400 focus:outline-none focus:border-blue-600 text-gray-700 shadow-sm"
                value={input.state}
                onChange={(e) => input.setState(e.target.value)}
              />
            </div>
          ))}
        </div>
        <button
          onClick={calcularCantidadTarjetasEnBobina}
          className="bg-blue-600 text-white p-3 mt-6 rounded-lg w-full sm:w-80 md:w-80 lg:w-80 hover:bg-blue-700"
        >
          Calcular cantidad de tarjetas en bobina
        </button>
        {cantidadTarjetasEnBobina !== null && (
          <p className="text-center text-blue-600 mt-6 mb-4">
            Puedes cortar {cantidadTarjetasEnBobina} tarjetas en una bobina.
          </p>
        )}
        <div className="mt-8 border-t border-gray-300 pt-6">
          <div className="mb-4">
            <label
              htmlFor="cantidadTarjetasCliente"
              className="text-gray-600 mb-2"
            >
              Cantidad de tarjetas requeridas:
            </label>
            <input
              id="cantidadTarjetasCliente"
              type="number"
              className="w-full p-3 rounded-lg border border-blue-400 focus:outline-none focus:border-blue-600 text-gray-700 shadow-sm"
              value={cantidadTarjetasCliente}
              onChange={(e) => setCantidadTarjetasCliente(e.target.value)}
            />
          </div>
          <button
            onClick={calcularMetrosCuadradosNecesarios}
            className="bg-blue-600 text-white p-3 mt-6 rounded-lg w-full sm:w-80 md:w-80 lg:w-80 hover:bg-blue-700"
          >
            Calcular metros cuadrados necesarios
          </button>
          {metrosCuadradosNecesarios !== null && (
            <p className="text-center text-blue-600 mt-6 mb-4">
              Necesitarás {metrosCuadradosNecesarios} metros cuadrados.
            </p>
          )}
          <div className="mb-4 mt-6">
            <label
              htmlFor="precioSeleccionado"
              className="text-gray-600 mb-2 mt-2"
            >
              Precio:
            </label>
            <select
              id="precioSeleccionado"
              value={precioSeleccionado}
              onChange={(e) => setPrecioSeleccionado(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-600"
            >
              {Object.keys(precios).map((precio) => (
                <option key={precio} value={precio}>
                  {precio.charAt(0).toUpperCase() + precio.slice(1)} (
                  {precios[precio]} euros/m²)
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={calcularCosto}
            className="bg-blue-600 text-white p-3 mt-6 rounded-lg w-40 hover-bg-blue-700"
          >
            Calcular PVP
          </button>

          {costo !== null && (
            <p className="text-center text-blue-600 mt-6 mb-4">
              El PVP es {costo.toFixed(2)} €
            </p>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default BobinaCalculator;
