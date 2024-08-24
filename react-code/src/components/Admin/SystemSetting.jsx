import React from "react";
// import DOMPurify from "dompurify";

import "../../assets/css/style.css";

const pathname = window.location.pathname;
var route = pathname.split("/");
const userType = route[1];
const page = route[2];

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
  render() {
    return (
        <main className="w3-light-grey">
            <div className="w3-main main-w3 ">
                <header className="w3-container" >
                    <h5 style={{marginTop: "20px"}}><b><i className="fa fa-cog main-top"></i> System setting</b></h5>
                </header>

                <br/>
                <div className="w3-row-padding w3-margin-bottom"> 
                    
                    <div className="w3-container ">
                        <div className="card card-form">
                            <div className="card-body w3-center card-form">
                                
                        
                                <form action="#">
                                     

                                    <div className="form-group">
                                        <select name="user" id="" className="custom-select" >
                                            <option value="">Theme</option>
                                            <option value="">Dark</option>
                                            <option value="">Light</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <select name="user" id="" className="custom-select" >
                                            <option value="">Time zone</option>
                                            <option value="">America/New_York</option>
                                            <option value="">America/Nome</option>
                                        </select>
                                    </div>
                                    
                                    <button className="btn-al btn-primary-al" type="submit">Update</button>
                                </form>
                            </div>
                        </div>
                    
                    </div>
                </div>

               

            </div>
        </main>
    );
  }
}

export default Main;
