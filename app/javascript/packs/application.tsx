import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { BrowserRouter  } from "react-router-dom"
import { Provider } from 'mobx-react';

import authStore from 'stores/authStore';
import userStore from 'stores/userStore';
import postStore from 'stores/postStore';
import galleryStore from 'stores/galleryStore';

import App from 'components/App'

import "blueprint-css/src/blueprint"

declare module "react" {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    bp?: string;
  }
}

const stores = {
  authStore,
  userStore,
  postStore,
  galleryStore
};

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('app')
);

