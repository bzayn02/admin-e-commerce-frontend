import React, { useState } from "react";
import { Form, Card, InputGroup, Button } from "react-bootstrap";

const initialState = {
	fname: "",
	lname: "",
	email: "",
	password: "",
	Phone: "",
	dob: "",
	address: "",
	gender: "",
};
const Register = () => {
	const [user, setUser] = useState(initialState);

	const handleOnChange = e => {
		//set input value in the state
	};

	const handleOnSubmit = e => {
		// send the form data to the server
	};

	return (
		<div className="register-page mb-5">
			<Card className="p-3 reg-form">
				<h2>Register new admin user</h2>
				<hr />
				<Form className="mt-3">
					<Form.Group className="mb-3">
						<Form.Label>First Name</Form.Label>
						<Form.Control name="fname" placeholder="Sam" required />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Last Name</Form.Label>
						<Form.Control name="lname" placeholder="Smith" required />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							name="email"
							type="email"
							placeholder="youremail@email.com"
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control
							name="password"
							type="password"
							placeholder="secret"
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>DOB</Form.Label>
						<Form.Control name="dob" type="date" />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Phone</Form.Label>
						<Form.Control name="phone" placeholder="041xxxxxxx" />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Address</Form.Label>
						<Form.Control
							name="address"
							placeholder="i.e. 3 george st Sydney, nsw, 2000"
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Gender</Form.Label>
						<Form.Control name="fname" placeholder="sam smith" />
					</Form.Group>
					<Form.Group className="mb-3">
						<InputGroup>
							<InputGroup.Radio name="gander" aria-label="Male" />
							Male
							<InputGroup.Radio
								name="gander"
								aria-label="Female"
								className="ml-3"
							/>
							Female
						</InputGroup>
					</Form.Group>

					<Button variant="success">Register</Button>
				</Form>
			</Card>
		</div>
	);
};

export default Register;
