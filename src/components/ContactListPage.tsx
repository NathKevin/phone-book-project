/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ProfileImage,
  Card, 
  CardContainer, 
  ActionContainer, 
  InputField, 
  CustomButton,
  MutationContainer,
  ChevronArrow,
  Title,
  ContactMutation,
  Text
} from '../styles/style.ts'
import { GET_ALL_CONTACT_LIST } from '../graphql/Queries.ts';
import { useMutation } from '@apollo/client';
import { DELETE_CONTACT } from '../graphql/Mutations.ts';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

interface Phone {
  number: number,
  __typename: string,
}

interface Contact {
  first_name: string,
  last_name: string,
  id: number,
  __typename: string,
  created_at: string,
  phones: Array<Phone>,
}


function ContactListPage() {
  const [list, setList] = useState([] as any[]);
  const [favList, setFavList] = useState([]);
  const [search, setSearch] = useState({});
  const [fn, setFn] = useState('');
  const [ln, setLn] = useState('');
  const [phone, setPhone] = useState([] as any[]);
  const [searchTemp, setSearchTemp] = useState('');
  const [offset, setOffset] = useState(0);
  const [currentContact, setCurrentContact] = useState(0);
  const navigate = useNavigate();

  const [MyMutation, { error }] = useMutation(DELETE_CONTACT);
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteContact = (id: number) => {
    MyMutation({
      variables: {
        id: id,
      }
    });

    if (error) {
      console.log(error);
      return;
    }

    return "OK";
  }

  function GetData() {
    const { loading, error, data } = useQuery(GET_ALL_CONTACT_LIST, {
      variables: { 
        limit: 10,
        where: search,
        offset: offset,
        order_by: [{
          first_name: 'asc'
        }]
       },
    });
    return {loading, error, data}
  }

  const response = GetData();

  useEffect(()=>{
    if(response.data) {
      setList(response.data.contact);
      setCurrentContact(response.data.contact.length);
      const getLocal = localStorage.getItem('favConLists')
      if(getLocal) {
        const fav = JSON.parse(getLocal);
        setFavList(fav);
      }
    }
  }, [response.data, currentContact])
  
  if (response.loading) return <p>Loading...</p>;
  if (response.error) return <p>Error : {response.error.message}</p>;
  
  function favoriteContactLists() {
    if (favList.length == 0) {
      return <h4>- Favorite Contact List Empty -</h4>
    } else {
      return favList.map((x: Contact, i: number ) => (
        <Card key={i} onClick={() => {
          setFn(x.first_name);
          setLn(x.last_name);
          const temp: any[] = x.phones;
          setPhone([...temp]);
        }}>
          <ProfileImage src="../../profile-picture.png" alt="profile-pic" />
          <p>{i+1}. {x.first_name} {x.last_name}</p>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <ContactMutation background='#FFEE58' color='#FF6F00' size='30px' className="material-symbols-outlined" onClick={() => {
              let data;
              const temp = localStorage.getItem('favConLists');
              if(temp) {
                data = JSON.parse(temp);
                const index = data.indexOf((y: any) => y.id === x.id)
                data.splice(index+1, 1);
                setTimeout(() => {
                  window.location.reload()
                }, 1000)
              }              
              localStorage.setItem('favConLists', JSON.stringify(data));
            }}>
            star
            </ContactMutation>
            <ContactMutation background='#FFCDD2' color='#C62828' size='30px' className="material-symbols-outlined" onClick={() => {
              const id = x.id;
              const response = deleteContact(id);
              if(response === 'OK') {
                setTimeout(() => {
                  const temp = {
                    first_name: {
                      _like: `%%`
                    }
                  }
                  setSearch(temp);
                  return false;
                }, 1000)
              }
            }}>
              delete
            </ContactMutation>
          </div>
        </Card>
      ));
    }
  }

  function detailContact() {
    if(fn && ln && phone) {
      return (
        <div style={{textAlign: 'left', margin: '16px 0px'}}>
          <Text cursor='default' size='20px' weight='100'>
            First Name &nbsp;: &nbsp;&nbsp;&nbsp; {fn}
          </Text>
          <Text cursor='default' size='20px' weight='100'>
            Last Name &nbsp;: &nbsp;&nbsp;&nbsp; {ln}
          </Text>
          {phone.map((x, i) => (
            <Text key={i} cursor='default' size='20px' weight='100'>
              Phone number {i+1} &nbsp;: &nbsp;&nbsp; {x.number}
            </Text>
          ))}
        </div>
      )
    } else {
      return <h4>- Select Contact First -</h4>
    }
  }
  function contactLists() {
    if (list.length == 0) {
      return <h4>- End of Page -</h4>
    } else {
      return list.map((x: Contact, i: number ) => (
        <Card key={i} onClick={() => {
          setFn(x.first_name);
          setLn(x.last_name);
          const temp: any[] = x.phones;
          setPhone([...temp]);
        }}>
          <ProfileImage src="../../profile-picture.png" alt="profile-pic" />
          <p>{i+1+offset}. {x.first_name} {x.last_name}</p>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <ContactMutation background='#64B5F6' color='#BBDEFB' size='30px' className="material-symbols-outlined" onClick={() => {
              let data;
              const temp = localStorage.getItem('favConLists');
              if(temp) {
                data = JSON.parse(temp);
                data.push(x)
              } else {
                data = [x]
              }              
              localStorage.setItem('favConLists', JSON.stringify(data));
              setTimeout(() => {
                window.location.reload()
              }, 1000)
            }}>
            star
            </ContactMutation>
            <ContactMutation background='#FFCDD2' color='#C62828' size='30px' className="material-symbols-outlined" onClick={() => {
              const id = x.id;
              const response = deleteContact(id);
              if(response === 'OK') {
                setTimeout(() => {
                  const temp = {
                    first_name: {
                      _like: `%%`
                    }
                  }
                  setSearch(temp);
                  return false;
                }, 1000)
              }
            }}>
              delete
            </ContactMutation>
          </div>
        </Card>
      ));
    }
  }

  function pagination(command: string) {
    let temp = 0;
    if(command === 'dec' && offset > 0) {
      temp = offset - 10;
      setOffset(temp)
    }else if(command === 'inc' && currentContact > 1 && currentContact != 0) {
      temp = offset + 10;
      setOffset(temp)
    }
    return;
  }

  return (
    <div>
      <ActionContainer justify='unset'>
        <InputField type="text" placeholder="Search name here..." onChange={(e) => {
          setSearchTemp(e.target.value);
        }} />
        <CustomButton width='150px' background='#42A5F5' hover_bg='#1E88E5' type='button' onClick={(e) => { 
          e.preventDefault;
          const temp = {
            first_name: {
              _like: `%${searchTemp}%`
            }
          }
          setSearch(temp);
          return false;
        }}>Search</CustomButton>
        <CustomButton width='150px' background='#757575' hover_bg='#424242' type='button' onClick={(e) => { 
          e.preventDefault;
          const temp = {
            first_name: {
              _like: `%%`
            }
          }
          setSearch(temp);
          return false;
        }}>Reset</CustomButton>
      </ActionContainer>
      <div style={{display: 'flex', justifyContent: 'end', padding: '16px 32px'}}>
        <CustomButton width='100px' background='#0D47A1' hover_bg='#1565C0' type='button' onClick={() => navigate('/add')}>
          Add
        </CustomButton>
      </div>
      <Title>Detail Contact</Title>
      <CardContainer style={{justifyContent: 'start !important'}}>
        {detailContact()}
      </CardContainer>
      <Title>Favorite Contact List</Title>
      <CardContainer>
        {favoriteContactLists()}
      </CardContainer>
      <Title>Contact List</Title>
      <MutationContainer>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <p>Pagination</p>
          <ChevronArrow size='32px' rotateY={'180deg'} className="material-symbols-outlined" onClick={(e) => {
            e.preventDefault;
            pagination('dec');
          }}>
            expand_circle_right
          </ChevronArrow>
          <ChevronArrow size='32px' rotateY={'0deg'} className="material-symbols-outlined" onClick={(e) => {
            e.preventDefault;
            pagination('inc');
          }}>
            expand_circle_right
          </ChevronArrow>
        </div>
      </MutationContainer>
      <CardContainer>
        {contactLists()}
      </CardContainer>
    </div>
  )
}

export default ContactListPage