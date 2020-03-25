import Base from './base'

class Auth extends Base {
  static login(email: String, password: String) {
    return this.post('/api/v1/auth/login', {
      email: email,
      password: password
    });
  }

  static signup(name: String, email: String, password: String) {
    return this.post('/api/v1/auth/signup', {
      user: {
        name: name,
        email: email,
        password: password,
        password_confirmation: password
      }
    });
  }

  static me() {
    return this.get('/api/v1/auth/me');
  }

  static logout() {
    return this.delete('/api/v1/auth/logout');
  }
};

export default Auth;
