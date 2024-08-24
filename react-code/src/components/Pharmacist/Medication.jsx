import React from "react";
import { ReactSession } from 'react-client-session';
import axios from 'axios';
import $ from "jquery";
import 'datatables.net';

import "../../assets/css/style.css";
import config from "../../assets/config.json"

import "../../assets/css/style.css";


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
        patients:[]
    }

    componentDidMount() {
        
        axios.post(config.server + `/users`, JSON.stringify({ method: 'fetch', userType:"patient" }))
        .then(res => {
            const result = res.data.message;
            console.log("-----------------------")
            console.log(result)
            if (result && result.length > 0) {
                
                this.setState({ patients:result });
            }
        })

    }

    search()
    {
        let patient = $('#patient')
        console.log(patient.val())
        if(!patient.val())
            return alert('Select patient')
            this.setState({ records:[] });
        axios.post(config.server + `/healthRecord`, JSON.stringify({ method: 'fetch-patient', id:patient.val() }))
        .then(res => {
            const result = res.data.message;
            console.log("-----------------------")
            console.log(result)
            this.setState({ records:[] });
            if (result && result.length > 0) {
                
                this.setState({ records:result });
                $(document).ready(function () {
                    $('#tableID').DataTable({
                      "lengthMenu": [5],
                      "bDestroy": true,
                      responsive: true
                    });
                  })
            }
            else{
                
                this.setState({ records:[] });
               
            }
            
        })
    }

  render() {
    return (
        <main className="w3-light-grey">
            <div className="w3-main main-w3 ">
                <header className="w3-container" >
                <h5 style={{marginTop:"20px"}}><b><i className="fa fa-hotel fa-fw main-top"></i> Health history</b></h5>
                </header>

                <br/>
                <div className="w3-row-padding w3-margin-bottom"> 
    
                    <div className="w3-container">
                    <div className="card card-form">
                        <div className="card-body w3-center">
                        <h5 className="card-title">Search</h5>
                        

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
                            
                            <button className="btn-al btn-primary-al" onClick={(e) => this.search()} >Search</button>
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
                        <h5 className="card-title">Medication history</h5>
                        <table id='tableID'>
                        <thead>
                            <tr>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Doctor</th>
                                <th>Medication</th>
                                <th>Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.records.map(s => (
                                <tr>
                                <td >
                                    <div className="form-group ">
                                    <input  type="date" className="form-control" value={s.fromDate} disabled/>
                                    </div>
                                </td>
                                <td >
                                    <div className="form-group ">
                                    <input  type="date" className="form-control" value={s.toDate} disabled/>
                                    </div>
                                </td>
                                <td >
                                    <div className="form-group ">
                                    
                                    {s.doctor}
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group ">
                                    
                                    <input className="form-control"  value={s.medicine} disabled/>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group ">
                                    
                                    <textarea className="form-control" disabled>{s.reason}</textarea>
                                    </div>
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
