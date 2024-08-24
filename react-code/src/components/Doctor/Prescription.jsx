import React from "react";
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
        prescriptions: [],
        patients:[],
        medicines: []
    }

    componentDidMount() {
        console.log(ReactSession.get("userId"))
        axios.post(config.server + `/prescription`, JSON.stringify({ method: 'fetch-doctor', id:ReactSession.get("userId") }))
        .then(res => {
            const result = res.data.message;
            console.log("-----------------------")
            console.log(result)
            if (result && result.length > 0) {
                this.setState({ prescriptions:result });
            }
            $(document).ready(function () {
                $('#tableID').DataTable({
                  "lengthMenu": [5],
                  "bDestroy": true,
                  responsive: true
                });
              })
        })

        axios.post(config.server + `/users`, JSON.stringify({ method: 'fetch', userType:"patient" }))
        .then(res => {
            const result = res.data.message;
            console.log("-----------------------")
            console.log(result)
            if (result && result.length > 0) {
                
                this.setState({ patients:result });
            }
        })

        axios.post(config.server + `/medicine`, JSON.stringify({ method: 'fetch'}))
        .then(res => {
            const result = res.data.message;
            console.log("-----------------------")
            console.log(result)
            if (result && result.length > 0) {
                
                this.setState({ medicines:result });
            }
        })
    }

    make()
    {
        let patient = $('#patient')
        let tillDate = $('#tillDate')
        let medicine = $('#medicine')
        let morning = $('#morning')
        let afternoon = $('#afternoon')
        let night = $('#night')
        let reason = $('#reason')
        if(!patient.val())
            return alert('Select patient')
        if(!medicine.val())
            return alert('Select medicine')
        if(!tillDate.val())
            return alert('Select till date')
        if(!reason.val())
            return alert('Enter reason')

        let pat;
        this.state.patients.map(function(s)
        {
            if(s.userId == patient.val())
                pat = s.name
        })
        let med;
        this.state.medicines.map(function(s)
        {
            if(s.id == medicine.val())
                med = s.name
        })

        let data = 
        {
            method: 'add',
            doctor: ReactSession.get("userName"),
            doctorID: ReactSession.get("userId"),
            patientID: patient.val(),
            patient: pat,
            tillDate: tillDate.val(),
            medicineID: medicine.val(),
            medicine: med,
            morning: morning.is(':checked') ? 1 : 0,
            afternoon: afternoon.is(':checked') ? 1 : 0,
            night: night.is(':checked') ? 1 : 0,
            reason: reason.val()
        } 

        console.log(data)
        axios.post(config.server + `/prescription`, JSON.stringify(data))
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

    onMorningChange(e, id) {
        var value = e.target.value
        const newData = this.state.prescriptions.map(d => {
          if (d.id === id) {
            return { ...d, Morning: d.Morning == 1 ? 0 : 1 }
          }
          return d;
        })
        this.setState({ prescriptions: newData })
      }

      onAfternoonChange(e, id) {
        var value = e.target.value
        
        const newData = this.state.prescriptions.map(d => {
          if (d.id === id) {
            return { ...d, afternoon: d.afternoon == 1 ? 0 : 1 }
          }
          return d;
        })
        this.setState({ prescriptions: newData })
      }

      onNightChange(e, id) {
        var value = e.target.value
        const newData = this.state.prescriptions.map(d => {
          if (d.id === id) {
            return { ...d, night: d.night == 1 ? 0 : 1 }
          }
          return d;
        })
        this.setState({ prescriptions: newData })
      }

      onTillDateChange(e, id) {
        var value = e.target.value
        const newData = this.state.prescriptions.map(d => {
          if (d.id === id) {
            return { ...d, TillDate: value }
          }
          return d;
        })
        this.setState({ prescriptions: newData })
      }

      save(e, id) {
        let selectedData = {}
        this.state.prescriptions.map(d => {
          if (d.id == id) {
            selectedData = d;
          }
        })
        if (selectedData) {
          let data = {
            method: 'update-doctor',
            id: id,
            TillDate: selectedData.TillDate,
            Morning: selectedData.Morning,
            afternoon: selectedData.afternoon,
            night: selectedData.night
          }
          console.log(data)
          axios.post(config.server + `/prescription`, JSON.stringify(data))
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
        axios.post(config.server + `/prescription`, JSON.stringify({ method: 'delete', id: id }))
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
                    <h5 style={{marginTop:"20px"}}><b><i className="fa fa-pie-chart main-top"></i> Prescription</b></h5>
                </header>

                <br/>
                <div className="w3-row-padding w3-margin-bottom"> 
    
                    <div className="w3-container">
                    <div className="card card-form">
                        <div className="card-body w3-center">
                        <h5 className="card-title">Add</h5>
                        

                        <form action="#">
                            <div className="form-group">
                            <select id="patient" className="custom-select" >
                                <option value="">Select doctor</option>
                                {
                                    this.state.patients.map(s => (
                                        <option value={s.userId}>{s.name}</option>
                                    ))
                                }
                            </select>
                            </div>

                            <div className="form-group">
                            <select id="medicine" className="custom-select" >
                                <option value="">Select medicine</option>
                                {
                                    this.state.medicines.map(s => (
                                        <option value={s.id}>{s.name}</option>
                                    ))
                                }
                            </select>
                            </div>

                            <div className="form-group">
                            <label for="date">Till date</label>
                            <input className="form-control" id="tillDate" type="date" name=""/>
                            </div>
                            <div className="form-group" style={{"display": "flex"}}>
                                <label for="morning">Morning</label>
                                <input className="form-control" id="morning" type="checkbox" name=""/>
                                <label for="afternoon">Afternoon</label>
                                <input className="form-control" id="afternoon" type="checkbox" name=""/>
                                <label for="night">Night</label>
                                <input className="form-control" id="night" type="checkbox" name=""/>
                            </div>   
                            <div className="form-group">
                                <input className="form-control" id="reason" type="text" placeholder="Reason"/>
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
                        <h5 className="card-title">Prescription</h5>
                        <table id="tableID" className="w3-table w3-striped w3-bordered w3-hoverable w3-white">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Patient</th>
                                <th>Doctor</th>
                                <th>Medication</th>
                                <th>Reason</th>
                                <th>Morning</th>
                                <th>Afternoon</th>
                                <th>Night</th>
                                <th>Till date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                this.state.prescriptions.map(s => (
                        <tr>
                            <td >
                                <div className="form-group ">
                                {s.date}
                                </div>
                            </td>
                            <td >
                                <div className="form-group ">
                                {s.patient}
                                </div>
                            </td>
                            <td >
                                <div className="form-group ">
                                {s.doctor}
                                </div>
                            </td>
                            <td>
                                <div className="form-group ">
                                {s.medicine}
                                </div>
                            </td>
                            <td>
                                <div className="form-group ">
                                {s.reason}
                                </div>
                            </td>
                            <td>
                                <div className="form-group ">
                                
                                <input type="checkbox" name="" onChange={e => this.onMorningChange(e, s.id)} checked={s.Morning == 1 ? true: false}/>
                                </div>
                            </td>
                            <td>
                                <div className="form-group ">
                                <input type="checkbox" name="" onChange={e => this.onAfternoonChange(e, s.id)} checked={s.afternoon == 1 ? true: false}/>
                                </div>
                            </td>
                            <td>
                                <div className="form-group ">
                                <input type="checkbox" name="" onChange={e => this.onNightChange(e, s.id)} checked={s.night == 1 ? true: false}/>
                                </div>
                            </td>
                            <td>
                                <div className="form-group ">
                                
                                <input type="date" name="" onChange={e => this.onTillDateChange(e, s.id)} value={s.TillDate} />
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
