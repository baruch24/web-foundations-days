const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const loadButton = document.getElementById("load-users");
const filterInput = document.getElementById("filter-input");
const statusEl = document.getElementById("status");
const usersList = document.getElementById("users-list");

// Stores the loaded users so filtering never needs a new request
let allUsers = [];

function setStatus(message) {
  statusEl.textContent = message;
}

// Draws any array of users into the list
function renderUsers(list) {
  usersList.replaceChildren();

  if (list.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No users match your filter.";
    usersList.appendChild(empty);
    return;
  }

  list.forEach((user) => {
    const item = document.createElement("li");

    const name = document.createElement("strong");
    name.textContent = user.name;

    const email = document.createElement("p");
    email.textContent = `Email: ${user.email}`;

    const city = document.createElement("p");
    city.textContent = `City: ${user.address.city}`;

    const company = document.createElement("p");
    company.textContent = `Company: ${user.company.name}`;

    item.append(name, email, city, company);
    usersList.appendChild(item);
  });
}

// Returns the users whose name includes the typed text (case-insensitive)
function getFilteredUsers() {
  const text = filterInput.value.trim().toLowerCase();
  return allUsers.filter((user) => user.name.toLowerCase().includes(text));
}

async function loadUsers() {
  setStatus("Loading users...");
  loadButton.disabled = true;

  try {
    const response = await fetch(USERS_URL);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    allUsers = await response.json();
    renderUsers(getFilteredUsers());
    setStatus(`Loaded ${allUsers.length} users.`);
  } catch (error) {
    console.error(error);
    setStatus(`Something went wrong: ${error.message}`);
  } finally {
    loadButton.disabled = false;
  }
}

loadButton.addEventListener("click", loadUsers);

filterInput.addEventListener("input", () => {
  // Nothing to filter until users have been loaded
  if (allUsers.length === 0) return;
  renderUsers(getFilteredUsers());
});