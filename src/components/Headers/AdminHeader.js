// reactstrap components
import {
  Container, Row, Col
  } from "reactstrap";
  
const AdminHeader = ({title, subtitle}) => {
  const imageUrl = 'https://cached.imagescaler.hbpl.co.uk/resize/scaleHeight/546/cached.offlinehbpl.hbpl.co.uk/galleries/NAW/america.jpg';
  return (
    <>
      <div
        className="header d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundImage: `url(${imageUrl})`}}>
            
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />

        {/* Header container */}
        <Container className="d-flex align-items-center">
          <Row>
            <Col md="10">
              <h1 className="display-2 text-white">{title}</h1>
              <p className="text-white mt-0 mb-5">{subtitle}</p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminHeader;
