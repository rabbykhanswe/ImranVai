document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('login-form');
    const adminContainer = document.querySelector('.admin-container');
    const logoutBtn = document.getElementById('logout-btn');

    // --- LOGIN PAGE LOGIC (Unchanged) ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            formData.append('action', 'login');

            fetch('admin_access.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    window.location.href = 'admin.html';
                } else {
                    document.getElementById('login-message').textContent = data.message;
                }
            })
            .catch(error => console.error('Login error:', error));
        });
    }

    // --- ADMIN DASHBOARD LOGIC (Unchanged) ---
    if (adminContainer) {
        fetchData(); 
        
        logoutBtn.addEventListener('click', () => {
            const formData = new FormData();
            formData.append('action', 'logout');
            fetch('admin_access.php', { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    window.location.href = 'login.html';
                }
            });
        });

        document.getElementById('gallery-form').addEventListener('change', (e) => {
            if (e.target.type === 'file' && e.target.files.length > 0) {
                handleGalleryUpload(e.target);
            }
        });
    }

    // --- NOTIFICATION FUNCTION (Unchanged) ---
    function showNotification(message, status) {
        const notification = document.getElementById('notification-popup');
        if (!notification) return;
        notification.textContent = message;
        notification.classList.remove('success', 'error');
        notification.classList.add(status);
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // --- FETCH DATA FUNCTION (Unchanged) ---
    function fetchData() {
        const formData = new FormData();
        formData.append('action', 'fetch_data');
        fetch('admin_access.php', { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                renderRequests(data.requests);
                renderReviews(data.reviews);
                renderGallery(data.gallery); 
            } else {
                window.location.href = 'login.html';
            }
        });
    }

    // --- RENDER REQUESTS FUNCTION (Unchanged) ---
    function renderRequests(requests) {
        const container = document.getElementById('requests-container');
        if (requests.length === 0) {
            container.innerHTML = '<p>No contact requests found.</p>';
            return;
        }
        let tableHTML = `<table><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Message</th><th>Date</th><th>Actions</th></tr></thead><tbody>`;
        requests.forEach(req => {
            tableHTML += `<tr data-id="${req.id}">
                <td>${req.id}</td>
                <td>${escapeHTML(req.name)}</td>
                <td>${escapeHTML(req.email)}</td>
                <td>${escapeHTML(req.message)}</td>
                <td>${new Date(req.submission_date).toLocaleString()}</td>
                <td class="actions"><button class="btn btn-danger delete-btn" data-id="${req.id}" data-type="request">Delete</button></td>
            </tr>`;
        });
        tableHTML += '</tbody></table>';
        container.innerHTML = tableHTML;
        addDeleteListeners(container);
    }

    // --- !! REVIEW IMAGE PATH FIX HERE !! ---
    function renderReviews(reviews) {
        const container = document.getElementById('reviews-container');
        if (reviews.length === 0) {
            container.innerHTML = '<p>No reviews found.</p>';
            return;
        }
        let tableHTML = `<table><thead><tr><th>ID</th><th>Name</th><th>Location</th><th>Rating</th><th>Review</th><th>Photo</th><th>Date</th><th>Actions</th></tr></thead><tbody>`;
        reviews.forEach(rev => {
            const stars = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
            
            // Fixed path. Assumes admin.html is in the root. 
            // If admin.html is in an 'admin/' folder, change this to `../${rev.photo_path}`
            const photo = rev.photo_path ? `<img src="${rev.photo_path}" alt="Review Photo" class="review-photo">` : 'N/A';
            
            tableHTML += `<tr data-id="${rev.id}">
                <td>${rev.id}</td>
                <td>${escapeHTML(rev.name)}</td>
                <td>${escapeHTML(rev.location)}</td>
                <td>${stars}</td>
                <td>${escapeHTML(rev.review_text)}</td>
                <td>${photo}</td>
                <td>${new Date(rev.submission_date).toLocaleString()}</td>
                <td class="actions"><button class="btn btn-danger delete-btn" data-id="${rev.id}" data-type="review">Delete</button></td>
            </tr>`;
        });
        tableHTML += '</tbody></table>';
        container.innerHTML = tableHTML;
        addDeleteListeners(container);
    }
    // --- END OF FIX ---

    // --- OTHER FUNCTIONS (Unchanged) ---
    function renderGallery(galleryData) {
        const keys = Object.keys(galleryData);
        keys.forEach(key => {
            const itemElement = document.getElementById(`item-${key}`);
            if (itemElement) {
                const pathElement = itemElement.querySelector('.current-path');
                pathElement.textContent = galleryData[key];
            }
        });
    }

    function handleGalleryUpload(fileInput) {
        const file = fileInput.files[0];
        const itemKey = fileInput.dataset.key;
        if (!file || !itemKey) return;

        const formData = new FormData();
        formData.append('action', 'update_gallery_item');
        formData.append('item_key', itemKey);
        formData.append('media_file', file);

        showNotification(`Uploading ${itemKey}...`, 'success');

        fetch('admin_access.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            showNotification(data.message, data.status);
            if (data.status === 'success') {
                const pathElement = document.querySelector(`#item-${itemKey} .current-path`);
                if (pathElement) {
                    pathElement.textContent = data.new_path;
                }
                fileInput.value = '';
            }
        })
        .catch(error => {
            console.error('Upload error:', error);
            showNotification('An unexpected error occurred during upload.', 'error');
        });
    }

    function addDeleteListeners(container) {
        container.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const type = e.target.dataset.type;
                if (confirm(`Are you sure you want to delete this ${type} (ID: ${id})?`)) {
                    deleteItem(id, type);
                }
            });
        });
    }

    function deleteItem(id, type) {
        const formData = new FormData();
        formData.append('action', 'delete');
        formData.append('id', id);
        formData.append('type', type);

        fetch('admin_access.php', { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => {
            showNotification(data.message, data.status);
            if (data.status === 'success') {
                document.querySelector(`tr[data-id='${id}']`).remove();
            }
        })
        .catch(error => {
            console.error('Delete error:', error);
            showNotification('An error occurred while deleting.', 'error');
        });
    }
    
    function escapeHTML(str) {
        const p = document.createElement('p');
        p.textContent = str;
        return p.innerHTML;
    }

});