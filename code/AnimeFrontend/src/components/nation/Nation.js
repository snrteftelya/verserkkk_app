import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const apiUrl = "http://localhost:8080";

export default function Nation() {

  const [nations, setNations] = useState([]);

  useEffect(() => {
    loadNations();
  }, []);

  const loadNations = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/nations`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNations(data);
    } catch (error) {
      console.error('There was not any nation in database:', error);
      setNations([]);
    }
  };

  const deleteNation = async (id) => {
    try {
      await fetch(`${apiUrl}/api/nations/${id}`, {
        method: 'DELETE'
      });
      loadNations();
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
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
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Language</th>
              <th scope="col">Religion</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {nations.map((nation, index) => (
              <tr key={nation.id}>
                <th scope="row">{index + 1}</th>
                <td>{nation.name}</td>
                <td>{nation.language}</td>
                <td>{nation.religion}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/get-countries-from-nation/${nation.id}`}
                  >
                    View Countries
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edit-nation/${nation.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteNation(nation.id)}
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
