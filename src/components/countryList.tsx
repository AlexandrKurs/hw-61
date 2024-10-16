import React, { useEffect, useState } from "react";
import "../style.css";
import CountryItem from "./countryItem";
import CountryDetails from "./countryDetails";
import { Country } from "../types";

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v2/all?fields=alpha3Code,name,flag,capital,population,borders",
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Country[] = await response.json();
        setCountries(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Произошла неизвестная ошибка");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryClick = async (country: Country) => {
    const bordersData = await Promise.all(
      country.borders.map(async (borderCode) => {
        const response = await fetch(
          `https://restcountries.com/v2/alpha/${borderCode}?fields=name`,
        );
        if (response.ok) {
          const borderCountry = await response.json();
          return borderCountry.name;
        }
        return null;
      }),
    );
    country.borders = bordersData.filter(Boolean) as string[];
    setSelectedCountry(country);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="col-6">
      <div className="row">
        <div className="col-5 mt-3">
          <h3 className="header">Список стран</h3>
          <ul>
            {countries.map((country) => (
              <CountryItem
                key={country.alpha3Code}
                country={country}
                onClick={handleCountryClick}
              />
            ))}
          </ul>
        </div>
        <div className="col-4 mt-4">
          <h3>Данные о стране</h3>
          <CountryDetails country={selectedCountry} />
        </div>
      </div>
    </div>
  );
};

export default CountryList;
