function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function setLoginState(isLoggedIn, username = "") {
  localStorage.setItem("isLoggedIn", isLoggedIn);

  if (isLoggedIn) {
    localStorage.setItem("username", username);
    const loginNav = document.getElementById("login-nav");
    const logoutNav = document.getElementById("logout-nav");
    if (loginNav) loginNav.style.display = "none";
    if (logoutNav) logoutNav.style.display = "inline-block";
    showSection("home");
  } else {
    localStorage.removeItem("username");
    const loginNav = document.getElementById("login-nav");
    const logoutNav = document.getElementById("logout-nav");
    if (loginNav) loginNav.style.display = "inline-block";
    if (logoutNav) logoutNav.style.display = "none";
    showSection("login");
  }
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').substring(1);
    if (id && document.getElementById(id)) {
      e.preventDefault();
      showSection(id);
    }
  });
});

document.getElementById('login-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const storedUsers = JSON.parse(localStorage.getItem('users')) || {};
  if (storedUsers[username] && storedUsers[username] === password) {
    document.getElementById('login-error').style.display = 'none';
    setLoginState(true, username);
  } else {
    document.getElementById('login-error').style.display = 'block';
  }
});

document.getElementById('signup-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const newUser = document.getElementById('signup-username').value.trim();
  const newPass = document.getElementById('signup-password').value.trim();
  const confirmPass = document.getElementById('signup-confirm-password').value.trim();
  const agree = document.getElementById('agree-terms').checked;
  let users = JSON.parse(localStorage.getItem('users')) || {};
  if (!agree) {
    alert("You must agree to the terms of service.");
    return;
  }
  if (users[newUser]) {
    document.getElementById('signup-error').style.display = 'block';
  } else if (newPass !== confirmPass) {
    alert("Passwords do not match.");
  } else {
    users[newUser] = newPass;
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('signup-error').style.display = 'none';
    alert("Registration successful! You can now log in.");
    showSection('login');
  }
});

document.getElementById('logout-nav').addEventListener('click', (e) => {
  e.preventDefault();
  setLoginState(false);
});

const forgotLink = document.querySelector('#login a[href="#forgot"]');
if (forgotLink) {
  forgotLink.addEventListener('click', e => {
    e.preventDefault();
    const username = prompt("Enter your username to reset password:");
    if (!username) return;
    let users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[username]) {
      alert("User not found.");
      return;
    }
    const newPass = prompt("Enter your new password:");
    if (newPass && newPass.trim() !== "") {
      users[username] = newPass.trim();
      localStorage.setItem('users', JSON.stringify(users));
      alert("Password reset successful! You can now log in.");
    } else {
      alert("Password not changed.");
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === "true";
  const username = localStorage.getItem('username');
  setLoginState(isLoggedIn, username);
});
