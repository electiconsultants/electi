// Authentication System
class AuthSystem {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = this.getCurrentUser();
    }

    loadUsers() {
        const users = localStorage.getItem('electi_users');
        return users ? JSON.parse(users) : [];
    }

    saveUsers() {
        localStorage.setItem('electi_users', JSON.stringify(this.users));
    }

    getCurrentUser() {
        const user = localStorage.getItem('electi_current_user');
        return user ? JSON.parse(user) : null;
    }

    setCurrentUser(user) {
        localStorage.setItem('electi_current_user', JSON.stringify(user));
        this.currentUser = user;
    }

    register(fullName, company, email, password) {
        // Check if user already exists
        if (this.users.find(u => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }

        const user = {
            id: Date.now().toString(),
            fullName,
            company,
            email,
            password: btoa(password), // Simple encoding (use proper hashing in production)
            createdAt: new Date().toISOString()
        };

        this.users.push(user);
        this.saveUsers();
        
        return { success: true, message: 'Registration successful', user };
    }

    login(email, password) {
        const user = this.users.find(u => 
            u.email === email && u.password === btoa(password)
        );

        if (user) {
            this.setCurrentUser(user);
            return { success: true, message: 'Login successful', user };
        }

        return { success: false, message: 'Invalid email or password' };
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

// Initialize auth system
const auth = new AuthSystem();

// Handle registration form
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const company = document.getElementById('company').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long!');
            return;
        }

        const result = auth.register(fullName, company, email, password);
        
        if (result.success) {
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        } else {
            alert(result.message);
        }
    });
}

// Handle login form
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const result = auth.login(email, password);
        
        if (result.success) {
            window.location.href = 'dashboard.html';
        } else {
            alert(result.message);
        }
    });
}

// Protect dashboard pages
if (window.location.pathname.includes('dashboard') || 
    window.location.pathname.includes('operations') || 
    window.location.pathname.includes('growth') || 
    window.location.pathname.includes('leadership')) {
    
    if (!auth.isAuthenticated()) {
        window.location.href = 'login.html';
    }
}