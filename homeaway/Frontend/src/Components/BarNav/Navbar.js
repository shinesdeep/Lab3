import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import './Navbar.css'
import Profile from '../Profile/Profile';
import {Nav, Navbar,NavDropdown,NavItem,MenuItem} from 'react-bootstrap';

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
      }

      this.showProfile = this.showProfile.bind(this);

    }

    showProfile(e){
        e.preventDefault();
        this.setState({showprofile:true});
    }
    
    componentDidMount(){
        var username = cookie.load('cookie');
        //user= JSON.parse(user);
        let user = JSON.parse(localStorage.getItem("user"));


        console.log("user in comp did mount",user);

        if(user){
            this.setState({
                        
                username : username,
                firstname : user.firstname,
                lastname : user.lastname,
                role : user.role,
                profile_pic : user.profile_pic,
              }) 

        }
       
      
      
     
    //     axios.get('http://localhost:3001/navbar',{
    //     params: {
    //           username: cookie.load('cookie'),
              
    //     }
    //    }) 
    //   .then((response) => {
  
    //       console.log("Status Code : ",response.status);
    //       if(response.status === 200){
    //               console.log("Success Post");
    //               console.log(response.data);
    //               localStorage.setItem("username",response.data.username);
    //               localStorage.setItem("firstname",response.data.firstname);
    //               localStorage.setItem("lastname",response.data.lastname);
    //               localStorage.setItem("role",response.data.role);
    //               localStorage.setItem("profile_pic",response.data.profile_pic);
                  
                  
    //               this.setState({
                        
    //                 username : cookie.load('cookie').username,
    //                 firstname : response.data.firstname,
    //                 lastname : response.data.lastname,
    //                 role : response.data.role,
    //                 profile_pic : response.data.profile_pic,
    //               }) 

    //       }
    //       else
    //       {
                  
    //              this.setState({errorFlag : true})
    //              console.log("Error in Response");
   
    //       }
         
          
    //       })
    //       .catch((error) => {
    //        // Error
    //        if (error.response) {
     
    //            this.setState({
    //                errorFlag : true
    //            })
               
    //        } else if (error.request) {
    //            this.setState({
    //                errorFlag : true
    //            })
               
    //            console.log(error.request);
    //        } else {
    //            this.setState({
    //                errorFlag : true
    //            })
    //            // Something happened in setting up the request that triggered an Error
    //            console.log('Error', error.message);
    //        }
    //        console.log(error.config);
    //        this.setState({
    //            errorFlag : true
    //        })
    //    });  
         

     

    }
    
    
    
    //handle logout to destroy the cookie
    handleLogout = () => {
        localStorage.setItem("user",null);
        cookie.remove('cookie', { path: '/' });
        console.log("after logout local stotage", JSON.parse(localStorage.getItem("user")));
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
        var cookieVal= cookie.load('cookie');
        var userval = JSON.parse(localStorage.getItem("user"));

     if(cookieVal){
        if(this.state.profile_pic){
           profilepic = <img className="profile-img" src={`http://localhost:3001/uploads/${this.state.profile_pic}`}></img>
           
           

        }
        else{
          profilepic = <span class="glyphicon glyphicon-user"></span>
        }
        



        if(this.state.role == 'Owner'){
          rolebasednav =
        
          <Nav>
          <NavItem  >
          <Link to="/ownpost" style={{color: "#9d9d9d"}}> List Property</Link>
           </NavItem>

           <NavItem  >
           <Link to="/ownerdash" style={{color: "#9d9d9d"}}>Dashboard</Link>
           </NavItem>
          
           </Nav>

        } else{
          rolebasednav =
          <NavItem >
                
                <Link to="/travdash" style={{color: "#9d9d9d"}}>My Trips</Link>
                
                
              </NavItem>
         

        }
        
        dashboard = 
        <NavItem  onClick={this.showProfile} style={{color: "#9d9d9d"}} >
         {/* <Link to="/profile" onClick={this.showProfile} style={{color: "#9d9d9d"}}>{cookieVal} </Link> */}
        
         {userval?(userval.firstname + " " + userval.lastname ): cookie.load('cookie')}

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
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
         if(this.state.showprofile ){
            console.log("username in show profile", cookie.load('cookie'));
            showProf = <Profile username={cookie.load('cookie')}></Profile>
        }

        // let redirectVar = null;
        // if(cookie.load('cookie')){
        //     redirectVar = <Redirect to="/home"/>
        // }
        return(
            <div>
                {/* {redirectVar} */}
                <Navbar className="cusnav" inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand pullRight>
    <Link to="/home" style={{color: "#9d9d9d"}}>Home Away</Link>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
    <NavItem  >
      <Link to="/home" style={{color: "#9d9d9d"}}>Home</Link>
      
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
      {showProf}
        </div>
        )
    }
}

export default BarNav;