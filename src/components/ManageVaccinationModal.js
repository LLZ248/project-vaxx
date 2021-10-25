import React, { useState, useEffect } from "react";
import RecordAdministeredControl from "./RecordAdministeredControl";
import ConfirmVaccinationControl from "./ConfirmVaccinationControl.js";

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
  Table,
} from "reactstrap";

const ManageVaccinationModal = ({
  batch,
  vaccine,
  vaccination,
  isOpen,
  onSubmit,
  onClose,
}) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    async function fetchPatient() {
      const data = await fetch(
        "/patients/findPatient?username=" + vaccination.username
      );
      setPatient(await data.json());
    }

    if (vaccination != null) {
      console.log('vac fetching pat');
      fetchPatient();
    } 
  }, [vaccination]);

  return (
    <>
      <Modal className="modal-dialog-centered" isOpen={isOpen} toggle={onClose}>
        <div className="modal-header mx-0 mx-md-2">
          <h2 className="modal-title">Vaccination</h2>
          <span className="float-right font-weight-bold">
            {vaccination.vaccinationID}
          </span>
        </div>
        <div className="modal-body p-0">
          <Card>
            <Table className="m-0">
              <thead className="thead-light">
                <tr>
                  <th colSpan="2" className="text-center">
                    Patient Information
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-muted">Full Name</td>
                  <td className="text-right">{patient?.fullName}</td>
                </tr>
                <tr>
                  <td className="text-muted">IC/Passport</td>
                  <td className="text-right">{patient?.ICPassport}</td>
                </tr>
              </tbody>
            </Table>
            <Table className="m-0">
              <thead className="thead-light">
                <tr>
                  <th colSpan="2" className="text-center">
                    Batch Information
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-muted">Batch Number</td>
                  <td className="text-right">{batch?.batchNo}</td>
                </tr>
                <tr>
                  <td className="text-muted">Expiry Date</td>
                  <td className="text-right">{batch?.expiryDate}</td>
                </tr>
                <tr>
                  <td className="text-muted">Vaccine Name</td>
                  <td className="text-right">{vaccine.vaccineName}</td>
                </tr>
                <tr>
                  <td className="text-muted">Manufacturer</td>
                  <td className="text-right">{vaccine.manufacturer}</td>
                </tr>
              </tbody>
            </Table>
            <Table className="m-0">
            <thead className="thead-light">
                <tr>
                  <th colSpan="2" className="text-center">
                  {vaccination.status === 'pending' ? 
                  'Administered Confirmation' : 'Appointment Approval'}
                  </th>
                </tr>
              </thead>
            </Table>
            <div className="bg-secondary p-3 pb-4 px-md-4 rounded">
              {vaccination.status === 'pending' ? 
              <ConfirmVaccinationControl vaccinationID = {vaccination.vaccinationID} onClose={onClose} onSubmit={onSubmit}/>:
              <RecordAdministeredControl/>}
            </div>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default ManageVaccinationModal;

 // const formSubmit = async(e) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.currentTarget);
  //   const body = {};

  //   for(const [key, value] of formData.entries()){
  //     body[key] = value;
  //   }

  //   const rawRes = await fetch('/batches', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(body)
  //   });

  //   const res = await rawRes.json();

  //   if(res.message) { //have error message
  //     const alertHolder = document.getElementById('alert-placeholder');
  //     const errorAlert = document.createElement('div');
  //     errorAlert.className = 'alert alert-danger';
  //     errorAlert.innerHTML = res.message;
  //     alertHolder.replaceChildren(errorAlert);
  //   }
  //   else { //res object will be the new batch object
  //     onAdded(res); //this callback method will update the batch list
  //     toggleModal(); //close the modal
  //   }
  // }
