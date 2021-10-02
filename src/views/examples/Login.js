// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col
} from "reactstrap";
import { Link } from 'react-router-dom';
import LoginForm from 'components/LoginForm.js'

const Login = () => {
  return (
    <>
      <Col lg="5" md="7">
        <LoginForm role="patient"/>
        <div className="text-center mt-2">
            <Link
              className="text-light"
              to="/auth/register"
              tag={Link}
            >
              <small>New Administrator? Sign Up Now</small>
            </Link>
          
        </div>
      </Col>
      
    </>
  );
};

export default Login;
