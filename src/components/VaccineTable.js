import { Col, Card, CardHeader, Table, Container, Row } from "reactstrap";

const VaccineTable = ({ vaccines, onRowSelect, title, message, hideColumns }) => {
  require("../assets/css/hoverableTable.css");

  return (
    <Container className="mt--8" fluid>
      <Row className="mt-5">
        <Col className="mb-5 mb-xl-0 mx-auto" xl="10">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">{title}</h3>
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
              id="vaccine-table"
            >
              <thead className="thead-light">
                <tr>
                  <th scope="col" className={ !hideColumns || hideColumns.includes('vaccineID') ? "d-none" : ""}>Vaccine ID</th>
                  <th scope="col" className={ !hideColumns || hideColumns.includes('vaccineName') ? "d-none" : ""}>Vaccine Name</th>
                  <th scope="col" className={ !hideColumns || hideColumns.includes('manufacturer') ? "d-none" : ""}>Manufacturer</th>
                </tr>
              </thead>
              <tbody>
                {vaccines.map(vaccine => (
                  <tr
                    className="hoverable-row"
                    key={vaccine.vaccineID}
                    role="button" //this change the cursor when mouse over
                    onClick={() => onRowSelect(vaccine)} //callback function
                  >
                    {
                    Object.keys(vaccine)
                    .filter(key => !hideColumns || !hideColumns.includes(key)) //extract property that are NOT hided 
                                                                               //if hideColumns is not undefined
                    .map(key => 
                      <td key={key}> {vaccine[key]} </td> //map the property value to <td>
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

export default VaccineTable;
