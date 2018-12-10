
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


export {registerMutation, updateProfileMutation};

