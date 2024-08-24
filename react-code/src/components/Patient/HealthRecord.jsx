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
        records: [],
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
        axios.post(config.server + `/healthRecord`, JSON.stringify({ method: 'fetch-patient', id:ReactSession.get("userId") }))
        .then(res => {
            const result = res.data.message;
            console.log("-----------------------")
            console.log(result)
            if (result && result.length > 0) {
                
                this.setState({ records:result });
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
        let toDate = $('#toDate')
        let fromDate = $('#fromDate')
        let medicineName = $('#medicineName')
        let reason = $('#reason')
        
        if(!doctor.val())
            return alert('Select doctor')
        if(!medicineName.val())
            return alert('Enter medicine name')
        if(!fromDate.val())
            return alert('Select from date')
        if(!toDate.val())
            return alert('Select to date')
        if(!reason.val())
            return alert('Enter reason for medicine')

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
            toDate: toDate.val(),
            fromDate: fromDate.val(),
            medicine: medicineName.val(),
            reason: reason.val(),
        } 

        console.log(data)
        axios.post(config.server + `/healthRecord`, JSON.stringify(data))
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

    onFromDateChange(e, id) {
        var value = e.target.value
        const newData = this.state.records.map(d => {
          if (d.id === id) {
            return { ...d, fromDate: value }
          }
          return d;
        })
        this.setState({ records: newData })
      }

    onToDateChange(e, id) {
        var value = e.target.value
        const newData = this.state.records.map(d => {
          if (d.id === id) {
            return { ...d, toDate: value }
          }
          return d;
        })
        this.setState({ records: newData })
      }

    onMedicineChange(e, id) {
        var value = e.target.value
        const newData = this.state.records.map(d => {
          if (d.id === id) {
            return { ...d, medicine: value }
          }
          return d;
        })
        this.setState({ records: newData })
      }
    
      onReasonChange(e, id) {
        var value = e.target.value
        const newData = this.state.records.map(d => {
          if (d.id === id) {
            return { ...d, reason: value }
          }
          return d;
        })
        this.setState({ records: newData })
      }

      save(e, id) {
        let selectedData = {}
        this.state.records.map(d => {
          if (d.id == id) {
            selectedData = d;
          }
        })
        if (selectedData) {
          let data = {
            method: 'update-patient',
            id: id,
            toDate: selectedData.toDate,
            fromDate: selectedData.fromDate,
            reason: selectedData.reason,
            medicine: selectedData.medicine,
          }
          axios.post(config.server + `/healthRecord`, JSON.stringify(data))
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
        axios.post(config.server + `/healthRecord`, JSON.stringify({ method: 'delete', id: id }))
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
                    <h5 style={{marginTop:"20px"}}><b><i className="fa fa-address-card-o main-top"></i> Health Record</b></h5>
                </header>

                <br/>
                <div className="w3-row-padding w3-margin-bottom"> 
    
                    <div className="w3-container">
                    <div className="card card-form">
                        <div className="card-body w3-center">
                        <h5 className="card-title">Add history</h5>
                        

                        <form action="#">
                            <div className="form-group">
                            <label for="prescribed">Prescribed By</label>
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
                            <label for="name">Medication name</label>
                            <input className="form-control" id="medicineName" type="text" name=""/>
                            </div>
                            <div className="form-group">
                            <label for="date">From Date</label>
                            <input className="form-control" id="fromDate" type="date" name=""/>
                            </div>
                            <div className="form-group">
                            <label for="date">To Date</label>
                            <input className="form-control" id="toDate" type="date" name=""/>
                            </div>
                            <div className="form-group">
                            <label for="Reason">Reason</label>
                            <textarea name="" className="form-control" id="reason" cols="30" rows="10"></textarea>
                            </div>  
                            <button className="btn-al btn-primary-al" onClick={(e) => this.make()} type="submit">Add</button>
                        </form>
                        </div>
                    </div>
                    <h6></h6>
                    <br/>
                    
                    
                    </div>
                </div>
                

                <div className="w3-row-padding w3-margin-bottom"> 
                    
                    <div className="card">
                    <div className="card-body datatable">
                        <h5 className="card-title">Medication history</h5>
                        <table id='tableID'>
                        <thead>
                            <tr>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Doctor</th>
                                <th>Medication</th>
                                <th>Reason</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.records.map(s => (
                                <tr>
                                <td >
                                    <div className="form-group ">
                                    <input  type="date" className="form-control" onChange={e => this.onFromDateChange(e, s.id)} value={s.fromDate}/>
                                    </div>
                                </td>
                                <td >
                                    <div className="form-group ">
                                    <input  type="date" className="form-control" onChange={e => this.onToDateChange(e, s.id)} value={s.toDate}/>
                                    </div>
                                </td>
                                <td >
                                    <div className="form-group ">
                                    
                                    {s.doctor}
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group ">
                                    
                                    <input className="form-control" onChange={e => this.onMedicineChange(e, s.id)} value={s.medicine}/>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group ">
                                    
                                    <textarea className="form-control" onChange={e => this.onReasonChange(e, s.id)}>{s.reason}</textarea>
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
