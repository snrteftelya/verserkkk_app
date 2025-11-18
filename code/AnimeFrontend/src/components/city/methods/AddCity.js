import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import { Link, useNavigate, useParams } from "react-router-dom";

const apiUrl = "http://localhost:8080";

export default function AddCity() {
    const navigate = useNavigate();
    const { id } = useParams();
    const paperStyle = { padding: '20px 20px', width: 600, margin: "20px auto" };
    const [name, setName] = useState('');
    const [population, setPopulation] = useState('');
    const [areaSquareKm, setAreaSquareKm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!name || !population || !areaSquareKm) {
            setError("All fields are required");
            return;
        }
        if (isNaN(population) || population < 0 || isNaN(areaSquareKm) || areaSquareKm < 0) {
            setError("Population and Area must be valid non-negative numbers");
            return;
        }

        const city = { name, population: parseFloat(population), areaSquareKm: parseFloat(areaSquareKm) };

        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${apiUrl}/api/countries/${id}/cities`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([city])
            });

            if (!response.ok) throw new Error("Network response was not ok");
            navigate(`/get-country/${id}`);
        } catch (error) {
            console.error("Error adding city:", error);
            setError("Failed to add city");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}>Add City</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Box
                    component="form"
                    onSubmit={onSubmit}
                    sx={{ '& > :not(style)': { m: 1 } }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="City name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                    />
                    <TextField
                        id="outlined-basic"
                        label="City population"
                        variant="outlined"
                        fullWidth
                        value={population}
                        onChange={(e) => setPopulation(e.target.value)}
                        disabled={loading}
                    />
                    <TextField
                        id="outlined-basic"
                        label="City areaSquareKm"
                        variant="outlined"
                        fullWidth
                        value={areaSquareKm}
                        onChange={(e) => setAreaSquareKm(e.target.value)}
                        disabled={loading}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                    <Link
                        className="btn btn-outline-danger mx-2"
                        to={`/get-country/${id}`}
                    >
                        Cancel
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
}