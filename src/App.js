import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import Home from './pages/Home';
import SideBar from './pages/SideBar';
import DeleteAll from './pages/DeleteAll';
import View from './pages/View';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <BrowserRouter>
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/view-page' exact>
              <View />
            </Route>
            <Route path='/deleteall' exact>
              <DeleteAll />
            </Route>
          </Switch>
        </BrowserRouter>
      </Box>
    </ChakraProvider>
  );
}

export default App;
