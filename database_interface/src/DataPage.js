import { useParams, useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

export const DataPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(false);
	const [info, setInfo] = useState({});

	const country = searchParams.get("country");
	useEffect(() => {
		setLoading(true);
		fetch(`http://localhost:8000/info?country=${country}`)
			.then((res) => res.json())
			.then((data) => {
				setInfo(data);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
			});
	}, []);
	return (
		<>
			<h1>Instance: {country}</h1>
			{loading ? (
				<CircularProgress />
			) : (
				<div>
					<h3>Capital: {info.capital}</h3>
					<h3>Region: {info.subregion}</h3>
				</div>
			)}
		</>
	);
};
