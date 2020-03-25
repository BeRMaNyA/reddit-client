import axios from 'axios'

class Base {
  static get(path: string, params : Object = {}) { 
    return axios.get(path, { headers: this.headers });
  }

  static post(path: string, params : Object = {}) { 
    return axios.post(path, params, { headers: this.headers });
  }

  static put(path: string, params : Object = {}) { 
    return axios.put(path, params, { headers: this.headers });
  }

  static delete(path: string, params : Object = {}) { 
    return axios.delete(path, { headers: this.headers });
  }

  private

  static get headers() {
    const element : HTMLMetaElement = document.querySelector('[name="csrf-token"]') as HTMLMetaElement;
    const headers : Object = {};

    headers['X-CSRF-TOKEN'] = element.content;

    return headers;
  }
}

export default Base;
