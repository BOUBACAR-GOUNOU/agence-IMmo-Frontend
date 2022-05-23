<template>
<form>
  <div class="submit-form" >
    <div v-if="!submitted"  >
    
      <div class="form-group"  >
        <label for="nomUtilisateur" class="form-label">Nom</label>
        <input
          type="text"
          class="form-control"
          id="nomUtilisateur"
          required
          v-model="utilisateur.nomUtilisateur"
          name="nomUtilisateur"
        />
      </div>

      <div class="form-group">
        <label for="prenomUtilisateur" class="form-label">Prénom</label>
        <input
          type="text"
          class="form-control"
          id="prenomUtilisateur"
          required
          v-model="utilisateur.prenomUtilisateur"
          name="prenomUtilisateur"
        />
      </div>

      <div class="form-group">
        <label for="emailUtilisateur" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="emailUtilisateur"
          required
          v-model="utilisateur.emailUtilisateur"
          name="emailUtilisateur"
        />
      </div>

      <div class="form-group" >
        <label for="motPassUtilisateur" class="form-label">Mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="motPassUtilisateur"
          required
          v-model="utilisateur.motPassUtilisateur"
          name="motPassUtilisateur"
        />
      </div>
        <button @click="saveUtilisateur" class="btn btn-success">Enregistrer</button>
    </div>
    <div v-else>
      <h4>Enregistrement reuissi !</h4>
      <button class="btn btn-success" @click="newUtilisateur">Ajouter</button>
    </div>
  </div>
</form>
</template>

<script>
import UtilisateurDataService from "../../services/UtilisateurDataService";


export default {

  name: "add-utilisateur",
  data() {
    return {
      utilisateur: {
        idUtilisateur: null,
        nomUtilisateur: "",
        prenomUtilisateur: "",
        emailUtilisateur: "",
        motPassUtilisateur: "",
      },
      submitted: false,
    };
  },
  
  methods: {
    saveUtilisateur() {
      var data = {
        nomUtilisateur: this.utilisateur.nomUtilisateur,
        prenomUtilisateur: this.utilisateur.prenomUtilisateur,
        emailUtilisateur: this.utilisateur.emailUtilisateur,
        motPassUtilisateur: this.utilisateur.motPassUtilisateur,
      };
      UtilisateurDataService.create(data)
        .then((response) => {
          this.utilisateur.idUtilisateur = response.data.idUtilisateur;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newUtilisateur() {
      this.submitted = false;
      this.utilisateur = {};
    },
  },
  
};

</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>