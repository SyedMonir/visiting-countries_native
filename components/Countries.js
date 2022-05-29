import { Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Country from './Country';

export default function Countries() {
  const [countries, setCountries] = React.useState([]);
  const [search, setSearch] = React.useState('');
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setSearch(data);
        setCountries(data);
      });
  }, []);

  //   console.log(countries);

  const handleSearch = (test) => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(test.toLowerCase())
    );
    setSearch(filtered);
  };
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Search for a country"
        onChangeText={handleSearch}
      />
      <ScrollView>
        <Text style={styles.header}>Countries : {search.length}</Text>
        {search?.map((country) => (
          <Country key={country.name.common} country={country}></Country>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
  },
  input: {
    height: 40,
    margin: 12,
    width: '90%',
    borderWidth: 1,
    padding: 10,
  },
});
