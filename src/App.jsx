import { Button} from '@nextui-org/react';
import React, { Fragment, useContext } from 'react';
import Navbar from './components/navbar';
import Home from './components/home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/authentication/signup';
import Signin from './components/authentication/signin';
import Addrecipes from './components/pages/create/addRecipe';
import { Authcontext } from './context/authProvider';
import Updateform from './components/pages/update/updateform';

function App() {
  const { isLoading, isAuthenticated } = useContext(Authcontext);
  return  isLoading ? <p>Loading...</p> : (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Home />}/>
        </Route>
        <Route path='/addrecipe' element={ isAuthenticated ? <Addrecipes /> : <Navigate to='/signup'/>}/>
        <Route path='/recipe/put/:id' element={ isAuthenticated ? <Updateform /> : <Navigate to='/signup'/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
      
      </Routes>
    </BrowserRouter>
      
  )
}

export default App;
