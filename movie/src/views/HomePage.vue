<template>
<div>
  <div>
    <h1>Movie List</h1>
    <div class="row">
      <div v-for="movie in movies" :key="movie.id" class="card" align="center">
        <img :src="movie.thumbnail" :alt="movie.title">
        <h2>{{ movie.title }}</h2>
         <button class="details-button" @click="toggleDetails(movie)">
    {{ movie.showDetails ? 'Hide Details' : 'Show Details' }}
  </button>
   <button class="details-button" @click="addToWishlist(movie)">Add to Wishlist</button>
        <div v-if="movie.showDetails">
          <p>Rank: {{ movie.rank }}</p>
          <p>Description: {{ movie.description }}</p>
          <p>Genre: {{ movie.genre.join(', ') }}</p>
          <p>Rating: {{ movie.rating }}</p>
          <p>Year: {{ movie.year }}</p>
          <a :href="movie.imdb_link">IMDB Link</a>
        </div>
      </div>
    </div>
  </div>
<div>
    <favouriteList :wishlist="wishlist" />
  </div>

  </div>

</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import favouriteList from "../components/FavouriteList.vue";


export default {
  components: {
    favouriteList
  },
  setup() {
    const movies = ref([]);
    const wishlist = ref([]);

    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        url: 'https://imdb-top-100-movies.p.rapidapi.com/',
        headers: {
          'X-RapidAPI-Key': '5cebf396c4msh78c78f45ceea2a7p104b04jsnb3224746c43e',
          'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        if (Array.isArray(response.data)) {
         movies.value = response.data.map(movie => ({ ...movie, showDetails: false }));
          console.log(movies.value)
        } else if (response.data && Array.isArray(response.data.movies)) {
          movies.value = response.data.map(movie => ({ ...movie, showDetails: false }));
        }
      } catch (error) {
        console.error(error);
      }
    };

     const toggleDetails = (movie) => {
      movie.showDetails = !movie.showDetails;
    };

     const addToWishlist = (movie) => {
      wishlist.value.push(movie);
    };

    onMounted(fetchMovies);

    return {
      movies,
      toggleDetails,
       wishlist,
      addToWishlist
    };
  }
};
</script>
<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  flex: 0 0 22%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
 margin-right:24px;
}

h2 {
  color: #333;
  font-size: 24px;
}

img {
  width: 40%;
  height: 200px;
}

p {
  color: #666;
  font-size: 14px;
}

a {
  color: #0066cc;
  text-decoration: none;
}
.details-button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
   margin: 4px 2px;
  cursor: pointer;
  transition-duration: 0.4s;
}

.details-button:hover {
  background-color: white; 
  color: black; 
  border: 2px solid #4CAF50;
}
</style>


