var querystring = Npm.require('querystring');

var generateToken = function (username) {
  var stampedToken = Accounts._generateStampedLoginToken();
  Meteor.users.update({username: username},
                      {$push: {'services.resume.loginTokens': stampedToken}});
  return stampedToken;
}

Meteor.methods({
  getCorpCookie: function() {
    var cookies = ServerCookies.retrieve(this.connection);
    return cookies['cookies']['auth_user'];
  },

  findOrCreateUser: function (cookie) {
    // Since we are behind corp secure, if there
    // is an auth_user cookie, we can assume that user
    // is logged into corp.

    // Check if cookie from corp exists.
    if (!cookie) {
      // There is no cookie!
      console.log("Got to findOrCreateUser without an auth_user cookie")
      console.log("Something very wrong has happened")
      return;
    }

    // Check to make sure cookie belongs to current session
    var cookies = ServerCookies.retrieve(this.connection);
    userCookie = cookies['cookies']['auth_user'];
    if (cookie !== userCookie) {
      console.log("Someone is being naughty...", userCookie, cookie);
      return;
    }

    // Get the username and unescape it from the cookie.
    var username = querystring.unescape(cookie);

    // Check if this user exists in Meteor.
    if (Meteor.users.findOne({username: username})) {
      return {username: username, token: generateToken(username)};
    }

    // User doesn't exist. Create and login.
    var userId = Accounts.createUser({
      username: username,
      email: username
    });

    var newUsername = Meteor.users.findOne(userId).username;
    return {username: newUsername, token: generateToken(newUsername)};
  }
});
