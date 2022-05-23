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
        <div class="row">
          <div class="col-8">
            <h2>Editer biens</h2>
          </div>
        </div>
        <hr class="mt-3 mb-4" />
        <div v-if="message != ''" class="alert alert-success" role="alert">
          {{ message }}
        </div>
        <div v-else>
        <div class="card">
          <div class="card-header">  Biens</div>
        </div>
        <br />
        <hr class="mt-3 mb-4" />
        <br />

        <Form
          class="client-form"
          @submit="updateBien"
          :validation-schema="schema"
        >
           <div class="">
              <div class="form-group">
                <label for="descriptionBien"> Description</label>
                <Field
                  name="descriptionBien"
                  type="text"
                  class="form-control"
                  v-model="currentBien.descriptionBien"
                />
                <ErrorMessage name="descriptionBien" class="error-feedback" />
              </div>
               <div class="form-group">
                <label for="localisationBien"> Localisation</label>
                <Field
                  name="localisationBien"
                  type="text"
                  class="form-control"
                  v-model="currentBien.localisationBien"
                />
                <ErrorMessage name="localisationBien" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="prixBien"> Prix bien par jours</label>
                <Field
                  name="prixBien"
                  type="text"
                  class="form-control"
                  v-model="currentBien.prixBien"
                />
                <ErrorMessage name="prixBien" class="error-feedback" />
              </div>
              <div class="form-group">
                <label for="imageBien">Image</label>
                <Field
                  name="imageBien"
                  type="text"
                  class="form-control"
                  v-model="currentBien.imageBien"
                />
              </div>
              <div class="form-group">
                <label for="quantiteBien">Quantité</label>
                <Field
                  name="quantiteBien"
                  type="number"
                  class="form-control"
                  v-model="currentBien.quantiteBien"
                />
              </div>

              <div class="form-group"> 
                <label for="prixBien">Statut </label>
                <select class="form-select" aria-label="Default select example"  v-model="statut" >
                <option  v-bind:value="'location'">Location</option>
                <option  v-bind:value="'vente'">Vente</option>
              </select>
              </div>
              <div class="form-group">
                <label for="categorieBien">Catégorie </label>
                <select  class="form-select" v-model="selected"  >
                <option  v-for="(categorie, index) in categories" :key="index"  v-bind:value="categorie">
                    {{categorie.nomCategorie}}
                </option>
              </select>
              </div>
                 <br> <br>
               <div class="form-group">
          <button class="btn btn-primary btn-block col-6" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Modifier</span>
          </button>
        </div>

           </div>
        </Form>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import BienDataService from "../../services/BienDataService";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";


export default {
  name: "add-client",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    
    const schema = yup.object().shape({
       descriptionBien: yup
        .string()
        .min(5, "La description doit contenu au moins 5 caractères")
        .max(120, "La description doit contenir moins de 120 caractères")
        .required("La description est obligatoire"),
      localisationBien: yup
        .string()
        .min(3, "La localisation doit contenu au moins 5 caractères")
        .max(40, "La localisation doit avoir moins de 40 caractères")
        .required("La localisation est obligatoire"),
      prixBien: yup
        .string()
        .min(4, "Le montant minumum est de 1000")
        .required("Le montant est obligatoire"),
    });
    return {
      categories: [],
      statut:'',
      selected: '',
      loading: false,
      message: "",
      schema,

      errors: {
        descriptionBien: "",
        localisationBien: "",
        prixBien:""
      },
      currentBien: {
        descriptionBien: this.descriptionBien,
        localisationBien: this.localisationBien,
        prixBien: this.prixBien,
        quantiteBien : this.quantiteBien,
        imageBien: this.imageBien
      },
    };
  },
  methods: {
      retrieveCategorie() {
      BienDataService.getCategorie()
        .then((response) => {
          this.categories = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

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

    updateBien() {
     var data = {
        descriptionBien: this.currentBien.descriptionBien,
        localisationBien: this.currentBien.localisationBien,
        prixBien: this.currentBien.prixBien,
        quantiteBien : this.currentBien.quantiteBien,
        imageBien: this.currentBien.imageBien,
        categorie: this.selected,
        statutBien: this.statut,
      };
     BienDataService.updateBien(this.currentBien.idBien, data)
        .then((response) => {
          console.log(response.data);
          this.message = "Le Bien a été mise à jour avec sucess !";
        })
        .catch((e) => {
          console.log(e);
           this.message = "Echec mise à jour avec sucess !";
        });
    },

   
  },
      mounted() {
      this.retrieveCategorie();
      this.getBien(this.$route.params.id);

 },

};
</script>


<style scoped>
a {
  color: rgba(0, 0, 0, 0.55) !important;
}
.error-feedback {
  color: red;
}
</style>
