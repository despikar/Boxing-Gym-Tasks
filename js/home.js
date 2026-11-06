const activityList = document.getElementById("activityList");
const activity = getList("activity");

if (activity.length === 0) {
  activityList.innerHTML = '<li class="list-group-item">No activity yet. Add a task!</li>';
}
for (const item of activity) {
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.textContent = item;
  activityList.appendChild(li);
}

const quoteBox = document.getElementById("quote");

fetch("https://dummyjson.com/quotes/random")
  .then(function (response) { return response.json(); })
  .then(function (data) {
    quoteBox.textContent = '"' + data.quote + '" - ' + data.author;
  })
  .catch(function () {
    quoteBox.textContent = "Could not load a quote. Try again later.";
  });
