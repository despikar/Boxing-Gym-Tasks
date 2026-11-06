// These helpers keep task and activity lists in the browser.
function getList(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}


// Keep the newest five activity updates for the home page.
function addActivity(message) {
  const activity = getList("activity");
  activity.unshift(message + " (" + new Date().toLocaleString() + ")");
  saveList("activity", activity.slice(0, 5));
}
