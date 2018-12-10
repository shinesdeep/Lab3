import React, {Component} from 'react';
import  './TravDash.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';


class TravDash extends Component {
  constructor(props){
    //Call the constructor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
       
       bookings : [],
       username : '',
       errorFlag : false,
       saveEnable : false,
       modifyflag : false,
       bookingId : '',
    }
    //Bind the handlers to this class
    // this.onclickHandler = this.onclickHandler.bind(this);
}



componentDidMount(){

  console.log("Inside component did mount"); 
  const username = cookie.load('cookie');
  console.log( "Username is ", username);
  this.setState({username:username}) ;
 
  axios.get('http://localhost:3001/travdash',{
       params: {
           username: username,
           
         }
    }) 
   .then((response) => {

      // console.log("firstname in temp_res key",temp_resp.key )
      
       console.log("Status Code : ",response.status);

       if(response.status === 200){
               //this.setState({httpres: response.data.concat(response.data) })
               console.log("Success Post");
               console.log(response.data);
               
              
              this.setState({bookings : this.state.bookings.concat(response.data)})
              console.log("bookings :", this.state.bookings);
       }else{
               
              this.setState({errorFlag : true})
              console.log("Error in Response");

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
   
  let redirectVar = null;
  let errorlog = null;
  let showlistings = null;
  let noproplog  = null;
  let showheading = null;
  let showmodify = false;

  if(!cookie.load('cookie')){
            console.log("Valid Cookie, Redirect to Home");
            redirectVar = <Redirect to= "/login"/>
  }
  
   


  if(!this.state.modifyflag)
  {
    showheading =  
    <div>
    <h1 align="center"> Welcome! </h1>
    <h3 align="center">Your Bookings:</h3>
    <button type="button" style={{marginLeft:"900px"}}class="btn btn-primary"><Link to="/home" style={{color: 'white'}}>Search More Property</Link> </button>
    </div> 

    if(this.state.errorFlag){
        errorlog = 
        <div>
          <br/>
        <div className="alert-danger" > 
          Something Went Wrong Try again !!
        
         </div>
         </div>
      }
       if(this.state.bookings){
    
        
    
        showlistings = 
        
           
          this.state.bookings.map((booking,index) => {
          return(
             
              <row>
              <div className="container"> 
              
              
              <div className="row-prop">  
                
                   <div className="col-sm-6">
                   <img className="resize-pic" src={`http://localhost:3001/${booking.listingPic1}`}></img>
                   
                    </div>
                    {/* <button onClick={(e) => this.onclickHandler(e,listing.listingId)} type="button" style={{marginLeft:"650px"}}className="btn btn-primary"  >Modify </button> */}
    
                <div className="col-sm-6">
                  <h2>{booking.headline}</h2>
                   {booking.propdes}
                 
                </div>
                
                </div>  
               
                
                </div>
                </row>
            )
         })
          
      }
       else{
     
            noproplog = 
            <div className="alert-danger" >
            <h2>No bookings Found</h2>
            </div>
    
    
       }


  }
 
//   if(this.state.modifyflag){
//     showmodify =
//     <OwnerPost listingid={this.state.listingId}>

//     </OwnerPost>

//   }

  
 


   return(
  
 
 
 <div className ="outer">

    {redirectVar}
    {/* {showmodify} */}
    {showheading}
    {/* <h1 align="center"> Welcome! </h1>
    <h3 align="center">Your active listings:</h3>
    <button type="button" style={{marginLeft:"900px"}}class="btn btn-primary"><Link to="/ownpost" style={{color: 'white'}}>Create New Listing</Link> </button>
         */}
  
    {errorlog}
    {noproplog}
    {showlistings}
       
  </div>

    
)

}

}
export default TravDash;