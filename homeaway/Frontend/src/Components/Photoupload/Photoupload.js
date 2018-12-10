import React, { Component } from 'react';
import './Photoupload.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Photoupload extends Component {
  constructor(props){
    super(props);
    this.state = {
      description: '',
      selectedFile: '',
      imageView : '',
      errorflag : false

    };
  }
  onChange = (e) => {
      if(e.target.name == 'selectedFile'){
        this.setState({
          selectedFile: e.target.files[0],
          errorflag : false
        })
      }else{
        this.setState({ 
            [e.target.name]: e.target.value,
            errorflag : false,
        
        
        });
      }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { description, selectedFile } = this.state;
    let formData = new FormData();
    if(cookie.load('cookie')){
        formData.append('description', description);
        formData.append('selectedFile', selectedFile);
        formData.append('username', cookie.load('cookie'));
    
          axios.post('http://localhost:3001/upload', formData)
            .then((response) => {
                console.log("Imgae Res : ",response);
                if(response.status === 200){
                    this.setState({
                        errorFlag : false
                    });
                    console.log("Photo upload Completed");
                }
            })
            .catch((error) => {
                console.log("Error in Upload :", error);
                this.setState({
                    errorFlag : true
                });
            });   

    }
    else{
        
        console.log("Cookie is stale");
        this.setState({
            errorFlag : true
        });

    }
    

  }


  render() {
    let errorlog = null;
    const { description, selectedFile } = this.state;
    let redirectVar = null;
        if(!cookie.load('cookie')){
            console.log("Valid Cookie, Redirect to Home");
            redirectVar = <Redirect to= "/login"/>
        }
    
    if(this.state.errorFlag){

        errorlog = <div className="alert-danger" > 
                   File upload was not successful, Try again !!!
                   
                    </div>
    }
    
      
    return (
          <div> 
          
          {redirectVar}

            {errorlog} 
          <div className="container-form">
          <form onSubmit={this.onSubmit}>
            {/* <input
              type="text"
              name="description"
              value={description}
              onChange={this.onChange}
              multiple
            /> */}
            <input className="upload-input" 
              type="file"
              name="selectedFile"
              onChange={this.onChange}
             
            />
            <br/>
            <button className="btn btn-primary" type="submit">Upload</button>
          </form>
          <br/>
          
          </div>
    </div>  
        )
  }
}

export default Photoupload;
