
import './App.css';

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ReactSession } from 'react-client-session';

import Home from "./components/Home.jsx";

import About from "./components/About.jsx";
import Service from "./components/Service.jsx";
import Contact from "./components/Contact.jsx";
import Login from "./components/Login.jsx";
import Forgot from "./components/Forgot.jsx";
import Signup from "./components/Signup.jsx";

import Nav from "./components/Navigation.jsx";
import Chat from "./components/Patient/Chat.jsx";

import AHome from "./components/Admin/Setting.jsx";
import ADashboard from "./components/Admin/Dashboard.jsx";
import AUsers from "./components/Admin/Users.jsx";
import ADoctors from "./components/Admin/Doctors.jsx";
import ASsetting from "./components/Admin/SystemSetting.jsx";

import PMedication from "./components/Patient/Medication.jsx";
import PSymptom from "./components/Patient/Symptom.jsx";
import PAppointment from "./components/Patient/Appointment.jsx";
import PHealthRecord from "./components/Patient/HealthRecord.jsx";
import PPrescription from "./components/Patient/Prescription.jsx";

import DPrescription from "./components/Doctor/Prescription.jsx";
import DAppointment from "./components/Doctor/Appointment.jsx";
import DHealthRecord from "./components/Doctor/HealthRecord.jsx";
import DDashboard from "./components/Doctor/Dashboard.jsx";

import HFacilities from "./components/HealthAdmin/Facility.jsx";
import HStaff from "./components/HealthAdmin/Staff.jsx";
import HCompliance from "./components/HealthAdmin/Compliance.jsx";

import PhMedication from "./components/Pharmacist/Medication.jsx";
import PhDispensation from "./components/Pharmacist/Dispensation.jsx";

const pathname = window.location.pathname;
ReactSession.setStoreType('localStorage');
function App() {

  var route = pathname.split("/");
  console.log(route);
  console.log(route[1]);


  if (route[1] == 'doctor' && ReactSession.get("loggedIn") && ReactSession.get("userType") === 'doctor') {
    return (
      <Router>
        <div className='body'>
          <Nav />
          <Switch>
            <Route path="/doctor/home" exact component={() => <AHome />} />
            <Route path="/doctor/appointment" exact component={() => <DAppointment />} />
            <Route path="/doctor/healthRecord" exact component={() => <DHealthRecord />} />
            <Route path="/doctor/chat" exact component={() => <Chat />} />
            <Route path="/doctor/prescription" exact component={() => <DPrescription />} />
            <Route path="/doctor/dashboard" exact component={() => <DDashboard />} />
          </Switch>
        </div>
      </Router>
    );
  }
  else if (route[1] == 'patient' && ReactSession.get("loggedIn") && ReactSession.get("userType") === 'patient') {
    return (
      <Router>
        <div className='body'>
          <Nav />
          <Switch>
            <Route path="/patient/home" exact component={() => <AHome />} />
            <Route path="/patient/medication" exact component={() => <PMedication />} />
            <Route path="/patient/symptom" exact component={() => <PSymptom />} />
            <Route path="/patient/appointment" exact component={() => <PAppointment />} />
            <Route path="/patient/healthRecord" exact component={() => <PHealthRecord />} />
            <Route path="/patient/chat" exact component={() => <Chat />} />
            <Route path="/patient/prescription" exact component={() => <PPrescription />} />
          </Switch>
        </div>
      </Router>
    );
  }
  else if (route[1] == 'admin' && ReactSession.get("loggedIn") && ReactSession.get("userType") === 'admin') {
    return (
      <Router>
        <div className='body'>
          <Nav />
          <Switch>
            <Route path="/admin/home" exact component={() => <AHome />} />
            <Route path="/admin/chat" exact component={() => <Chat />} />
            <Route path="/admin/dashboard" exact component={() => <ADashboard />} />
            <Route path="/admin/users" exact component={() => <AUsers />} />
            <Route path="/admin/systemSetting" exact component={() => <ASsetting />} />
            <Route path="/admin/doctors" exact component={() => <ADoctors />} />
          </Switch>
        </div>
      </Router>
    );
  }
  else if (route[1] == 'healthAdmin' && ReactSession.get("loggedIn") && ReactSession.get("userType") === 'healthAdmin') {
    return (
      <Router>
        <div className='body'>
          <Nav />
          <Switch>
            <Route path="/healthAdmin/home" exact component={() => <AHome />} />
            <Route path="/healthAdmin/chat" exact component={() => <Chat />} />
            <Route path="/healthAdmin/facilities" exact component={() => <HFacilities />} />
            <Route path="/healthAdmin/staff" exact component={() => <HStaff />} />
            <Route path="/healthAdmin/compliance" exact component={() => <HCompliance />} />
          </Switch>
        </div>
      </Router>
    );
  }
  else if (route[1] == 'pharmacist' && ReactSession.get("loggedIn") && ReactSession.get("userType") === 'pharmacist') {
    return (
      <Router>
        <div className='body'>
          <Nav />
          <Switch>
            <Route path="/pharmacist/home" exact component={() => <AHome />} />
            <Route path="/pharmacist/chat" exact component={() => <Chat />} />
            <Route path="/pharmacist/medication" exact component={() => <PhMedication />} />
            <Route path="/pharmacist/dispensation" exact component={() => <PhDispensation />} />
          </Switch>
        </div>
      </Router>
    );
  }
  else if (route[1] == 'about') {
    return (
      <Router>
        <Switch>
          <Route path="/about" exact component={() => <About />} />
        </Switch>
      </Router>
    );
  }
  else if (route[1] == 'service') {
    return (
      <Router>
        <Switch>
          <Route path="/service" exact component={() => <Service />} />
        </Switch>
      </Router>
    );
  }
  else if (route[1] == 'contact') {
    return (
      <Router>
        <Switch>
          <Route path="/contact" exact component={() => <Contact />} />
        </Switch>
      </Router>
    );
  }
  else if (route[1] == 'login') {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={() => <Login />} />
        </Switch>
      </Router>
    );
  }
  else if (route[1] == 'signup') {
    return (
      <Router>
        <Switch>
          <Route path="/signup" exact component={() => <Signup />} />
        </Switch>
      </Router>
    );
  }
  else if (route[1] == 'forgot') {
    return (
      <Router>
        <Switch>
          <Route path="/forgot" exact component={() => <Forgot />} />
        </Switch>
      </Router>
    );
  }
  else if (route[1] == 'home') {
    return (
      <Router>
        <Switch>
          <Home />
        </Switch>
      </Router>
    );
  }
  else if (route[1] == '') {
    return (
      <Router>
        <Switch>
          <Home />
        </Switch>
      </Router>
    );
  }
  else if (route[1] == 'logout') {
    var origin = window.location.origin;

    ReactSession.remove("loggedIn");
    ReactSession.remove("userId");
    ReactSession.remove("userEmail");
    ReactSession.remove("userName");
    ReactSession.remove("userType");

    window.location.replace(origin + '/login')
  }
  else {
    return (
      <h1>Page not found</h1>
    );
  }
}

export default App;



