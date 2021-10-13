import { Link } from "react-router-dom";
// reactstrap components
import {
  Navbar,
  Container,
} from "reactstrap";

const AdminNavbar = () => {
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4"  to="/" tag={Link}>
         
          <img
            alt="..."
            height="70px"
            src={
              require("../../assets/img/brand/argon-react-white.png").default
            }
          />
          
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
