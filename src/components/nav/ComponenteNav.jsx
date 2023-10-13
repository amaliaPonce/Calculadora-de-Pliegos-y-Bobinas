import { Link } from 'react-router-dom';
import './Nav.css'; // Asegúrate de importar el archivo CSS adecuado con tus estilos

function Nav() {
  return (
    <nav className="nav-container">
      <div className="nav-row">
        <Link to="/pliegos" className="nav-link">
          Pliegos
        </Link>
        <Link to="/bobinas" className="nav-link">
          Bobinas
        </Link>
        <Link to="/tickets" className="nav-link">
          Tickets
        </Link>
        <Link to="/copiativos" className="nav-link">
          Copiativos
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
