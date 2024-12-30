import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function MovieDetailsScreen({ route, navigation }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]); // State for the movie cast
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const apiKey = '08b775574e386280f52a3948217c10ee';

  useEffect(() => {
    // Fetch movie details
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        setError(true);
        console.error(error);
      });

    // Fetch movie cast
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`)
      .then((response) => {
        setCast(response.data.cast); // Set cast data
      })
      .catch((error) => {
        setError(true);
        console.error(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after both API calls complete
      });
  }, [movieId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Something went wrong. Please try again later.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <Image
        style={styles.poster}
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Release Date: {movie.release_date}</Text>
        <Text style={styles.detailText}>Rating: {movie.vote_average}/10</Text>
        <Text style={styles.detailText}>Genres:</Text>
        <View style={styles.genresContainer}>
          {movie.genres.map((genre) => (
            <Text key={genre.id} style={styles.genreText}>
              {genre.name}
            </Text>
          ))}
        </View>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
      <View style={styles.castContainer}>
        <Text style={styles.castTitle}>Cast</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {cast.length === 0 ? (
            <Text style={styles.noCastText}>No cast information available.</Text>
          ) : (
            cast.map((actor) => (
              <View key={actor.id} style={styles.actorCard}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
                  }}
                  style={styles.actorImage}
                />
                <Text style={styles.actorName}>{actor.name}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  poster: { width: '100%', height: 400, marginBottom: 20 },
  detailsContainer: { marginBottom: 20 },
  detailText: { fontSize: 16, marginBottom: 10 },
  genresContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  genreText: { fontSize: 14, color: 'gray', marginRight: 10 },
  overview: { fontSize: 16 ,paddingTop:10},
  loadingIndicator: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 18, color: 'red', marginBottom: 10 },
  goBackButton: { padding: 10, backgroundColor: '#ff6347', borderRadius: 5 },
  goBackText: { color: 'white', fontSize: 16 },
  castContainer: { marginTop: 20 },
  castTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 ,color: 'brown'},
  actorCard: { marginRight: 15, alignItems: 'center' },
  actorImage: { width: 100, height: 150, borderRadius: 10 },
  actorName: { marginTop: 5, fontSize: 14, textAlign: 'center',marginBottom:27 },
  noCastText: { fontSize: 16, color: 'gray' },
});
