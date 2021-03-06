import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import ArtExplore from "./pages/ArtExplore";
import HomePage from "./pages/HomePage";
import ArtDetailPage from "./pages/ArtDetailPage";
import FullScreenDisplay from "./pages/FullScreenDisplay";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <div className="FullSize">
        <NavBar />
        <Switch>
          <Route
            path="/fullscreen/:objectNumber"
            component={FullScreenDisplay}
          />
          <Route path="/art/:objectNumber" component={ArtDetailPage} />
          <Route path="/explore/:searching?" component={ArtExplore} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
