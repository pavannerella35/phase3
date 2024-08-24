import React from "react";
import { ReactSession } from 'react-client-session';
import axios from 'axios';
import $ from "jquery";

import "../../assets/css/style.css";

import config from "../../assets/config.json"

const pathname = window.location.pathname;
var route = pathname.split("/");
const userType = route[1];
const page = route[2];

const css = `
    .main-w3 {
        margin-left:300px;margin-top:43px;

    }
    #reg{
        margin:0 -16px;
    }
    #reg-img{
        width:100%;
    }
    .wid-35{
        width:35px;
    }
    .wid25p{
        width:25%;
    }
    .wid50p{
        width:50%;
    }
    .wid-75p{
        width:75%;
    }
    header{
        padding-top:22px;
    }
    .white{
        color: white !important;
    }
    
    
`;

class Main extends React.Component {
    state = {
        users: []
    }

    constructor(props) {
        super(props);
        this.user = {};
    }

    componentDidMount() {
        console.log("-----------" + ReactSession.get("userId"))
        axios.post(config.server + `/users`, JSON.stringify({ method: 'fetch-id', userId: ReactSession.get("userId") }))
        .then(res => {
            const users = res.data.message;
            console.log("-----------------------")
            console.log(users)
            if (users && users.length > 0) {
            this.user = users[0];
            this.setState({ users });
            }
        })
    }

    update(e, id) {
        var uname = $("#name" + id).val()
        var phone = $("#phone" + id).val()
        var address = $("#address" + id).val()
    
        const phonepattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i;
        if (!phone || !phonepattern.test(phone)) {
          $('#phone' + id).focus()
          return
        }
    
        axios.post(config.server + `/users`, JSON.stringify({ method: 'update', id: id, name: uname, phone: phone, address: address }))
          .then(res => {
            console.log(res.data)
            alert("Updated successfully")
          })
      }

      onPhoneChange(e, id) {
        var value = e.target.value
        const newData = this.state.users.map(d => {
          if (d.userId === id) {
            return { ...d, phone: value }
          }
          return d;
        })
        this.setState({ users: newData })
      }
    
      onAddressChange(e, id) {
        var value = e.target.value
        const newData = this.state.users.map(d => {
          if (d.userId === id) {
            return { ...d, address: value }
          }
          return d;
        })
        this.setState({ users: newData })
      }
    

  render() {
    return (
        <main className="w3-light-grey">
            <div className="w3-main main-w3 ">
                <header className="w3-container" >
                    <h5 style={{marginTop: "20px"}}><b><i className="fa fa-cog main-top"></i> My profile</b></h5>
                </header>

                <br/>
                <div className="w3-row-padding w3-margin-bottom"> 
                    
                    <div className="w3-container ">
                        <div className="card card-form">
                            <div className="card-body w3-center card-form">
                                
                            {
                                this.state.users.map(user => (
                                <form action="#">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id={"name" + user.userId} value={ReactSession.get("userName")}  disabled/>
                                    </div> 

                                    <div className="form-group">
                                        <input type="email" className="form-control" id="email" value={user.email} disabled/>
                                    </div>

                                    <div className="form-group">
                                        <input type="text" className="form-control" onChange={e => this.onPhoneChange(e, user.userId)} id={"phone" + user.userId} value={user.phone}/>
                                    </div>  

                                    <dir className="form-group">
                                    <textarea id={"address" + user.userId} onChange={e => this.onAddressChange(e, user.userId)} value={user.address ?? ""} />
                                    </dir>

                                    <div className="form-group">
                                        

                                        <select name="user" id="userType" className="custom-select" disabled>
                                            <option value="userType">User type</option>
                                            <option value="patient" selected={userType === 'patient'}>Patient</option>
                                            <option value="pharmacist" selected={userType === 'pharmacist'}>Pharmacist</option>
                                            <option value="doctor" selected={userType === 'doctor'}>Doctor</option>
                                            <option value="healthAdmin" selected={userType === 'healthAdmin'}>Health admin</option>
                                            <option value="admin" selected={userType === 'admin'}>Admin</option>
                                        </select>
                                    </div>
                                    
                                    <button className="btn-al btn-primary-al" onClick={(e) => this.update(e, user.userId)} type="submit">Update</button>
                                </form>
                                ))
                            }
                            </div>
                        </div>
                    
                    </div>
                </div>

               

            </div>
        </main>
    );
  }
}

export default Main;
