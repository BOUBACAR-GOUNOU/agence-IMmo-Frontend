<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Rechercher par nom"
          v-model="nomUtilisateur"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchNom"
          >
            Recherche
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Liste Utilisateur</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(utilisateur, index) in utilisateurs"
          :key="index"
          @click="setActiveUtilisateur(utilisateur, index)"
        >
          {{ utilisateur.nomUtilisateur }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentUtilisateur">
        <h4>Utilisateur</h4>
        <div>
          <label><strong>Nom:</strong></label> {{ currentUtilisateur.nomUtilisateur}}
        </div>
        <div>
          <label><strong>Prenom:</strong></label>
          {{ currentUtilisateur.prenomUtilisateur }}
        </div>
        <div>
          <label><strong>Email:</strong></label>
          {{ currentUtilisateur.emailUtilisateur}}
        </div>
        <router-link :to="'/utilisateur/' + currentUtilisateur.idUtilisateur" class="badge badge-warning">Editer</router-link>
      </div>
      <div v-else>
        <br />
        <p>Cliquer sur l'utilisateur.</p>
      </div>
    </div>
  </div>
</template>
<script>
import UtilisateurDataService from "../../services/UtilisateurDataService";
export default {
  name: "utilisateurs-list",
  data() {
    return {
      utilisateurs: [],
      idUtilisateur: "",
      currentUtilisateur: null,
      currentIndex: -1,
      nomUtilisateur: "",
    };
  },
  methods: {
    retrieveUtilisateurs() {
      UtilisateurDataService.getAll()
        .then((response) => {
          this.utilisateurs = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveUtilisateurs();
      this.currentUtilisateur = null;
      this.currentIndex = -1;
    },

    setActiveUtilisateur(utilisateur, index) {
      this.currentUtilisateur = utilisateur;
      this.currentIndex = index;
    },

    searchNom() {
      UtilisateurDataService.findByName(this.nomUtilisateur)
        .then((response) => {
          this.utilisateurs = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveUtilisateurs();
  },
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
