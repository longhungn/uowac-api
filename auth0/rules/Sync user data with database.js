function (user, context, callback) {
  const request = require('request');
  const jwt = require('jsonwebtoken');
  //check cache first
  //console.log(global.accessToken, ",", global.accessTokenExp);
  if (global.accessToken && global.accessTokenExp * 1000 < Date.now() - 1000) {
  	syncUser(global.accessToken, user);
  }

  const url = configuration.SYNC_USER_URL;
	const clientId = configuration.SYNC_USER_CLIENT_ID;
  const clientSecret = configuration.SYNC_USER_CLIENT_SECRET;
  
  request.post({
  	url: 'https://uowac-dev.au.auth0.com/oauth/token',
    json: {
    	"client_id": clientId,
      "client_secret": clientSecret,
      "audience":"https://uowac-api.herokuapp.com",
      "grant_type":"client_credentials"
    }
  }, function (err, response, body) {
  	if (err) return callback(err);
    
    if (!body.access_token) return new UnauthorizedError('Service not available');
    
    global.accessToken = body.access_token; // can use this for caching
    const decoded = jwt.decode(body.access_token);
    global.accessTokenExp = decoded.exp;
    
    syncUser(body.access_token, user);
  });
  
  function syncUser(accessToken, user) {
  	request.get({
    	url: url,
      auth: {
      	'bearer': accessToken
      }
    }, function(err, response, body) {
    	if (err) return callback(err);
      if (response.statusCode !== 200) {
        return callback(new UnauthorizedError('Service not available'));
      }
      return callback(err, user, context);
    });
  }
}

