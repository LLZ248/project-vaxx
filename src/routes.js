import Register from "views/Register.js";
import AdminLogin from "views/AdminLogin.js";
import PatientLogin from "views/PatientLogin.js";
//import VaccineView from "views/VaccineView.js"; //[deprecated]
import Batch from "views/Batch";
import AdminDashboard from "views/Admin.js";
import PatientDashboard from "views/Patient.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: AdminDashboard,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: AdminLogin,
    layout: "/auth",
  },
  {
    path: "/patient-login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: PatientLogin,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/batch",
    name: "Batch Information",
    icon: "fa fa-plus text-info",
    component: Batch,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Patient Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: PatientDashboard,
    layout: "/patient",
  },
];
export default routes;
