import { spotifyScopes } from "../../constants";
import { Button } from "../../shadcn/components/ui/button";

const SpotifyLoginButton = () => {
  return (
    <Button asChild>
      <a href={`${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}&scope=${encodeURIComponent(spotifyScopes)}`}>Login to Spotify</a>
    </Button>
  )
}

export default SpotifyLoginButton;