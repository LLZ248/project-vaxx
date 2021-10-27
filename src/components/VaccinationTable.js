import WaveLoading from "react-loadingg/lib/WaveLoading";
import { Card, CardHeader, Table, Badge } from "reactstrap";

const VaccinationTable = ({ vaccinations, onRowSelect, showChangesApplied }) => {
  require("../assets/css/hoverableTable.css");

  return (
    <Card className="shadow overflow-hidden">
      <CardHeader className="border-0 d-flex align-items-baseline justify-content-between">
        <h3 className="mb-0">Vaccination list
        <Badge className={`mx-2 d-${showChangesApplied ? 'inline' : 'none'}`} 
          pill color='success'> Changes Applied </Badge>
        </h3>
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
            {vaccinations === null ? <tr><td colSpan='3'> <WaveLoading color='#d2d8f7' style={{"position":"relative", "margin":"auto"}}/> </td></tr> :
            vaccinations.length === 0 ? <tr><td colSpan='3'> There are no vaccinations available currently </td></tr> :
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
