import { Link } from "react-router-dom";
// reactstrap components
import {
  Container,
} from "reactstrap";

const PatientNavbar = (props) => {
  return (
    <>
        <Container fluid className="py-3 bg-gradient-info d-flex justify-content-between">
          
          <Link
            className="h4 mb-0 text-white text-uppercase"
            to="/auth/login"
          >
            {props.brandText}
          </Link>
          <Link
            className="h4 mb-0 text-white text-uppercase text-right"
            to="/auth/register">
              Register
          </Link>
        </Container>
      
    </>
  );
};

export default PatientNavbar;
