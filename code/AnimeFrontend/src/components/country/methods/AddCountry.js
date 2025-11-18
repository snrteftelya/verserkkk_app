import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:8080";

export default function AddCountry() {
    let navigate = useNavigate();
    const paperStyle = { padding: '20px 20px', width: 600, margin: "20px auto" };
    const [name, setName] = useState('');
    const [capital, setCapital] = useState('');
    const [population, setPopulation] = useState('');
    const [areaSquareKm, setAreaSquareKm] = useState('');
    const [gdp, setGdp] = useState('');

    const addCountry = async (e) => {
        e.preventDefault();
        const country = { name, capital, population, areaSquareKm, gdp };
        console.log(country);
        console.log(country.name);
        try {
            console.log(country);
            const response = await fetch(`${apiUrl}/api/country`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(country)
            })

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            navigate(`/country`);
        } catch (error) {
            console.error("There was a problem with your fetch operation:", error);
        }
    };

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}>Add Country</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Country name" variant="outlined" fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Country capital" variant="outlined" fullWidth
                        value={capital}
                        onChange={(e) => setCapital(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Country population" variant="outlined" fullWidth
                        value={population}
                        onChange={(e) => setPopulation(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Country areaSquareKm" variant="outlined" fullWidth
                        value={areaSquareKm}
                        onChange={(e) => setAreaSquareKm(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Country gdp" variant="outlined" fullWidth
                        value={gdp}
                        onChange={(e) => setGdp(e.target.value)}
                    />
                    <button type="submit" className="btn btn-outline-primary" onClick={(e) => addCountry(e)}>
                        Submit
                    </button>
                    <Link
                        className="btn btn-outline-danger mx-2" 
                        to="/country"
                        >
                        Cancel
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
}
