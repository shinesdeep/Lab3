import React, {Component} from 'react';
import  './OwnerPost.css';
//import ProperyDetails from './PropertyDetails';
import axios from 'axios';
import cookie from 'react-cookies';
import MultiPhotoLoad from '../Photoupload/MultiPhotoLoad';
// import moment from 'moment';
// import { DateRangePicker } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';
// import 'react-dates/initialize';
import {Redirect} from 'react-router';
class OwnerPost extends Component {
  constructor(props){
    //Call the constructor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
       showAddressForm: true,
       showPropertyForm : false,
       showBookingForm : false,
       showPhotosForm : false,
      //  listingDetails : '',
       progBarVal : '1%',
       street: 'Street Address',
       city: 'City',
       states: 'State',
       country: 'Country',
       headline : 'Headline',
       propdes : 'Property Description',
       proptype : '',
       bedrooms : '',
       accomodates : '',
       bathrooms :'',
       instant: '',
       price : '',
       listingId: '',
       username : '',
       errorFlag : false,
       saveEnable : false,
     
    }
    //Bind the handlers to this class
     this.handleAddress = this.handleAddress.bind(this);
     this.handleProperty = this.handleProperty.bind(this);
     this.handleBooking = this.handleBooking.bind(this);
     this.handlePhotos = this.handlePhotos.bind(this);
     this.changeHandler = this.changeHandler.bind(this);
     this.submitHandler = this.submitHandler.bind(this);
    //  this.onDatesChange = this.onDatesChange.bind(this);
    //  this.onFocusChange = this.onFocusChange.bind(this);  
     this.submitpropDetails = this.submitpropDetails.bind(this);
     this.submitbookOpt = this.submitbookOpt.bind(this);
  
}
handleAddress(e){
  this.setState({
    showAddressForm : true,
    showPropertyForm : false,
    showBookingForm : false,
    showPhotosForm : false,
  });

}

handleProperty(e){
  this.setState({
    showAddressForm : false,
    showPropertyForm : true,
    showBookingForm : false,
    showPhotosForm : false,

  });

}
handleBooking(e){
  this.setState({
    showAddressForm : false,
    showPropertyForm : false,
    showPhotosForm : false,
    showBookingForm : true
  
  })
}

handlePhotos(e){
  this.setState({
    showPhotosForm : true,
    showAddressForm : false,
    showPropertyForm : false,
    showBookingForm : false,
    
  });

}




componentDidMount(){
//   var listingId = this.props.listingId;
  console.log("Inside component did mount"); 
  const username = cookie.load('cookie');
  console.log( "Username is ", username);
//   console.log( "this.p ", listingId);
  this.setState({username:username,
    listingId : this.props.listingId
      
}) ;
   

// if(listingId)
// {
    axios.get('http://localhost:3001/ownupdate',{
       params: {
           username: username,
        //    listingId : listingId,
         }
    }) .then((response) => {

      //console.log("firstname in temp_res key",temp_resp.key )
      
       console.log("Status Code : ",response.status);
       if(response.status === 200){
               //this.setState({httpres: response.data.concat(response.data) })
               console.log("Success Post");

               
               console.log(response.data);
               
               this.setState({
           
                username :response.data.username,
                listingId:response.data.listingId,
                street: response.data.street,
                city: response.data.city,
                states: response.data.states,
                country: response.data.country,
                headline : response.data.headline,
                propdes : response.data.propdes,
                proptype : response.data.proptype,
                bedrooms : response.data.bedrooms,
                accomodates : response.data.accomodates,
                bathrooms :response.data.bathrooms,
                progBarVal : response.data.progBarVal,
                instant :response.data.instant,
                price :response.data.price,
   
               }); 
   
               
               let val = response.data.progBarVal;
               console.log("response.data.progBarVal : ",response.data.progBarVal);
               if(val < '25%' || val ==='100%')
               {
                this.setState({
                  showAddressForm: true,
                  showPropertyForm : false,
                  showBookingForm : false,
                  showPhotosForm : false,
                
                })
            
               }
               else if(val >='25%' && val <'50%')
               {
                this.setState({
                  showAddressForm: false,
                  showPropertyForm : true,
                  showBookingForm : false,
                  showPhotosForm : false,
                
                })
               }
               else if(val >= '50%' && val < '75%')
               {
                this.setState({
                  showAddressForm: false,
                  showPropertyForm : false,
                  showBookingForm : true,
                  showPhotosForm : false,
                
                })
               }
               else if(val >= '75%' && val < '100%')
               {
                  this.setState({
                    showAddressForm: false,
                    showPropertyForm : false,
                    showBookingForm : false,
                    showPhotosForm : true,

                  })
               }

           
       }else{
               
              this.setState({errorFlag : true})
              console.log("Error in Response");

           }
      
       
       });
        
//   }
}  


changeHandler(e){

  this.setState({
    [e.target.name] : e.target.value,
    saveEnable : true,
    
})
//console.log("target : ", e.target.name);
//console.log("values : ",e.target.value);


}

submitpropDetails(e){

  e.preventDefault();
  let { username,listingId, headline, propdes, proptype, bedrooms, accomodates, bathrooms, progBarVal } = this.state;
  //let formData= new FormData();
  // const username = listingDetails.username;
  // const listingId = listingDetails.listingId;
  //console.log("props check", val );
  
 


  if(headline && propdes && proptype && bedrooms && accomodates && bathrooms)
  {
    progBarVal = "51%";
  } 
  else{
      progBarVal = "26%";
  }
  
  const Data = {    
     'propform' : 'propform', 
    'username' : username,
    'headline': headline,
    'propdes' : propdes ,
    'proptype' :proptype,
    'bedrooms' : bedrooms,
    'accomodates': accomodates ,
    'bathrooms' : bathrooms, 
    'progBarVal' : progBarVal,
    'listingId'  : listingId
   }
  

  console.log("Updae Property Request Data", Data);
        //set the with credentials to true
  axios.defaults.withCredentials = true;
  axios.post('http://localhost:3001/ownupdate', Data)    
  .then(response => {
      console.log("Status Code : ",response);
      if(response.status === 200){
          this.setState({
              errorFlag : false,
              progBarVal : progBarVal,
              showPropertyForm : false,
              showBookingForm : true,
              showPhotosForm : false,
              showAddressForm: false,



          });
          console.log("Owner Prop Details Completed");
      }else{
          
          console.log("Login Error ");
          this.setState({
              errorFlag : true,
              showPropertyForm : true,
              showBookingForm : false,
              showPhotosForm : false,
              showAddressForm: false,
              
          })
      }
  
      
  
  })
  .catch((error) => {
      // Error
      if (error.response) {

          this.setState({
              errorFlag : true
          })
          
      } else if (error.request) {
          this.setState({
              errorFlag : true
          })
          
          console.log(error.request);
      } else {
          this.setState({
              errorFlag : true
          })
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
      }
      console.log(error.config);
      this.setState({
          errorFlag : true
      })
  });   




}



submitHandler(e){
  console.log("Inside submit handler");
  let { street, city, states, country, listingId, progBarVal } = this.state;
  //let formData= new FormData();
  
  e.preventDefault();
  const username = cookie.load('cookie');
  if(street && city && country && states)
  {
    progBarVal = "26%";
  }
  else
  {
    progBarVal = "15%";

  } 
  

  const Data = {
    'addressform' : 'addressform',     
    'username' : username,
    'listingId': listingId,
    'street' : street ,
    'states' :states,
    'city' : city,
    'country': country ,
    'progBarVal' : progBarVal, 
   }
 

  console.log("Onwer Update Request Data", Data);
        //set the with credentials to true
  axios.defaults.withCredentials = true;
  axios.post('http://localhost:3001/ownupdate', Data)    
  .then(response => {
      console.log("Status Code : ",response);
      if(response.status === 200){
          this.setState({
              errorFlag : false,
              showPropertyForm : true,
              showBookingForm : false,
              showPhotosForm : false,
              showAddressForm: false,
              progBarVal:progBarVal,
          });
          console.log("Owner update sCompleted");
      }else{
          
          console.log("Owner update Error ");
          this.setState({
              errorFlag : true,
              showAddressForm: true,
              showBookingForm : false,
              showPhotosForm : false,
              showPropertyForm : false,
          })
      }
  
      
  
  })
  .catch((error) => {
      // Error
      if (error.response) {

          this.setState({
              errorFlag : true
          })
          
      } else if (error.request) {
          this.setState({
              errorFlag : true
          })
          
          console.log(error.request);
      } else {
          this.setState({
              errorFlag : true
          })
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
      }
      console.log(error.config);
      this.setState({
          errorFlag : true
      })
  });   

}

// onDatesChange({ startDate, endDate }) {
  
//   this.setState({
//     startDate: startDate ,
//     endDate: endDate 
//   });
// }

// onFocusChange(focusedInput) {
//   this.setState({ focusedInput });
// }

submitbookOpt(e){
  e.preventDefault();
  let { username,listingId, instant, price,  progBarVal } = this.state;
  //let formData= new FormData();
  // const username = listingDetails.username;
  // const listingId = listingDetails.listingId;
  //console.log("props check", val );
  
  if(price )
  {
    progBarVal = "81%";
  } 
  else{
      progBarVal = "51%";
  }
  
  const Data = {    
     'bookopt' : 'bookopt', 
    'username' : username,
    'instant': instant,
    'price' : price ,
    'progBarVal' : progBarVal,
    'listingId'  : listingId
   }
  

  console.log("Updae Property Request Data", Data);
        //set the with credentials to true
  axios.defaults.withCredentials = true;
  axios.post('http://localhost:3001/ownupdate', Data)    
  .then(response => {
      console.log("Status Code : ",response);
      if(response.status === 200){
          this.setState({
              errorFlag : false,
              progBarVal : progBarVal,
              showPropertyForm : false,
              showBookingForm : false,
              showPhotosForm : true,
              showAddressForm: false,



          });
          console.log("Owner Prop Details Completed");
      }else{
          
          console.log("Error ");
          this.setState({
              errorFlag : true,
              showPropertyForm : false,
              progBarVal : progBarVal,
              showBookingForm : true,
              showPhotosForm : false,
              showAddressForm: false,
              
          })
      }
  
      
  
  })
  .catch((error) => {
      // Error
      if (error.response) {

          this.setState({
              errorFlag : true
          })
          
      } else if (error.request) {
          this.setState({
              errorFlag : true
          })
          
          console.log(error.request);
      } else {
          this.setState({
              errorFlag : true
          })
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
      }
      console.log(error.config);
      this.setState({
          errorFlag : true
      })
  });   



}



render(){

let addressForm=null;
let propdetails=null;
let bookoption = null;
let photoform = null;
let errorlog = null;
let successlog = null;

let redirectVar = null;
        if(!cookie.load('cookie')){
            console.log("Valid Cookie, Redirect to Home");
            redirectVar = <Redirect to= "/login"/>
        }

if(this.state.showAddressForm)
{
  addressForm = 
    <div className="form-address" >
    <br/>
    <h2> Enter Location of Property</h2>
      <br/><br/>
      
      <form onSubmit={this.submitHandler}>
         <input type="text" className="form-control"  name="street" onChange={this.changeHandler}
                placeholder={this.state.street}></input>
           <br/><br/>
        <input type="text" onChange={this.changeHandler} className="form-control"  name="city" 
          placeholder={this.state.city}></input>
        <br/><br/>
    	<select class="form-control" value={this.state.states} onChange={this.changeHandler} name="states">
    
      <option value="AL">Alabama</option>
			<option value="AK">Alaska</option>
			<option value="AZ">Arizona</option>
			<option value="AR">Arkansas</option>
      <option value="CA">California</option>
			<option value="CO">Colorado</option>
			<option value="CT">Connecticut</option>
			<option value="DE">Delaware</option>
			<option value="DC">District Of Columbia</option>
			<option value="FL">Florida</option>
			<option value="GA">Georgia</option>
			<option value="HI">Hawaii</option>
			<option value="ID">Idaho</option>
			<option value="IL">Illinois</option>
			<option value="IN">Indiana</option>
			<option value="IA">Iowa</option>
			<option value="KS">Kansas</option>
			<option value="KY">Kentucky</option>
			<option value="LA">Louisiana</option>
			<option value="ME">Maine</option>
			<option value="MD">Maryland</option>
			<option value="MA">Massachusetts</option>
			<option value="MI">Michigan</option>
			<option value="MN">Minnesota</option>
			<option value="MS">Mississippi</option>
			<option value="MO">Missouri</option>
			<option value="MT">Montana</option>
			<option value="NE">Nebraska</option>
			<option value="NV">Nevada</option>
			<option value="NH">New Hampshire</option>
			<option value="NJ">New Jersey</option>
			<option value="NM">New Mexico</option>
			<option value="NY">New York</option>
			<option value="NC">North Carolina</option>
			<option value="ND">North Dakota</option>
			<option value="OH">Ohio</option>
			<option value="OK">Oklahoma</option>
			<option value="OR">Oregon</option>
			<option value="PA">Pennsylvania</option>
			<option value="RI">Rhode Island</option>
			<option value="SC">South Carolina</option>
			<option value="SD">South Dakota</option>
			<option value="TN">Tennessee</option>
			<option value="TX">Texas</option>
			<option value="UT">Utah</option>
			<option value="VT">Vermont</option>
			<option value="VA">Virginia</option>
			<option value="WA">Washington</option>
			<option value="WV">West Virginia</option>
			<option value="WI">Wisconsin</option>
			<option value="WY">Wyoming</option>
		</select>					
    <br/><br/>
    
     <input type="text" onChange={this.changeHandler} className="form-control"  name="Country" 
      placeholder={this.state.country}></input>
    <br/><br/>
      <button   style={{margin:"00px",float:"right"}} className="btn btn-primary" disabled={!this.state.saveEnable}  >Next</button>

    </form>
    
    </div> 

}
if(this.state.showPropertyForm){
   
  // propdetails= <ProperyDetails listingDetails={this.state.listingDetails} ></ProperyDetails>

     propdetails= 

     <div className ="container-prop">
       <h2> Describe your property </h2>
       <h4>Start out with a descriptive headline and a detailed summary of your property.</h4>
           
       {/* {this.submitpropDetails} */}
       
        <form onSubmit={(e) => this.submitpropDetails(e)}>        
            <label >Headline :</label>
             <textarea onChange={this.changeHandler} className="form-control" rows="3" name="headline" placeholder={this.state.headline}></textarea>
             <br/>
        
             <label >Property Description :</label>
            <textarea onChange={this.changeHandler}  className="form-control col-5" rows="6" name="propdes" placeholder={this.state.propdes}></textarea>
            <br/>
             
            
             
            <label >Property Type :</label>
               <select onChange={this.changeHandler} value= {this.state.proptype} className="form-control" name="proptype">
               
                   <option>Condo</option>
                   <option>House</option>
                   <option>Cottage</option>
                   <option>Townhome</option>
                   <option>Beachhouse</option>
                    </select>
                    <br/>

                <label >Bedrooms :</label>
               <select onChange={this.changeHandler} value={this.state.bedrooms}  className="form-control" name="bedrooms">
               
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                    </select>
                    <br/>

                
                <label >Accommodates :</label>
               <select onChange={this.changeHandler} value={this.state.accomodates} className="form-control" name="accomodates">
               
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                   <option>6</option>
                   <option>7</option>
                   <option>8</option>
                   <option>9</option>
                   <option>10</option>
                    </select>
                    <br/>

                 
                <label >Bathrooms :</label>
               <select onChange={this.changeHandler} value={this.state.bathrooms} className="form-control" name="bathrooms">
               
                   <option>1</option>
                   <option>1.5</option>
                   <option>2</option>
                   
                    </select>
                
                <br/>
                
                {/* <button style={{backgroundColor:"#337ab7",color:"#fff"}} class="btn btn-outline-primary">Back</button> */}
                <button  style={{backgroundColor:"#337ab7",color:"#fff"}} class="btn btn-primary" 
                disabled={!this.state.saveEnable}  class="btn pull-right">Next</button>
                
        
        </form> 
    </div> 








}
if(this.state.showBookingForm){
  
  const { focusedInput, startDate, endDate } = this.state;
  bookoption =
  <div className="form-address" >
    <br/>
    <h2> Enter Booking Options</h2>
    <br/><br/>
    
    <form onSubmit={this.submitbookOpt}>
    <select class="form-control" value={this.state.instant} onChange={this.changeHandler} name="instant">
    <label >Booking option :</label>
    <option value="Ins">Instant</option>
    <option value="24h">24 Hrs</option>
    </select>
         <br/><br/>
      <label >Per Night Price:</label>
      <input type="number" min="1" onChange={this.changeHandler} className="form-control"  name="price" 
        placeholder={this.state.price}></input>
      <br/><br/>
     
  <br/><br/>
  
  <br/><br/>
    <button   style={{margin:"00px",float:"right"}} className="btn btn-primary" disabled={!this.state.saveEnable} >Next</button>

  </form>
  
  </div> 

}

if(this.state.showPhotosForm){
  photoform = <MultiPhotoLoad listingId={this.state.listingId} > </MultiPhotoLoad>
}
if(this.state.errorFlag){

  errorlog = <div className="alert-danger" > 
             Something Went Wrong Try again !!
             
              </div>
}
if(this.state.progBarVal == '100%'){

  successlog = <div class="alert alert-success" role="alert">
      <h2>Your Property is now listed.</h2>
  </div>
}

return(
<div>
  <div className="container">
      <h2>Progress</h2>
    
      <div className="progress">
        <div className="progress-bar" style={{ width:this.state.progBarVal}}></div>
      </div>
  </div>

   
  <div className="col">
      <div className="list-group">
   
        <button  className="list-group-item"  onClick={this.handleAddress} ><i className="Location"></i> <span>Location</span> </button>
        
        <button className="list-group-item" onClick={this.handleProperty} ><i className="Property"></i> <span>Property Details</span></button>
        <button className="list-group-item" onClick={this.handleBooking}><i className="Booking"></i> <span>Booking Options</span></button>
        <button className="list-group-item" onClick={this.handlePhotos}><i className="Photos"></i> <span>Photos</span></button>
   
      </div>
    </div>  
    
    
 
  
   <div className="panel-container">
       {redirectVar}
       {successlog}
       {errorlog}
       {addressForm}
       {propdetails}
       {bookoption}
       {photoform}
    

   
    	
  </div> 		
                    


</div>



)}
}

export default OwnerPost;