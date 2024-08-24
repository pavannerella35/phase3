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
        facilities: []
    }

    componentDidMount() {
    
        axios.post(config.server + `/facility`, JSON.stringify({ method: 'fetch'}))
        .then(res => {
            const result = res.data.message;
            console.log("-----------------------")
            console.log(result)
            if (result && result.length > 0) {
                
                this.setState({ facilities:result });
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
        let ward = $('#ward')
        let roomDesc = $('#roomDesc')
        let roomNumber = $('#roomNumber')
        let capacity = $('#capacity')
        let charge = $('#charge')
        console.log(ward.val())
        if(!ward.val())
            return alert('Select ward')
        if(!roomDesc.val())
            return alert('Select room description')
        if(!roomNumber.val())
            return alert('Select room number')
        if(!capacity.val())
            return alert('Select room capacity')
        if(!charge.val())
            return alert('Select charge')
        
        let data = 
        {
            method: 'add',
            ward: ward.val(),
            roomDesc: roomDesc.val(),
            roomNumber: roomNumber.val(),
            capacity: capacity.val(),
            charge: charge.val()
        } 

        console.log(data)
        axios.post(config.server + `/facility`, JSON.stringify(data))
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

   
    
      onRoomDescChange(e, id) {
        var value = e.target.value
        const newData = this.state.facilities.map(d => {
          if (d.id === id) {
            return { ...d, roomDesc: value }
          }
          return d;
        })
        this.setState({ facilities: newData })
      }

      onChargesChange(e, id) {
        var value = e.target.value
        const newData = this.state.facilities.map(d => {
          if (d.id === id) {
            return { ...d, charges: value }
          }
          return d;
        })
        this.setState({ facilities: newData })
      }

      onCapacityChange(e, id) {
        var value = e.target.value
        const newData = this.state.facilities.map(d => {
          if (d.id === id) {
            return { ...d, capacity: value }
          }
          return d;
        })
        this.setState({ facilities: newData })
      }

      onAvailableChange(e, id) {
        var value = e.target.value
        const newData = this.state.facilities.map(d => {
          if (d.id === id) {
            return { ...d, available: value }
          }
          return d;
        })
        this.setState({ facilities: newData })
      }

      save(e, id) {
        let selectedData = {}
        this.state.facilities.map(d => {
          if (d.id == id) {
            selectedData = d;
          }
        })
        if (selectedData) {
          let data = {
            method: 'update',
            id: id,
            available: selectedData.available,
            charges: selectedData.charges,
            capacity: selectedData.capacity,
            roomDesc: selectedData.roomDesc
          }
          axios.post(config.server + `/facility`, JSON.stringify(data))
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
        axios.post(config.server + `/facility`, JSON.stringify({ method: 'delete', id: id }))
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
                <h5 style={{marginTop:"20px"}}><b><i className="fa fa-hospital-o main-top"></i> Facility</b></h5>
                </header>

                <br/>
                <div className="w3-row-padding w3-margin-bottom"> 
    
                    <div className="w3-container">
                    <div className="card card-form">
                        <div className="card-body w3-center">
                        <h5 className="card-title">Add Facility</h5>
                        

                        <form action="#">
                        <div className="form-group">
                                        <select name="user" id="ward" className="custom-select">
                                            <option value="">Select ward type</option>
                                            <option value="General Ward">General Ward</option>
                                            <option value="Semi-Private Room">Semi-Private Room</option>
                                            <option value="Private Room">Private Room</option>
                                            <option value="Deluxe/Executive Suite">Deluxe/Executive Suite</option>
                                        </select>
                                    </div> 

                                    <div className="form-group">
                                        <input type="text" className="form-control" id="roomDesc" placeholder="Room description" />
                                    </div>
                                    <div className="form-group">
                                        <input type="number" className="form-control" id="roomNumber" placeholder="Room number" />
                                    </div>
                                    <div className="form-group">
                                        <input type="number" className="form-control" id="capacity" placeholder="Capacity" />
                                    </div>  
                                    <div className="form-group">
                                        <input type="number" className="form-control" id="charge" placeholder="Charges in $" />
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
                                <th>Room no.</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Charges</th>
                                <th>Capacity</th>
                                <th>Available</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.facilities.map(s => (
                                <tr>
                                <td >
                                    <div className="form-group ">
                                        {s.roomNumber}
                                    </div>
                                </td>
                                <td >
                                    <div className="form-group ">
                                        {s.ward}
                                    </div>
                                </td>
                                
                                <td >
                                    <div className="form-group ">
                                        <input  type="text" className="form-control" onChange={e => this.onRoomDescChange(e, s.id)} value={s.roomDesc}/>
                                    </div>
                                </td>
                                
                                <td>
                                    <div className="form-group">
                                        <input className="form-control" type="number" name="" onChange={e => this.onChargesChange(e, s.id)} value={s.charges}/>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input className="form-control" type="number" name="" onChange={e => this.onCapacityChange(e, s.id)} value={s.capacity}/>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input className="form-control" type="number" name="" onChange={e => this.onAvailableChange(e, s.id)} value={s.available}/>
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
