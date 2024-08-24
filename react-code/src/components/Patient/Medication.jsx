import React from "react";
// import DOMPurify from "dompurify";
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
        prescriptions: []
    }

    componentDidMount() {
        

        console.log(ReactSession.get("userId"))
        axios.post(config.server + `/prescription`, JSON.stringify({ method: 'fetch-patient-today', id:ReactSession.get("userId") }))
        .then(res => {
            const result = res.data.message;
            console.log("-----------------------")
            console.log(result)
            if (result && result.length > 0) {
                
                this.setState({ prescriptions:result });
            }
        })
    }

  render() {
    return (
        <main className="w3-light-grey">
            <div className="w3-main main-w3 ">
                <header className="w3-container" >
                    <h5 style={{marginTop:"20px"}}><b><i className="fa fa-hotel main-top"></i> Medication Reminder</b></h5>
                </header>

                <br/>

                

                <div className="w3-row-padding w3-margin-bottom"> 
                    
                    <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Today's list</h5>
                        <table className="w3-table w3-striped w3-bordered w3-hoverable w3-white">
                        <tr>
                        <th>Name</th>
                        <th>Morning</th>
                        <th>Afternoon</th>
                        <th>Night</th>
                        <th>Till</th>
                        </tr>
                        {
                            this.state.prescriptions.map(s => (
                            <tr>
                                <td >
                                    <div className="form-group ">
                                        {s.medicine}
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group ">   
                                        <input type="checkbox" checked={s.Morning == 1 ? true: false} />
                                    </div>
                                </td>
                                <td >
                                    <div className="form-group ">
                                        <input type="checkbox" checked={s.afternoon == 1 ? true: false} />
                                    </div>
                                </td>
                                <td style={{"verticalAlign":"middle"}}> 
                                    <div className="form-group " >
                                        <input type="checkbox" checked={s.night == 1 ? true: false} />
                                    </div>
                                </td>
                                <td>
                                    {s.TillDate}
                                </td>
                                
                            </tr>
                            ))
                        }
                  
                        
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
