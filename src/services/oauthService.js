import jwtDecode from 'jwt-decode';

export const handleGoogleSuccess = (response) => {
  try {
    // Decode the JWT token from Google
    const decodedToken = jwtDecode(response.credential);

    // Extract user data from the decoded token
    const userData = {
      id: decodedToken.sub,
      name: decodedToken.name,
      email: decodedToken.email,
      picture: decodedToken.picture
    };

    return userData;
  } catch (error) {
    console.error('Error processing Google login:', error);
    throw new Error('Failed to process Google login');
  }
};

export const initializeFacebookSDK = () => {
  return new Promise((resolve) => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 'YOUR_FACEBOOK_APP_ID', // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v17.0' // Use a recent Facebook API version
      });
      resolve();
    };

    // Load the SDK
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });
};

export const handleFacebookLogin = () => {
  return new Promise((resolve, reject) => {
    window.FB.login(function (response) {
      if (response.authResponse) {
        window.FB.api('/me', { fields: 'id,name,email,picture' }, function (userInfo) {
          const userData = {
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture?.data?.url
          };
          resolve(userData);
        });
      } else {
        reject(new Error('Facebook login cancelled or failed'));
      }
    }, { scope: 'email,public_profile' });
  });
};