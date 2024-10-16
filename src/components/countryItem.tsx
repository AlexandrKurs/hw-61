import React from "react";
import { Country } from "../types";

interface CountryItemProps {
  country: Country;
  onClick: (country: Country) => void;
}

const CountryItem: React.FC<CountryItemProps> = ({ country, onClick }) => {
  return <li onClick={() => onClick(country)}>{country.name}</li>;
};

export default CountryItem;
