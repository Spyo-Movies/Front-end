import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzAyZDBlNzc3MjJmZjg0MDRlZmJjOGNhNDU3MzA0MiIsIm5iZiI6MTc1OTI1MjQwNC41MjgsInN1YiI6IjY4ZGMwZmI0MjlhZTkzYjg3YmI5YWMzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TE5yVKEKBI24wgblo45q46hmNxKgiCJcOjXWsleCbLQ`,
  },
});

export default api;
