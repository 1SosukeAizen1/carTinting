document.getElementById('userForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const Name = document.getElementById('name').value;
    const Email = document.getElementById('email').value;
    const Password = document.getElementById('password').value;
    const Role = document.getElementById('role').value;

    const user = { Name, Email, Password, Role };
    const message = document.getElementById('responseMessage');
    
    // Validate input
    if (!Name || !Email || !Password || !Role) {
        message.textContent = 'Please fill out all fields.';
        message.style.color = 'red';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Error adding user.');
        }

        const data = await response.json();
        
        message.textContent = 'User added successfully!';
        message.style.color = 'green';
        document.getElementById('userForm').reset();
    } catch (error) {
        console.error('Error:', error);
        message.textContent = error.message || 'Error adding user. Please try again later.';
        message.style.color = 'red';
    }
});

document.getElementById('fetchUsersBtn').addEventListener('click', async function () {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    const loadingMessage = document.createElement('li');
    loadingMessage.textContent = 'Loading users...';
    userList.appendChild(loadingMessage);

    try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();

        userList.innerHTML = ''; // Clear loading message

        if (users.length > 0) {
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `ID: ${user.UserID}, Name: ${user.Name}, Email: ${user.Email}, Role: ${user.Role}`;
                userList.appendChild(li);
            });
        } else {
            userList.innerHTML = '<li>No users found.</li>';
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        document.getElementById('responseMessage').textContent = 'Error fetching users. Please try again later.';
    }
});
