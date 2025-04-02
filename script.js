document.addEventListener('DOMContentLoaded', () => {
    loadUsers();

    // Handle form submission to add new user
    const userForm = document.getElementById('userForm');
    userForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        console.log('Sending data:', { Name: name, Email: email, Password: password, Role: role });

        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Name: name, Email: email, Password: password, Role: role }),
        });

        const data = await response.json();

        console.log('Response from server:', data);

        const responseMessage = document.getElementById('responseMessage');
        if (response.ok) {
            responseMessage.innerHTML = `<p>User added successfully! ID: ${data.userId}</p>`;
            loadUsers();  // Reload the list of users
        } else {
            responseMessage.innerHTML = `<p>Error: ${data.message}</p>`;
        }
    });
});

// Function to load and display all users
async function loadUsers() {
    try {
        console.log('Loading users...');
        const response = await fetch('http://localhost:3000/users');
        
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const users = await response.json();
        console.log('Users fetched:', users);

        const usersList = document.getElementById('usersList');
        usersList.innerHTML = '';  // Clear current list

        users.forEach(user => {
            const userItem = document.createElement('li');
            userItem.textContent = `ID: ${user.UserID}, Name: ${user.Name}, Email: ${user.Email}, Role: ${user.Role}`;
            usersList.appendChild(userItem);
        });
    } catch (error) {
        console.error('Error loading users:', error);
        const usersList = document.getElementById('usersList');
        usersList.innerHTML = `<li>Error loading users: ${error.message}</li>`;
    }
}
