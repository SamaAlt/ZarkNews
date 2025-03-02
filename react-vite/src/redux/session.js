// ========================== ACTION TYPE CONSTANTS ==========================
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_LOADING = 'session/setLoading';

// ========================== ACTION CREATORS ================================
const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const setLoading = () => ({
  type: SET_LOADING,
});

// ========================== HELPER FUNCTIONS ===============================

// Helper function to check if the response is HTML
const isHtmlResponse = (responseText) => {
  return responseText.trim().startsWith('<!DOCTYPE html>') || responseText.trim().startsWith('<html>');
};

// Helper function to handle server responses
const handleServerResponse = async (response) => {
  const responseText = await response.text();

  // Check if the response is HTML (indicating an error page)
  if (isHtmlResponse(responseText)) {
    throw new Error('Server returned an HTML error page. Please try again later.');
  }

  // Attempt to parse the response as JSON
  try {
    const data = JSON.parse(responseText);
    return { data, ok: response.ok };
  } catch (error) {
    throw new Error('Invalid JSON response from server.');
  }
};

// ========================== THUNKS =====================================

// THUNK: RESTORE USER SESSION
export const thunkRestoreUser = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await fetch('/api/auth/restore', {
      method: 'GET',
      credentials: 'include', // Include cookies for session-based auth
    });
    const { data, ok } = await handleServerResponse(response);

    if (ok) {
      dispatch(setUser(data));
    } else {
      dispatch(removeUser());
    }
  } catch (error) {
    console.error('Error restoring user session:', error);
    dispatch(removeUser());
  }
};

// THUNK: AUTHENTICATE USER
export const thunkAuthenticate = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await fetch('/api/auth/');
    const { data, ok } = await handleServerResponse(response);

    if (ok) {
      dispatch(setUser(data));
    } else {
      throw new Error(data.errors?.message || 'Authentication failed');
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    dispatch(removeUser());
  }
};

// THUNK: LOGIN USER
export const thunkLogin = (credentials) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const responseData = await response.json();

    if (response.ok) {
      dispatch(setUser(responseData)); // Dispatch the user data on success
      return {}; // No errors
    } else {
      return { errors: responseData.errors || { server: 'Incorrect email or password.' } }; // Return errors
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return { errors: { server: 'Something went wrong. Please try again' } };
  }
};

// THUNK: SIGNUP USER
export const thunkSignup = (user) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const { data, ok } = await handleServerResponse(response);

    if (ok) {
      dispatch(setUser(data));
    } else {
      return { errors: data.errors || { server: 'Something went wrong. Please try again.' } };
    }
  } catch (error) {
    console.error('Error signing up:', error);
    return { errors: { server: 'Something went wrong. Please try again' } };
  }
};

// THUNK: LOGOUT USER
export const thunkLogout = () => async (dispatch) => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });
    const { ok } = await handleServerResponse(response);

    if (!ok) {
      throw new Error('Logout failed');
    }
    dispatch(removeUser());
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

// THUNK: UPDATE USER
export const thunkUpdateUser = (userId, updatedData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    if (process.env.NODE_ENV === 'development') {
    }
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    const { data, ok } = await handleServerResponse(response);

    if (ok) {
      dispatch(setUser(data)); // Update the user in the Redux store
      return { success: true };
    } else {
      return { errors: data.errors || { server: 'Something went wrong. Please try again.' } };
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return { errors: { server: 'Something went wrong. Please try again' } };
  }
};

// THUNK: DELETE USER
export const thunkDeleteUser = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors ? errorData.errors.join(', ') : 'Failed to delete user');
    }

    dispatch(removeUser()); // Remove the user from the Redux store
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { errors: { server: error.message } };
  }
};

// ========================== REDUCER =====================================
const initialState = {
  user: null,
  loading: false,
};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload, loading: false };
    case REMOVE_USER:
      return { ...state, user: null, loading: false };
    case SET_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default sessionReducer;