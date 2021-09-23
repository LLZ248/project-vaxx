import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';


// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";


function HealthcareCentreAddressInput(props){
  return (
    <FormGroup>
      <Input disabled={props.isDisabled} placeholder={props.value} type="text" />
    </FormGroup>
  );
}

const createOption = (label) => ({
  label,
  value: label,
});

const fetch = require('sync-fetch')
const healthcareCentres = fetch('http://localhost:5000/healthcare-centres', {}).json();

const defaultOptions = healthcareCentres.map((healthcareCentre)=>
  createOption(healthcareCentre.centreName)
);


class Register extends Component {
  state = {
    options: defaultOptions,
    selectedCentreName: undefined,
    selectedCentreAddress: undefined,
  };

  roleChange = (event) => {
    this.setState({
      role: event.target.value
    });
  }

  handleHealthcareChange = (newValue) => {
    var theCentreName = newValue.label;
    const theCentreAddress = healthcareCentres.find((healthcareCentres)=>{return healthcareCentres.centreName === theCentreName;}).address;
    theCentreName = theCentreName;

    this.setState({
      selectedCentreName: theCentreName,
      selectedCentreAddress: theCentreAddress,
    });
  };

  handleHealthcareCreate = (inputValue) => {
      const { options } = this.state;
      const newOption = createOption(inputValue);
      this.setState({
        options: [...options, newOption],
        selectedCentreName: newOption,
        selectedCentreAddress: undefined,
      });
  };

  render(){
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center mb-4">
                <h1>Sign Up</h1>
              </div>
              <Form role="form">
                <FormGroup>
                  <Row className="my-4">
                  <div className="custom-control custom-radio mx-auto">
                    <input
                      className="custom-control-input"
                      id="adminstratorRadio"
                      name="role-radio"
                      type="radio"
                      value="administrator"
                      checked={this.state.role === "administrator"}
                      onChange={this.roleChange}
                    />
                    <label className="custom-control-label" htmlFor="adminstratorRadio">
                      Adminstrator
                    </label>
                  </div>
                  <div className="custom-control custom-radio mx-auto">
                    <input
                      className="custom-control-input"
                      defaultChecked
                      id="patientRadio"
                      name="role-radio"
                      type="radio"
                      value="patient"
                      checked={this.state.role === "patient"}
                      onChange={this.roleChange}
                    />
                    <label className="custom-control-label" htmlFor="patientRadio">
                      Patient
                    </label>
                  </div>
                  </Row>
                </FormGroup>
                {this.state.role === "administrator" &&
                  <div className="admin-only">
                    
                    <FormGroup>
                      <label>Healthcare Centre</label>
                      <CreatableSelect
                        isClearable
                        onChange={this.handleHealthcareChange}
                        onCreateOption={this.handleHealthcareCreate}
                        options={this.state.options}
                        value={this.state.selectedCentreName}
                        placeholder={this.state.selectedCentreName}
                      />
                    </FormGroup>
                    {
                      this.state.selectedCentreAddress === undefined?
                      <HealthcareCentreAddressInput isDisabled={false}  value={"Healthcare Centre Name"}/>:
                      <HealthcareCentreAddressInput isDisabled={true} id="form-control-centreaddress" value={this.state.selectedCentreAddress}/>
                    }
                    
                  </div>
                }
                <label>Your Personal Information</label>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="form-control-username"
                      placeholder="Username"
                      type="text"
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="form-control-password"
                      placeholder="Pasword"
                      type="password"
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-circle-08" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="form-control-fullname"
                      placeholder="Full Name"
                      type="text"
                    />
                  </InputGroup>
                </FormGroup>
                  
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="form-control-email"
                      placeholder="Email"
                      type="email"
                    />
                  </InputGroup>
                </FormGroup>
                
                {
                  this.state.role === "administrator"?
                  <div>
                    <FormGroup className="admin-only">
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-badge" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          id="form-control-staffid"
                          placeholder="Staff ID"
                          type="text"
                        />
                      </InputGroup>
                  </FormGroup>
                  </div> :
                    <div>
                      <FormGroup className="admin-only">
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-badge" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            id="form-control-icpassport"
                            placeholder="IC/Passport No"
                            type="text"
                          />
                        </InputGroup>
                      </FormGroup>
                  </div>
                }
                
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button">
                    Sign Up
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
  
};

export default Register;