import React from 'react';
import moment from 'moment';
import './Home.css'
import '../BarNav/Navbar'
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import axios from 'axios';

import PropSearch from '../PropSearch/PropSearch'


class Home extends React.Component {
 
    constructor(props, context) {
        super(props, context);

        this.state = {
            focusedInput: null,
            startDate: moment(),
            endDate: moment(),
            listings:[],
            detaillisting:null,
            dest: null,
            homeFlag : true,
            errorFlag :false,
            guest:1,
            emptyfield : false,
            detailsearch : false,
            showlist :false,
          };
      
          this.onDatesChange = this.onDatesChange.bind(this);
          this.onFocusChange = this.onFocusChange.bind(this);  
          this.submitSearch = this.submitSearch.bind(this);
          this.destChange =this.destChange.bind(this);
          this.guestChange = this.guestChange.bind(this);
    }
    
    destChange = (e) => {
        this.setState({
            dest : e.target.value,
            emptyfield:false
        })
    }
    
    guestChange = (e) => {
        this.setState({
            guest : e.target.value,
            emptyfield :false,
        })
    }
    
    onDatesChange({ startDate, endDate }) {
        //const { stateDateWrapper } = this.props;
        this.setState({
          startDate : startDate,
          endDate : endDate,
          emptyfield :false,
        });
      }
    
    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
      }

  


    
    submitSearch(e) {
            
            
            
    console.log("date start : ",this.state.startDate);
    console.log(" date end : ", this.state.endDate);
    console.log(" dest : ", this.state.dest);
    console.log(" guest: ", this.state.guest);
    //Initialize listing to avoide dulicate data


    if(this.state.guest && this.state.dest && this.state.startDate && this.state.endDate){

       
    
        this.setState({
            homeFlag:false,
            showlist : true,
            listings :[], 
        });        
        console.log("Inside submit search"); 
     
    //     axios.get('http://localhost:3001/searchprop',{
    //        params: {
    //            dest: this.state.dest,
    //            startDate:this.state.startDate.format('MM-DD-YYYY'),
    //            endDate : this.state.endDate.format('MM-DD-YYYY'),
    //            guest : this.state.guest,
               
    //          }
    //     }) 
    //    .then((response) => {
    
          
          
    //        console.log("Status Code : ",response.status);
    //        if(response.status === 200){
                   
    //                console.log("Success Post");
    //                console.log(response.data);
    //                this.setState({errorFlag : false});
                   
                  
    //               this.setState({listings : this.state.listings.concat(response.data)})
    //               console.log("listings :", this.state.listings);
    //        }else{
                   
    //               this.setState({errorFlag : true});
    //               console.log("Error in Response");
    
    //            }
          
           
    //        })
    //        .catch((error) => {
            
    //         if(error.response) {
    //             this.setState({
    //                 errorFlag : true
    //             })
                
    //         } else if (error.request) {
    //             this.setState({
    //                 errorFlag : true
    //             })
                
    //             console.log(error.request);
    //         } else {
    //             this.setState({
    //                 errorFlag : true
    //             })
    //             // Something happened in setting up the request that triggered an Error
    //             console.log('Error', error.message);
    //         }
    //         console.log(error.config);
    //         this.setState({
    //             errorFlag : true
    //         })
    //     });  
            
    
    
    }
    else{
        this.setState({emptyfield : true});
    }


}

       


detailsprop = (listing) => {
    
    console.log("listing", listing ) ;
    
    
    
    
    this.setState({
        detaillisting:listing,
        showlist :false,
        detailsearch : true,
        
    })

     


}



  render() {
    let showhome = null;
    let showlistings = null;
    let detailview = null;
    let errorlog = null;
    let alllistings = null;
    let emptylog = null;
    const { focusedInput, startDate, endDate } = this.state;
    
    if(this.state.emptyfield){
       emptylog = 
       <div className="alert-danger"> 
        Fields can not be empty,Try again!!
      
       </div>
    
    }

    if(this.state.errorFlag){
        errorlog = 
        
        <div className="alert-danger" > 
          Could not find any listings, Refine your search !!
        
         </div>
         
      }
    
    

    // if(this.state.detailsearch){
    //      detailview = <DetailView 
    //      list = {this.state.detaillisting} 
    //      startDate = {this.state.startDate} 
    //      endDate = {this.state.endDate} 
    //      guest = {this.state.guest}
    //      username = {this.props.username}
    //      ></DetailView>

    // console.log("guest", this.state.guest);

    // }

    if(this.state.homeFlag){

        showhome =  <div className="jumbotron jumbotron-fluid">
        
        
    <div className="input-container">
            <div>
            <h2 style={{color:"white", textAlign:"left"}}>Book beach houses, cabins, condos and more, worldwide</h2>
            </div>
        <div className="container-search">
            <div style={{width: '25%'}} className="col-xs-6 form-group">
                            
                <input onChange = {this.destChange} type="text" className="form-control" name="destination" placeholder="Where"/>
             </div>  
            
            <div style={{width: '25%'}} className="col-xs-6 form-group">      
            <DateRangePicker 
            
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
            
            />

            </div>

             <div style={{width: '20%'}} className="col-xs-6 form-group">
             <input onChange = {this.guestChange} type="number" min="1" className="form-control" name="destination" placeholder="Guests"/>
             </div> 


             <div style={{width: '20%'}} className="col-xs-6 form-group">
             <button onClick = {this.submitSearch} className="btn btn-primary">Search</button>    
             </div>    
                              
            </div> 
                       

        </div>

         
                            
    </div>
      


    }
    
    //    if(this.state.listings){
    //        alllistings = 

          
    //        this.state.listings.map((listing,index) => {
    //         return(

    //         <div className="row-list" onClick={() => this.detailsprop(listing)}>
    //         <  div className="col-sm-6">
    //          <img className ="propimage" src={`http://localhost:3001/${listing.listingPic1}`}></img>
    //         </div>
    //         <div className="col-sm-6">
    //             <h2>{listing.headline}</h2>
    //         </div>
    //   <div className="col-sm-6">
    //   <br />
    //     <button type="button"  class="btn btn-primary">Book Now</button>
    //   </div>
    // </div>


    //         )})
           
//   }
 
  if(this.state.showlist){

    showlistings= 

    <div className = "main">
    <div className="container-searchbox">
         <div style={{width: '25%'}} className="col-xs-6 form-group">
                         
             <input onChange = {this.destChange} type="text" className="form-control" name="dest" placeholder={this.state.dest}/>
          </div>  
         
         <div style={{width: '25%'}} className="col-xs-6 form-group">      
         <DateRangePicker 
         
       onDatesChange={this.onDatesChange}
       onFocusChange={this.onFocusChange}
       focusedInput={focusedInput}
       startDate={startDate}
       endDate={endDate}
         
         />

         </div>

          <div style={{width: '20%'}} className="col-xs-6 form-group">
          <input onChange = {this.guestChange} type="number" min="1" className="form-control" name="guest" placeholder={this.state.guest}/>
          </div> 


          <div style={{width: '20%'}} className="col-xs-6 form-group">
          <button onClick = {this.submitSearch} className="btn btn-primary">Search</button>    
          </div>    
                             
          </div> 

           <div>

              
         {errorlog}
         <PropSearch 
           username={this.props.username} 
           dest = {this.state.dest}
           startDate = {this.state.startDate} 
           endDate = {this.state.endDate} 
           guest = {this.state.guest}
           ></PropSearch>
         

 
         </div>     
    
    </div>


  }
  




    return (
        
    <div>
       {detailview}
       {emptylog} 
       {showhome}
       {showlistings}




   </div>
     


    )}
}

export default Home