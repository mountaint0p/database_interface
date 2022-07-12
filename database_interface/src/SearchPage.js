import React, { useEffect, useState } from "react";
import {
	Autocomplete,
	TextField,
	Button,
	CircularProgress,
	FormGroup,
	CheckBox,
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import { Formik, Form, Field, CheckboxWithLabel } from "formik";
import { useNavigate } from "react-router-dom";
export const SearchPage = () => {
	let [loading, setLoading] = useState(false);
	let [countries, setCountries] = useState([]);
	useEffect(() => {
		setLoading(true);
		fetch("http://localhost:8000/names")
			.then((res) => res.json())
			.then((data) => {
				setCountries(data.names);
				setLoading(false);
			});
	}, []);
	let navigate = useNavigate();
	const initialValues = {
		country: "",
		params: [],
	};
	const submit = (values) => {
		if (values.country === "") {
			alert("Error: must input a valid country");
			return;
		}
		console.log(values.params);
		navigate(`/search?country=${values.country}`);
	};
	const options = [
		{
			label: "Uno",
			value: "one",
		},
		{
			label: "Dos",
			value: "two",
		},
		{
			label: "Tres",
			value: "three",
		},
	];
	return (
		<>
			<h1>Instances Search</h1>
			{loading ? (
				<CircularProgress />
			) : (
				<Formik initialValues={initialValues} onSubmit={submit}>
					{({ setFieldValue }) => (
						<Form>
							<Autocomplete
								disablePortal
								id="country"
								name="country"
								options={countries}
								sx={{ width: 300 }}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Countries"
										onKeyPress={(e) => {
											e.which === 13 && e.preventDefault();
										}}
									/>
								)}
								onChange={(e, value) => {
									setFieldValue("country", value !== null ? value : "");
								}}
							/>
							<h2>Data Parameters</h2>
							<FormGroup>
								{options.map((opt) => (
									<FormControlLabel
										label={opt.value}
										control={
											<Field
												type="checkbox"
												name="params"
												key={opt.value}
												value={opt.value}
											/>
										}
									/>
								))}
							</FormGroup>
							<Button
								type="submit"
								variant="contained"
								style={{ marginTop: "20px" }}
							>
								Search
							</Button>
						</Form>
					)}
				</Formik>
			)}
		</>
	);
};
