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

    query($owner : String){
        getownerdash(owner:$owner){
           bookingId
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

export { getTravDashQuery, geOwnerDashQuery,getProfileQuery};