import {
  FormGroup,
  Button,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

const RecordAdministeredControl = ({ vaccinationID, onSubmit }) => {
  const confirmAdministered = async (e) => {
    e.preventDefault();

    const remarks = e.target["remarks"].value;

    const formData = `vaccinationID=${vaccinationID}&status=administered&remarks=${remarks ?? null}`;

    fetch("/vaccinations/update-vaccination", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData
      // {
      //   'vaccinationID' : vaccinationID,
      //   'status' : 'administered',
      //   'remarks' : remarks ?? null
      // }
    }).then(onSubmit());
  };

  return (
    <Form role="form" onSubmit={confirmAdministered}>
      <FormGroup className="mb-3">
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <span className="fa fa-comment" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Remarks" type="text" name="remarks" />
        </InputGroup>
      </FormGroup>
      <Button type="submit" color="primary" className="w-100">
        Confirm Vaccination Administered
      </Button>
    </Form>
  );
};

export default RecordAdministeredControl;
