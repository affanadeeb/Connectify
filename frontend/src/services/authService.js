import config from '../config';

export const login = async (credentials) => {
  try {
    const response = await fetch(`${config.apiUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await fetch(`${config.apiUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${config.apiUrl}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const checkAuth = async () => {
  try {
    const response = await fetch(`${config.apiUrl}/api/auth/check`, {
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Auth check failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Auth check error:', error);
    throw error;
  }
};