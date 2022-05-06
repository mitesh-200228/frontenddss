import React from 'react'
import { Button, Input, PopoverFooter, PopoverBody, PopoverHeader, ButtonGroup, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, Text, TableContainer, Flex, Table, Thead, Tr, Th, Tbody, Tfoot, Td } from '@chakra-ui/react'
import axios from 'axios'
import SideBar from './SideBar.jsx';
import './view.css';

const View = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const open = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)
  const [isOpen1, setIsOpen1] = React.useState(false)
  const open1 = () => setIsOpen1(!isOpen)
  const close1 = () => setIsOpen1(false)
  const [idx, setIdx] = React.useState({});
  const [Data, setData] = React.useState([]);
  const [updatedDatas, setUpdatedDatas] = React.useState({
    firstname: '', lastname: '', email: '', Number: ''
  });
  React.useEffect(() => {
    const GetDatas = async () => {
      try {
        await axios.get('http://localhost:4000/getdata').then((data) => {
          setData(data.data.message);
        }).catch(err => {
          alert('Some Internal Server issue is there , sorry :(')
          console.log(err);
        });
      } catch (error) {
        alert('Some Internal Server issue is there , sorry :(')
        console.log(error);
      }
    }
    GetDatas();
    setInterval(() => {
      GetDatas();
    }, 1000 * 10);
  }, []);

  class PostFunction {
    async update() {
      const value = ValidateEmail(updatedDatas.email);
      const values1 = NumberValidator(updatedDatas.number);
      if (value && values1) {
        try {
          await axios.post('http://localhost:4000/editdata', {
            updatedDatas, idx
          }).then((data) => {
            alert("Successfully edited. It will auto update in table, so you dont have to refresh it!");
          }).catch(err => {
            alert("Error appeared");
          })
        } catch (error) {
          alert("Error occured!");
        }
      } else if (!value && values1) {
        alert("You have entered an invalid email address!")
      } else {
        alert("You Entered Invalid Number (Ideal length is 10)");
      }
    }
    async delete(datas) {
      const confirmation = window.confirm("Sure, want to delete it ?");
      if (confirmation) {
        setIdx(datas);
      }
      try {
        await axios.post('http://localhost:4000/deletedata', {
          idx
        }).then((data) => {
          alert("Successfully edited. It will auto update in table, so you dont have to refresh it!");
        }).catch(err => {
          alert("Error appeared");
        })
      } catch (error) {
        alert("Error occured!");
      }
    }
  }

  const FinalPostFunction = new PostFunction();
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }
  function NumberValidator(number) {
    if (number.length === 10) {
      return true;
    }
    return false;
  }
  const ChangeData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUpdatedDatas({ ...updatedDatas, [name]: value });
  }
  return (
    <SideBar datas={Data}>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={close}
        placement='left'
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button colorScheme='blue' marginTop={'20px'}>Edit Information</Button>
        </PopoverTrigger>
        <PopoverContent marginTop='10%'>
          <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Edit Data of &nbsp;
            <Text fontWeight={600}>
              {idx.firstname + ' ' + idx.lastname}
            </Text>
            <Input placeholder="First Name" marginTop='10px' name="firstname" onChange={ChangeData}></Input>
            <Input placeholder="Last Name" marginTop='10px' name="lastname" onChange={ChangeData}></Input>
            <Input placeholder="Email Id" name="email" marginTop='10px' onChange={ChangeData}></Input>
            <Input placeholder="Number" name="number" marginTop='10px' onChange={ChangeData}></Input>

          </PopoverBody>
          <PopoverFooter d='flex' justifyContent='flex-end'>
            <ButtonGroup size='sm'>
              <Button colorScheme='red' onClick={FinalPostFunction.update}>Apply</Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
      <Popover
        // paddinLeft="20px/"
        returnFocusOnClose={false}
        isOpen={isOpen1}
        onClose={close1}
        placement='right'
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button colorScheme='blue' marginTop={'20px'} marginLeft={'20px'}>View Information</Button>
        </PopoverTrigger>
        <PopoverContent marginTop='10%'>
          <PopoverHeader fontWeight='semibold'>Details of Employee</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Viewing Data of &nbsp;
            <Text fontWeight={600}>
              {idx.firstname + ' ' + idx.lastname}
            </Text>
            <Input placeholder="First Name" marginTop='10px' name="firstname" value={idx.firstname}></Input>
            <Input placeholder="Last Name" marginTop='10px' name="lastname" value={idx.lastname}></Input>
            <Input placeholder="Email Id" name="email" marginTop='10px' value={idx.number}></Input>
            <Input placeholder="Number" name="number" marginTop='10px' value={idx.email}></Input>
            <Input placeholder="Number" name="number" marginTop='10px' value={idx.employeeId}></Input>

          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Flex width={'100%'} marginTop={'20px'} justifyContent={'center'} alignItems={'center'}>
        <TableContainer borderRadius={'3px'} width={'100%'}>
          {Data.length > 0 ? (
            <>
              <Table size='lg'>
                <Thead>
                  <Tr>
                    <Th>First Name</Th>
                    <Th>Last Name</Th>
                    <Th>Email Id</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Data.map((datas, index) => {
                    return (
                      <>
                        <Tr>
                          <Td>{datas.firstname}</Td>
                          <Td>{datas.lastname}</Td>
                          <Td>{datas.email}</Td>
                          <Td><Flex flexDirection={'row'} justifyContent={'space-between'}>
                            <Button backgroundColor={'#89CFF0'} color={'#fff'} _hover={{ color: '#f0f0f0' }} onClick={() => {
                              open(); setIdx(datas);
                            }}>Edit</Button>
                            <Button backgroundColor={'#B80F0A'} color={'#fff'} _hover={{ color: '#f0f0f0' }} onClick={async () => {
                              await axios.post('http://localhost:4000/deletedata', {
                                datas
                              }).then(() => {
                                alert("Deleted!")
                              }).catch(err => {
                                alert("Error!!")
                              })
                            }}>Delete</Button>
                            <Button backgroundColor={'#6495ed'} color={'#fff'} _hover={{ color: '#f0f0f0' }} onClick={open1}>View</Button>
                          </Flex></Td>
                        </Tr>
                      </>
                    )
                  })}
                </Tbody>
              </Table>
            </>
          ) : (<Text>No Data Available</Text>)}
        </TableContainer>
      </Flex>
    </SideBar>
  )
}

export default View