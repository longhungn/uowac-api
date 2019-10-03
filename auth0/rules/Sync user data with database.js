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

  const assignedRoles = (context.authorization || {}).roles;

  request.post({
  	url: `https://${context.tenant}.au.auth0.com/oauth/token`,
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
    const provider = user.user_id.split('|')[0];
  	request.post({
    	url: url,
      auth: {
      	'bearer': accessToken
      },
      form: {
        userId: user.user_id,
        nickname: user.nickname,
        name: user.name,
        picture: user.picture_large || user.picture,
        role: assignedRoles,
        email: user.email,
        givenName: user.given_name,
        familyName: user.family_name,
        gender: user.gender,
        provider
      }
    }, function(err, response, body) {
    	if (err) return callback(err);
      if (response.statusCode !== 201) {
        console.log(response);
        return callback(new UnauthorizedError('Service not available'));
      }

      user.app_metadata = user.app_metadata || {};
      user.app_metadata.isCreated = true;

      return callback(err, user, context);
    });
  }
}

