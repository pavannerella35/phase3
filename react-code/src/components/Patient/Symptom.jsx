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
        symptoms:[],
        symptom1: [],
        symptom2: [],
        issue:"",
        guidance:[]
    }

    constructor(props) {
        super(props);
        this.user = {};
    }

    componentDidMount() {
        axios.post(config.server + `/symptom`, JSON.stringify({ method: 'fetch' }))
        .then(res => {
            const result = res.data.message;
            console.log("-----------------------")
            console.log(result)
            if (result && result.length > 0) {
                let symptom1 = []
                let symptom2 = []
                result.map(function(r)
                {
                    if (!symptom1.includes(r.symptom1)) {
                        symptom1.push(r.symptom1);
                    }
                    if (!symptom2.includes(r.symptom2)) {
                        symptom2.push(r.symptom2);
                    }
                })
                this.setState({ symptom1:symptom1 });
                this.setState({ symptom2:symptom2 });
                this.setState({ symptoms:result });
            }
        })
    }

    check() {
        var symptom1 = $("#symptom1").val()
        var symptom2 = $("#symptom2").val()

        console.log(symptom1)
        console.log(symptom2)
        let guidance = [];
        let issue = "";
        this.state.symptoms.map(function(s)
        {
            if(s.symptom1 == symptom1 && s.symptom2 == symptom2)
            {
                issue = s.name;

                guidance = s.guidance.split('-').filter(Boolean);
            }
        })

        this.setState({ issue: issue });
        this.setState({ guidance: guidance });
    
        // const phonepattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i;
        // if (!phone || !phonepattern.test(phone)) {
        //   $('#phone' + id).focus()
        //   return
        // }
    
        // axios.post(config.server + `/users`, JSON.stringify({ method: 'update', id: id, name: uname, phone: phone, address: address }))
        //   .then(res => {
        //     console.log(res.data)
        //     alert("Updated successfully")
        //   })
      }

  render() {
    return (
        <main className="w3-light-grey">
            <div className="w3-main main-w3 ">
                <header className="w3-container" >
                    <h5 style={{marginTop:"20px"}}><b><i className="fa fa-wpexplorer main-top"></i> Symptom checker</b></h5>
                </header>

                <br/>
                <div className="w3-row-padding w3-margin-bottom"> 
    
                    <div className="w3-container">
                    <div className="card card-form" >
                        <div className="card-body w3-center">
                        <h5 className="card-title">Select symptoms</h5>
                        

                        <form action="#">
                            <div className="form-group">
                            <select className="custom-select" id="symptom1">
                            {
                                this.state.symptom1.map(s => (
                                    <option value={s} > {s}</option>
                                ))
                            }
                            </select>
                            </div>
                            <div className="form-group">
                            <select className="custom-select" id="symptom2">
                            {
                                this.state.symptom2.map(s => (
                                    <option value={s} > {s}</option>
                                ))
                            }
                            </select>
                            </div>

                            
                            <button className="btn-al btn-primary-al"  onClick={(e) => this.check()}>Check</button>
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
                        <h5 className="card-title">Possible health issue</h5>
                        <table className="w3-table w3-striped w3-bordered w3-hoverable w3-white">
                        <tr>
                        
                        <th >Name</th>
                        <th>guidance</th>
                        </tr>
                        <tr>
                        
                        <td >
                            <div className="form-group " style={{width:"90px"}}>
                                {this.state.issue}
                            </div>
                        </td>
                        
                        <td>
                            <ul>
                            {
                                this.state.guidance.map(s => (
                                <li style={{"listStyleType":"square"}}>{s}</li>
                                ))
                            }
                            </ul>
                            
                        </td>
                        
                        </tr>
                    
                        
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
