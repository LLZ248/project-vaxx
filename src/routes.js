import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/Register.js";
import AdminLogin from "views/AdminLogin.js";
import PatientLogin from "views/PatientLogin.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js"
import VaccineView from "views/VaccineView.js";
import BatchView from "views/BatchView.js";
import AdminDashboard from "views/Admin.js";
import PatientDashboard from "views/Patient.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
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
    path: "/vaccines",
    name: "Vaccines",
    icon: "fa fa-syringe text-blue",
    component: VaccineView,
    layout: "/admin",
  },
  {
    path: "/addBatches",
    name: "Add Batches",
    icon: "fa fa-plus text-info",
    component: BatchView,
    layout: "/admin",
  },
  {
    path: "/admin/dashboard",
    name: "Admin Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: AdminDashboard,
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
