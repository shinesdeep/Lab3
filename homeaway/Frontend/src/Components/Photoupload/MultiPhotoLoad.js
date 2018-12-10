import React, { Component } from 'react';
import './MultiPhotoLoad.css';
import axios from 'axios';
import cookie from 'react-cookies';

import {Redirect} from 'react-router';

class MultiPhotoLoad extends Component {
  constructor(props){
    super(props);
    this.state = {

      selectedFiles: '',
      imageView : '',
      errorflag : false,
      saveEnable : false,
      redirect : false,
    };
  }
  onChange = (e) => {
    var selectedFiles = e.target.files;
        this.setState({
          selectedFiles: selectedFiles,
          errorflag : false,
          saveEnable : true,
        })
      
      
  }

  onSubmitHandler = (listingId,e) => {
    e.preventDefault();
    const { selectedFiles } = this.state;
    let formData = new FormData();
    
        formData.append('listingId', listingId);
        formData.append('username', cookie.load('cookie'));
        formData.append('progBarVal','100%');
        formData.append('Imagecount',selectedFiles.length);
        for(let i=0;i<selectedFiles.length;i++){
            let j=i+1;
            formData.append('listingPic'+j, selectedFiles[i]);
            console.log("selectedFiles[j] :", selectedFiles[i]);
            
          }
          axios.post('http://localhost:3001/multiupload', formData)
            .then((response) => {
                console.log("Imgae Res : ",response);
                if(response.status === 200){
                    this.setState({
                        errorFlag : false,
                        redirect : true,
                        
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


  render() {
    let listingId = this.props.listingId;
    let errorlog = null;
    let successlog = null;
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
    
    if(this.state.redirect){
        successlog = <div class="alert alert-success" role="alert">
            File upload completed successfully!
            </div>
       redirectVar = <Redirect to= "/ownerdash"/>
} 
    
    return (
          <div> 
          
          {successlog}

          {redirectVar}

            {errorlog} 
          <br/>
          <div className="container-multi">
          <br/>
          <h2> Upload Photos for your Property </h2>
          <br/>
          <form onSubmit={(e) => this.onSubmitHandler(listingId,e)}>
           
            <input className="upload-multi" 
              type="file"
              name="selectedFiles"
              onChange={this.onChange}
              multiple
            />
            <br/>
            <button  style={{backgroundColor:"#337ab7",color:"#fff"}} class="btn btn-primary" 
                disabled={!this.state.saveEnable} >Upload</button>
          </form>
          <br/>
         
          </div>
    </div>  
        )
  }
}

export default MultiPhotoLoad;
