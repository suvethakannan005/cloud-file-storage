function uploadFile() {
  const files = document.getElementById("file").files;

  if (files.length === 0) {
    alert("Please select a file");
    return;
  }

  document.getElementById("message").innerText =
    files.length + " file(s) uploaded successfully";
}

function logout() {
  window.location.href = "index.html";
}
const API = "http://localhost:5000/api/files";
const token = localStorage.getItem("token");


async function loadFiles() {
  const res = await fetch(API, {
    headers: { Authorization: token }
  });
  const files = await res.json();

  let html = "";
  files.forEach(file => {
    html += `
      <div class="file-card">
        <a href="${file.fileUrl}" target="_blank">${file.fileName}</a>
        <button onclick="deleteFile('${file._id}')">Delete</button>
      </div>
    `;
  });

  document.getElementById("fileList").innerHTML = html;
}

// Delete file
async function deleteFile(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: { Authorization: token }
  });
  loadFiles();
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

loadFiles();
