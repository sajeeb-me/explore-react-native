import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Country from './Country';

export default function Countries() {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then(data => setCountries(data));
    }, [])

    const handleSearch = text => {
        const filtered = countries.filter(country => country.name.common.includes(text));
        setCountries(filtered);
    }
    return (
        <View>
            <Text style={styles.header}>Countries:{countries.length}</Text>
            <TextInput
                style={styles.input}
                onChangeText={handleSearch}
                placeholder="Search country"
            />
            <ScrollView>
                {
                    countries.map(country => <Country key={country.name.common} country={country} />)
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 50,
        fontSize: 40,
        color: "red",
        fontWeight: "600"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})