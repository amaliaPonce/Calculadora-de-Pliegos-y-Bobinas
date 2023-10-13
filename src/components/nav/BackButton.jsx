import { Link } from 'react-router-dom';

function BackButton() {
  return (
    <Link to="/">
      <button className="back-button">
        <i className='bx bx-arrow-back'></i>
      </button>
    </Link>
  );
}

export default BackButton;
