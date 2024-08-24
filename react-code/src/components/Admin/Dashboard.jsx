import React from "react";
import { ReactSession } from 'react-client-session';
import axios from 'axios';
import $ from "jquery";
import 'datatables.net';
// import Chartist from 'chartist';
// import { Chart } from 'singledivui';
// import 'singledivui/dist/singledivui.min.css';

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

class Dashboard extends React.Component {
    state = {
        appointments: [],
        healthRecords:[],
        prescriptions: [],
        patients:[],
        doctors:[],
        wards: []
      }

    componentDidMount() {

        axios.post(config.server + `/dashboard`, JSON.stringify({ method: 'fetch-doctors', id:ReactSession.get("userId") }))
        .then(res => {
            const result = res.data.message;
            console.log("----------doctors-------------")
            console.log(result)
            if (result && result.length > 0) {
                
                this.setState({ doctors:result });

            }
        })

        axios.post(config.server + `/dashboard`, JSON.stringify({ method: 'fetch-patients'}))
        .then(res => {
            const result = res.data.message;
            console.log("-----------patients------------")
            console.log(result)
            if (result && result.length > 0) {
                
                this.setState({ patients:result });

            }
        })

        axios.post(config.server + `/dashboard`, JSON.stringify({ method: 'fetch-wards', id:ReactSession.get("userId")}))
        .then(res => {
            const result = res.data.message;
            console.log("-----------wards------------")
            console.log(result)
            if (result && result.length > 0) {
                
                this.setState({ wards:result });

            }
        })

        $(document).ready(function() {
        //   const { Chart } = window.SingleDivUI;

          axios.post(config.server + `/dashboard`, JSON.stringify({ method: 'fetch-patients-ratio'}))
            .then(res => {
                const result = res.data.message;
                console.log("-----------fetch-patients-ratio------------")
                console.log(result)
                
                    let labels =[]
                    let points = []

                    
                        result.map(t => {
                            labels.push(t.date)
                            points.push(t.count)
                          
                        })
                

                    
                    
                    console.log(labels);
                    console.log(points)
                    new window.Chart("chart1", {
                      type: "line",
                      data: {
                        labels: labels,
                        datasets: [{
                          fill: false,
                          lineTension: 0,
                          backgroundColor: "rgba(0,0,255,1.0)",
                          borderColor: "rgba(0,0,255,0.1)",
                          data: points
                        }]
                      },
                      options: {
                        legend: {display: false},
                        scales: {
                          yAxes: [{ticks: {min: 0}}],
                        }
                      }
                    });
                    
                



                
            })

            axios.post(config.server + `/dashboard`, JSON.stringify({ method: 'fetch-wards-ratio'}))
            .then(res => {
                const result = res.data.message;
                console.log("-----------fetch-ward-ratio------------")
                console.log(res)
                console.log(result)
                
                    let labels =[]
                    let points = []

                    
                        result.map(t => {
                            labels.push(t.ward)
                            points.push(t.count)
                          
                        })
                    
                        var barColors = ["#453F78", "#795458","#C08B5C","#FFC94A","#E9A89B","#E9A89B"];

                        new window.Chart("chart2", {
                        type: "bar",
                        data: {
                            labels: labels,
                            datasets: [{
                            backgroundColor: barColors,
                            data: points
                            }]
                        },
                        options: {
                            legend: {display: false},
                            title: {
                            display: true
                            }
                        }
                        });
                        
                
                



                
            })

           
        })
        
      }

      download(e, type) {
        if (type == 'doctors')
          this.downloadCSVFromJson('doctors', this.state.doctors)
        if (type == 'patients')
          this.downloadCSVFromJson('patients', this.state.patients)
        if (type == 'wards')
          this.downloadCSVFromJson('wards', this.state.wards)
      }
    
      downloadCSVFromJson = (filename, arrayOfJson) => {
        // convert JSON to CSV
        const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
        const header = Object.keys(arrayOfJson[0])
        let csv = arrayOfJson.map(row => header.map(fieldName =>
          JSON.stringify(row[fieldName], replacer)).join(','))
        csv.unshift(header.join(','))
        csv = csv.join('\r\n')
    
        // Create link and download
        var link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      generatePDF(id, name) {
        const { jsPDF } = window.jspdf;
        var chartContainer = document.getElementById(id);
    
        window.domtoimage.toPng(chartContainer)
          .then(function (dataUrl) {
            var pdf = new jsPDF('landscape'); // 'portrait' or 'landscape' for page orientation
            pdf.addImage(dataUrl, 'PNG', 10, 10, 190, 100); // Adjust the dimensions as needed
            pdf.save(name + '.pdf');
          })
          .catch(function (error) {
            console.error('Error while generating PDF:', error);
          });
    
      }

  render() {
    return (
        <main className="w3-light-grey ">
            <div className="w3-main main-w3 ">
                <header className="w3-container " >
                    <h5 style={{marginTop: "20px"}}><b><i className="fa fa-dashboard main-top"></i> Dashboard</b></h5>
                </header>

                <div className="w3-row-padding w3-margin-bottom">
                    <div className="w3-quarter">
                        <div class="w3-container w3-red w3-padding-16">
                            <div className="w3-left"><i className="fa fa-users w3-xxxlarge w3-text-white"></i></div>
                            <div className="w3-right">
                            <h3><a href="#">{this.state.doctors.length}</a></h3>
                            <a title="report" style={{"cursor":"pointer"}}><i className="fa fa-download w3-text-white" onClick={(e) => this.download(e, 'doctors')}></i></a>
                        </div>
                        <div className="w3-clear"></div>
                        <h4>Doctors</h4>
                        
                    </div>
                </div>
                
                <div className="w3-quarter">
                    <div className="w3-container w3-purple w3-padding-16">
                        <div className="w3-left"><i className="fa fa-bed w3-xxxlarge w3-text-white"></i></div>
                        <div className="w3-right">
                        <h3><a href="#">{this.state.wards.length}</a></h3>
                        <a title="report" style={{"cursor":"pointer"}}><i className="fa fa-download w3-text-white" onClick={(e) => this.download(e, 'wards')}></i></a>
                    </div>
                    <div className="w3-clear"></div>
                    <h4>Wards</h4>
                    </div>
                </div>
                
                <div className="w3-quarter">
                    <div className="w3-container w3-orange w3-text-white w3-padding-16">
                        <div className="w3-left"><i className="fa fa-bed w3-xxxlarge w3-text-white"></i></div>
                        <div className="w3-right">
                            <h3><a href="#">{this.state.patients.length}</a></h3>
                            <a title="report" style={{"cursor":"pointer"}}><i className="fa fa-download w3-text-white" onClick={(e) => this.download(e, 'patients')}></i></a>
                        </div>
                        <div className="w3-clear"></div>
                        <h4>Patients</h4>
                    </div>
                </div>  


            </div>

            <div className="row">
                <div className="cell">
                <h2>Patients for last 7 days<i className="fa fa-download  color-green" onClick={(e) => this.generatePDF('chart1', 'patientsRatio')} aria-hidden="true"></i></h2>
                {/* <div id="chart1"></div> */}
                <canvas id="chart1" style={{"width":"430px","width":"430px"}}></canvas>
                </div>
                <div className="cell">
                <h2>Ward ratio <i className="fa fa-download  color-green" onClick={(e) => this.generatePDF('chart2', 'wardRatio')} aria-hidden="true"></i></h2>
                {/* <div id="chart2"></div> */}
                <canvas id="chart2" style={{"width":"450px","width":"450px"}} ></canvas>
                </div>
                
            </div>
            


        </div>

        
      </main>
    );
  }
}

export default Dashboard;
