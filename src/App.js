import "./App.css";
import Row from "./components/Row";
import requests from "./requests";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
function App() {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row
        title="Originales de Netflix"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Tendencias" fetchUrl={requests.fetchTrending} />
      <Row title="Mas Valoradas" fetchUrl={requests.fetchTopRated} />
      <Row title="Accion" fetchUrl={requests.fetchActionMovies} />
    </div>
  );
}

export default App;
