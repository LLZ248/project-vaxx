import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";


const PatientNavbar = (props) => {
  return (
    <>
        
          
        {/* <Link
            className=" mb-0 text-white text-uppercase"
            to="/auth/login"
          >
            <span className="fas fa-user-md mx-2"/>
            Administrator Portal
          </Link>
          
          <Link
            className="mb-0 text-white text-uppercase text-right"
            to="/auth/register">
              <i className="fas fa-user mx-2"/>
               Register
          </Link> */}
          <Navbar
          className="navbar-horizontal navbar-dark bg-gradient-info"
          expand="md"
          id="navbar-main"
          >
          <Container fluid>
            <NavbarBrand href="#" onClick={e => e.preventDefault()} style={{"color":"rgb(255, 255, 255)","fontSize":"1.25rem","fontWeight":"bolder"}}>
              Project VAxx
            </NavbarBrand>
            <button
              aria-controls="navbar-info"
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navbar-info"
              data-toggle="collapse"
              id="navbar-info"
              type="button"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-info">
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src={require("assets/img/brand/blue.png").default}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      aria-controls="navbar-info"
                      aria-expanded={false}
                      aria-label="Toggle navigation"
                      className="navbar-toggler"
                      data-target="#navbar-info"
                      data-toggle="collapse"
                      id="navbar-info"
                      type="button"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-auto" navbar>
                
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    href="/auth/login"
                  >
                    <i className="fas fa-laptop-medical" />
                    <span className="nav-link-inner--text"> Administrator Portal</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    href="/auth/register"
                  >
                    <i className="fas fa-user" />
                    <span className="nav-link-inner--text">Register</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      
    </>
  );
};

export default PatientNavbar;
