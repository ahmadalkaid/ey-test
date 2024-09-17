<template>
  <div class="auth">
    <h1>{{ isRegistering ? 'Register' : 'Login' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group" v-if="isRegistering">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="form.username"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          required
        />
      </div>

      <button type="submit">{{ isRegistering ? 'Register' : 'Login' }}</button>

      <p>
        <a @click="toggleForm">{{ isRegistering ? 'Already have an account? Login' : 'Need an account? Register' }}</a>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRegistering: true,
      form: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async handleSubmit() {
    const apiUrl = process.env.VUE_APP_API_BASE_URL;
    const endpoint = this.isRegistering ? '/users/register' : '/auth/signin';
    try {
      const response = await fetch(`${apiUrl + endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.form),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to register user');
      }

      // Redirect to the dashboard after a successful login
      alert('Login successfully');
      console.log('Login successfully');
      this.$router.push({ name: 'UserDashboard' });
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    },
    toggleForm() {
      this.isRegistering = !this.isRegistering;
      this.form.username = '';
    },
  },
};
</script>

<style scoped>
.auth {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 1rem;
}

a {
  cursor: pointer;
}
</style>
