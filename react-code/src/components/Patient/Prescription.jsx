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
        prescriptions: []
    }

    componentDidMount() {
        console.log(ReactSession.get("userId"))
        axios.post(config.server + `/prescription`, JSON.stringify({ method: 'fetch-patient', id:ReactSession.get("userId") }))
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
    }

  render() {
    return (
        <main className="w3-light-grey">
            <div className="w3-main main-w3 ">
                <header className="w3-container" >
                    <h5 style={{marginTop:"20px"}}><b><i className="fa fa-map-pin main-top"></i> Prescription</b></h5>
                </header>

                <br/>


                <div className="w3-row-padding w3-margin-bottom"> 
                    
                    <div className="card">
                    <div className="card-body">
                        <table id="tableID" className="w3-table w3-striped w3-bordered w3-hoverable w3-white">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Doctor</th>
                                <th>Medication</th>
                                <th>Morning</th>
                                <th>Afternoon</th>
                                <th>Night</th>
                                <th>Next Refill</th>
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
                                {s.morning ? "Yes": "No"}
                                </div>
                            </td>
                            <td>
                                <div className="form-group ">
                                {s.afternoon ? "Yes": "No"}
                                </div>
                            </td>
                            <td>
                                <div className="form-group ">
                                {s.night ? "Yes": "No"}
                                </div>
                            </td>
                            <td>
                                <div className="form-group ">
                                {s.TillDate}
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
