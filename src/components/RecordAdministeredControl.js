import {
  FormGroup,
  Button,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

const RecordAdministeredControl = () => {
  return (
    <Form role="form" id="batch-form">
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
      <Button type="submit" color="primary" className="w-100"> Confirm Vaccination Administered </Button>      
    </Form>
  );
};

export default RecordAdministeredControl;
