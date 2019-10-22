/**
 * Auth0 custom rule to check if user has admin role when
 * they log in into the admin web dashboard.
 * Prevent log in if user does not have necessary privilege
 * 
 * Created by: Long Hung Nguyen (longhungn)
 */
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