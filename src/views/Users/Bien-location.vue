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
                <span class="ms-1 d-none d-sm-inline">Bien </span>
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
        <h2>Liste de biens loués</h2>
        <hr class="mt-3 mb-4" />
         <div v-if="message != ''" class="alert alert-success" role="alert">
          {{ message }}
        </div>
        <div v-if="biens == ''">
          <section class="vp">
            <div class="vp-content">
              <h1>
                <br><br>
                <strong>Aucun biens loués pour le moment </strong>
              </h1>
            </div>
          </section>
       </div>
       <div v-else>
        <div class="card">
          <div class="card-header">Rechercher</div>
        </div>
        <hr class="mt-3 mb-4" />
        <br />
        
        <table class="table">
          <thead class="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Description</th>
              <th scope="col">Categorie</th>
              <th scope="col">Caution</th>
              <th scope="col">Montant</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(bien, index) in biens" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>
                <img
                  class="card-img-top img-thumbnail"
                  style="width: 30%; height: 35"
                  v-bind:src="bien.bien.imageBien"
                  alt="..."
                />
              </td>
              <td>{{ bien.bien.descriptionBien }}</td>
              <td>{{ bien.bien.categorie.nomCategorie}}</td>
              <td>{{ bien.cautionLocation}} FCFA</td>
              <td>{{ bien.bien.prixBien }} FCFA </td>
              <td>
                 <button type="submit" @click="setActiveLocationBien(bien.idLocation)" class="badge badge-warning mr-2"  data-bs-toggle="modal"   data-bs-target="#staticBackdrop">
                    Restituer
                  </button>         
              </td>
            </tr>
          </tbody>
        </table>
       </div>
      </div>
    </div>
  </div>


  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Restitution</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Veuillez confimer la restiution!</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Fermer
          </button>
          <button type="button"  @click="restituesLocationBien()"  data-bs-dismiss="modal" class="btn btn-primary">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import LocationDataService from "../../services/LocationDataService";
export default {
  name: "biens-loues",
  data() {
    return {
      biens: [],
      currentIdLocationBien:"",
      message: "",
    };
  },
  
  methods: {
    getBienLouesByClient(id) {
      LocationDataService.getBienLouesByClient(id)
        .then((response) => {
          this.biens = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    setActiveLocationBien(idLocationBien) {
      this.currentIdLocationBien = idLocationBien;
    },
    
    restituesLocationBien() {
      var data = {
        restituerBien: true
      };

    LocationDataService.restituesLocationBien(this.currentIdLocationBien,data)
        .then((response) => {
          console.log(response.data);
          this.message = 'Restitution réuissie';
          this.getBienLouesByClient(this.$store.state.auth.user.id); 
        })
        .catch((e) => {
          console.log(e);
        });
    },


  },
  mounted() {
     this.getBienLouesByClient(this.$store.state.auth.user.id);
  },
};
</script>


<style scoped>
a {
  color: rgba(0, 0, 0, 0.55) !important;
}
</style>