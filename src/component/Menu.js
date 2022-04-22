import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';

import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownItem, NavbarText, DropdownMenu, DropdownToggle, Button} from 'reactstrap';

function Menu(){
    const [isOpen, setIsOpen]= React.useState(false)
    let navigate = useNavigate();

  const  handlelogin=()=>{
       
       axios.get(config.SERVER+"/user/logintoken", {
        headers: {
            'Authorization' :`bearer ${JSON.parse(localStorage.getItem('keylogtoken'))}`,
        }
    })
    .then(response => {
        localStorage.setItem('userid', JSON.stringify(response.data._id));
     
       navigate("/modifierannonces");
    })
    .catch((error) => {
       navigate("/login");
    });

  
    }

    const  handleAddAnnonce=()=>{
       
        axios.get(config.SERVER+"/user/logintoken", {
         headers: {
             'Authorization' :`bearer ${JSON.parse(localStorage.getItem('keylogtoken'))}`,
         }
     })
     .then(response => {
         localStorage.setItem('userid', JSON.stringify(response.data._id));
      
        navigate("/createmodifannonce");
     })
     .catch((error) => {
        navigate("/login");
     });
 
   
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
                    onClick={handleAddAnnonce}
                >
                   Publiez une annonce
                </Button>
                </div>

            </Collapse>
        </Navbar>
</div>
    )
}


export default Menu