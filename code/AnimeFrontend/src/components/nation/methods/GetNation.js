import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const apiUrl = "http://localhost:8080";

export default function GetNation() {
  const { nationId } = useParams();
  const [nation, setNation] = useState({});
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("GetNation - Current URL:", window.location.pathname);
    console.log("GetNation - Extracted nationId:", nationId);

    const loadNation = async () => {
      try {
        console.log(`Fetching nation data from ${apiUrl}/api/nations/${nationId}`);
        const response = await fetch(`${apiUrl}/api/nations`, {
          headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch nation: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const text = await response.text();
        console.log("Nation response text:", text);
        const data = text ? JSON.parse(text) : {};
        console.log("Nation parsed data:", data);
        const nationData = Array.isArray(data) ? data[0] : data;
        setNation(nationData);
      } catch (error) {
        console.error("Error loading nation:", error);
        setError(`Failed to load nation data: ${error.message}`);
      }
    };

    const loadCountries = async () => {
      try {
        console.log(`Fetching countries from ${apiUrl}/api/country/nation/${nationId}`);
        const response = await fetch(`${apiUrl}/api/nations/${nationId}/countries`, {
          headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch countries: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const text = await response.text();
        console.log("Countries response text:", text);
        const data = text ? JSON.parse(text) : [];
        console.log("Countries parsed data:", data);
        setCountries(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading countries:", error);
        setError(`Failed to load countries data: ${error.message}`);
      }
    };

    const loadData = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([loadNation(), loadCountries()]);
      setLoading(false);
    };

    loadData();
  }, [nationId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
      <div className="container">
        <div className="py-4">
          <h2>Nation Details</h2>
          <p><strong>Name:</strong> {nation.name || "N/A"}</p>
          <p><strong>Language:</strong> {nation.language || "N/A"}</p>
          <p><strong>Religion:</strong> {nation.religion || "N/A"}</p>
          <Link
              className="btn btn-primary mb-3"
              to={`/add-country-to-nation/${nationId}`}
          >
            Add Country
          </Link>
          <h3>Countries:</h3>
          <table className="table border shadow">
            <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Capital</th>
              <th scope="col">Population</th>
              <th scope="col">Area Square Km</th>
              <th scope="col">GDP</th>
              <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {countries.length === 0 ? (
                <tr>
                  <td colSpan="7">No countries available</td>
                </tr>
            ) : (
                countries.map((country, index) => (
                    <tr key={country.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{country.name}</td>
                      <td>{country.capital}</td>
                      <td>{country.population}</td>
                      <td>{country.areaSquareKm}</td>
                      <td>{country.gdp}</td>
                      <td>
                        <Link
                            className="btn btn-outline-primary mx-2"
                            to={{
                              pathname: `/edit-country/${country.id}`,
                              state: { nationId, country }
                            }}
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                ))
            )}
            </tbody>
          </table>
        </div>
      </div>
  );
}