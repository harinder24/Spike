import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./screen/Home";
import Casino from "./screen/Casino";
import Favorite from "./screen/Favorite";
import Bets from "./component/Bets";
import Games from "./screen/Games";
import MainLayout from './component/MainLayout';


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
