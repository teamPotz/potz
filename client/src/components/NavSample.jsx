import { Link } from 'react-router-dom';

function NavSample() {
  return (
    <ul>
      <li>
        <Link to='/'>home</Link>
      </li>
      <li>
        <Link to='/about'>about</Link>
      </li>
      <li>
        <Link to='/fetch'>fetch test</Link>
      </li>
    </ul>
  );
}

export default NavSample;
