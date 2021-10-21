import { Col, Card, CardHeader, Table, Container, Row } from "reactstrap";

const CentreTable = ({ centres, onRowSelect, title, message }) => {
  require("../assets/css/hoverableTable.css");

  return (
    <Container className="mt--1">
      <Row className="mt-5">
        <Col className="mb-5 mb-xl-0 mx-auto" xl="10">
          <Card className="shadow">
            <CardHeader className="border-0 ">
              <Row className="align-items-center ">
                <div className="col">
                  <h3 className="mb-0 ">{title}</h3>
                </div>
                <div className="col">
                  <h6 className="text-right m-0">
                   {message}
                  </h6>
                </div>
              </Row>
            </CardHeader>
            <Table
              className="align-items-center table-flush"
              responsive
              id="centre-table"
            >
              <thead className="thead-light">
                <tr>
                    <th scope="col" >Healthcare Centre</th>
                    <th scope="col" >Address</th>
                </tr>
              </thead>
              <tbody>
                {centres.map(centre => (
                  <tr
                    className="hoverable-row"
                    key={centre.centreName}
                    role="button" //this change the cursor when mouse over
                    onClick={() => onRowSelect(centre)} //callback function
                  >
                    {
                    Object.keys(centre)
                    .map(key => 
                      <td key={key}> {centre[key]} </td> //map the property value to <td>
                      )}
                  </tr>
                  ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CentreTable;
