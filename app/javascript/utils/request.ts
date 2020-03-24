import axios from 'axios'

axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken(document);

function csrfToken(document) {
  return document.querySelector('[name="csrf-token"]').content;
}

class Auth {
  static login(email: String, password: String) {
    return axios.post('/api/v1/auth/login', {
      email: email,
      password: password
    });
  }

  static signup(name: String, email: String, password: String) {
    return axios.post('/api/v1/auth/signup', {
      user: {
        name: name,
        email: email,
        password: password,
        password_confirmation: password
      }
    });
  }

  static me() {
    return axios.get('/api/v1/auth/me');
  }

  static logout() {
    return axios.delete('/api/v1/auth/logout');
  }
};

class Posts {
  static list() {
    delete axios.defaults.headers.common['X-CSRF-TOKEN'];
    return axios.get('https://www.reddit.com/top.json');
  }
}

export { Auth, Posts, axios }
