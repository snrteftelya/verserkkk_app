import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const apiUrl = "http://localhost:8080";

export default function AddCountryToNation() {
    const navigate = useNavigate();
    const { nationId } = useParams();

    const [country, setCountry] = useState({
        name: "",
        capital: "",
        population: "",
        areaSquareKm: "",
        gdp: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onInputChange = (e) => {
        setCountry({ ...country, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!country.name || !country.capital || !country.population || !country.areaSquareKm || !country.gdp) {
            setError("All fields are required");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${apiUrl}/api/country`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...country,
                    nation: { id: parseInt(nationId) }
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to add country: ${response.status} ${response.statusText} - ${errorText}`);
            }

            console.log("Country added successfully");
            navigate(`/get-countries-from-nation/${nationId}`);
        } catch (error) {
            console.error("Error adding country:", error);
            setError(`Failed to add country: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add Country to Nation</h2>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter country name"
                                name="name"
                                value={country.name}
                                onChange={onInputChange}
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="capital" className="form-label">
                                Capital
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter country capital"
                                name="capital"
                                value={country.capital}
                                onChange={onInputChange}
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="population" className="form-label">
                                Population
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter country population"
                                name="population"
                                value={country.population}
                                onChange={onInputChange}
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="areaSquareKm" className="form-label">
                                Area Square Km
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter country area square km"
                                name="areaSquareKm"
                                value={country.areaSquareKm}
                                onChange={onInputChange}
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gdp" className="form-label">
                                GDP
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter country GDP"
                                name="gdp"
                                value={country.gdp}
                                onChange={onInputChange}
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-outline-primary"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                        <Link
                            className="btn btn-outline-danger mx-2"
                            to={`/get-countries-from-nation/${nationId}`}
                        >
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}