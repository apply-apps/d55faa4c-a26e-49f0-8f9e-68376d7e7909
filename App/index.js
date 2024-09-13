// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View } from 'react-native';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

export default function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSendNFC = async () => {
        await NfcManager.start();
        
        try {
            // Requesting NFC technology
            await NfcManager.requestTechnology(NfcTech.Ndef);      

            // Creating NDEF message
            const vCard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nEMAIL:${email}\nTEL:${phone}\nEND:VCARD`;
            const bytes = Ndef.encodeMessage([Ndef.textRecord(vCard)]);
            
            // Writing the NDEF message to NFC Tag
            if (bytes) {
                await NfcManager.writeNdefMessage(bytes);
                alert("Contact details written successfully!");
            }
        } catch (e) {
            console.warn(e);
            alert("An error occurred. Please try again.");
        } finally {
            // Clean up technology handling
            NfcManager.setNfcDisabledListener(null);
            NfcManager.setForegroundDispatchPendingIntent(null);
            NfcManager.setNfcEnabledActivityClassName(null);
            NfcManager.terminate();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Send Contact Details via NFC</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone}
                />
                <Button title="Send via NFC" onPress={handleSendNFC} />
            </View>
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
    form: {
        width: '90%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f8f8f8',
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
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default App;