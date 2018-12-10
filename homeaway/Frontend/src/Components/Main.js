import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Navbar from './BarNav/Navbar';
import Register from './Register/Register';
import Profile from './Profile/Profile';
import OwnerPost from './OwnerPost/OwnerPost';
import OwnerDash from './OwnerDash/OwnerDash';
import TravDash from './TravDash/TravDash';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={Navbar}/>
                <Route path="/login" component={Login}/>
                {/* <Route path="/home" component={Home}/> */}
                <Route path="/register" component={Register}/>
                {/* <Route path="/profile" component={Profile}/> */}
                <Route path="/ownpost" component={OwnerPost}/>
                {/* <Route path="/ownerdash" component={OwnerDash}/> */}
                {/* <Route path="/travdash" component={TravDash}/> */}
            </div>
        )
    }
}
//Export The Main Component
export default Main;