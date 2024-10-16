import React from "react";
import { Country } from "../types";

interface CountryDetailsProps {
  country: Country | null;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ country }) => {
  if (!country) {
    return <p className="data">Пожалуйста, выберите страну.</p>;
  }

  return (
    <div className="dataList">
      <p>
        Вы выбрали: <span className="data">{country.name}</span>
      </p>
      <img className="image" src={country.flag} alt={`Флаг ${country.name}`} />
      <p>
        Столица: <span className="data">{country.capital}</span>
      </p>
      <p>
        Население: <span className="data">{country.population}</span> человек
      </p>
      <p>
        Граничит со странами:{" "}
        <span className="data">
          {country.borders.length > 0
            ? country.borders.join(", ")
            : "Нет граничащих стран"}
        </span>
      </p>
    </div>
  );
};

export default CountryDetails;
