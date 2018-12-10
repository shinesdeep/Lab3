import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Register.css';
import axios from 'axios';
//import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import * as EmailVal from 'email-validator';
//import {gql} from 'apollo-boost';
import {graphql, compose} from 'react-apollo';
import {registerMutation} from '../../mutation/mutations';
//import { getProfileQuery} from '../../queries/queries';


//Define a Login Component
class Register extends Component{
    //call the constructor method
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstname : '',
            lastname: '',
            password : '',
            email : '',
            role : 'Traveler',
            registerflag: false,
            errorflag: false,
            InvalidEmail: false, 
            Invalidpass : false,
            emptyfield : false,
        }
        //Bind the handlers to this class
        this.ChangeHandler = this.ChangeHandler.bind(this);
        //this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
        //this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        //this.rolechangeHandler = this.rolechangeHandler.bind(this);
        //this.submitRegister = this.submitRegister.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    // componentWillMount(){
    //     this.setState({
    //         authFlag : false
    //     })
    // }
    // //username change handler to update state variable with the text entered by the user
    ChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
            errorflag : false,
            InvalidEmail: false, 
            Invalidpass : false,
            emptyfield : false,
            
        })
    }

    // rolechangeHandler(e) {

    //     this.setState({
    //         role : e.target.value,
    //         errorflag : false,
    //         InvalidEmail: false, 
    //         Invalidpass : false,
    //         emptyfield : false,
            
    //     })

    // }

        
    // lastnameChangeHandler = (e) => {
    //     this.setState({
    //         lastname : e.target.value,
    //         errorflag : false,
    //     })
    // }
    // // //email change handler to update state variable with the text entered by the user
    // emailChangeHandler = (e) => {
    //     this.setState({
    //         email : e.target.value,
    //         errorflag : false,
    //     })
    // }
    // // //password change handler to update state variable with the text entered by the user
    // passwordChangeHandler = (e) => {
    //     this.setState({
    //         password : e.target.value,
    //         errorflag : false,
    //     })
    // }
    //submit Login handler to send a request to the node backend
    submitRegister = (e) => {
        //var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username:this.state.email,
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            email : this.state.email,
            password : this.state.password,
            role : this.state.role
        }
        console.log("Register Request Data", data);
        //set the with credentials to true
        if(data.firstname  && data.lastname && data.email && data.password)
        {
            //
           if( data.password.length>4 && EmailVal.validate(data.email))
            {
            //console.log("Register Request Data", data);
            
            // this.props.getProfileQuery({
            //     variables : {username :this.state.username}
            // }); 
                
              
            console.log("this.props", this.props);
            this.props.registerMutation({
                variables : {
                    username:this.state.email,
                    password : this.state.password,
                    firstname : this.state.firstname,
                    lastname : this.state.lastname,
                    email : this.state.email, 
                    role : this.state.role
                }
              
            });
            this.setState({registerflag : true})
            

        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post('http://localhost:3001/register',data)
        //     .then(response => {
        //         console.log("Status Code : ",response.status);
        //         if(response.status === 200){
        //             this.setState({
        //                 registerflag : true
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
            else{
                 if(EmailVal.validate(data.email)){
                     this.setState({Invalidpass : true});
                 }
                 else{
                    this.setState({InvalidEmail : true});
                 }




            }
        }
        else{
               
            this.setState({emptyfield:true});

        }
        
        
        
        //console.log("Login Request Completed")   
 }

    render(){
        //redirect based on successful login
        
        let redirectVar = null;
        let errorlog = null;
        let emailerror = null;
        let passerror = null;
        let emptyerror = null;
        if(this.state.registerflag){
            //console.log("Valid Cookie, Redirect to Home");
            redirectVar = <Redirect to= "/login"/>
        }
        if(this.state.InvalidEmail){
            emailerror = 
            <div>
            <div className="alert-danger" > 
            Please Enter Valid Email
            
             </div>
             <br/>
              </div>
        }
        if(this.state.Invalidpass){
            passerror = 
            <div>
            <div className="alert-danger" > 
            Password should be at least 4 characters long
            
             </div>
             <br/>
             </div>
             
        }
         if(this.state.emptyfield){
             emptyerror = 
             <div>
             <div className="alert-danger" > 
             Fields can not be empty
             
              </div>
              <br/>
              </div>
         }


        
        if(this.state.errorflag)
        {

            errorlog = <div className="alert-danger" > 
                       User Already exist. Try Again !!
                       
                        </div>
        }
        console.log("Rendering to Register Page") 

        
        
         

        return(
    
           <div>
               {redirectVar}
              
           
               {errorlog}
            <div className="container">
         
                <div className="profile-form" style={{"margin": "100px"}} >
                <h1>Sign Up for HomeAway</h1>
                <p font-size = "16px">Already have an account? <Link to="/login" style={{color: 'blue'}}>Login</Link></p>
                
                
                    <div className="main-div" style={{"textAlign": 'center'}}>
                         {errorlog}
                         {emptyerror}
                         {emailerror}
                             
                            <div style={{width: '50%'}} className="col-xs-6 form-group" >


                                <input onChange = {this.ChangeHandler} type="text" className="form-control"  name="firstname" required={true} placeholder="First Name"/>
                                </div> 
                                <div style={{width: '50%'}} className="col-xs-7 form-group" >
                                <input onChange = {this.ChangeHandler} type="text" className="form-control"  name="lastname" required={true} placeholder="Last Name"/>
                        </div>  
                        <br/>
                           
                            <div className="form-group">
                            <input onChange = {this.ChangeHandler} type="email" className="form-control" name="email" required="true" placeholder="Email Address" pattern=".com" size="30" title="Must be a valid email address" />
                              </div>
                              {passerror}
                            <div className="form-group">  
                                <input onChange = {this.ChangeHandler} type="password" className="form-control" name="password" required="true" placeholder="Password"/>
                                
                            </div>
                           
                            
               <select onChange={this.ChangeHandler} value= {this.state.role} className="form-control" name="role">
               
                   <option>Traveler</option>
                   <option>Owner</option>
                   
                    </select>
                    <br/>
                    

                            <div style={{"textAlign": 'center'}}>
                            <button onClick = {this.submitRegister} className="btn btn-primary">Sign Me Up</button>                 
                            </div>
                    </div>
                
               </div>
            </div>
            </div> 
              
       
        )
    }
}

export default compose(
    graphql(registerMutation, { name: "registerMutation" }),
    //graphql(getProfileQuery, { name: "getProfileQuery" })
    
)(Register);