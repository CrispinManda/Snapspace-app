import './Navbar.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const MyNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <Navbar className='bg' variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/"><h1>Snapspace</h1></Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
      </Nav>
      <Nav className="ms-auto">
        {user ? (
          <>
            <span className="navbar-text me-3">
              Welcome, {user.given_name || user.name.split(" ")[0]}
            </span>
            <Button className='me-5' variant="outline-light" onClick={logout}>Logout</Button>
          </>
        ) : (
          <div className="flex-end">
            <Button className=' text-white me-5 ' as={Link} to="/login" variant="outline-light">
              Login
            </Button>
          </div>
        )}
      </Nav>
    </Navbar>
  );
};

export default MyNavbar;
