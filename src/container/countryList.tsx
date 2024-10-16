import React, { useEffect, useState } from 'react';
import './countryList.css';

interface Country {
  alpha3Code: string;
  name: string;
}

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v2/all?fields=alpha3Code,name');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Country[] = await response.json();
        setCountries(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Произошла неизвестная ошибка');
        }
    } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h3 className="header">Список стран</h3>
          <ul>
            {countries.map(country => (
              <li key={country.alpha3Code}>
                {country.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  );
};

export default CountryList;