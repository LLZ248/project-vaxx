import { Card, CardHeader, Table, Badge } from "reactstrap";

const VaccinationTable = ({ vaccinations, role, onRowSelect }) => {
  require("../assets/css/hoverableTable.css");

  const viewByPatient = role === "patient";
  
  return (
    <Card className="shadow overflow-hidden">
      <CardHeader className="border-0 d-flex align-items-baseline justify-content-between">
        <h3 className="mb-0">Vaccination List</h3>
        <h5 className="mb-0 text-muted">Click on a vaccination to manage</h5>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Vaccination ID</th>
            <th scope="col">Appointment Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
            {vaccinations === null ? <tr><td colSpan='3'> There are no vaccinations available currently </td></tr> :
            vaccinations.map(vaccination =>
                <tr
                className="hoverable-row"
                key={vaccination.vaccinationID}
                role="button" //this change the cursor when mouse over
                onClick={() => onRowSelect(vaccination)} //callback function
                >
                    <td>{vaccination.vaccinationID}</td>
                    <td>{vaccination.appointmentDate}</td>
                    <td>
                      <Badge style={{fontSize : '12px'}}
                        color={
                          vaccination.status === 'pending' ? 'dark' :
                          vaccination.status === 'confirmed' ? 'info' :
                          vaccination.status === 'rejected' ? 'danger' :
                          /*administered*/ 'success'}> 
                        {vaccination.status}
                      </Badge>
                    </td>
                </tr>
            )}
        </tbody>
      </Table>
    </Card>
  );
};

export default VaccinationTable
