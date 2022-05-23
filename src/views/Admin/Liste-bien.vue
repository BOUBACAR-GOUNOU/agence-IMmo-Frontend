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
            <li class="nav-item ">
              <router-link to="/admin" class="nav-link align-middle px-0">
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
                  <router-link to="/admin/liste-bien" class="nav-link">
                    <i class="bi bi-list"></i>
                    <span class="d-none d-sm-inline"
                      >Tous les biens</span
                    ></router-link
                  >
                </li>
                <li>
                  <router-link to="/admin/ad-bien" class="nav-link">
                    <i class="bi bi-plus"></i>
                    <span class="d-none d-sm-inline">Ajouter</span></router-link
                  >
                </li>
              </ul>
            </li>

            <li>
              <a
                href="#submenu2"
                data-bs-toggle="collapse"
                class="nav-link px-0 align-middle"
              >
                <i class="bi bi-person-circle"></i>
                <span class="ms-1 d-none d-sm-inline">Clients</span>
              </a>
              <ul
                class="collapse show nav flex-column ms-1"
                id="submenu2"
                data-bs-parent="#menu"
              >
                <li>
                  <router-link to="/admin/liste-client" class="nav-link">
                    <i class="bi bi-list"></i>
                    <span class="d-none d-sm-inline">Tout lister</span>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
          <hr />
        </div>
      </div>
      <div class="col py-5 ml-5">
        <div class="row">
              <div class="col-8">
                  <h2>Liste biens</h2>
              </div>
              <div class="col-4 text-right">
                 <router-link to="/admin/ad-bien" class="nav-link">
                  <button type="submit" class=" btn btn-success">
                    Ajouter
                  </button>  
                 </router-link>  
              </div>
        </div>
        <div v-if="biens == ''">
          <section class="vp">
            <div class="vp-content">
              <h1>
                <hr class="mt-3 mb-4" />
                <br> <br>
                <strong>Aucun bien n'est disponible</strong>
              </h1>
            </div>
          </section>
       </div>
      <div v-else>
        <hr class="mt-3 mb-4" />
        <div v-if="message!=''" class="alert alert-success" role="alert">
           {{message}}
        </div>
        <div class="card">
          <div class="card-header">Rechercher</div>
        </div>
        <br>
        <hr class="mt-3 mb-4" />
        <br />

        <table class="table">
          <thead class="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Description</th>
              <th scope="col">Categorie</th>
              <th scope="col">Montant</th>
              <th scope="col">Localisation</th>
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
                  v-bind:src="bien.imageBien"
                  alt="..."
                />
              </td>
              <td>{{ bien.descriptionBien }}</td>
              <td>{{ bien.categorie.nomCategorie }}</td>
              <td>{{ bien.prixBien }} FCFA</td>
              <td>{{ bien.localisationBien }}</td>
              <td>
                <router-link :to="'/admin/Editer-bien/' + bien.idBien">
                  <button
                    class="badge badge-success mr-2"
                  >
                    Editer
                  </button>
                </router-link>
               
                  <button type="submit" @click=" setActiveBien(bien.idBien)" class="badge badge-danger mr-2"  data-bs-toggle="modal"   data-bs-target="#staticBackdrop">
                    supprimer
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
          <h5 class="modal-title" id="staticBackdropLabel">Suppression</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Veuillez confimer la Suppression!</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Fermer
          </button>
          <button type="button"  @click="deleteBien()"  data-bs-dismiss="modal" class="btn btn-primary">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import BienDataService from "../../services/BienDataService";
export default {
  name: "biens",
  data() {
    return {
      showModal: false,
      biens: [],
      currentIdBien:'',
      message: ''
    };
  },

  methods: {
    retrieveBiens() {
      BienDataService.getAll()
        .then((response) => {
          this.biens = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
    
    setActiveBien(idBien) {
      this.currentIdBien = idBien;
    },

    deleteBien() {
      BienDataService.deleteBien(this.currentIdBien)
        .then((response) => {
          console.log(response.data);
          this.message = 'Suppression réuissie';
           this.retrieveBiens()
         
          
        })
        .catch((e) => {
          console.log(e);
        });
    },


  },
  mounted() {
    this.retrieveBiens ();
  },

  close() {
        this.$emit('close');
      },
};
</script>



<style scoped>
a {
  color: rgba(0, 0, 0, 0.55) !important;
}
</style>

