function (user, context, callback) {

  // If not the web admin app then continue as normal
  if (context.clientName !== 'UOWAC Sculpture Admin') {
    return callback(null, user, context);
  }

  const roles = (context.authorization || {}).roles;
	if (roles && roles.includes('admin')) {
  	return callback(null, user, context);
  } else {
  	return callback(new UnauthorizedError('Account is not admin'));
  }
}