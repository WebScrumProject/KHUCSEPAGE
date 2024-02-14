import axios from "axios";

async function getAccessTokenFromGoogle(code) {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: process.env.OAUTH_ID,
    client_secret: process.env.OAUTH_PW,
    redirect_uri: process.env.OAUTH_URI,
    grant_type: "authorization_code", //이건 뭔지 모르겠음
  };
  const data = new URLSearchParams(values).toString();

  try {
    const response = await axios({
      url,
      method: "POST",
      data,
    });
    return response.data.access_token;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

function getGoogleAuthURL() {
  const rootURL = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: process.env.OAUTH_URI,
    client_id: process.env.OAUTH_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  const queryString = new URLSearchParams(options);
  return `${rootURL}?${queryString.toString()}`;
}

export { getAccessTokenFromGoogle, getGoogleAuthURL };
