import Movie from './components/Movie';
import MovieProvider from './store/MovieProvider';
function App() {
  return (
    <div className="App">
      <MovieProvider>
      <Movie></Movie>
       </MovieProvider>
    </div>
  );
}

export default App;
