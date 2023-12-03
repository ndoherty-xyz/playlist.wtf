import camelcaseKeys from "camelcase-keys";

export let spotifyScopes =
  "user-top-read user-library-read " +
  "playlist-modify-public playlist-read-private playlist-read-collaborative " +
  "user-read-email playlist-modify-private streaming user-read-playback-state";

export let redirectURI = process.env.REACT_APP_REDIRECT_URL
export let clientID = process.env.REACT_APP_CLIENT_ID;

export const setCookie = (cname: string, cvalue: string, expirationHours: number) => {
  var d = new Date();
  d.setTime(d.getTime() + expirationHours * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getCookie = (cname: string) => {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


export function deepCamelCaseKeys(variable: any ) {
  if (variable === null) {
    return null;
  } else if (variable instanceof Array) {
    variable.forEach((object, index) => {
      variable[index] = deepCamelCaseKeys(object);
    });

    return variable;
  } else if (variable instanceof Object) {
    Object.keys(variable).forEach((key) => {
      variable[key] = deepCamelCaseKeys(variable[key]);
    });

    return camelcaseKeys(variable);
  } else {
    return variable;
  }
}