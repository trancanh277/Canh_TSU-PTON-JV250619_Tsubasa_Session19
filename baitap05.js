const modal = document.getElementById("modal");
const showModal = document.getElementById("show-modal");
const closeModal = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

if (bookmarks.length === 0) {
  bookmarks = [
    { name: "Google", url: "https://www.google.com", desc: "Search Engine" },
    { name: "YouTube", url: "https://www.youtube.com", desc: "Video Sharing" },
  ];
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

showModal.addEventListener("click", () => {
  modal.style.display = "flex";
  websiteNameEl.focus();
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

function saveBookmark(e) {
  e.preventDefault();
  const name = websiteNameEl.value.trim();
  let url = websiteUrlEl.value.trim();

  if (!name || !url) {
    alert("Please fill in both fields.");
    return;
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  bookmarks.push({ name, url });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  bookmarkForm.reset();
  modal.style.display = "none";
  fetchBookmarks();
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

function fetchBookmarks() {
  bookmarksContainer.innerHTML = "";
  bookmarks.forEach((bookmark, index) => {
    const item = document.createElement("div");
    item.classList.add("bookmark-item");
    item.innerHTML = `
      <div class="info">
        <img src="https://www.google.com/s2/favicons?sz=32&domain=${bookmark.url}" alt="favicon">
        <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
      </div>
      <button class="delete-btn" onclick="deleteBookmark(${index})"><i class="fas fa-times"></i></button>
    `;
    bookmarksContainer.appendChild(item);
  });
}

bookmarkForm.addEventListener("submit", saveBookmark);

fetchBookmarks();
