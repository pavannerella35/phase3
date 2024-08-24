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
        compliances: []
    }

    componentDidMount() {
    
        axios.post(config.server + `/compliance`, JSON.stringify({ method: 'fetch'}))
        .then(res => {
            const result = res.data.message;
            console.log("-----------------------")
            console.log(result)
            if (result && result.length > 0) {
                
                this.setState({ compliances:result });
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
        let type = $('#type')
        let description = $('#description')
        let applyTo = $('#applyTo')
        if(!type.val())
            return alert('Select type')
        if(!description.val())
            return alert('Select description')
        if(!applyTo.val())
            return alert('Select apply to')
       
        let data = 
        {
            method: 'add',
            type: type.val(),
            description: description.val(),
            applyTo: applyTo.val()
        } 

        console.log(data)
        axios.post(config.server + `/compliance`, JSON.stringify(data))
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
    
    onDescriptionChange(e, id) {
        var value = e.target.value
        const newData = this.state.compliances.map(d => {
          if (d.id === id) {
            return { ...d, description: value }
          }
          return d;
        })
        this.setState({ compliances: newData })
      }

      save(e, id) {
        let selectedData = {}
        this.state.compliances.map(d => {
          if (d.id == id) {
            selectedData = d;
          }
        })
        if (selectedData) {
          let data = {
            method: 'update',
            id: id,
            description: selectedData.description
          }
          axios.post(config.server + `/compliance`, JSON.stringify(data))
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
        axios.post(config.server + `/compliance`, JSON.stringify({ method: 'delete', id: id }))
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
                <h5 style={{marginTop:"20px"}}><b><i className="fa fa-balance-scale fa-fw main-top"></i> Facility</b></h5>
                </header>

                <br/>
                <div className="w3-row-padding w3-margin-bottom"> 
    
                    <div className="w3-container">
                    <div className="card card-form">
                        <div className="card-body w3-center">
                        <h5 className="card-title">Add rule/guidance</h5>
                        

                        <form action="#">
                        <div className="form-group">
                                        <select id="type" className="custom-select">
                                            <option value="">Select rule/ guidance</option>
                                            <option value="healthcare regulations">healthcare regulations</option>
                                            <option value="standards">standards</option>
                                            <option value="legal requirements">legal requirements</option>
                                        </select>
                                    </div> 

                                    <div className="form-group">
                                        <textarea name="" id="description" cols="30" rows="4" placeholder="Description"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="applyTo"></label>
                                        <select id="applyTo" className="custom-select">
                                            <option value="">Select user to apply</option>
                                            <option value="Doctors">Doctors</option>
                                            <option value="Patients">Patients</option>
                                            <option value="General">General</option>
                                        </select>
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
                        <h5 className="card-title">Facility</h5>
                        <table id="tableID">
                        <thead>
                            <tr>
                                <th>Id</th>
                                    <th>Type</th>
                                    <th>Description</th>
                                    <th>Applies to</th>
                                    <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.compliances.map(s => (
                                <tr>
                                    <td >
                                    <div className="form-group ">
                                        {s.id}
                                    </div>
                                </td> 
                                <td >
                                    <div className="form-group ">
                                        {s.type}
                                    </div>
                                </td>     
                                <td >
                                    <div className="form-group ">
                                        <input  type="text" className="form-control" onChange={e => this.onDescriptionChange(e, s.id)} value={s.description}/>
                                    </div>
                                </td>
                                <td >
                                    <div className="form-group ">
                                        {s.appliesTo}
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
