import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';
import './Navbar.css'
import Profile from '../Profile/Profile';
import TravDash from '../TravDash/TravDash';
import OwnerDash from '../OwnerDash/OwnerDash';
import {Redirect} from 'react-router';
import Home from '../Home/Home';
import Login from '../Login/Login';
import {Nav, Navbar,NavDropdown,NavItem,MenuItem} from 'react-bootstrap';
import { flattenSelections } from 'apollo-utilities';

//create the Navbar Component
class BarNav extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        
        this.state = {
          username : "",
          firstname:'',
          lastname: '',
          role :'',
          profile_pic: '',
          errorFlag : false,
          showprofile : false,
          showtravel :false,
          showownerdash : false,
          showhome : true,
          showlogin : false,
      }

      this.showProfile = this.showProfile.bind(this);
      this.showTravdash = this.showTravdash.bind(this);
      this.showOwnerdash = this.showOwnerdash.bind(this);
      this.showHome = this.showHome.bind(this);
      this.showLogin = this.showLogin.bind(this);
    }

    showProfile(e){
        e.preventDefault();
        this.setState({
            showprofile:true,
            showtravel:false,
            showownerdash :false,
            showhome : false,
            showlogin : false
        });
    }
    
    showTravdash(e){
        e.preventDefault();
        this.setState({
            showtravel:true,
            showprofile:false,
            showownerdash :false,
            showhome : false,
            showlogin : false
        });
    }

    showOwnerdash(e){
        e.preventDefault();
        this.setState({
            showownerdash :true,
            showtravel:false,
            showprofile:false,
            showhome : false,
            showlogin : false,

        });
    }

    showHome(e){
        this.setState({ 
            showhome : true,
            showprofile : false,
            showtravel :false,
            showownerdash : false,
            showlogin : false,
            

        })
        

    }
    showLogin(e){
        this.setState({ 
            showhome : false,
            showprofile : false,
            showtravel :false,
            showownerdash : false,
            showlogin : true,
            

        })
        

    }
    
    //handle logout to destroy the cookie
    handleLogout = () => {
        //localStorage.setItem("user",null);
        cookie.remove('cookie', { path: '/' });
        //console.log("after logout local stotage", JSON.parse(localStorage.getItem("user")));
        this.setState({
            showprofile : false,
            username : '',
            firstname : '',
            lastname : '',
            role : '',
            profile_pic : '',
        });
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        let rolebasednav = null;
        let dashboard = null;
        let profilepic = null;
        let showProf = null;
        let showTrav = null;
        let showOwner = null;
        let showHomePage = null;
        let showLoginPage = null;

        var cookieVal= cookie.load('cookie');
        //console.log(" cookie user in comp did mount",cookieVal);
        //console.log(" cookie firstname",cookieVal.firstname);
        //console.log("localstorage", JSON.parse(localStorage.getItem("user")));
        //var userval = JSON.parse(localStorage.getItem("user"));

        if(this.state.showhome ){
            console.log("username in show profile", cookie.load('cookie'));
            showHomePage = <Home ></Home>
                           
        }
      if(cookieVal){

        if(this.state.showprofile ){
            console.log("username in show profile", cookie.load('cookie'));
            showProf = <Profile username={cookieVal.username}></Profile>
        }
        if(this.state.showtravel ){
            console.log("username in show profile", cookie.load('cookie'));
            showTrav = <TravDash username={cookieVal.username}></TravDash>
        }
        if(this.state.showownerdash ){
            console.log("username in show profile", cookie.load('cookie'));
            showOwner = <OwnerDash username={cookieVal.username}></OwnerDash>
        }
       
       if(this.state.showlogin){
           showLoginPage = <Login></Login>
       }


        if(this.state.profile_pic){
           profilepic = <img className="profile-img" src={`http://localhost:3001/uploads/${this.state.profile_pic}`}></img>
           
           

        }
        else{
          profilepic = <span class="glyphicon glyphicon-user"></span>
        }
        



        if(cookieVal.role == 'Owner'){
          rolebasednav =
        
          <Nav>
          <NavItem  >
          <Link to="/ownpost" style={{color: "#9d9d9d"}}> List Property</Link>
           </NavItem>

           <NavItem  onClick={this.showOwnerdash} style={{color: "#9d9d9d"}}>
           
           Dashboard
           </NavItem>
          
           </Nav>

        } else{
          rolebasednav =
          <NavItem  onClick={this.showTravdash} style={{color: "#9d9d9d"}}>
                
                My Trips
         
              </NavItem>
         

        }
        
        dashboard = 
        <NavItem  onClick={this.showProfile} style={{color: "#9d9d9d"}} >
         {/* <Link to="/profile" onClick={this.showProfile} style={{color: "#9d9d9d"}}>{cookieVal} </Link> */}
        
         {cookieVal?(cookieVal.firstname + " " + cookieVal.lastname ): "Guest"}

       </NavItem>

        
  
            console.log("Able to read cookie ",cookieVal);
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}>
                        {profilepic}
                        Logout
                        </Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <div>
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
                 <Redirect to= "/"/>
                 </div>
            )
        }
         
             
        
     return(
            <div>
            {/* {redirectVar} */}
            <Navbar className="cusnav" inverse collapseOnSelect>
            <Navbar.Header>
            <Navbar.Brand pullRight onClick={this.showHome} style={{color: "#9d9d9d"}}>
            {/* showHome */}
            {/* <Link to="/home" style={{color: "#9d9d9d"}}>Home Away</Link> */}
            Home Away
            </Navbar.Brand>
            <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <Nav>
            <NavItem  onClick={this.showHome} style={{color: "#9d9d9d"}} >
                 {/* <Link to="/home" style={{color: "#9d9d9d"}}>Home</Link>  */}
                
              Home
            </NavItem>
      {/* eventKey={3.1} href="/profile"  */}
      {/* <NavDropdown eventKey={3} title={this.state.firstname} id="basic-nav-dropdown"  >
        <MenuItem  onClick={this.showProfile} >Profile</MenuItem> */}
            {dashboard}
        
        
            {/* </NavDropdown> */}
            </Nav>
            <Nav pullRight>
      
      
            {rolebasednav}
      
      
                {navLogin}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
      {showHomePage}
      {showProf}
      {showTrav}
      {showOwner}
      
      {/* {showLoginPage} */}
     
        </div>
        )
    }
}

export default BarNav;