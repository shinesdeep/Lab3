import React, {Component} from 'react';
import  './PropSearch.css';
//import axios from 'axios';
import cookie from 'react-cookies';
//import {Redirect} from 'react-router';
//import {Link} from 'react-router-dom';
import DetailView from '../DetailView/DetailView';
import {graphql, compose} from 'react-apollo';
import { getPropSearchQuery} from '../../queries/queries';

class PropSearch extends Component {
    constructor(props){
      //Call the constructor of Super class i.e The Component
      super(props);
      //maintain the state required for this component
      this.state = {
         detailsearch : false,
         showlistings : true,
         username : null,
      }
      //Bind the handlers to this class
      // this.onclickHandler = this.onclickHandler.bind(this);
  }
  detailsprop = (listing) => {
    let username = null;
    console.log("listing", listing ) ;
    if(cookie.load('cookie')){
        username = cookie.load('cookie').username;
  }
    this.setState({
        detaillisting:listing,
        detailsearch : true,
        showlistings : false,
        username : username
        
    })


}
  
  
   render(){
     
    
    let alllistings = null;
    let detailview = null;
  
   
    console.log("this.props", this.props);

    if(this.state.detailsearch){
        detailview = <DetailView 
        list = {this.state.detaillisting} 
        startDate = {this.props.startDate} 
        endDate = {this.props.endDate} 
        guest = {this.props.guest}
        username = {this.state.username}
        ></DetailView>

   console.log("props username", this.props.username);

   }
    
   if(this.state.showlistings){

    if(this.props.getPropSearchQuery.propsearch){


        alllistings = 
       
        this.props.getPropSearchQuery.propsearch.map((listing,index) => {
         return(

         <div className="row-list" onClick={() => this.detailsprop(listing)}>
         <  div className="col-sm-6">
          <img className ="propimage" src={`http://localhost:3001/${listing.listingPic1}`}></img>
         </div>
         <div className="col-sm-6">
             <h2>{listing.headline}</h2>
         </div>
   <div className="col-sm-6">
   <br />
     <button type="button"  class="btn btn-primary">Book Now</button>
   </div>

   
 </div>


         )})


        
}
else{

    alllistings = <div className="alert-danger" > 
    Something Went Wrong Try Again ..
  
   </div>
}

   }


     return(
   <div className ="outer">
   
   {detailview}

   <h3 style={{textAlign:"center"}}> {this.props.getPropSearchQuery.propsearch?this.props.getPropSearchQuery.propsearch.length:0} Listings found..... </h3> 
  
   {alllistings}
   
    </div>    
  )
  
  }
  
  }
  
  export default compose(
     
      graphql(getPropSearchQuery, { name: "getPropSearchQuery" },{
          options : (props) => {
              return {
                  variables : {
                     accomodates : props.guest
                  }
              }
          } 
          }),
      
  )(PropSearch);
  
