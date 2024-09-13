// Filename: index.js
// Combined code from all files

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
    FlatList,
    Button,
    ActivityIndicator,
    TextInput
} from 'react-native';
import axios from 'axios';

const experiences = [
    { id: '1', title: 'Soccer Player at Local Club', duration: '2017-2021' },
    { id: '2', title: 'Marathon Runner', duration: '2015-Present' },
];

const Profile = () => {
    const renderExperience = ({ item }) => (
        <View style={profileStyles.experience}>
            <Text style={profileStyles.experienceTitle}>{item.title}</Text>
            <Text>{item.duration}</Text>
        </View>
    );

    return (
        <View style={profileStyles.container}>
            <Image
                style={profileStyles.avatar}
                source={{ uri: 'https://picsum.photos/100/100' }}
            />
            <Text style={profileStyles.name}>John Doe</Text>
            <Text style={profileStyles.bio}>
                Amateur Athlete | Marathon Runner | Soccer Player
            </Text>
            <FlatList
                data={experiences}
                renderItem={renderExperience}
                keyExtractor={(item) => item.id}
                contentContainerStyle={profileStyles.list}
            />
        </View>
    );
};

const profileStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
        margin: 10,
        borderRadius: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    bio: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    list: {
        width: '100%',
    },
    experience: {
        marginBottom: 10,
    },
    experienceTitle: {
        fontWeight: 'bold',
    },
});

const Fundraising = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const fetchMessage = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://apihub.p.appply.xyz:3300/motd');
            setMessage(response.data.message);
        } catch (error) {
            console.error(error);
            setMessage('Failed to load message');
        }
        setLoading(false);
    };

    return (
        <View style={fundraisingStyles.container}>
            <Text style={fundraisingStyles.title}>Fundraising</Text>
            <Button title="Donate Now" onPress={() => alert('Donation Successful!')} />
            <Button title="Get Message of the Day" onPress={fetchMessage} />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Text>{message}</Text>
            )}
        </View>
    );
};

const fundraisingStyles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f8f8f8',
        margin: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

const CreateEvent = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateEvent = () => {
        setLoading(true);
        setTimeout(() => {
            alert('Event Created Successfully!');
            setLoading(false);
        }, 2000);
    };

    return (
        <View style={createEventStyles.container}>
            <Text style={createEventStyles.title}>Create Sporting Event</Text>
            <ScrollView>
                <TextInput
                    style={createEventStyles.input}
                    placeholder="Event Name"
                    value={eventName}
                    onChangeText={setEventName}
                />
                <TextInput
                    style={createEventStyles.input}
                    placeholder="Event Date"
                    value={eventDate}
                    onChangeText={setEventDate}
                />
                <Button title="Create Event" onPress={handleCreateEvent} />
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
            </ScrollView>
        </View>
    );
};

const createEventStyles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f8f8f8',
        margin: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default function App() {
    return (
        <SafeAreaView style={appStyles.container}>
            <ScrollView>
                <Text style={appStyles.title}>Crowdfunding for Amateur Sports</Text>
                <Profile />
                <Fundraising />
                <CreateEvent />
            </ScrollView>
        </SafeAreaView>
    );
}

const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30, // to avoid overlapping with the status bar
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
    },
});