import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const apiUrl = "http://localhost:8080";

export default function EditCity() {
  const navigate = useNavigate();
  const { cityId, countryId } = useParams();

  const [city, setCity] = useState({
    name: "",
    population: "",
    areaSquareKm: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/api/cities/${cityId}`);
        if (!response.ok) throw new Error("Failed to fetch city");
        const data = await response.json();
        setCity({
          name: data.name || "",
          population: data.population?.toString() || "",
          areaSquareKm: data.areaSquareKm?.toString() || ""
        });
      } catch (err) {
        setError("Failed to load city data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCity();
  }, [cityId]);

  const onInputChange = (e) => {
    setCity({ ...city, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!city.name || !city.population || !city.areaSquareKm) {
      setError("All fields are required");
      return;
    }
    if (isNaN(city.population) || city.population < 0 || isNaN(city.areaSquareKm) || city.areaSquareKm < 0) {
      setError("Population and Area must be valid non-negative numbers");
      return;
    }

    const url = `${apiUrl}/api/cities/${cityId}`;
    const payload = {
      name: city.name,
      population: parseInt(city.population),
      areaSquareKm: parseFloat(city.areaSquareKm)
    };

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }
      countryId ? navigate(`/get-country/${countryId}`) : navigate(`/city`);
    } catch (error) {
      console.error("Error updating city:", error);
      setError(error.message || "Failed to update city");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Edit City</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter city name"
                    name="name"
                    value={city.name}
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
                    placeholder="Enter city population"
                    name="population"
                    value={city.population}
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
                    placeholder="Enter city area square km"
                    name="areaSquareKm"
                    value={city.areaSquareKm}
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
                  to={countryId ? `/get-country/${countryId}` : `/city`}
              >
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
  );
}