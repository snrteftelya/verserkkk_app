import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import { Link, useNavigate, useParams } from "react-router-dom";

const apiUrl = "http://localhost:8080";

export default function AddNation() {
    const navigate = useNavigate();
    const { id } = useParams();
    const paperStyle = { padding: '20px 20px', width: 600, margin: "20px auto" };
    const [name, setName] = useState('');
    const [language, setLanguage] = useState('');
    const [religion, setReligion] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!name || !language || !religion) {
            setError("All fields are required");
            return;
        }

        const nation = { name, language, religion };

        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${apiUrl}/api/countries/${id}/nations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nation)
            });

            if (!response.ok) throw new Error("Network response was not ok");
            navigate(`/get-country/${id}`);
        } catch (error) {
            console.error("Error adding nation:", error);
            setError("Failed to add nation");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}>Add Nation</h1>
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
                        label="Nation name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Nation language"
                        variant="outlined"
                        fullWidth
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        disabled={loading}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Nation religion"
                        variant="outlined"
                        fullWidth
                        value={religion}
                        onChange={(e) => setReligion(e.target.value)}
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