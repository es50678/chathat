function saveUser(profile) {
  console.log("saved user");
  return new Promise((resolve, reject) => {
    resolve("some data");
  });
}

function savewrapper(profile) {
  return new Promise((resolve, reject) => {
    saveUser(profile).then(data => {
      resolve(data);
    });
  });
}

function toplevelcaller() {
  savewrapper("user profile").then(data => {
    console.log("data", data);
  });
}

toplevelcaller();
