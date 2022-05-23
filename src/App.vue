<template>
  <div id="app">
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container  px-4 px-lg-5">
        <a class="navbar-brand" aria-current="page" href="/home">AGence IMmo</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li v-if="showModeratorBoard" class="nav-item">
              <router-link to="/mod" class="nav-link"
                >Moderator Board</router-link
              >
            </li>
            
            <li class="nav-item">
              <router-link  to="/bien/en-location" class="nav-link"
                >Louer</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/bien/en-vente" class="nav-link"
                >Acheter</router-link
              >
            </li>
          </ul>
          <div v-if="!currentUser" class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/login" class="nav-link">
                <font-awesome-icon icon="sign-in-alt" /> Se connecter
              </router-link>
            </li>

            <li class="nav-item">
              <router-link to="/register" class="nav-link">
                <font-awesome-icon icon="user-plus" /> S'inscrire
              </router-link>
            </li>
          </div>

          <div v-if="currentUser" class="navbar-nav ml-auto">

              <li  v-if="currentUser && !showAdminBoard"  class="nav-item">
              <router-link to="/user" class="nav-link"
                >  <i class="bi bi-speedometer2"></i>Tableau de bord</router-link
              >
            </li>

             <li v-if="showAdminBoard" class="nav-item">
              <router-link to="/admin" class="nav-link"
                >  <i class="bi bi-speedometer2"></i>Tableau de bord</router-link
              >
            </li>
            
            <li class="nav-item">
              <router-link to="/profile" class="nav-link">
                <font-awesome-icon icon="user" />
                {{ currentUser.username }}
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="logOut">
                <font-awesome-icon icon="sign-out-alt" /> Deconnexion
              </a>
            </li>
          </div>
        </div>
      </div>
    </nav>
    <!-- Header-->
    <!--  <header class="bg-dark py-5">
            <div class="container px-4 px-lg-5 my-5">
                <div class="text-center text-white">
                    <h1 class="display-4 fw-bolder">Shop in style</h1>
                    <p class="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
                </div>
            </div>
        </header> -->
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_ADMIN");
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_MODERATOR");
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
