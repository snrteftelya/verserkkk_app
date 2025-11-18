import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";

const apiUrl = "http://localhost:8080";

export default function EditCountry() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const nationId = location.state?.nationId || localStorage.getItem("nationId");
  console.log("location.state in EditCountry:", location.state);
  console.log("nationId in EditCountry:", nationId);
  const [country, setCountry] = useState({
    name: "",
    capital: "",
    population: "",
    areaSquareKm: "",
    gdp: ""
  });

  // Сохраняем nationId в localStorage при монтировании
  useEffect(() => {
    if (location.state?.nationId) {
      localStorage.setItem("nationId", location.state.nationId);
    }
  }, [location.state]);

  // Загрузка данных страны (как в исходном коде)
  useEffect(() => {
    const loadCountry = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/country/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCountry(data);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    loadCountry();
  }, [id]);

  const onInputChange = (e) => {
    setCountry({ ...country, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const url = `${apiUrl}/api/country/${id}?name=${country.name}&capital=${country.capital}&population=${country.population}&areaSquareKm=${country.areaSquareKm}&gdp=${country.gdp}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Country updated");
      // Очищаем localStorage после успешного редактирования
      localStorage.removeItem("nationId");
      nationId ? navigate(`/get-countries-from-nation/${nationId}`) : navigate('/country');
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  // Обработчик для Cancel
  const handleCancel = () => {
    // Очищаем localStorage при отмене
    localStorage.removeItem("nationId");
    nationId ? navigate(`/get-countries-from-nation/${nationId}`) : navigate('/country');
  };

  return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Edit Country</h2>
            <form onSubmit={(e) => onSubmit(e)}>
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
                    onChange={(e) => onInputChange(e)}
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
                    onChange={(e) => onInputChange(e)}
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
                    onChange={(e) => onInputChange(e)}
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
                    onChange={(e) => onInputChange(e)}
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
                    onChange={(e) => onInputChange(e)}
                />
              </div>
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <Link
                  className="btn btn-outline-danger mx-2"
                  to={nationId ? `/get-countries-from-nation/${nationId}` : "/country"}
                  onClick={handleCancel}
              >
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
  );
}