import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchUsers } from '../api/jsonPlaceholder';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

// OAuth utilities
const handleGoogleSuccess = (response) => {
  try {
    // Decode the JWT token from Google
    const decodedToken = response.credential ? JSON.parse(atob(response.credential.split('.')[1])) : response;

    // Extract user data from the decoded token
    const userData = {
      id: decodedToken.sub || decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      picture: decodedToken.picture,
      provider: 'Google'
    };
    return userData;
  } catch (error) {
    console.error('Error processing Google login:', error);
    throw new Error('Failed to process Google login');
  }
};

const FACEBOOK_APP_ID = '123456789';

const initializeFacebookSDK = () => {
  return new Promise((resolve) => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: FACEBOOK_APP_ID,
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

const handleFacebookLogin = () => {
  return new Promise((resolve, reject) => {
    window.FB.login(function (response) {
      if (response.authResponse) {
        window.FB.api('/me', { fields: 'id,name,email,picture' }, function (userInfo) {
          const userData = {
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture?.data?.url,
            provider: 'Facebook'
          };
          resolve(userData);
        });
      } else {
        reject(new Error('Facebook login cancelled or failed'));
      }
    }, { scope: 'email,public_profile' });
  });
};

// github oauth
const GITHUB_CLIENT_ID = '';

const initializeGithubAuth = () => {
  const REDIRECT_URI = `${window.location.origin}/github-callback`;

  return {
    redirectToGithub: () => {
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user:email`;
      window.location.href = authUrl;
    }
  };
};

// Google Client ID 
const GOOGLE_CLIENT_ID = '204440151791-1qtl8uqja267bku5pn7r3hsb0h40ti69.apps.googleusercontent.com';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const googleButtonContainerRef = useRef(null);

  useEffect(() => {
    // Initialize Facebook SDK when component mounts
    const loadFacebookSDK = async () => {
      try {
        await initializeFacebookSDK();
      } catch (error) {
        console.error('Failed to initialize Facebook SDK:', error);
      }
    };

    loadFacebookSDK();

    // Initialize Google SDK
    const loadGoogleSDK = () => {
      const existingScript = document.getElementById('google-signin-script');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }

      // Create a new script element
      const script = document.createElement('script');
      script.id = 'google-signin-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);

      return () => {
        const scriptToRemove = document.getElementById('google-signin-script');
        if (scriptToRemove) document.body.removeChild(scriptToRemove);
      };
    };

    const cleanup = loadGoogleSDK();
    return cleanup;
  }, []);

  // Initialize Google Sign-In
  const initializeGoogleSignIn = () => {
    if (window.google && googleButtonContainerRef.current) {
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCallback,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // Render the button inside our container
        window.google.accounts.id.renderButton(
          googleButtonContainerRef.current,
          {
            type: 'standard',
            shape: 'rectangular',
            theme: 'outline',
            size: 'large',
            text: 'signin_with',
            width: '100%',
          }
        );
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
      }
    }
  };

  // Handle the Google Sign-In response
  const handleGoogleCallback = async (response) => {
    setOauthLoading('Google');
    try {
      const userData = handleGoogleSuccess(response);

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      // Update auth context
      login(userData);

      toast.success(`Welcome, ${userData.name}!`);
      navigate('/home');
    } catch (error) {
      toast.error('Google login failed');
      console.error('Google login error:', error);
    } finally {
      setOauthLoading(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const users = await fetchUsers();
      const user = users.find((u) => u.email === email);

      if (user) {
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify({
          ...user,
          provider: 'Email'
        }));

        login(user);
        toast.success(`Welcome back, ${user.name}!`);
        navigate('/home');
      } else {
        toast.error('No user found with that email');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    setOauthLoading(provider);

    try {
      let userData = null;

      if (provider === 'Facebook') {
        try {
          userData = await handleFacebookLogin();
        } catch (err) {
          // If SDK fails, use demo data
          userData = {
            id: Math.floor(Math.random() * 1000).toString(),
            name: 'Facebook Demo User',
            email: 'demo@facebook.com',
            picture: 'https://via.placeholder.com/150',
            provider: 'Facebook'
          };
        }
      }
      else if (provider === 'GitHub') {
        const github = initializeGithubAuth();
        github.redirectToGithub();
        return; // This will redirect, so we return early
      }

      if (userData) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));

        // Update auth context
        login(userData);

        toast.success(`Logged in with ${provider}`);
        navigate('/home');
      }
    } catch (error) {
      toast.error(`${provider} login failed`);
      console.error(`${provider} login error:`, error);
    } finally {
      setOauthLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>Photo Gallery App | Login</title>
      </Helmet>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-700">
          Use any email from{' '}
          <a
            href="https://jsonplaceholder.typicode.com/users"
            className="font-medium text-blue-600 hover:text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            JSONPlaceholder users
          </a>{' '}
          or sign in with a provider
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g. Sincere@april.biz"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in with Email'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-700">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              {/* Google Sign-In Button - Full Width */}
              <div className="w-full">
                {window.google ? (
                  <div
                    ref={googleButtonContainerRef}
                    className="w-full h-10 flex justify-center items-center"
                  />
                ) : (
                  <button
                    onClick={() => setOauthLoading('Google')}
                    disabled={oauthLoading === 'Google'}
                    className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {oauthLoading === 'Google' ? (
                      <Loader small />
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 mr-2"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                        </svg>
                        Sign in with Google
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;