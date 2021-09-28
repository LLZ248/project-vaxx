// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

const AdminHeader = ({healthcareCentre}) => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" +
            "https://cached.imagescaler.hbpl.co.uk/resize/scaleHeight/546/cached.offlinehbpl.hbpl.co.uk/galleries/NAW/america.jpg" +
            ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">{healthcareCentre.centreName}</h1>
              <p className="text-white mt-0 mb-5">{healthcareCentre.address}</p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminHeader;
