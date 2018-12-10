import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;


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

export { getAuthorsQuery, getBooksQuery,getProfileQuery};