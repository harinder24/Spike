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
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<></>} />
            <Route path="/casino" element={<Casino />} />
            <Route path="/games" element={<Games />} />
            <Route path="/bets" element={<Bets />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/success/:id/:amount/:path" element={<Success />} />
            <Route path="/success/:id/:amount/:path/:path2" element={<Success2 />} />
          </Routes>
        </MainLayout>
  
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
