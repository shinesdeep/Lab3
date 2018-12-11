
import { gql } from 'apollo-boost';

const registerMutation = gql`
 mutation RegisterUser($username: String!, $password:String!, $firstname: String!, $lastname:String!, $email: String!, $role:String!){
      Register(username: $username , password:$password, firstname: $firstname, lastname:$lastname, email: $email, role:$role){
          username
          firstname
          lastname
          email
          role

      }
}
`;

const updateProfileMutation = gql`
 mutation updateProfile($username: String!, $firstname:String, $lastname:String, $phone : String, $aboutme : String, $city : String, $company : String, $school : String, $home : String, $language : String, $gender : String){
    UpdateProfile(username: $username , firstname: $firstname, lastname:$lastname, phone : $phone, aboutme : $aboutme, city:$city , company : $company, school : $school, home : $home, language : $language, gender : $gender){
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
`;

const bookPropMutation = gql`
 mutation bookProp( $listingId : String, $startDate :String,$endDate:String, $owner : String, $guest: String, $username: String, $price: String, $headline: String, $propdes: String, $bedrooms: String, $accomodates: String, $bathrooms: String, $description: String, $listingPic1: String, $proptype: String, $listingPic2: String, $listingPic3: String, $listingPic4: String, $listingPic5: String, $listingPic6: String,){
    bookProp(listingId :$listingId, startDate : $startDate,endDate : $endDate, owner : $owner,  guest: $guest, username: $username, price: $price, headline: $headline, propdes: $propdes, bedrooms: $bedrooms, accomodates: $accomodates, bathrooms: $bathrooms, description: $description, listingPic1: $listingPic1, proptype: $proptype, listingPic2: $listingPic2, listingPic3: $listingPic3, listingPic4: $listingPic4, listingPic5: $listingPic5, listingPic6: $listingPic6,){
        username 
        guest 
        startDate 
        endDate 
        owner 
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
`;


export {registerMutation, updateProfileMutation,bookPropMutation};

