import React from "react";
import $ from "jquery";
import axios from 'axios';
import { ReactSession } from 'react-client-session';

// import "../assets/css/afterlogin.css";
import "../assets/css/style.css";
import 'font-awesome/css/font-awesome.min.css';
import config from "../assets/config.json"

const pathname = window.location.pathname;
var route = pathname.split("/");
const userType = route[1];
const page = route[2];

const css = `
    #head{
        z-index:4;
    }
    #dp{
        width:46px;
    }
    #mySidebar{
        
        z-index:3;
        width:270px;
        margin-top:35px;
    }
    #myOverlay{
        cursor:pointer;
    }
    i{
        color:black;
    }

`;

class Navigation extends React.Component {
    state = {
        users: []
    }

    componentDidMount() {
        console.log(page)
        $("#"+page).addClass("w3-nav-color");   
        if(page == 'home')
        {
            $("#settings").addClass("w3-nav-color");
        }

        if(page == 'chat')
        {
            $("#mySidebar").addClass("chat-mySidebar");
        }
        else{
            $("#mySidebar").removeClass("chat-mySidebar");
        }

    }

    menu_open() {
        
        if ($("#mySidebar").css('display') === 'block') {
            $("#mySidebar").css('display','none')
            $("#myOverlay").css('display','none');
        } else {
            $("#mySidebar").css('display','block')
            $("#myOverlay").css('display','block');
        }
    }
    
    menu_close() {
        
        $("#mySidebar").css('display','none')
        $("#myOverlay").css('display','none');
    }
    
    render() {
        return (
        <div className="w3-light-grey">
            <style>{css}</style>
            <div className="w3-bar w3-top w3-teal w3-large" id="head">
                <button className="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey" onClick={(e)=> this.menu_open()}>
                    <i className="fa fa-bars"></i>  Menu
                </button>
                <span className="w3-bar-item">Smart Health Hub</span>
            </div>

            
            <nav className="w3-sidebar w3-collapse w3-white w3-animate-left"  id="mySidebar"><br/>
                <div className="w3-container w3-row">
                
                    <div className="w3-col s8 w3-bar">
                        <span><strong>{ReactSession.get("userName")}</strong><br/>{userType}</span>
                    </div>
                    <a href="/logout" className="w3-right">
                        <i className="fa fa-sign-out"></i>
                    </a>
                </div>
                <hr/>

                {(() => {
                    console.log(userType)
                    if (userType == 'admin'){
                        return (
                            <div className="w3-bar-block">
                                <a href="#" className="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onClick={(e) => this.menu_close()} title="close menu"><i className="fa fa-remove fa-fw"></i>  Close Menu</a>
                                <a href="/admin/dashboard" id="dashboard" className="w3-bar-item w3-button w3-padding"><i className="fa fa-dashboard fa-fw"></i>  Dashboard</a>
                                <a href="/admin/users" id="users" className="w3-bar-item w3-button w3-padding"><i className="fa fa-users fa-fw"></i>  Users</a>
                                <a href="/admin/doctors" id="doctors" className="w3-bar-item w3-button w3-padding"><i className="fa fa-stethoscope fa-fw"></i>  Doctors</a>
                                <a href="/admin/chat" id="chat" className="w3-bar-item w3-button w3-padding"><i className="fa fa-comments fa-fw"></i>  Interaction</a>
                                {/* <a href="/admin/systemSetting" id="settings" className="w3-bar-item w3-button w3-padding"><i className="fa fa-cog fa-fw"></i> System Settings</a><br/><br/> */}
                                <a href="/admin/home" id="home" className="w3-bar-item w3-button w3-padding"><i className="fa fa-cog fa-fw"></i> System</a><br/><br/>
                            </div>
                        )
                    }

                    if (userType == 'patient'){
                        return (
                            <div className="w3-bar-block">
                                <a href="#" className="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onClick={(e) => this.menu_close()} title="close menu"><i className="fa fa-remove fa-fw"></i>  Close Menu</a>
                                <a href="/patient/symptom" id="symptom" className="w3-bar-item w3-button w3-padding"><i className="fa fa-wpexplorer fa-fw"></i>  Symptom</a>
                                <a href="/patient/medication" id="medication" className="w3-bar-item w3-button w3-padding"><i className="fa fa-hotel fa-fw"></i>  Medication reminder</a>
                                <a href="/patient/appointment" id="appointment" className="w3-bar-item w3-button w3-padding"><i className="fa fa-map-pin fa-fw"></i>  Appointment</a>
                                <a href="/patient/healthRecord" id="healthRecord" className="w3-bar-item w3-button w3-padding"><i className="fa fa-address-card-o fa-fw"></i>  Health record</a>
                                <a href="/patient/prescription" id="prescription" className="w3-bar-item w3-button w3-padding"><i className="fa fa-pie-chart fa-fw"></i>  Prescription</a>
                                <a href="/patient/chat" id="chat" className="w3-bar-item w3-button w3-padding"><i className="fa fa-comments fa-fw"></i>  Interaction</a>
                                <a href="/patient/home" id="home" className="w3-bar-item w3-button w3-padding"><i className="fa fa-cog fa-fw"></i>  Settings</a><br/><br/>
                            </div>
                        )
                    }

                    if (userType == 'doctor'){
                        return (
                            <div className="w3-bar-block">
                                <a href="#" className="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onClick={(e) => this.menu_close()} title="close menu"><i className="fa fa-remove fa-fw"></i>  Close Menu</a>
                                <a href="/doctor/dashboard" id="dashboard" className="w3-bar-item w3-button w3-padding"><i className="fa fa-dashboard fa-fw"></i>  Dashboard</a>
                                <a href="/doctor/appointment" id="appointment" className="w3-bar-item w3-button w3-padding"><i className="fa fa-map-pin fa-fw"></i>  Appointment</a>
                                <a href="/doctor/healthRecord" id="healthRecord" className="w3-bar-item w3-button w3-padding"><i className="fa fa-address-card-o fa-fw"></i>  Health record</a>
                                <a href="/doctor/prescription" id="prescription" className="w3-bar-item w3-button w3-padding"><i className="fa fa-pie-chart fa-fw"></i>  Prescription</a>
                                <a href="/doctor/chat" id="chat" className="w3-bar-item w3-button w3-padding"><i className="fa fa-comments fa-fw"></i>  Interaction</a>
                                <a href="/doctor/home" id="home" className="w3-bar-item w3-button w3-padding"><i className="fa fa-cog fa-fw"></i>  Settings</a><br/><br/>
                            </div>
                        )
                    }

                    if (userType == 'healthAdmin'){
                        return (
                            <div className="w3-bar-block">
                                <a href="#" className="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onClick={(e) => this.menu_close()} title="close menu"><i className="fa fa-remove fa-fw"></i>  Close Menu</a>
                                <a href="/healthAdmin/facilities" id="facilities" className="w3-bar-item w3-button w3-padding"><i className="fa fa-hospital-o fa-fw"></i>  Facilities</a>
                                <a href="/healthAdmin/staff" id="staff" className="w3-bar-item w3-button w3-padding"><i className="fa fa-users fa-fw"></i>  Staff</a>
                                <a href="/healthAdmin/compliance" id="compliance" className="w3-bar-item w3-button w3-padding"><i className="fa fa-balance-scale fa-fw"></i>  Compliance</a>
                                <a href="/healthAdmin/chat" id="chat" className="w3-bar-item w3-button w3-padding"><i className="fa fa-comments fa-fw"></i>  Collaborate</a>
                                <a href="/healthAdmin/home" id="home" className="w3-bar-item w3-button w3-padding"><i className="fa fa-cog fa-fw"></i>  Settings</a><br/><br/>
                            </div>
                        )
                    }

                    if (userType == 'pharmacist'){
                        return (
                            <div className="w3-bar-block">
                                <a href="#" className="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onClick={(e) => this.menu_close()} title="close menu"><i className="fa fa-remove fa-fw"></i>  Close Menu</a>
                                <a href="/pharmacist/medication" id="medication" className="w3-bar-item w3-button w3-padding"><i className="fa fa-hotel fa-fw"></i>  Medication History</a>
                                <a href="/pharmacist/dispensation" id="dispensation" className="w3-bar-item w3-button w3-padding"><i className="fa fa-cubes fa-fw"></i>  Medication Dispensation</a>
                                <a href="/pharmacist/chat" id="chat" className="w3-bar-item w3-button w3-padding"><i className="fa fa-comments fa-fw"></i>  Interaction</a>
                                <a href="/pharmacist/home" id="home" className="w3-bar-item w3-button w3-padding"><i className="fa fa-cog fa-fw"></i>  Settings</a><br/><br/>
                            </div>
                        )
                    }
                    
                })()}

                
            </nav>
            
        </div>
        );
    }
}

export default Navigation;
