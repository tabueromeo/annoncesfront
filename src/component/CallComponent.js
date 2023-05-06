import {
	Card,
	CardTitle,
	CardText,
	Button,
	Col,
	CardSubtitle,
	FormGroup,
} from "reactstrap";
import React from "react";
import axios from "axios";
import config from "../config/config";
import { IoMdCall } from "react-icons/io";
import { FaRegEye, FaSms, FaWhatsappSquare } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import { BiTimeFive } from "react-icons/bi";
import moment from "moment";
import frLocale from "moment/locale/fr";

import Modal from "react-modal";

function CallComponent(props) {
	const { title, date, description, telephone, nbervue, nbervuetel, ville } =
		props.annonce;

	console.log(telephone);

	moment.locale("fr", [frLocale]);
	const [modalIsOpen, setIsOpen] = React.useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		//  subtitle.style.color = '#f00';
		let annoncetmp = props.annonceSend;
		annoncetmp["nbervuetel"] = "" + (parseInt(annoncetmp.nbervuetel) + 1);

		axios
			.post(config.SERVER + `/annonces/update`, annoncetmp)
			.then((res) => {})
			.catch((erreur) => {
				console.log(erreur);
			});
	}

	function closeModal() {
		setIsOpen(false);
	}

	Modal.setAppElement("#root");

	return (
		<Col sm="6">
			<Card body>
				<CardTitle tag="h5" style={{ color: "#ee3f89" }}>
					{title}
				</CardTitle>
				<CardSubtitle className="mb-2 text-muted" tag="h6">
					<BiTimeFive /> {"Publiée " + moment(props.annonceSend.date).fromNow()}
				</CardSubtitle>

				<CardTitle tag="h6">
					<GiPositionMarker />
					{ville}
				</CardTitle>
				<CardText>{description}</CardText>

				<div>
					<FaRegEye /> {nbervue + " vue de l'annonce"}
					<FaRegEye style={{ marginLeft: "10%" }} />{" "}
					{nbervuetel + " vue du téléphone"}
				</div>
				<Button
					onClick={openModal}
					style={{ backgroundColor: "#ee3f89", border: "none" }}
				>
					<IoMdCall /> Afficher le numéro
				</Button>
			</Card>

			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
			>
				<div>
					<FormGroup>
						{telephone ? (
							<fieldset
								style={{
									border: "solid 1px #ced4da",
									padding: "6px",
									borderRadius: "5px",
								}}
							>
								<FaWhatsappSquare
									onClick={() =>
										window.open(config.whatsappapi + telephone.split("|")[0])
									}
									style={{ width: "30px" }}
									visibility={telephone.includes("w") ? "visible" : "hidden"}
								/>
								<FaSms
									visibility={telephone.includes("s") ? "visible" : "hidden"}
								/>
								<IoMdCall
									visibility={telephone.includes("c") ? "visible" : "hidden"}
								/>
								<img
									src="/whatsapp_logo_svg.png"
									onClick={() =>
										window.open(config.whatsappapi + telephone.split("|")[0])
									}
									style={{ width: "30px" }}
									visibility={telephone.includes("w") ? "visible" : "hidden"}
								/>{" "}
								{telephone ? telephone.split("|")[0] : ""}
							</fieldset>
						) : (
							""
						)}
					</FormGroup>
				</div>
			</Modal>
		</Col>
	);
}

const customStyles = {
	content: {
		top: "20%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

const whatsappStyles = {
	content: {
		display: "flex",
		flexDirection: "row",
	},
};

export default CallComponent;
