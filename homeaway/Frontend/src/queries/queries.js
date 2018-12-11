import { gql } from 'apollo-boost';

const getTravDashQuery = gql`

    query($username : String){
        gettravdash(username:$username){
           bookingId
           headline
           propdes
           listingPic1
           price

        }
 
    }
 `  ;

 const geOwnerDashQuery = gql`

    query($username : String){
        getownerdash(username:$username){
           listingId
           headline
           propdes
           listingPic1
           price
        }
 
    }
 `  ;


const getProfileQuery = gql`

    query($username : String){
        getprofile(username:$username){
           username
           firstname
           lastname
           email
           phone
           aboutme
           city
           company
           school
           home
           language
           gender
           role

           
        }
 
    }
 `  ;

 const getPropSearchQuery = gql`

    query($accomodates : String ){
        propsearch(accomodates:$accomodates){
            
        username  
        listingId 
        headline 
        propdes 
        price 
        listingPic1 
        bedrooms
        accomodates
        bathrooms
        description
        proptype
        listingPic2
        listingPic3
        listingPic4
        listingPic5
        listingPic6
           
        }
 
    }
 `  ;

 

export { getTravDashQuery, geOwnerDashQuery,getProfileQuery, getPropSearchQuery};