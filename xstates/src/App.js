import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
export default function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://crio-location-selector.onrender.com/countries"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (selectedCountry) {
        try {
          const response = await axios.get(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
          );
          setStates(response.data);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      }
    };
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedCountry && selectedState) {
        try {
          const response = await axios.get(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
          );
          setCities(response.data);
          setSelectedCity("");
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      }
    };
    fetchCities();
  }, [selectedCountry, selectedState]);

  const Dropdown = ({ options, value, onChange, placeholder }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="dropdown"
    >
      <option disabled value="">
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
  return (
    <div className="city-selector">
      <h1>Select Location</h1>
      <div className="dropdowns">
        <Dropdown
          options={countries}
          value={selectedCountry}
          onChange={setSelectedCountry}
          placeholder="Select Country"
        />
        <Dropdown
          options={states}
          value={selectedState}
          onChange={setSelectedState}
          placeholder="Select State"
        />
        <Dropdown
          options={cities}
          value={selectedCity}
          onChange={setSelectedCity}
          placeholder="Select City"
        />
      </div>
      {selectedCity && (
        <h2 className="result">
          You selected <span className="highlight">{selectedCity},</span>
          <span className="fade">
            {" "}
            {selectedState},{selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );
}
