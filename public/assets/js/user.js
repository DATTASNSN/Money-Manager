import { firebaseConfig } from './config.js';
(
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      const settings = document.getElementById('settings-menu');
      const profilePicture = document.getElementById('profile-picture');
      const userName = document.getElementById('user-name');
      const logout = document.getElementById('logout');
      const userEmail = document.getElementById('user-email');
      const model = {
        user :{},
      };
      const view = {
        init: () => {
          settings.onclick = () => {
            settings.classList.toggle('is-active');
          };
          logout.onclick = () => {
            controller.logout();
          };
        },
        render : () => {
          profilePicture.src = model.user.photoURL;
          userName.innerHTML = model.user.displayName;
          userEmail.innerHTML =model.user.email;
        },
      };
      const controller = {
        logout: () => {
          firebase.auth().signOut();
        },
        setUser: (user) => {
          model.user = user;
          view.render();
        },
        init: () => {
          view.init();
        },
      };

      firebase.initializeApp(firebaseConfig);
      const db = firebase.firestore();
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          controller.setUser(user);
          controller.init();
          // ...
        } else {
          // User is signed out.
          window.location.href = './index.html';
          // ...
        }
      });
    }
  }
)();
