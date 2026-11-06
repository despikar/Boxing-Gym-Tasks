function getList(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}


function addActivity(message) {
  const activity = getList("activity");
  activity.unshift(message + " (" + new Date().toLocaleString() + ")");
  saveList("activity", activity.slice(0, 5));
}
