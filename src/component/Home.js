import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink} from 'reactstrap';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

import SearchBar from './SearchBar';
import AnnoncesList from './AnnoncesList';



function Home(){
    return(
        <div>
            
                

            <div   className='liste_annonce_principale'>
            <div>
                <SearchBar/>
            </div>
            <AnnoncesList />
                
            </div>

        </div>
    )
}

export default Home