import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink} from 'reactstrap';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

import Menu from './component/Menu';
import AnnonceDetail from './component/AnnonceDetail';
import ModifSupp from "./component/ModifSupp";
import CreateModifAnnonce from "./component/CreateModifAnnonce";
import AddCategorie from "./component/Categorie/AddCategorie";
import UpdatedCategorie from "./component/Categorie/UpdatedCategorie";
import IndexCategorie from "./component/Categorie/IndexCategorie";
import DeleteCategorie from "./component/Categorie/DeleteCategorie";
import Login from './component/user/Login';
import SignUp from './component/user/SignUp';

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
                    <Route path = "/createmodifannonce/:id" element={<CreateModifAnnonce />}/>
                    <Route path = "/modifierannonces/" element={<ModifSupp />} />

                    <Route path = "/login/" element={<Login />} />
                    <Route path = "/signup/" element={<SignUp />} />

                    <Route path="/admin/categorie" element={<IndexCategorie />} />
                    <Route path="/admin/categorie/add" element={<AddCategorie />} />
                    <Route path="/admin/categorie/edit" element={<UpdatedCategorie />} />
                    <Route path="/admin/categorie/delete" element={<DeleteCategorie />} />

                </Routes>
            </BrowserRouter>,
                
            </div>

        </div>

    </div>
  );
}

export default App;
