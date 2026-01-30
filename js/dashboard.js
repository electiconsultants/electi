// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load user info
    const auth = new AuthSystem();
    const user = auth.getCurrentUser();
    
    if (user) {
        // Update user display
        const userNameElements = document.querySelectorAll('#userName');
        userNameElements.forEach(el => {
            el.textContent = user.fullName.split(' ')[0];
        });
        
        const userEmailElements = document.querySelectorAll('#userEmail');
        userEmailElements.forEach(el => {
            el.textContent = user.email;
        });
        
        const userAvatarElements = document.querySelectorAll('#userAvatar');
        userAvatarElements.forEach(el => {
            el.textContent = user.fullName.charAt(0).toUpperCase();
        });
    }
    
    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                auth.logout();
            }
        });
    }
});

// Authentication System (needed for dashboard pages)
class AuthSystem {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = this.getCurrentUser();
    }

    loadUsers() {
        const users = localStorage.getItem('electi_users');
        return users ? JSON.parse(users) : [];
    }

    getCurrentUser() {
        const user = localStorage.getItem('electi_current_user');
        return user ? JSON.parse(user) : null;
    }

    logout() {
        localStorage.removeItem('electi_current_user');
        this.currentUser = null;
        window.location.href = 'index.html';
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }
}