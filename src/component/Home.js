import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink} from 'reactstrap';

import Menu from './Menu';
import AnnoncesList from './AnnoncesList';
import AnnonceDetail from './AnnonceDetail';

function Home(){
    return(
        <div>
            <div>
                <Menu/>
            </div>
                <AnnonceDetail/>
            <div>
                
            </div>
</div>
    )
}

export default Home