import { useState } from 'react';
import {
    ActionContainer,
    ChevronArrow,
    ActionSubContainer,
    CustomButton,
    RemoveField,
    InputField,
    Text
  } from '../styles/style.ts'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import { ADD_CONTACT_WITH_PHONES } from '../graphql/Mutations.ts';

function AddContact() {
  const navigate = useNavigate();
  const [listPhone, setListPhone] = useState([{number: ''}]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [contact, setContact] = useState({
  //   first_name: firstName,
  //   last_name: lastName,
  //   phones: listPhone
  // });

  const [AddContactWithPhones, { error }] = useMutation(ADD_CONTACT_WITH_PHONES);

  const addContact = () => {
    AddContactWithPhones({
      variables: {
        first_name: firstName,
        last_name: lastName,
        phones: listPhone
      }
    });

    if (error) {
      console.log(error);
      return;
    }

    return "OK";
  }

  function inputPhoneNumber() {
    const output = listPhone.map((_, i) => (
      <div key={i} style={{padding: '0px 0px 24px 0px'}}>
        <Text size='16px' weight='100' cursor='default'>Phone Number {i+1}</Text>
        <ActionSubContainer>
          <InputField type="text" onChange={(e) => {
            const temp = listPhone;
            temp[i].number = e.target.value;
            setListPhone([...temp]);
          }} value={listPhone[i].number} />
          {removeField(i)}
        </ActionSubContainer>
      </div>
    ))
    return output;
  }

  function removeField(i: number) {
    if(listPhone.length > 1) {
      return (<RemoveField color='red' background='#FFCDD2' cursor='pointer' onClick={() => {
        const temp = listPhone;
        temp.splice(i, 1);
        setListPhone([...temp]);
      }} 
      >
        Remove
      </RemoveField>)
    } else {
      return (<RemoveField color='#F5F5F5' background='#BDBDBD' cursor='not-allowed' >Remove</RemoveField>)
    }
  }

  return (
    <div>
      <div style={{padding: '16px 0 0 8px'}}>
        <CustomButton width='100px' background='#757575' hover_bg='#424242' onClick={() => navigate('/')}>
          <ActionSubContainer>
            <ChevronArrow rotateY='0deg' size='24px' className="material-symbols-outlined">arrow_back</ChevronArrow>
            <Text size='16px' weight='100' cursor='pointer'>Back</Text>
          </ActionSubContainer>
        </CustomButton>
      </div>
      <ActionContainer justify='space-between'>
          <Text size='24px' weight='bold' cursor='default'>Add Contact</Text>
          <CustomButton width='150px' background='#0D47A1' hover_bg='#1565C0' type='button'>
            <Text cursor='pointer' size='16px' weight='bold' onClick={() => {
              const response = addContact();
              if(response === 'OK') {
                setTimeout(() => {
                  navigate('/');
                }, 1000);
              }
            }}>Confirm Add</Text>
          </CustomButton>
      </ActionContainer>
      <div style={{padding: '16px 32px'}}>
        <div style={{padding: '16px 0px'}}>
          <Text size='16px' weight='100' cursor='default'>First Name</Text>
          <InputField type="text" onChange={(e) => {setFirstName(e.target.value)}} />
        </div>
        <div style={{padding: '16px 0px'}}>
          <Text size='16px' weight='100' cursor='default'>Last Name</Text>
          <InputField type="text" onChange={(e) => {setLastName(e.target.value)}} />
        </div>
        <div style={{padding: '16px 0px', display: 'flex', justifyContent: 'end'}} >
          <CustomButton width='150px' background='#EF6C00' hover_bg='#FB8C00' onClick={() => setListPhone([...listPhone,{number: ''}])}>
            <Text size='12px' weight='600' cursor='pointer'>Add Phone Number</Text>
          </CustomButton>
        </div>
        <div>
          {inputPhoneNumber()}
        </div>
      </div>
    </div>
  )
}

export default AddContact