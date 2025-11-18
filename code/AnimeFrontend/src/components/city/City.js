import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const apiUrl = "http://localhost:8080";

export default function City() {

  const [cities, setCities] = useState([]);

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/cities`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('There was not any city in database:', error);
      setCities([]);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="d-flex justify-content-end mb-3">
        </div>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Num</th>
              <th scope="col">Name</th>
              <th scope="col">Population</th>
              <th scope="col">Area Square Km</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city, index) => (
              <tr key={city.id}>
                <th scope="row">{index + 1}</th>
                <td>{city.name}</td>
                <td>{city.population}</td>
                <td>{city.areaSquareKm}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edit-city/${city.id}`}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
