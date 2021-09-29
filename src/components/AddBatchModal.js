import { React, useState, useEffect } from "react";
import Select from 'react-select';
import ReactDatetime from "react-datetime";

import {
  Modal,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap"; 

const AddBatchModal = ({centreName}) => {
  const [vaccines, setVaccines] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {

    const fetchVaccine = async() => {
      const data = await fetch('/vaccines');
      const vaccines = await data.json();
      setVaccines(vaccines);
    }

    fetchVaccine();
  }, []);

  const toggleModal = () => setIsOpen(!isOpen);

  const formSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById('batch-form');
    form.reportValidity();
    //expiry-date-input
  }

  const onVaccineSelectionChanged = (vaccine) => { //update the batchNo Prefix
    const prefix = document.getElementById('batchNo-prefix');
    prefix.innerHTML = vaccine.vaccineName.substr(0,2).toUpperCase();
    prefix.className = '';
    const manufacturerInput = document.getElementById('vaccine-manufacturer');
    manufacturerInput.value = vaccine.manufacturer;
    document.getElementById('select-validator').value = 'accepted';
  }

  const onExpiryDateChanged = () => {
    document.getElementById('date-validator').value = 'accepted';
  }

    return (
      <>
        <Button color="primary" onClick={toggleModal}>
          <span className='fa fa-plus'/> Batch 
        </Button>
        <Modal
          className="modal-dialog-centered"
          isOpen={isOpen}
          toggle={toggleModal}>
         <div className="modal-body p-0">
          <Form role="form" method='POST' action='/batches' id="batch-form">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-3">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Select A Vaccine</small>
                </div>
                <div className="px-lg-4">
                  <Select
                    name='vaccineID'
                    isSearchable={false}
                    options={vaccines}
                    getOptionLabel = {vaccine => vaccine.vaccineName} 
                    getOptionValue = {vaccine => vaccine.vaccineID} 
                    placeholder="Select a vaccine"
                    onChange={onVaccineSelectionChanged}/>
                    {<input
                      id='select-validator'
                      tabIndex={-1}
                      autoComplete="off"
                      style={{ opacity: 0, height: 0, width: 0, position: "absolute", left: '30%', padding:0 }}
                      required={true}
                    />}
                <Input disabled placeholder="Manufacturer" type="text" className='my-3' id='vaccine-manufacturer'/>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-4">
                <div className="text-center text-muted mb-4">
                  <small>Enter Batch Information</small>
                </div>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <span className="fa fa-hashtag" id='batchNo-prefix'/>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Batch Number" type="text" title="- Batch Number should contains number only" id="batchNoInput" name="batchNo" pattern="[0-9]+" required/>
                  </InputGroup>
                </FormGroup>

                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-app" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Quantity Available" type="number" pattern="[0-9]+" name="quantityAvailable" required/>
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-calendar-grid-58" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <ReactDatetime 
                      inputProps={{ 
                        id: 'expiry-date-input',
                        placeholder: "Expiry Date", 
                        style: { padding :'0', background:'white', cursor:'pointer '}, 
                        name: "expiryDate",
                        readOnly: 'true'}}
                      dateFormat='DD/MM/YYYY'
                      timeFormat={false} 
                      closeOnSelect={true} 
                      isValidDate={date => date.isAfter(Date.now())}
                      onChange={onExpiryDateChanged}/>
                      {<input
                      id='date-validator'
                      tabIndex={-1}
                      autoComplete="off"
                      style={{ opacity: 0, height: 0, width: 0, position: "absolute", left: '30%', bottom:0, padding:0 }}
                      required={true}
                    />}
                  </InputGroup>
                </FormGroup>      

                <input type="hidden" value={centreName} name="centreName"/>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Submit
                  </Button>
                </div>
                </CardBody>
              </Card>
            </Form>
          </div>
        </Modal>
      </>
    );
}

export default AddBatchModal;