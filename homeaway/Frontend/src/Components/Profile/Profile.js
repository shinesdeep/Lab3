import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import './Profile.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Photoupload from '../Photoupload/Photoupload';
import {graphql, compose} from 'react-apollo';
import {updateProfileMutation } from '../../mutation/mutations';
import { getProfileQuery} from '../../queries/queries';
//Define a Login Component
class Profile extends Component{
    //call the constructor method
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : '',
            firstname : "",
            lastname : "",
            email : "",
            phone : "",
            aboutme: "",
            city : "",
            company : "",
            school : "",
            home: "",
            language : "",
            gender: "Female",
            profile_pic : "",
            imageView : null,
            saveEnable : false,
            changeEnable : false,
        }
        //Bind the handlers to this class
        this.ChangeHandler = this.ChangeHandler.bind(this);
        // this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
        // this.emailChangeHandler = this.emailChangeHandler.bind(this);
        // this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        // this.aboutmeChangeHandler =  this.aboutmeChangeHandler.bind(this);
        // this.cityChangeHandler = this.cityChangeHandler.bind(this);
        // this.companyChangeHandler = this.companyChangeHandler.bind(this);
        // this.schoolChangeHandler =  this.schoolChangeHandler.bind(this);
        // this.homeChangeHandler   =  this.homeChangeHandler.bind(this);
        // this.langChangeHandler = this.langChangeHandler.bind(this);
        // this.genderChangeHandler = this.genderChangeHandler.bind(this);

        this.saveProfile = this.saveProfile.bind(this);
        this.changeProfile = this.changeProfile.bind(this);
    }
    componentDidMount(){
       
       //const username = cookie.load('cookie');
       //console.log( "Username is ", username);
       console.log( "this.props ", this.props);
       console.log( "this.props ", this.props);
       var data = this.props.getProfileQuery;
       console.log( "this.props ", this.props , data );
       console.log( "data ", data );
      
    
        }

    ChangeHandler = (e) => {
            this.setState({
                [e.target.name] : e.target.value,
                saveEnable : true
                
            })
            
        }

   

    changeProfile = (e) => {

        this.setState({
        
            changeEnable : true
        })

    }    

    //submit Login handler to send a request to the node backend
    saveProfile = (e) => {
       
        e.preventDefault();
        const data = {
            //id : user.id,
            username: this.props.username,
            firstname : this.state.firstname?this.state.firstname:this.props.getProfileQuery.getprofile.firstname,
            lastname : this.state.lastname?this.state.lastname:this.props.getProfileQuery.getprofile.lastname,
            email : this.state.email?this.state.email:this.props.getProfileQuery.getprofile.email,
            phone : this.state.phone?this.state.phone:this.props.getProfileQuery.getprofile.phone,
            aboutme: this.state.aboutme?this.state.aboutme:this.props.getProfileQuery.getprofile.aboutme,
            city : this.state.city?this.state.city:this.props.getProfileQuery.getprofile.city,
            company : this.state.company?this.state.company:this.props.getProfileQuery.getprofile.company,
            school : this.state.school?this.state.school:this.props.getProfileQuery.getprofile.school,
            home: this.state.home?this.state.home:this.props.getProfileQuery.getprofile.home,
            language : this.state.language?this.state.language:this.props.getProfileQuery.getprofile.language,
            gender: this.state.gender?this.state.gender:this.props.getProfileQuery.getprofile.gender
        }
        console.log("Profile save Request Data", data);
        console.log("this.props", this.props);
        this.props.updateProfileMutation({
            variables : {
            //id : user.id,
            username: this.props.username,
            firstname : this.state.firstname?this.state.firstname:this.props.getProfileQuery.getprofile.firstname,
            lastname : this.state.lastname?this.state.lastname:this.props.getProfileQuery.getprofile.lastname,
            email : this.state.email?this.state.email:this.props.getProfileQuery.getprofile.email,
            phone : this.state.phone?this.state.phone:this.props.getProfileQuery.getprofile.phone,
            aboutme: this.state.aboutme?this.state.aboutme:this.props.getProfileQuery.getprofile.aboutme,
            city : this.state.city?this.state.city:this.props.getProfileQuery.getprofile.city,
            company : this.state.company?this.state.company:this.props.getProfileQuery.getprofile.company,
            school : this.state.school?this.state.school:this.props.getProfileQuery.getprofile.school,
            home: this.state.home?this.state.home:this.props.getProfileQuery.getprofile.home,
            language : this.state.language?this.state.language:this.props.getProfileQuery.getprofile.language,
            gender: this.state.gender?this.state.gender:this.props.getProfileQuery.getprofile.gender
            },
            refetchQueries: [
                {
                  query: getProfileQuery,
                  variables: { username: this.props.username }
                }
              ]
          
        });

               
  }

    render(){
        //redirect based on successful login
        
        let redirectVar = null;
        console.log( "this.props ", this.props.getProfileQuery.getprofile);

        if(!cookie.load('cookie')){
            console.log("InValid Cookie, Redirect to Login");
            //console.log("local stotage", localStorage.getItem("user_data"));
            //localStorage.setItem("user_data",null);
            redirectVar = <Redirect to= "/login"/>
        }
        let loadchangeProfile = null;
        if(this.state.changeEnable)
        {
            loadchangeProfile = <Photoupload></Photoupload>
        }
        
        return(
    
           <div>
               {redirectVar}
              
                 {loadchangeProfile}
            
            
            <div className="container-profile">
                    <img  className="resize-img" src={this.state.imageView} />
                    {/* <img  className="resize-img" src="http://localhost:3001/uploads/gilberto-olimpio-780663-unsplash.jpg" /> */}
                   <button className="btn btn-primary"  onClick={this.changeProfile}  >
                   <span class="glyphicon glyphicon-edit"></span>
                   </button>
                   
            
            </div>
            <br/><br/>

            <div className="container">
            
            <div className="profile-form"  >
                
                
            <div className="main-div" style={{"textAlign": 'center'}}>
                     <h2>Profile Information</h2> 
                     <br/>
                    <div style={{width: '50%'}} className="col-xs-6 form-group" >

                        <label>Firstname</label> 
                        <input onChange = {this.ChangeHandler} type="text" 
                        className="form-control"  name="firstname" required={true} 
                        placeholder={this.props.getProfileQuery.getprofile?this.props.getProfileQuery.getprofile.firstname:"First Name"}/>
                        </div> 
                        <div style={{width: '50%'}} className="col-xs-7 form-group" >
                        <label>Lastname</label> 
                        <input onChange = {this.ChangeHandler} type="text" className="form-control" 
                         name="lastname" required={true} placeholder={this.props.getProfileQuery.getprofile?this.props.getProfileQuery.getprofile.lastname : "Last Name"}/>
                </div>  
                        
                    
                    <br/>
                   
                   

                    <div className="form-group">
                    <label>Email</label> 
                    <input onChange = {this.ChangeHandler} type="email" className="form-control" disabled
                    name="email" required={true} placeholder={this.props.getProfileQuery.getprofile?this.props.getProfileQuery.getprofile.email : "Email"} pattern=".com" size="30" 
                    title="Must be a valid email address" />
                      </div>
                      
                    <div className="form-group"> 
                    <label>Phone</label>  
                        <input onChange = {this.ChangeHandler} type="phone" className="form-control" 
                        name="phone" required="true" placeholder={this.props.getProfileQuery.getprofile?this.props.getProfileQuery.getprofile.phone : "Phone"}/>
                        <br/>
                    </div>

                    <div className="form-group" >
                    <label>About Me</label> 
                    <input style={{height: '150px'}} onChange = {this.ChangeHandler} type="text" className="form-control"
                     name="aboutme" required="true" placeholder={this.props.getProfileQuery.getprofile?this.props.getProfileQuery.getprofile.aboutme : "About Me"} />
                      </div>

                    <div  className="form-group">
                    <label>City</label> 
                    <input onChange = {this.ChangeHandler} type="city" className="form-control"
                     name="city" placeholder={this.props.getProfileQuery.getprofile?this.props.getProfileQuery.getprofile.city : "My city, country" }  />
                      </div>

                      <div className="form-group">
                      <label>Company</label> 
                    <input onChange = {this.ChangeHandler} type="text" className="form-control"
                     name="company"  placeholder={this.props.getProfileQuery.getprofile?this.props.getProfileQuery.getprofile.company : "Company" } />
                      </div>


                      <div className="form-group">
                      <label>School</label> 
                    <input onChange = {this.ChangeHandler} type="text" className="form-control"
                    name="school"  placeholder={this.props.getProfileQuery.getprofile?this.props.getProfileQuery.getprofile.school : "School" } />
                      </div>

                      <div className="form-group">
                      <label>Home</label> 
                    <input onChange = {this.ChangeHandler} type="text" className="form-control" 
                    name="home"  placeholder={this.props.getProfileQuery.getprofile?this.props.getProfileQuery.getprofile.home : "Home Town" }  />
                      </div>

                      <div  className="form-group">
                      <label>Language</label> 
                    <input onChange = {this.ChangeHandler} type="text" className="form-control" 
                    name="language" placeholder={this.props.getProfileQuery.getprofile?this.props.getProfileQuery.getprofile.language : "Language" } />
                      </div>

                       <div  className="form-group">
                       <label>Gender</label> 
                      <select onChange = {this.ChangeHandler} type="gender" className="form-control"
                     name="gender" required="true" defaultValue={this.state.gender} placeholder={this.props.getProfileQuery.getprofile?this.props.getProfileQuery.getprofile.gender : "Gender" }>
                                <option>Male</option>
                                <option>Female</option>
               
                </select>  
                      </div>
                    <div style={{"textAlign": 'center'}}>
                    <button onClick = {this.saveProfile} disabled={!this.state.saveEnable} className="btn btn-primary">Save</button>                 
                    </div>
            </div>
        
       </div>     





                
            </div>
            </div> 
              
       
        )
    }
}

export default compose(
    graphql(getProfileQuery, { name: "getProfileQuery"},{
    options : (props) => {
        return {
            variables : {
                username : props.username
            }
        }
    } 
    }),
    graphql(updateProfileMutation, { name: "updateProfileMutation" }),
    
    
)(Profile);
