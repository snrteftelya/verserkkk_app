import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";

const apiUrl = "http://localhost:8080";

export default function GetCountry() {
  const [country, setCountry] = useState({
    name: "",
    capital: "",
    population: "",
    areaSquareKm: "",
    gdp: "",
    cities: [],
    nations: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { countryId } = useParams();

  const loadCountry = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Параллельные запросы с Promise.allSettled
      const [countryResult, citiesResult, nationsResult] = await Promise.allSettled([
        fetch(`${apiUrl}/api/country/${countryId}`),
        fetch(`${apiUrl}/api/countries/${countryId}/cities`),
        fetch(`${apiUrl}/api/countries/${countryId}/nations`)
      ]);

      // Обработка данных страны
      let countryData = {};
      if (countryResult.status === "fulfilled") {
        const response = countryResult.value;
        if (response.status === 200) {
          countryData = await response.json();
          console.log("Country response:", countryData);
        } else {
          const errorMsg = `Status ${response.status}: ${response.statusText}`;
          console.error(`Country request failed: ${errorMsg}`);
          throw new Error(`Failed to load country: ${errorMsg}`);
        }
      } else {
        console.error("Country request failed:", countryResult.reason);
        throw new Error(`Failed to load country: ${countryResult.reason}`);
      }

      // Обработка городов
      let citiesData = [];
      if (citiesResult.status === "fulfilled") {
        const response = citiesResult.value;
        if (response.status === 200) {
          citiesData = await response.json();
          console.log("Cities response:", citiesData);
        } else if (response.status === 204) {
          console.log("Cities response: No content (204)");
        } else {
          console.warn(`Cities request returned status: ${response.status} ${response.statusText}`);
        }
      } else {
        console.error("Cities request failed:", citiesResult.reason);
      }

      // Обработка наций
      let nationsData = [];
      if (nationsResult.status === "fulfilled") {
        const response = nationsResult.value;
        if (response.status === 200) {
          nationsData = await response.json();
          console.log("Nations response:", nationsData);
        } else if (response.status === 204) {
          console.log("Nations response: No content (204)");
          nationsData = [];
        } else {
          console.warn(`Nations request returned status: ${response.status} ${response.statusText}`);
          nationsData = [];
        }
      } else {
        console.error("Nations request failed:", nationsResult.reason);
        nationsData = [];
      }

      setCountry({
        ...countryData,
        cities: Array.isArray(citiesData) ? citiesData.map(city => ({
          id: city.id,
          name: city.name,
          population: city.population,
          areaSquareKm: city.areaSquareKm
        })) : [],
        nations: Array.isArray(nationsData) ? nationsData : []
      });
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setError(`Failed to load country details: ${error.message}`);
      setLoading(false);
    }
  }, [countryId]);

  useEffect(() => {
    loadCountry();
  }, [loadCountry]);

  const deleteCity = async (cityId) => {
    try {
      const response = await fetch(`${apiUrl}/api/countries/${countryId}/cities/${cityId}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error(`Failed to delete city: ${response.status}`);
      loadCountry();
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  const deleteAllCities = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/countries/${countryId}/cities`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error(`Failed to delete all cities: ${response.status}`);
      loadCountry();
    } catch (error) {
      console.error("Error deleting all cities:", error);
    }
  };

  const deleteNation = async (nationId) => {
    try {
      const response = await fetch(`${apiUrl}/api/countries/${countryId}/nations/${nationId}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error(`Failed to delete nation: ${response.status}`);
      loadCountry();
    } catch (error) {
      console.error("Error deleting nation:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Country Details</h2>
            <div className="card">
              <div className="card-header">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><b>Name: </b>{country.name}</li>
                  <li className="list-group-item"><b>Capital: </b>{country.capital}</li>
                  <li className="list-group-item"><b>Population: </b>{country.population}</li>
                  <li className="list-group-item"><b>AreaSquareKm: </b>{country.areaSquareKm}</li>
                  <li className="list-group-item"><b>GDP: </b>{country.gdp}</li>
                </ul>
              </div>
            </div>
            <li className="list-group-item"><b>Cities: </b></li>
            <div className="text-end">
              <button
                  className="btn btn-danger mx-2"
                  onClick={deleteAllCities}
              >
                Delete All Cities
              </button>
              <Link className="btn btn-primary my-2" to={`/add-city/${countryId}`}>
                Add City
              </Link>
            </div>
            <table className="table border shadow">
              <thead>
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">Name</th>
                <th scope="col">Population</th>
                <th scope="col">Area Square Km</th>
                <th scope="col">Actions</th>
              </tr>
              </thead>
              <tbody>
              {country.cities.length > 0 ? (
                  country.cities.map((city, index) => (
                      <tr key={city.id || index}>
                        <td>{index + 1}</td>
                        <td>{city.name}</td>
                        <td>{city.population}</td>
                        <td>{city.areaSquareKm}</td>
                        <td>
                          {city.id ? (
                              <>
                                <Link
                                    className="btn btn-outline-primary mx-2"
                                    to={{
                                      pathname: `/edit-city/${city.id}/${countryId}`,
                                      state: { city }
                                    }}
                                >
                                  Edit
                                </Link>
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={() => deleteCity(city.id)}
                                >
                                  Delete
                                </button>
                              </>
                          ) : (
                              <span>ID missing</span>
                          )}
                        </td>
                      </tr>
                  ))
              ) : (
                  <tr>
                    <td colSpan="5">No cities available</td>
                  </tr>
              )}
              </tbody>
            </table>
            <li className="list-group-item"><b>Nations: </b></li>
            <div className="text-end">
              <Link className="btn btn-primary my-2" to={`/add-nation/${countryId}`}>
                Add Nation
              </Link>
            </div>
            <table className="table border shadow">
              <thead>
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">Name</th>
                <th scope="col">Language</th>
                <th scope="col">Religion</th>
                <th scope="col">Actions</th>
              </tr>
              </thead>
              <tbody>
              {country.nations && country.nations.length > 0 ? (
                  country.nations.map((nation, index) => (
                      <tr key={nation.id || index}>
                        <td>{index + 1}</td>
                        <td>{nation.name}</td>
                        <td>{nation.language}</td>
                        <td>{nation.religion}</td>
                        <td>
                          {nation.id ? (
                              <>
                                <Link
                                    className="btn btn-outline-primary mx-2"
                                    to={{
                                      pathname: `/edit-nation/${nation.id}/${countryId}`,
                                      state: { nation }
                                    }}
                                >
                                  Edit
                                </Link>
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={() => deleteNation(nation.id)}
                                >
                                  Delete
                                </button>
                              </>
                          ) : (
                              <span>ID missing</span>
                          )}
                        </td>
                      </tr>
                  ))
              ) : (
                  <tr>
                    <td colSpan="5">No nations available</td>
                  </tr>
              )}
              </tbody>
            </table>
            <Link className="btn btn-primary my-2" to="/country">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
  );
}