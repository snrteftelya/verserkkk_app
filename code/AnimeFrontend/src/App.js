import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Appbar from './components/Appbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditCountry from "./components/country/methods/EditCountry";
import AddCountry from "./components/country/methods/AddCountry";
import AddCountryToNation from "./components/country/methods/AddCountryToNation";
import GetCountry from "./components/country/methods/GetCountry";
import Country from './components/country/Country';
import AddCity from "./components/city/methods/AddCity";
import EditCity from "./components/city/methods/EditCity";
import EditNation from "./components/nation/methods/EditNation";
import AddNation from "./components/nation/methods/AddNation";
import Nation from './components/nation/Nation';
import GetNation from "./components/nation/methods/GetNation";
import City from './components/city/City';
import Info from './components/Info';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/edit-country/:id" element={<EditCountry />} />
                    <Route exact path="/add-country" element={<AddCountry />} />
                    <Route exact path="/add-country-to-nation/:nationId" element={<AddCountryToNation />} />
                    <Route exact path="/get-country/:countryId" element={<GetCountry />} />
                    <Route exact path="/add-city/:id" element={<AddCity />} />
                    <Route exact path="/edit-city/:cityId/:countryId" element={<EditCity />} />
                    <Route exact path="/edit-city/:cityId" element={<EditCity />} />
                    <Route exact path="/edit-nation/:nationId/:countryId" element={<EditNation />} />
                    <Route exact path="/edit-nation/:nationId" element={<EditNation />} />
                    <Route exact path="/add-nation/:id" element={<AddNation />} />
                    <Route path="/get-countries-from-nation/:nationId" element={<GetNation />} />
                    <Route
                        exact path="/"
                        element={
                            <div>
                                <Appbar />
                                <Info />
                            </div>
                        }
                    />
                    <Route
                        exact path="/country"
                        element={
                            <div>
                                <Appbar />
                                <Country />
                            </div>
                        }
                    />
                    <Route
                        exact path="/nation"
                        element={
                            <div>
                                <Appbar />
                                <Nation />
                            </div>
                        }
                    />
                    <Route
                        exact path="/city"
                        element={
                            <div>
                                <Appbar />
                                <City />
                            </div>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;