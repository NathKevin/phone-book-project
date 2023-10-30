import { gql } from "@apollo/client";

const ADD_CONTACT_WITH_PHONES = gql`
    mutation AddContactWithPhones(
        $first_name: String!, 
        $last_name: String!, 
        $phones: [phone_insert_input!]!
        ) {
    insert_contact(
        objects: {
            first_name: $first_name, 
            last_name: $last_name, 
            phones: { 
                data: $phones
            }
        }) {
            returning {
                first_name
                last_name
                id
                phones {
                    number
                }
            }
        }
    }
`

const DELETE_CONTACT = gql`
    mutation MyMutation($id: Int!) {
        delete_contact_by_pk(id: $id) {
            first_name
            last_name
            id
        }
    }  
`

export {ADD_CONTACT_WITH_PHONES, DELETE_CONTACT}