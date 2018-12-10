import React, {Component} from 'react';
import  './OwnerDash.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import OwnerPost from '../OwnerPost/OwnerPost';
import {graphql, compose} from 'react-apollo';
import { geOwnerDashQuery} from '../../queries/queries';

class OwnerDash extends Component {
  constructor(props){
    //Call the constructor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
       
       listings : [],
       username : '',
       errorFlag : false,
       saveEnable : false,
       modifyflag : false,
       listingId : '',
    }
    //Bind the handlers to this class
    // this.onclickHandler = this.onclickHandler.bind(this);
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
  
  console.log("this.props",this.props); 


  if(!this.state.modifyflag)
  {
    showheading =  
    <div>
    <h1 align="center"> Welcome! </h1>
    <h3 align="center">Your active listings:</h3>
    <button type="button" style={{marginLeft:"900px"}}class="btn btn-primary"><Link to="/ownpost" style={{color: 'white'}}>Create New Listing</Link> </button>
    </div> 

    if(!this.props.geOwnerDashQuery.getownerdash){
        errorlog = 
        <div>
          <br/>
        <div className="alert-danger" > 
          Something Went Wrong Try again !!
        
         </div>
         </div>
      }
       if(this.props.geOwnerDashQuery.getownerdash){
    
        
    
        showlistings = 
        
           
        this.props.geOwnerDashQuery.getownerdash.map((listing,index) => {
          return(
             
              <row>
              <div className="container"> 
              
              
              <div className="row-prop">  
                
                   <div className="col-sm-6">
                   <img className="resize-pic" src={`http://localhost:3001/${listing.listingPic1}`}></img>
                   
                    </div>
                    {/* <button onClick={(e) => this.onclickHandler(e,listing.listingId)} type="button" style={{marginLeft:"650px"}}className="btn btn-primary"  >Modify </button> */}
    
                <div className="col-sm-6">
                  <h2>{listing.headline}</h2>
                   {listing.propdes}
                 
                </div>
                
                </div>  
               
                
                </div>
                </row>
            )
         })
          
      }
       else{
     
            noproplog = 
            <div class="alert alert-success" role="alert">
            <h2>You have no property listed yet.</h2>
            </div>
    
    
       }


  }
 
  if(this.state.modifyflag){
    showmodify =
    <OwnerPost listingid={this.state.listingId}>

    </OwnerPost>

  }

  
 


   return(
  
 
 
 <div className ="outer">

    {redirectVar}
    {showmodify}
    {showheading}
  
  
    {errorlog}
    {noproplog}
    {showlistings}
       
  </div>

    
)

}

}
export default compose(
   
    graphql(geOwnerDashQuery, { name: "geOwnerDashQuery" },{
        options : (props) => {
            return {
                variables : {
                    username : props.username
                }
            }
        } 
        }),
    
)(OwnerDash);
