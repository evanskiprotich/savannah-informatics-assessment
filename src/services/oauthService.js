import { useState, useEffect } from 'react';
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

const initializeFacebookSDK = () => {
  return new Promise((resolve) => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID || '',
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

const initializeGithubAuth = () => {
  // GitHub OAuth client ID
  const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID || '';
  const REDIRECT_URI = `${window.location.origin}/github-callback`;

  return {
    redirectToGithub: () => {
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user:email`;
      window.location.href = authUrl;
    }
  };
};