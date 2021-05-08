import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ArtCard from "../components/ArtCard";
import "../components/Style/Styling.css";

export default function ArtFeed() {
  const { searching } = useParams();
  const [state, setState] = useState([]);
  const [searchArt, setSearchArt] = useState(searching);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        const queryParams = encodeURIComponent(searching);
        const response = await axios.get(
          `https://www.rijksmuseum.nl/api/en/collection?key=KakAy1eR&involvedMaker=${queryParams}&p=1&ps=10000`
        );

        setState(response.data.artObjects);
      } catch (error) {
        console.log("error searching", error.message);
      }
    }

    fetchData();
  }, [searching]);

  const navigateToSearch = (event) => {
    event.preventDefault();
    const routeParam = encodeURIComponent(searchArt);
    history.push(`/explore/${routeParam}`);
  };

  return (
    <div>
      <div>
        <div className="ArtpageBtnRightFlex">
          <Link to="/">
            <button className="ArtPageBtn">Go to Home Page</button>
          </Link>
        </div>
        <h1>Explore some art!</h1>
        <p style={{ fontSize: "20px" }}>
          Please type in the artist's full name to search, oh and it's case
          sensitive!<br></br>
          Example: Rembrandt van Rijn
        </p>
        <div>
          <form onSubmit={navigateToSearch}>
            <input
              type="text"
              placeholder="search art"
              defaultValue={searchArt}
              onChange={(event) => {
                setSearchArt(event.target.value);
              }}
              className="inputField"
            />
            <button type="submit" className="ArtPageBtn">
              search
            </button>
          </form>
        </div>
        {state.map((art) => (
          <div key={art.id}>
            <ArtCard art={art} />
          </div>
        ))}
      </div>
    </div>
  );
}