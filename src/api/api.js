const API_BASE_URL = 'https://api.videosdk.live/v2';

export const getToken = async () => {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJmODNkOTY3ZC03N2UyLTRmOWItODhiNi04NWMxNGNjZDk1NzQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5ODg2MDQ1NSwiZXhwIjoxNzMwMzk2NDU1fQ.gsNUIQurbCx2EMW2sm4fdCPiqe1x6rnz_Nt8YEViJkg';
};

export const createMeeting = async ({token}) => {
  const url = `${API_BASE_URL}/rooms`;
  const options = {
    method: 'POST',
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  };

  const {roomId} = await fetch(url, options)
    .then(response => response.json())
    .catch(error => console.error('error', error));

  return roomId;
};
