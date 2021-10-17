import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {
  
  const [adminName, setAdminName] = useState('');
 

  useEffect(() => {
    async function authenticate(){
      const authData = await fetch('/verify');
      const auth = await authData.json();
      setAdminName(auth.userObj.fullName)
    }
    authenticate();
  },[])

  return (
    <>
      <Navbar className="navbar-top navbar-dark" id="navbar-main">
        <Container>
          <Link
            className="h4 mb-0 text-white text-uppercase d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link> 
          {/*I commented out the Search Bar at the top*/}
          {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form> */}
          <Nav className="align-items-center ml-auto" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/theme/user-icon.png")
                          .default
                      }
                    />
                  </span>
                  <Media className="ml-2 text-light d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {adminName}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem href="/logout">
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
