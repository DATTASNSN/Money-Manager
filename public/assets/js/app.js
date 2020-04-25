import {firebaseConfig} from './config.js';
(
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      // const model = {};
      const view = {
        init: () => {
          view.render();
        },
        render: () => {

        },
      };
      const controller = {
        init: () => {
          view.init();
        },
      };
      firebase.initializeApp(firebaseConfig);
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', {
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        ],
        signInSuccessUrl: './user.html',
        // Other config options...
      });
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          controller.init();
        } else {
          // No user is signed in.
        }
      });
    }
  }
)();
