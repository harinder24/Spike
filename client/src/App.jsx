import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./screen/Home";
import Casino from "./screen/Casino";
import Favorite from "./screen/Favorite";

import Games from "./screen/Games";
import Bets from "./screen/Bets";
import MainLayout from './component/layout/MainLayout';



function App() {
  return (
    <BrowserRouter>
    <MainLayout>
      
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/browse' element={<></>}/> 
      <Route path='/casino' element={<Casino/>}/>  
      <Route path='/games' element={<Games/>}/>
      <Route path='/bets' element={<Bets/>}/>
      <Route path='/favorite' element={<Favorite/>}/>
      
     
    </Routes>
    </MainLayout>
      </BrowserRouter>
  )
}

export default App;
