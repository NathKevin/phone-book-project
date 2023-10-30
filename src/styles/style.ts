import styled from "@emotion/styled"

const ProfileImage = styled('img')`
    max-width: 200px;
    user-select: none;
` 

const CardContainer = styled('div')`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 30px 20px;
    margin: 0px 16px;
`

const Card = styled('div')`
    margin: 8px 4px;
    padding: 8px;
    border: 1px solid rbga(0, 0 ,0 , 0.75);
    border-radius: 8px;
    background: #F5F5F5;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    border-bottom: 8px solid rgba(3, 98, 171, 0.5);
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    transition: 0.2s all;
    &:hover{
        transform: scale(1.05);
        cursor: pointer;
        background: #E0E0E0;
    }
`

type ActionContainerProps = {
    justify: string,
  }
const ActionContainer = styled('div')<ActionContainerProps>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.justify};
    background: #EEEEEE;
    padding: 16px;
    margin: 16px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const ActionSubContainer = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
`

const InputField = styled('input')`
    width: 100%;
    padding: 8px 0px;
    border-radius: 5px;
    border: none;
    margin: 0px 8px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-size: 16px;
    text-indent: 16px;
`

type RemoveProps = {
    background: string,
    cursor: string,
    color: string,
  }
const RemoveField = styled('label')<RemoveProps>`
  color: red;
  background: ${props => props.background};
  color: ${props => props.color};
  border-radius: 5px;
  padding: 6px;
  user-select: none;
  cursor: ${props => props.cursor};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

type ButtonProps = {
    background: string,
    hover_bg: string,
    width: string,
  }
const CustomButton = styled('button')<ButtonProps>`
    width: ${props => props.width};
    padding: 8px 0px;
    border-radius: 5px;
    margin: 0px 8px;
    font-family: 'Outfit', sans-serif;
    font-family: 'Quicksand', sans-serif;
    border: 0.5px solid rgba(0, 0, 0, 0.1);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background: ${props => props.background};
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    color: #EEEEEE;
    user-select: none;
    transition: 0.2s all;
    &:hover {
        background: ${props => props.hover_bg};
    }
`

const MutationContainer = styled('div')`
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 8px 16px;
    margin: 8px 16px;
    border-radius: 5px;
`

type ChevronProps = {
    rotateY: string,
    size: string,
  }
const ChevronArrow = styled('span')<ChevronProps>`
    font-size: ${props => props.size};
    padding: 0px 8px;
    cursor: pointer;
    transform: rotateY(${props => props.rotateY});
    user-select: none;
`

type TextProps = {
    size: string,
    cursor: string,
    weight: string,
  }
const Text = styled('p')<TextProps>`
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  cursor: ${props => props.cursor};
  margin: 0;
`

const Title = styled('p')`
  border-bottom: 2px solid black;
  font-size: 24px;
  font-weight: bold;
  user-select: none;
  cursor: default; 
  margin: 0 32px 16px 32px;
`

type ContactMutationProps = {
    size: string,
    color: string,
    background: string,
  }
const ContactMutation = styled('span')<ContactMutationProps>`
  font-size: ${props => props.size};
  color: ${props => props.color};
  cursor: pointer;
  background: ${props => props.background};
  border-radius: 20px;
  padding: 4px;
  transition: 0.3s all;
  &:hover{
    transform: scale(1.3);
  }
`

export {
    ProfileImage, 
    CardContainer, 
    Card, 
    ActionContainer,
    ActionSubContainer,
    InputField,
    RemoveField,
    CustomButton,
    MutationContainer,
    ChevronArrow,
    Text,
    Title,
    ContactMutation
}
