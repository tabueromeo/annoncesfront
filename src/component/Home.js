import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink} from 'reactstrap';

import Menu from './Menu';
import AnnoncesList from './AnnoncesList';

function Home(){
    return(
        <div>
            <div>
                <Menu/>
            </div>
                <AnnoncesList/>
            <div>
                
            </div>
</div>
    )
}

export default Home