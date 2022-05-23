<template>
  <div class="container-fluid">
    <div class="row flex-nowrap py-1">
      <div
        class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 navbar-light bg-light"
      >
        <div
          class="
            d-flex
            flex-column
            align-items-center align-items-sm-start
            px-3
            pt-2
            text-white
            min-vh-100
          "
        >
          <ul
            class="
              nav nav-pills
              flex-column
              mb-sm-auto mb-0
              align-items-center align-items-sm-start
            "
            id="menu"
          >
            <li class="nav-item">
              <router-link to="/user" class="nav-link align-middle px-0">
                <i class="bi bi-speedometer2"></i>
                <span class="ms-1 d-none d-sm-inline">Mon tableau de bord</span>
              </router-link>
            </li>

            <li>
              <a
                href="#submenu1"
                data-bs-toggle="collapse"
                class="nav-link px-0 align-middle"
              >
                <i class="bi bi-kanban"></i>
                <span class="ms-1 d-none d-sm-inline">Bien</span>
              </a>
              <ul
                class="collapse show nav flex-column ms-1"
                id="submenu1"
                data-bs-parent="#menu"
              >
                <li>
                  <router-link to="/user/biens-loues" class="nav-link">
                    <i class="bi bi-list"></i>
                    <span class="d-none d-sm-inline"
                      >Tous les biens Loués</span
                    ></router-link
                  >
                </li>
                <li>
                  <router-link to="/user/biens-restitues" class="nav-link">
                    <i class="bi bi-list"></i>
                    <span class="d-none d-sm-inline"
                      >Tous les biens restitués</span
                    ></router-link
                  >
                </li>
        
              </ul>
            </li>
          </ul>
          <hr />
        </div>
      </div>
     
        <div class="col py-5 ml-5">
        <div class="row">
          <div class="col-4">
          <div class="card bg-light mb-4" style="max-width: 18rem">
            <div class="card-body text-right">
              <h5 class="card-title">{{ this.nombreBiensLoues}}</h5>
              <p class="card-text">Bien Loués</p>
            </div>
            <div class="card-header">
              <router-link to="/user/biens-loues" class="nav-link">
                <span class="d-none d-sm-inline">Voirs details</span>
              </router-link>
            </div>
          </div>
          </div>
          
         <div class="col-4">
          <div class="card bg-light mb-4" style="max-width: 18rem">
            <div class="card-body text-right">
              <h5 class="card-title">{{ this.nombreBiensRestitues}}</h5>
              <p class="card-text">Biens Restitués</p>
            </div>
            <div class="card-header">
              <router-link to="/user/biens-restitues" class="nav-link">
                <span class="d-none d-sm-inline">Voirs details</span>
              </router-link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import LocationDataService from "../services/LocationDataService";

export default {
  name: "Admin",
  data() {
    return {
      nombreBiensRestitues: "",
      nombreBiensLoues: "",
    };
  },

  methods: {
    
    compteBiensLouesByClient(id) {
      LocationDataService.compteBiensLouesByClient(id)
        .then((response) => {
          this.nombreBiensLoues = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

      compteBiensRestituerByClient(id) {
      LocationDataService.compteBiensRestituerByClient(id)
        .then((response) => {
          this.nombreBiensRestitues = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

   mounted() {
        this.compteBiensLouesByClient(this.$store.state.auth.user.id);
        this.compteBiensRestituerByClient(this.$store.state.auth.user.id)
  },
  
};
</script>


<style scoped>
a {
  color: rgba(0, 0, 0, 0.55) !important;
}
</style>

