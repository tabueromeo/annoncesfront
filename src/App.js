import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink} from 'reactstrap';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

import Menu from './component/Menu';
import AnnonceDetail from './component/AnnonceDetail';

import Home from './component/Home';

function App() {
  return (
    <div className="App">
            <div>
            <div>
                <Menu/>
            </div>
                

            <div >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Detail/:index" element={<AnnonceDetail />} />
                </Routes>
            </BrowserRouter>,
                
            </div>

        </div>

    </div>
  );
}

export default App;
