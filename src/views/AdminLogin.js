// reactstrap components
import {
  Col
} from "reactstrap";
import { Link } from 'react-router-dom';
import LoginForm from 'components/LoginForm.js'

const AdminLogin = () => {
  return (
    <>
      <Col lg="5" md="7">
        <LoginForm role="administrator"/>
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

export default AdminLogin;
