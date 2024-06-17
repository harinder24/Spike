import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screen/Home";
import Casino from "./screen/Casino";
import Favorite from "./screen/Favorite";

import Games from "./screen/Games";
import Bets from "./screen/Bets";
import MainLayout from "./component/layout/MainLayout";
import AuthProvider from "./component/layout/AuthProvider";
import '@stripe/stripe-js'
import Success,{Success2} from "./screen/Success";
import Mines from "./screen/Mines";
import LevelUp from "./screen/Levelup";
import Baccarat from "./screen/Baccarat";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/browse" element={<></>} />
            
            <Route path="/games/mines" element={<Mines />} />
            <Route path="/bets" element={<Bets />} />
            <Route path="/favorite" element={<></>} />
            <Route path="/casino" element={<></>} />
            <Route path="/games" element={<></>} />
            <Route path="/levelup" element={<LevelUp />} />
            <Route path="/casino/baccarat" element={<Baccarat />} />
            <Route path="/success/:id/:amount/:path" element={<Success />} />
            <Route path="/success/:id/:amount/:path/:path2" element={<Success2 />} />
          </Routes>
        </MainLayout>
  
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
