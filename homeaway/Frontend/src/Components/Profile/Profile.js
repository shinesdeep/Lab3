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
    //    axios.get('http://localhost:3001/profile',{
    //         params: {
    //             username: username
    //           }
    //     }) 
    //     .then((response) => {
            

    //        // console.log("firstname in temp_res key",temp_resp.key )
           
    //         console.log("Status Code : ",response.status);
    //         if(response.status === 200){
    //                 //this.setState({httpres: response.data.concat(response.data) })
    //                 console.log("Success Post");

                    
    //                 console.log(response);

    //                 //console.log("username is :",response.data.username);

    //                 this.setState({
                
    //                     firstname : response.data.firstname,
    //                     lastname : response.data.lastname,
    //                     email : response.data.email,
    //                     phone : response.data.phone,
    //                     aboutme: response.data.aboutme,
    //                     city : response.data.city,
    //                     company : response.data.company,
    //                     school : response.data.school,
    //                     home: response.data.home,
    //                     language : response.data.language,
    //                     gender: response.data.gender,  
    //                     profile_pic:  response.data.profile_pic
        
        
    //                 }); 

    //                     if(this.state.profile_pic){
    //                         axios.post('http://localhost:3001/download/'+this.state.profile_pic)
    //                         .then(resp => {
    //                         if(resp.status === 200){
    //                             console.log("Imgae Res : ",resp);
    //                                 let imagePreview = 'data:image/jpg;base64, ' + resp.data;
    //                                 this.setState({
    //                                     imageView: imagePreview
    //                                 })
    //                          }  
    //                          else{
                                  
    //                             console.log("Error getiing response");
    //                          }  
                                
    //                         })
                               
    //                     }
                
            

                
    //         }else{
    //                 console.log("Error in Response");

    //             }
           
            
    //         });
             

            
    
        }

    ChangeHandler = (e) => {
            this.setState({
                [e.target.name] : e.target.value,
                saveEnable : true
                
            })
            //console.log("e,target.name", e.target.name);
            //console.log("e,target.value", e.target.value);
        }

    // // //username change handler to update state variable with the text entered by the user
    // firstnameChangeHandler = (e) => {
    //     this.setState({
    //         firstname : e.target.value,
    //         saveEnable : true
    //     })
    // }

    // lastnameChangeHandler = (e) => {
    //     this.setState({
    //         lastname : e.target.value,
    //         saveEnable : true
    //     })
    // }
    // // //email change handler to update state variable with the text entered by the user
    // emailChangeHandler = (e) => {
    //     this.setState({
    //         email : e.target.value,
    //         saveEnable : true
    //     })
    // }
    
    // phoneChangeHandler = (e) => {
    //     this.setState({
    //         phone : e.target.value,
    //         saveEnable : true
    //     })
    // }

    // aboutmeChangeHandler = (e) => {
    //     this.setState({
    //         aboutme : e.target.value,
    //         saveEnable : true
    //     })
    // }
    // cityChangeHandler = (e) => {
    //     this.setState({
    //         city : e.target.value,
    //         saveEnable : true
    //     })
    // }
    // companyChangeHandler = (e) => {
    //     this.setState({
    //         company : e.target.value,
    //         saveEnable : true
    //     })
    // }

    // schoolChangeHandler = (e) => {
    //     this.setState({
    //         school : e.target.value,
    //         saveEnable : true
    //     })
    // }

    // homeChangeHandler = (e) => {
    //     this.setState({
    //         home : e.target.value,
    //         saveEnable : true
    //     })
    // }

    // langChangeHandler = (e) => {
    //     this.setState({
    //         language : e.target.value,
    //         saveEnable : true
    //     })
    // }

    // genderChangeHandler = (e) => {
    //     this.setState({
    //         gender : e.target.value,
    //         saveEnable : true
    //     })
    // }

    changeProfile = (e) => {

        this.setState({
        
            changeEnable : true
        })

    }    

    //submit Login handler to send a request to the node backend
    saveProfile = (e) => {
        //var headers = new Headers();
        //prevent page from refresh
        //let user = JSON.parse(localStorage.getItem("user_data"));
        e.preventDefault();
        const data = {
            //id : user.id,
            username: this.props.username,
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            email : this.state.email,
            phone : this.state.phone,
            aboutme: this.state.aboutme,
            city : this.state.city,
            company : this.state.company,
            school : this.state.school,
            home: this.state.home,
            language : this.state.language,
            gender: this.state.gender
        }
        console.log("Profile save Request Data", data);
        console.log("this.props", this.props);
        this.props.updateProfileMutation({
            variables : {
            //id : user.id,
            username: this.props.username,
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            email : this.state.email,
            phone : this.state.phone,
            aboutme: this.state.aboutme,
            city : this.state.city,
            company : this.state.company,
            school : this.state.school,
            home: this.state.home,
            language : this.state.language,
            gender: this.state.gender
            }
          
        });
        //set the with credentials to true
//         axios.defaults.withCredentials = true;
//         //make a post request with the user data
//         axios.post('http://localhost:3001/profile',data)
//             .then(response => {
//                 console.log("Status Code : ",response.status);
//                 if(response.status === 200){
//                     this.setState({
                        
//                         saveEnable : false
//                     })
//                     console.log("Register Success Post");
//                 }else{
                    
//                     console.log("Success Post");
//                     this.setState({
                        
//                         saveEnable : false
//                     })
//                 }
//             })
               
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
