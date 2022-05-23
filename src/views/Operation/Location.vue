<template>
  <section class="py-3">
    <div class="container px-4 px-lg-5 my-5">
      <div>
        <h1>Vérifier</h1>
      </div>
      <br />
      <Form
        class="client-form"
        @submit="saveInformation"
        :validation-schema="schema"
      >
        <div v-if="!successful">
          <div class="row gx-4 gx-lg-5 align-items-center">
            <div class="col-md-6">
              <div class="form-group">
                <label for="nomClient">Nom client</label>
                <Field
                  name="nomClient"
                  type="text"
                  class="form-control"
                  v-model="client.nomClient"
                />
                <ErrorMessage name="nomClient" class="error-feedback" />
              </div>

              <div class="form-group">
                <label for="prenomClient">Prénom client</label>
                <Field
                  name="prenomClient"
                  type="text"
                  class="form-control"
                  v-model="client.prenomClient"
                />
                <ErrorMessage name="prenomClient" class="error-feedback" />
              </div>

              <div class="form-group">
                <label for="adresseClient">Adresse Client</label>
                <!--   <input
                type="text"
                class="form-control"
                id="adresseClient"
                name="adresseClient"
                v-model="client.adresseClient"
                
              
              /> -->
                <Field
                  name="adresseClient"
                  type="text"
                  class="form-control"
                  v-model="client.adresseClient"
                />
                <ErrorMessage name="adresseClient" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="telephoneClient">Téléphone Client</label>
                <!-- <input
                type="texte"
                class="form-control"
                id="telephoneClient"
                name="telephoneClient"
                v-model="client.telephoneClient"
                 @blur="validate('telephoneClient')" 
                 @keypress="validate('telephoneClient')"
               
              />
                <p 
                class="errors" 
                v-if="!!errors.telephoneClient"
            >{{errors.telephoneClient}}</p> -->
                <Field
                  name="telephoneClient"
                  type="text"
                  class="form-control"
                  v-model="client.telephoneClient"
                />
                <ErrorMessage name="telephoneClient" class="error-feedback" />
              </div>
              <div v-if="currentBien.statutBien == 'location'" class="row">
                <div class="form-group col">
                  <label for="cautionLocation">Caution</label>
                  <input
                    type="cautionLocation"
                    class="form-control"
                    id="cautionLocation"
                    name="cautionBail"
                    required
                    v-model="this.cautionLocation"
                    disabled="disabled"
                  />
                </div>
                <div class="form-group col">
                  <label for="dureBail">Durée bail</label>
                  <input
                    type="number"
                    class="form-control"
                    id="dureBail"
                    name="dureBail"
                    required
                    v-model="bail.dureBail"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div>
                <p class="h3">Description</p>
                <p class="lead text-justify">
                  {{ currentBien.descriptionBien }}
                </p>
              </div>
              <hr class="mt-1 mb-1" />
              <div v-if="currentBien.statutBien == 'location'">
                <div>
                  <p class="h3">Prix / Jours</p>
                  <p class="lead text-justify">
                    {{ currentBien.prixBien }} FCFA
                  </p>
                </div>
                <hr class="mt-1 mb-1" />
                <div>
                  <p class="h3">Montant total sur {{ bail.dureBail}} jrs</p>
                  <p class="lead text-justify">
                    {{ currentBien.prixBien * bail.dureBail }} FCFA
                  </p>
                </div>
              </div>
              <div v-else>
                <div>
                  <p class="h3">Prix de vente</p>
                  <p class="lead text-justify">
                    {{ currentBien.prixBien }} FCFA
                  </p>
                </div>
              </div>
            </div>

            <div class="form-group col-md-6">
              <br />
              <br />
              <br />
              <button class="btn btn-primary btn-block" :disabled="loading">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                Accepter
              </button>
            </div>
          </div>
        </div>
      </Form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </section>
</template>

<script>
import BienDataService from "../../services/BienDataService";
import ClientDataService from "../../services/ClientDataService";
import OperationDataService from "../../services/OperationDataService";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
/* import UtilisateurDataService from "../../services/ClientDataService";
import CautionDataService from "../../services/CautionDataService"; */

export default {
  name: "add-client",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      adresseClient: yup
        .string()
        .min(5, "Votre adresse contenu au moins 5 caractères")
        .max(40, "Votre adresse doit contenir moins de 40 caractères")
        .required("Votre adresse est obligatoire"),
      nomClient: yup
        .string()
        .min(3, "Votre nom contenu au moins 5 caractères")
        .max(40, "Votre nom doit contenir moins de 40 caractères")
        .required("Votre nom est obligatoire"),
      prenomClient: yup
        .string()
        .min(3, "Votre prénom contenu au moins 5 caractères")
        .max(40, "Votre prénom doit contenir moins de 40 caractères")
        .required("Votre prénom est obligatoire"),
      telephoneClient: yup
        .string()
        .min(8, "Votre numéro doit contenu 8 chiffres")
        .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Numéro invalide")
        .required("Votre numéro de téléphone est obligatoire"),
  
        
    });
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      cautionLocation: "",
      currentBien: [],

      errors: {
        adresseClient: "",
        telephoneClient: "",
      },
      client: {
        nomClient: this.nomClient,
        prenomClient:this.prenomClient,
        adresseClient: this.adresseClient,
        telephoneClient: this.telephoneClient,
      },
      user: {
        username: this.$store.state.auth.user.username,
        email: this.$store.state.auth.user.email,
        password: this.$store.state.auth.user.password,
      },
      bail: {
        dureBail: 1,
      },
    };
  },
  /*   computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }, */
  methods: {
    getBien(id) {
      BienDataService.get(id)
        .then((response) => {
          this.currentBien = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // recuperation du caution
    retrieveCaution() {
      BienDataService.getCaution()
        .then((response) => {
          this.cautionLocation = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    saveInformation() {
      var data = {
        message: "",
        successful: false,
        loading: true,
        adresseClient: this.client.adresseClient,
        telephoneClient: this.client.telephoneClient,
        nomClient: this.client.nomClient,
        prenomClient: this.client.prenomClient,
        user: this.user,
        bien: this.currentBien,
        cautionLocation: this.cautionLocation,
        dureBail: this.bail.dureBail,
        /*
        numeroCarte: this.payementCarte.numeroCarte,
        nomOperation: this.currentBien.statutBien */
      };

      ClientDataService.create(data)
        .then((response) => {
          console.log(response.data);
          this.successful = true;
          this.loading = false;
          /*  this.message = "Operation reuissie"; */
          this.client = {};
        })
        .catch((e) => {
          this.message = "Operation a échoué";
          console.log(e);
        });

      OperationDataService.create(data)
        .then((response) => {
          console.log(response.data);

          this.message = "Operation reuissie";
        })
        .catch((e) => {
          this.message = "Operation a échoué";
          console.log(e);
        });
    },
  },
  mounted() {
    this.getBien(this.$route.params.id);
    this.retrieveCaution();
  },
};
</script>


<style scoped>
.error-feedback {
  color: red;
}
</style>