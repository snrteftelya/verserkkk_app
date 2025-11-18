import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const apiUrl = "http://localhost:8080";

export default function Country() {

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/country`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('There was not any country in database:', error);
      setCountries([]);
    }
  };

  const deleteCountry = async (id) => {
    try {
      await fetch(`${apiUrl}/api/country/${id}`, {
        method: 'DELETE'
      });
      loadCountries();
    } catch (error) {
      console.error('There was a problem with fetch operation:', error);
    }
  };

  const deleteAllCountries = async () => {
    try {
      await fetch(`${apiUrl}/api/country`, {
        method: 'DELETE'
      });
      loadCountries();
    } catch (error) {
      console.error('There was a problem with fetch operation:', error);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="d-flex justify-content-end mb-3">
          <button
          className="btn btn-danger mx-2"
          onClick={() => deleteAllCountries()}
        >
          Delete All Countries
        </button>
        <Link
          className="btn btn-primary"
          to="/add-country"
        >
          Add Country
        </Link>
        </div>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Capital</th>
              <th scope="col">Population</th>
              <th scope="col">AreaSquareKm</th>
              <th scope="col">GDP</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => (
              <tr key={country.id}>
                <th scope="row">{index + 1}</th>
                <td>{country.name}</td>
                <td>{country.capital}</td>
                <td>{country.population}</td>
                <td>{country.areaSquareKm}</td>
                <td>{country.gdp}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/get-country/${country.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edit-country/${country.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteCountry(country.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
