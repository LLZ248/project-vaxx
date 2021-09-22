// reactstrap components
import { Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{" "}
                <span
                  className="text-info font-weight-bold ml-1"
                >
                  Project VAXX
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Login;
