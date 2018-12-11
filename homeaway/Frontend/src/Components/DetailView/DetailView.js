import React, {Component} from 'react';
import  './DetailView.css';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
// import Carousel from 'react-bootstrap/lib/Carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel"
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {graphql, compose} from 'react-apollo';
import {bookPropMutation} from '../../mutation/mutations';

class DetailView extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            focusedInput: null,
            
            listing : this.props.list,
            startDate : this.props.startDate,
            endDate : this.props.endDate,
            guest : this.props.guest, 
            successflag: false,
            detaillisting:null,
            dest: null,
            redirect : false,
            errorFlag :false,  
            
          };
      
          this.onDatesChange = this.onDatesChange.bind(this);
          this.onFocusChange = this.onFocusChange.bind(this);  
          this.guestChange = this.guestChange.bind(this);
          this.bookingHandler = this.bookingHandler.bind(this);
          
    }


    onDatesChange({ startDate, endDate }) {
        //const { stateDateWrapper } = this.props;
        this.setState({
          startDate : startDate,
          endDate : endDate,
          emptyfield :false,
          successflag: false,
          
        });
      }
    
    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
        
      }


      guestChange = (e) => {
        this.setState({
            guest : e.target.value,
            successflag: false,
        })
    }


bookingHandler(e){
    
  e.preventDefault();
  if(!cookie.load('cookie')){
        console.log("Valid Cookie, Redirect to Home");
        this.setState({redirect : true})
  }
  else{
    var startDate = moment(this.state.startDate).format('MM/DD/YYYY'); 
    var endDate = moment(this.state.startDate).format('MM/DD/YYYY');
    let username = this.props.username;

    const data = {
        username : username,
        guest : this.state.guest,
        startDate : startDate,
        endDate : endDate,
        owner : this.state.listing.username,
        listingId : this.state.listing.listingId,
        headline : this.state.listing.headline,
        propdes : this.state.listing.propdes,
        price : this.state.listing.price,
        listingPic1 : this.state.listing.listingPic1,
        bedrooms:this.state.listing.bedrooms,
        accomodates:this.state.listing.accomodates,
        bathrooms:this.state.listing.bathrooms,
        description:this.state.listing.description,
        proptype:this.state.listing.proptype,
        listingPic2:this.state.listing.listingPic2,
        listingPic3:this.state.listing.listingPic3,
        listingPic4:this.state.listing.listingPic4,
        listingPic5:this.state.listing.listingPic5,
        listingPic6:this.state.listing.listingPic6,
    }
    console.log("Booking Request Data", data);
    
    this.props.bookPropMutation({
        variables : {
            username : this.props.username,
            guest : this.state.guest,
            startDate : this.state.startDate,
            endDate : this.state.endDate,
            owner : this.state.listing.username,
            listingId : this.state.listing.listingId,
            headline : this.state.listing.headline,
            propdes : this.state.listing.propdes,
            price : this.state.listing.price,
            listingPic1 : this.state.listing.listingPic1,
            bedrooms:this.state.listing.bedrooms,
            accomodates:this.state.listing.accomodates,
            bathrooms:this.state.listing.bathrooms,
            description:this.state.listing.description,
            proptype:this.state.listing.proptype,
            listingPic2:this.state.listing.listingPic2,
            listingPic3:this.state.listing.listingPic3,
            listingPic4:this.state.listing.listingPic4,
            listingPic5:this.state.listing.listingPic5,
            listingPic6:this.state.listing.listingPic6,
        }
    
    });
    
     this.setState({
         successflag:true,
    });
    //set the with credentials to true
    // axios.defaults.withCredentials = true;
    // //make a post request with the user data
    // axios.post('http://localhost:3001/book',data)
    //     .then(response => {
    //         console.log("Status Code : ",response.status);
    //         if(response.status === 200){
    //             this.setState({
    //                 successflag : true
    //             })
    //             console.log("Success Post");
    //         }else{
                
    //             this.setState({
    //                 errorflag : true
    //             })
    //             console.log("Failure Post");
    //         }
    //     })
    //     .catch((error) => {
    //         // Error
    //         if (error.response) {

    //             this.setState({
    //                 errorflag : true
    //             })
                
    //         } else if (error.request) {
    //             this.setState({
    //                 errorflag : true
    //             })
                
    //             console.log(error.request);
    //         } else {
    //             this.setState({
    //                 errorflag : true
    //             })
    //             // Something happened in setting up the request that triggered an Error
    //             console.log('Error', error.message);
    //         }
    //         console.log(error.config);
    //         this.setState({
    //             errorflag : true
    //         })
    //     });

        
        
        
  }

}



 render(){
 const { focusedInput, startDate, endDate } = this.state;  
 let  redirectVar = null;  
 let successlog = null;
 console.log("this.props in detailview",this.props);
 if(this.state.redirect)
 {
    redirectVar = <Redirect to= "/login"/>

 }
 
if(this.state.successflag)
{
    successlog = 
    <div>
        <div class="alert alert-success" role="alert">
        <h2>Your Booking is Successful.</h2>
        </div>
        <Redirect to= "/"/>
     </div>   
    
}



   return(

<div className = "detail">
       
   {redirectVar}
    
    {successlog}

<div className="row1">
    
    

    
    <div className ="col-lg-8 scrollit" >
   

    <Carousel >
    <div>
    { this.state.listing.listingPic1 ?(
      <img src={`http://localhost:3001/${this.state.listing.listingPic1}`} />
      ) :
      (null)
      }
    </div>
    <div>
    { this.state.listing.listingPic2 ?(
      <img src={`http://localhost:3001/${this.state.listing.listingPic2}`} />
      ) :
      (null)
      }
    </div>
    <div>
    { this.state.listing.listingPic3 ?(
      <img src={`http://localhost:3001/${this.state.listing.listingPic3}`} />
      ) :
      (null)
      }
    </div>
    <div>
    { this.state.listing.listingPic4 ?(
      <img src={`http://localhost:3001/${this.state.listing.listingPic4}`} />
      ) :
      (null)
      }
    </div>
    <div>
    { this.state.listing.listingPic5 ?(
      <img src={`http://localhost:3001/${this.state.listing.listingPic5}`} />
      ) :
      (null)
      }
    </div>
    <div>
      { this.state.listing.listingPic6 ?(
      <img src={`http://localhost:3001/${this.state.listing.listingPic6}`} />
      ) :
      (null)
      }
      
    </div>
   
    
    
  </Carousel>
                     

          <div className="list">
            <h3> Details</h3>
            <ul className="nav nav-tabs">
            <li className="active"><a href="#">Overview</a></li>
            <li><a href="#">Amenities</a></li>
            <li><a href="#">Rating</a></li>

                </ul>
            </div> 
    </div>
    
        <div className ="col-lg-4 ">
    
            <h3>{this.state.listing.headline}</h3>
            <p>{this.state.listing.propdes}</p>
    
            <br />

            <br/>
                <div className="panel-price text-center">
                         <h4><strong>${this.state.listing.price} / Night</strong></h4>
                     </div>
                  
                  
                     <br/>  
                     <label>Checkin - Checkout</label>
                     <DateRangePicker 
            
            onDatesChange={this.onDatesChange}
            onFocusChange={this.onFocusChange}
            focusedInput={focusedInput}
            startDate={startDate}
            endDate={endDate}
              
              />

               <br/>     
               <br/>  
                    <div style={{width: '30%'}} className="col-xs-6 form-group">
             <label>Guest</label>
             <input onChange = {this.guestChange} type="number" min="1" className="form-control" name="destination" placeholder={this.state.guest}/>
             </div>        
                    
                    
                    <br/>
                        <br/>
                        <br/>
                        <br/>
                    <button type="button" onClick={this.bookingHandler} className="btn btn-primary" font-size= "24px" >Book Now</button>
    
                </div>

    
    
  </div>
    
</div>



    
)

}

}

export default compose(
    graphql(bookPropMutation, { name: "bookPropMutation" }),
    
)(DetailView);


