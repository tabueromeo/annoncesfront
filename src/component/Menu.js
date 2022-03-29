import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownItem, NavbarText, DropdownMenu, DropdownToggle, Button} from 'reactstrap';

function Menu(){
    const [isOpen, setIsOpen]= React.useState(false)

  const  handlelogin=()=>{
       console.log(" bouton cliqué");
  
       window.location.href='/login//'
    }

    return(

        <div>
        <Navbar
            color="light"
            expand="md"
            light
        >
            <NavbarBrand href="/">
            reactstrap
            </NavbarBrand>
            <NavbarToggler onClick={function noRefCheck(){ setIsOpen(!isOpen)}} />
            <Collapse navbar isOpen={isOpen}>
            <Nav
                className="me-auto"
                navbar
            >
                <NavItem>
                <NavLink href="/components/">
                    Components
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                    GitHub
                </NavLink>
                </NavItem>
                <UncontrolledDropdown
                inNavbar
                nav
                >
                <DropdownToggle
                    caret
                    nav
                >
                    Options
                </DropdownToggle>
                <DropdownMenu end>
                    <DropdownItem>
                    Option 1
                    </DropdownItem>
                    <DropdownItem>
                    Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                    Reset
                    </DropdownItem>
                </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
            
                <div>
                <Button outline onClick={handlelogin}>
                    Mon compte
                </Button>
                {' '}
                <Button
                    color="primary"
                >
                   <Link to="/createmodifannonce/0">Publiez une annonce</Link> 
                </Button>
                </div>

            </Collapse>
        </Navbar>
</div>
    )
}


export default Menu