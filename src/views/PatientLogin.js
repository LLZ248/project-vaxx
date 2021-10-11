// reactstrap components
import {
    Col
  } from "reactstrap";
  import LoginForm from 'components/LoginForm.js'
  
  const PatientLogin = () => {
    return (
      <>
        <Col lg="5" md="7">
          <LoginForm role="patient"/>
        </Col>
        
      </>
    );
  };
  
  export default PatientLogin;
  