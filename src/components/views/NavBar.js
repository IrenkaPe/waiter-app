import { Nav, Navbar, Container} from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark" className="rounded-top rounded-3 mb-4 mt-4">
                <Container className ="d-flex justify-content-between align-items-center" >
                    <Navbar.Brand>Waiter.app</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    </Nav>
                </Container>
        </Navbar>
    );
};
export default NavBar