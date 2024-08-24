import React from "react";
import { ReactSession } from 'react-client-session';
import axios from 'axios';
import $ from "jquery";

import "../../assets/css/style.css";
import config from "../../assets/config.json"

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
    
        users: [],
        programs: []
      }
    
      constructor(props) {
        super(props);
      }
    
      componentDidMount() {
        $(document).ready(function () {
          const editCard = document.getElementById('edit');
          editCard.style.display = 'none';
    
          const menuBtn = document.querySelectorAll("[data-menu-btn]");
    
          for (let i = 0; i < menuBtn.length; i++) {
            menuBtn[i].addEventListener("click", function () {
              this.nextElementSibling.classList.toggle("active");
            });
          }
        });
    
        axios.post(config.server + `/users`, JSON.stringify({ method: 'fetch', userType:'doctor' }))
          .then(res => {
            let s = res.data.message
            if (s && s.length > 0) {
              console.log(s)
              this.setState({ users: s })
              
            }
            else {
              alert('No users found')
            }

            $(document).ready(function () {
                $('#tableID').DataTable({
                  "lengthMenu": [5],
                  "bDestroy": true,
                  responsive: true
                });
              })
          })
    
      }
    
      onChangeValue(e, id, type) {
        var value = e.target.value
    
        const newData = this.state.users.map(d => {
          if (d.userId === id) {
            if (type == 'name') {
              return { ...d, name: value }
            }
            const phonepattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i;
            if (type == 'phone') {
              if (value.length > 10 && !phonepattern.test(value))
                alert('Enter valid phone number')
              else
                return { ...d, phone: value }
            }
    
            if (type == 'address') {
              return { ...d, address: value }
            }
    
            if (type == 'active') {
              if (d.active == true)
                return { ...d, active: false }
              else
                return { ...d, active: true }
            }
    
            return d;
          }
          return d;
        })
    
        this.setState({ users: newData })
      }
    
      save(e, id) {
        let user = {}
        this.state.users.map(d => {
          if (d.userId == id) {
            user = d;
          }
        })
        if (user) {
          let data = {
            method: 'update-admin',
            id: id,
            name: user.name,
            phone: user.phone,
            address: user.address,
            sem: user.sem,
            programId: user.programId,
            active: user.active
          }
          axios.post(config.server + `/users`, JSON.stringify(data))
            .then(res => {
              console.log(res.data)
              if (res.data.status == 'ok')
                alert("Updated successfully")
              else
                alert("Something went wrong")
            })
        }
      }
    
      delete(e, id) {
        axios.post(config.server + `/users`, JSON.stringify({ method: 'delete', id: id }))
          .then(res => {
            console.log(res.data)
            if (res.data.status == 'ok') {
              alert("Deleted successfully")
              window.location.reload()
            }
            else
              alert("Something went wrong")
          })
      }
    
      add(e) {
        const fname = $("#uname");
        const email = $("#email");
        const userType = $("#userType");
    
        if (!fname.val()) {
          $('#uname').focus()
          return
        }
    
        const pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
        if (!email.val() || !pattern.test(email.val())) {
          $('#email').focus()
          return
        }

    
        const postdata = {
          name: fname.val(),
          email: email.val(),
          phone: $('#phone').val(),
          password: 'Password@123',
          userType: 'doctor',
        }
    
        axios.post(config.server + `/signup`, JSON.stringify(postdata))
          .then(res => {
            console.log(res);
            console.log(res.data);
    
            if (res.data.status == 'ok') {
              alert("Added successfull")
              window.location.reload()
            }
            // else {
            //   console.log(res.data.message);
            //   if (res.data.message)
            //     alert(res.data.message);
            //   else {
            //     alert("Could not send mail");
            //     window.location.reload()
            //   }
            // }
          })
      }

  render() {
    return (
        <main className="w3-light-grey">
            <div className="w3-main main-w3 ">
                <header className="w3-container" >
                    <h5 style={{marginTop:"20px"}}><b><i className="fa fa-users main-top"></i> Staff</b></h5>
                </header>

                <br/>
                <div className="w3-row-padding w3-margin-bottom"> 
                    
                    <div className="w3-container ">
                        <div className="card card-form">
                            <div className="card-body w3-center card-form">
                                <h5 className="card-title">Add doctor</h5>
                        

                                <form action="#">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="uname" placeholder="Enter name" required/>
                                    </div> 

                                    <div className="form-group">
                                        <input type="email" className="form-control" id="email" placeholder="Enter email" required/>
                                    </div>

                                    <div className="form-group">
                                        <input type="number" className="form-control" id="phone" placeholder="Enter phone" required/>
                                    </div>

                              
                                    
                                    <button className="btn-al btn-primary-al" onClick={(e) => this.add(e)} type="submit">Add</button>
                                </form>
                        </div>
                    </div>
                    
                    </div>
                </div>

                <div className="w3-row-padding w3-margin-bottom"> 
    
                    <div className="card">
                        <div className="card-body">
                            <table id='tableID'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Active</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.users.map(u => (
                                        <tr>
                                            <td>{u.userId}</td>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                            <td>
                                                <div className="form-group ">
                                                <input type="text" style={{ width: "80px" }} onChange={(e) => this.onChangeValue(e, u.userId, 'phone')} value={u.phone ?? ""} />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group ">
                                                    <textarea type="text" style={{ width: "100px" }} onChange={(e) => this.onChangeValue(e, u.userId, 'address')} value={u.address ?? ""}></textarea>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group ">
                                                <input type="checkbox" onClick={(e) => this.onChangeValue(e, u.userId, 'active')} checked={u.active == 1 ? true : false} />
                                                </div>
                                            </td>
                                            <td>
                                                
                                                <button className="btn-al" onClick={(e) => this.save(e, u.userId)}><i className="fa fa-edit fa-2xl"></i></button>
                                                <button className="btn-al" onClick={(e) => this.delete(e, u.userId)}><i className="fa fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    ))
                                }

                                </tbody>
                            </table>
                        </div>
                    
                    </div>

                </div>

            </div>
        </main>
    );
  }
}

export default Main;
