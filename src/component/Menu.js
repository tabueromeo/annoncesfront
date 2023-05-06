import React from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import config from "../config/config";

import {
	CardImg,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	Collapse,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownItem,
	NavbarText,
	DropdownMenu,
	DropdownToggle,
	Button,
} from "reactstrap";

function Menu() {
	const [isOpen, setIsOpen] = React.useState(false);
	let navigate = useNavigate();

	const handlelogin = () => {
		axios
			.get(config.SERVER + "/user/logintoken", {
				headers: {
					Authorization: `bearer ${JSON.parse(
						localStorage.getItem("keylogtoken")
					)}`,
				},
			})
			.then((response) => {
				localStorage.setItem("userid", JSON.stringify(response.data._id));
				console.log(response.data);
				if (response.data.typeuser == "admin") {
					navigate("/adminmodifierannonces");
				} else {
					navigate("/modifierannonces");
				}
			})
			.catch((error) => {
				navigate("/login");
			});
	};

	const handleAddAnnonce = () => {
		axios
			.get(config.SERVER + "/user/logintoken", {
				headers: {
					Authorization: `bearer ${JSON.parse(
						localStorage.getItem("keylogtoken")
					)}`,
				},
			})
			.then((response) => {
				localStorage.setItem("userid", JSON.stringify(response.data._id));

				navigate("/createmodifannonce");
			})
			.catch((error) => {
				navigate("/login");
			});
	};

	return (
		<div>
			<Navbar color="light" expand="md" light>
				<NavbarBrand href="/">
					<CardImg alt="Accueil" src="/lovons.png" style={{ width: "170px" }} />
				</NavbarBrand>
				<NavbarToggler
					onClick={function noRefCheck() {
						setIsOpen(!isOpen);
					}}
				/>
				<Collapse navbar isOpen={isOpen}>
					<Nav className="me-auto" navbar>
						<NavItem>
							<NavLink href="/">{/*config.title.thot*/}</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/">{/*config.title.tesc*/}</NavLink>
						</NavItem>
						<UncontrolledDropdown inNavbar nav>
							<DropdownToggle nav></DropdownToggle>
							<DropdownMenu end>
								<DropdownItem>{/*config.title.tmas*/}</DropdownItem>
								<DropdownItem>{/*config.title.tsoir*/}</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>{/*config.title.tproduit*/}</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>

					<div>
						<Button outline onClick={handlelogin}>
							Mon compte
						</Button>{" "}
						<Button color="primary" onClick={handleAddAnnonce}>
							Publiez une annonce
						</Button>
					</div>
				</Collapse>
			</Navbar>
		</div>
	);
}

export default Menu;
