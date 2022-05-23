<template>
  <div v-if="currentUtilisateur" class="edit-form">
    <h4>Utilisateur</h4>
    <form>
      <div class="form-group">
        <label for="nomUtilisateur">Nom</label>
        <input
          type="text"
          class="form-control"
          id="nomUtilisateur"
          v-model="currentUtilisateur.nomUtilisateur"
        />
      </div>

      <div class="form-group">
        <label for="prenomUtilisateur">Prenom</label>
        <input
          type="text"
          class="form-control"
          id="prenomUtilisateur"
          v-model="currentUtilisateur.prenomUtilisateur"
        />
      </div>

      <div class="form-group">
        <label><strong>Email:</strong></label>
        <input
          type="email"
          class="form-control"
          id="emailUtilisateur"
          v-model="currentUtilisateur.emailUtilisateur"
        />
      </div>


    </form>

    <button class="badge badge-danger mr-2" @click="deleteUtilisateur">
      Supprimer
    </button>
    <button type="submit" class="badge badge-success" @click="updateUtilisateur">
      Mise à jour
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Cliquer sur un utilisateur ...</p>
  </div>
</template>
<script>
import UtilisateurDataService from "../../services/UtilisateurDataService";
export default {
  name: "utilisateur",
  data() {
    return {
      currentUtilisateur: null,
      message: '',
    };
  },
  methods: {
    getUtilisateur(id) {
      UtilisateurDataService.get(id)
        .then((response) => {
          this.currentUtilisateur = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
    updateUtilisateur() {
     UtilisateurDataService.update(this.currentUtilisateur.idUtilisateur, this.currentUtilisateur)
        .then((response) => {
          console.log(response.data);
          this.message = "L'utilisateur a été mise à jour avec sucess !";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteUtilisateur() {
      UtilisateurDataService.delete(this.currentUtilisateur.idUtilisateur)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "utilisateur" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getUtilisateur(this.$route.params.id);
  },
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>