
export const request = async (url, token, method = "GET", body = null, headers = {}) => {
  
  if(url !== '/api/auth/login' || url !== '/api/auth/register') {
    headers['Authorization'] = `Bearer ${token}`
  }

  if (body) {
    body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }

  const baseUrl = 'https://nameless-savannah-06709.herokuapp.com' + url;
  
  return await fetch(baseUrl, { method, body, headers });
}


