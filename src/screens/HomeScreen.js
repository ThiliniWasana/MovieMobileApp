import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Card from '../components/Card'; // Import Card component
import { useClickCount } from '../context/ClickCountContext';
import FloatingActionButton from '../components/FloatingActionButton'; // Import FloatingActionButton component
import { useNavigation } from '@react-navigation/native'; // For navigation

export default function HomeScreen({ route }) {
  const { username } = route.params;
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { count, incrementCount } = useClickCount();
  const navigation = useNavigation(); // Hook for navigation

  const apiKey = '08b775574e386280f52a3948217c10ee';

  // Function to fetch movies with pagination
  const fetchMovies = async (page = 1, query = '') => {
    setLoading(true);
    const url = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}&language=en-US`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${page}`;
      
    try {
      const response = await axios.get(url);
      setItems((prevItems) => (page === 1 ? response.data.results : [...prevItems, ...response.data.results]));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchMovies(1, searchQuery);
  };

  const handleLoadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.username}>Welcome, {username}!</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Movies"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {/* Movie List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title} // TMDb uses `title` for movies
            description={item.overview} // TMDb uses `overview` for descriptions
            imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`} // TMDb image URL format
            onPress={() => {
              incrementCount();
              navigation.navigate('MovieDetails', { movieId: item.id }); // Navigate to movie details
            }}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5} // Trigger load more when user scrolls to 50% of the content
        ListFooterComponent={loading && <ActivityIndicator size="small" color="#0000ff" />}
      />

      {/* Floating Action Button to display click count */}
      <FloatingActionButton count={count} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  username: { fontSize: 20, marginBottom: 10 },
  searchContainer: { flexDirection: 'row', marginBottom: 20 },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    flex: 1,
  },
});
