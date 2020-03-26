import Base from './base'

class Auth extends Base {
  static login(email: string, password: string) {
    return this.post('/api/v1/auth/login', {
      email: email,
      password: password
    });
  }

  static signup(name: string, email: string, password: string) {
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
