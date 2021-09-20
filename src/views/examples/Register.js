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

type State = {
  options: [{ [string]: string }],
  value: string | void,
};

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const defaultOptions = [
  createOption('One'),
  createOption('Two'),
  createOption('Three'),
];


class Register extends Component<*, State> {
  constructor() {
    super();
    this.state = {};
    this.handleHealthcareChange = this.handleHealthcareChange.bind(this);
    this.roleChange = this.roleChange.bind(this);
    this.handleHealthcareCreate = this.handleHealthcareCreate.bind(this);
  }

  state = {
    isLoading: false,
    options: defaultOptions,
    value: undefined,
  }


  roleChange(event) {
    this.setState({
      role: event.target.value
    });
  }

  handleHealthcareChange = (newValue: any, actionMeta: any) => {
    this.setState({ value: newValue });
  };

  handleHealthcareCreate = (inputValue: any) => {
    this.setState({ isLoading: true });
    //TODO: Add backend action here
    console.group('Option created');
    console.log('Wait a moment...');
    setTimeout(() => {
      const { options } = this.state;
      const newOption = createOption(inputValue);
      console.log(newOption);
      console.groupEnd();
      this.setState({
        isLoading: false,
        options: [...options, newOption],
        value: newOption,
      });
    }, 1000);
  };

  render(){
    const { isLoading, options, value } = this.state;
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
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        onChange={this.handleHealthcareChange}
                        onCreateOption={this.handleHealthcareCreate}
                        options={options}
                        value={value}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input disabled placeholder="Healthcare Address" type="text" />
                    </FormGroup>
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