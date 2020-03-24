import { observable, action, autorun } from 'mobx';

interface User {
  id: Number
  name: String
  email: String
  created_at: String
}
 
class UserStore {
  @observable currentUser: User | null;
  @observable loadingUser: Boolean;

  @action setCurrentUser(user) {
    this.currentUser = user;
  }

  @action forgetUser() {
    this.currentUser = null;
  }
}

export default new UserStore();
