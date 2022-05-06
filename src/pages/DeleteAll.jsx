import React, { useState } from 'react'
import { Button, Input, PopoverFooter, PopoverBody, PopoverHeader, ButtonGroup, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, Text, TableContainer, Flex, Table, Thead, Tr, Th, Tbody, Tfoot, Td } from '@chakra-ui/react'
import axios from 'axios'
import SideBar from './SideBar.jsx';
import './view.css';
import { useHistory } from 'react-router-dom';

const DeleteAll = () => {

    const history = useHistory();
    const[password,setPassword] = useState('');
    const Trigger = async() => {
        try {
            await axios.post('http://localhost:4000/deleteall',{
                password
            }).then((data)=>{
                if(data.status === 200){
                    alert('Done!');
                    history.push('/view-page');
                }
                if(data.status === 401){
                    alert('Enter Correct password');
                }
                if(data.status === 500){
                    alert('Internal Server Error')
                }
            }).catch(err=>{
                console.log(err);
                alert('Internal Server Error');
            })
        } catch (error) {
            alert('Error');
        }
    }
    return (
        <SideBar>
            <Flex width={'100%'} backgroundColor={'gray.200'} flexDirection={'column'} paddingTop={'10%'} boxShadow={'md'} borderRadius={'5px'} height={'450px'}>
                <Flex justifyContent={'center'} width={'100%'} marginTop={'20px'}>
                    <Text>Are you sure, This Action may end up with many consequences</Text>
                </Flex>
                <Flex justifyContent={'center'} width={'100%'} marginTop={'20px'}>
                    <Input value={password} onChange={(e)=>setPassword(e.target.value)} name='password' width={'700px'} backgroundColor={'gray.300'} placeholder='Enter Pass-key'></Input>
                </Flex>
                <Text fontSize={'12px'} marginTop={'10px'} color={'red'}>*For Demo purpose, password is 'admin'</Text>
                <Flex justifyContent={'center'} width={'100%'} marginTop={'20px'}>
                    <Button width={'70px'} _hover={{bg:'gray.500',color:'#fff'}} backgroundColor={'gray.300'} onClick={Trigger}>Submit</Button>
                </Flex>
            </Flex>
        </SideBar>
    )
}

export default DeleteAll