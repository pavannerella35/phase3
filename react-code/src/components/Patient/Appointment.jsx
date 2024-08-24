import React from "react";
// import DOMPurify from "dompurify";
import { ReactSession } from 'react-client-session';
import axios from 'axios';
import $ from "jquery";
import 'datatables.net';

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
        appointments: [],
        doctors:[]
    }

    componentDidMount() {
        
        axios.post(config.server + `/users`, JSON.stringify({ method: 'fetch', userType:"doctor" }))
        .then(res => {
            const result = res.data.message;
            console.log("-----------------------")
            console.log(result)
            if (result && result.length > 0) {
                
                this.setState({ doctors:result });
            }
        })

        console.log(ReactSession.get("userId"))
        axios.post(config.server + `/appointment`, JSON.stringify({ method: 'fetch-patient', id:ReactSession.get("userId") }))
        .then(res => {
            const result = res.data.message;
            console.log("-----------------------")
            console.log(result)
            if (result && result.length > 0) {
                
                this.setState({ appointments:result });
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

    make()
    {
        let doctor = $('#doctor')
        let date = $('#date')
        let time = $('#time')
        console.log(doctor.val())
        if(!doctor.val())
            return alert('Select doctor')
        if(!date.val())
            return alert('Select date')
        if(!time.val())
            return alert('Select time')

        let doct;
        this.state.doctors.map(function(s)
        {
            if(s.userId == doctor.val())
                doct = s.name
        })
        let data = 
        {
            method: 'add',
            patient: ReactSession.get("userName"),
            patientID: ReactSession.get("userId"),
            doctorID: doctor.val(),
            doctor: doct,
            date: date.val(),
            time: time.val()
        } 

        console.log(data)
        axios.post(config.server + `/appointment`, JSON.stringify(data))
        .then(res => {
            const result = res.data;
            console.log("-----------------------")
            console.log(result)
            if(result.status == 'ok'){
                alert('Inserted successfully')
                window.location.reload()
            }
            else
                alert(result.message)
        })
    }

    onDateChange(e, id) {
        var value = e.target.value
        const newData = this.state.appointments.map(d => {
          if (d.id === id) {
            return { ...d, date: value }
          }
          return d;
        })
        this.setState({ appointments: newData })
      }
    
      onTimeChange(e, id) {
        var value = e.target.value
        const newData = this.state.appointments.map(d => {
          if (d.id === id) {
            return { ...d, time: value }
          }
          return d;
        })
        this.setState({ appointments: newData })
      }

      save(e, id) {
        let selectedData = {}
        this.state.appointments.map(d => {
          if (d.id == id) {
            selectedData = d;
          }
        })
        if (selectedData) {
          let data = {
            method: 'update-patient',
            id: id,
            date: selectedData.date,
            time: selectedData.time
          }
          axios.post(config.server + `/appointment`, JSON.stringify(data))
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
        axios.post(config.server + `/appointment`, JSON.stringify({ method: 'delete', id: id }))
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

  render() {
    return (
        <main className="w3-light-grey">
            <div className="w3-main main-w3 ">
                <header className="w3-container" >
                    <h5 style={{marginTop:"20px"}}><b><i className="fa fa-map-pin main-top"></i> Appointment</b></h5>
                </header>

                <br/>
                <div className="w3-row-padding w3-margin-bottom"> 
    
                    <div className="w3-container">
                    <div className="card card-form">
                        <div className="card-body w3-center">
                        <h5 className="card-title">Add</h5>
                        

                        <form action="#">
                            <div className="form-group">
                            <select className="custom-select" id="doctor">
                            <option value="">Select doctor</option>
                            {
                                this.state.doctors.map(s => (
                                    <option value={s.userId}>{s.name}</option>
                                ))
                            }
                            </select>
                            </div>

                            <div className="form-group">
                            <label for="date">Select date</label>
                            <input className="form-control" id="date" type="date" name=""/>
                            </div>
                            <div className="form-group">
                            <label for="time">Select time</label>
                            <input className="form-control" id="time" type="time" name=""/>
                            </div>   
                
                            <button className="btn-al btn-primary-al" onClick={(e) => this.make()} type="submit">Make</button>
                        </form>
                        </div>
                    </div>
                    <h6></h6>
                    <br/>
                    
                    
                    </div>
                </div>
                

                <div className="w3-row-padding w3-margin-bottom"> 
                    
                    <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Appointment</h5>
                        <table id="tableID">
                        <thead>
                            <tr>
                                <th >Doctor</th>
                                <th>Date</th>
                                <th >Time</th>
                                <th>Confirmed</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.appointments.map(s => (
                                <tr>
                                <td >
                                    <div className="form-group ">
                                        {s.doctor}
                                    </div>
                                </td>
                                
                                <td >
                                    <div className="form-group ">
                                        <input  type="date" className="form-control" onChange={e => this.onDateChange(e, s.id)} value={s.date}/>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input className="form-control" type="time" name="" onChange={e => this.onTimeChange(e, s.id)} value={s.time}/>
                                    </div>
                                </td>
                                
                                
                                <td>
                                    <div className="form-group ">
                                        {s.confirmed == 1 ? 'Yes' : 'No'}
                                    </div>
                                </td>

                                <td>
                                    <button className="btn-al" onClick={(e) => this.save(e, s.id)}><i className="fa fa-edit fa-2xl"></i></button>
                                    <button className="btn-al" onClick={(e) => this.delete(e, s.id)}><i className="fa fa-trash"></i></button>
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
