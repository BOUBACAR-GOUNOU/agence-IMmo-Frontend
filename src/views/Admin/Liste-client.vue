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
        <h2>Liste client</h2>
        <hr class="mt-3 mb-4" />
        <div v-if="clients == ''">
          <section class="vp">
            <div class="vp-content">
              <h1>
                <br><br>
                <strong>Aucun client pour le moment </strong>
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
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
              <th scope="col">Adresse</th>
              <th scope="col">Numero téléphone</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(client, index) in clients" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ client.nomClient }}</td>
              <td>{{ client.prenomClient }}</td>
              <td>{{ client.adresseClient }}</td>
              <td>{{ client.telephoneClient }}</td>
              <td>
                <router-link :to="'#' + client.idClient">
                  <button type="submit" class="badge badge-success mr-2">
                    Editer
                  </button>
                </router-link>
                <router-link :to="'#' + client.idClient">
                  <button
                    class="badge badge-danger mr-2"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Supprimer
                  </button>
                </router-link>
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
    <div class="modal-dialog">
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
          <button type="button" class="btn btn-primary">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ClientDataService from "../../services/ClientDataService";
export default {
  name: "client-list",
  data() {
    return {
      clients: [],
    };
  },

  methods: {
    retrieveClient() {
      ClientDataService.getAll()
        .then((response) => {
          this.clients = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveClient();
  },
};
</script>

<style scoped>
a {
  color: rgba(0, 0, 0, 0.55) !important;
}
</style>

