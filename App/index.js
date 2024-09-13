// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

export default function App() {
    const [heroes, setHeroes] = useState('');
    const [villains, setVillains] = useState('');
    const [plot, setPlot] = useState('');
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchFairyTale = async () => {
        setLoading(true);
        try {
            const messages = [
                { role: "system", content: "You are a creative assistant. Please generate an engaging fairy tale based on the given heroes, villains, and plot." },
                { role: "user", content: `Heroes: ${heroes}` },
                { role: "user", content: `Villains: ${villains}` },
                { role: "user", content: `Plot: ${plot}` }
            ];

            const response = await axios.post(API_URL, {
                messages,
                model: "gpt-4o"
            });

            setStory(response.data.response);
        } catch (error) {
            console.error('Error fetching story:', error);
            alert('An error occurred while fetching the story. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.title}>Fairy Tale Generator</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Heroes"
                    value={heroes}
                    onChangeText={setHeroes}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Villains"
                    value={villains}
                    onChangeText={setVillains}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Plot"
                    value={plot}
                    onChangeText={setPlot}
                />
                <Button title="Generate Fairy Tale" onPress={fetchFairyTale} />
                {loading ? <ActivityIndicator size="large" color="#0000ff" /> : <Text style={styles.story}>{story}</Text>}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30, // to avoid overlapping with the status bar
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    story: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'justify',
        paddingHorizontal: 10,
    },
});