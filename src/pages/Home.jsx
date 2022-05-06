import React from 'react';
import { Flex,Box,FormControl,FormLabel,Input,HStack,Stack,Button,Heading,Text,useColorModeValue} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function SignupCard() {
    const history = useHistory();
    const [data, setData] = React.useState({
        firstname: "", lastname: "", email: "", number: ""
    });
    const ChangeData = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value });
    }
    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }
    function NumberValidator(number){
        if(number.length === 10){
            return true;
        }
        return false;
    }
    const Trigger = async (e) => {
        const values = ValidateEmail(data.email);
        const values1 = NumberValidator(data.number);
        if (values && values1) {
            try {
                await axios.post(`http://localhost:4000/senddata`, {
                    data
                }).then((data) => {
                    history.push('/view-page');
                    alert("Saved !!");
                }).catch(err => {
                    console.log(err);
                    alert("Some error occured!!");
                });
            } catch (error) {
                alert("Some error occured!!");
            }
        } else if(!values && values1){
            alert("You have entered an invalid email address!")
        } else{
            alert("You Entered Invalid Number (Ideal length is 10)");
        }
    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Register Your Employee
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        get managed records of Your employee super fast ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input value={data.firstName} name="firstname" onChange={ChangeData} type="text" />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName" isRequired>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input value={data.lastname} onChange={ChangeData} name="lastname" type="text" />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input onChange={ChangeData} value={data.email} name="email" type="email" />
                        </FormControl>
                        <FormControl id="number" isRequired>
                            <FormLabel>Phone Number</FormLabel>
                            <Input type='number' onChange={ChangeData} value={data.number} name="number" />
                        </FormControl>

                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={Trigger}
                            >
                                Sign up
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}