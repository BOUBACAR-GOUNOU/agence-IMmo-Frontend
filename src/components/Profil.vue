<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        Profile: {{currentUser.username}}
      </h3>
      <p>
      <strong>Email:</strong>
       {{currentUser.email}}
    </p>
    </header>
   
    
   <!--  <strong>Authorities:</strong>
    <ul>
      <li v-for="role in currentUser.roles" :key="role">{{role}}</li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>