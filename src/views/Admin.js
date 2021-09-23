// reactstrap components
import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Progress,
    Table,
    UncontrolledTooltip,
  } from "reactstrap";
  import Header from "components/Headers/Header.js";
  import { useState, useEffect } from "react";
  import ProjectVaxx from "../models/ProjectVaxx.js";
  import { useHistory } from "react-router";
import BatchTable from "components/BatchTable.js";
  
  const AdminDashboard = () => {
      const pv = new ProjectVaxx();

      const [batches, setBatches] = useState([]);

      useEffect(async() => {
          const batches = await pv.query('Select * From Batch');
          setBatches(batches);
      });
      
      return (
          <>
          <Header/>
          <BatchTable batches={batches}/>
          </>
      )
  }

export default AdminDashboard;