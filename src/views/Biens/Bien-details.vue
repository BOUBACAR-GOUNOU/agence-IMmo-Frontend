<template>
  <section class="py-5">
    <div class="container px-4 px-lg-5 my-5">
      <div class="row gx-4 gx-lg-5 align-items-center">
        <div class="col-md-6">
          <img
            class="card-img-top mb-5 mb-md-0"
            v-bind:src="currentBien.imageBien"
            alt="..."
          />
        </div>
        <div class="col-md-6">
          <div>
            <p class="h3">Description</p>
            <p class="lead text-justify">{{ currentBien.descriptionBien }}</p>
          </div>
          <div>
            <p class="h3">Localisation</p>
            <p class="lead text-justify">{{ currentBien.localisationBien }}</p>
          </div>
          <div>
            <p class="h3">Prix</p>
            <p class="lead text-justify">{{ currentBien.prixBien }} FCFA </p>
          </div>
          <div>
            <p class="h3">Quantité disponible</p>
            <p class="lead text-justify">{{ currentBien.quantiteBien }}</p>
          </div>
          <div class="d-flex">
            <div v-if="currentBien.statutBien == 'location'">
                 <router-link :to="'/bien/operation/location/' + currentBien.idBien">
              <button class="btn btn-outline-dark flex-shrink-0" type="button">
                Louer <i class="bi bi-arrow-up-right-square-fill"></i>
              </button>
            </router-link>
            </div>
            <div v-else>
              <router-link :to="'/bien/operation/location/' + currentBien.idBien">
              <button class="btn btn-outline-dark flex-shrink-0" type="button">
                Acheter <i class="bi bi-arrow-up-right-square-fill"></i>
              </button>
            </router-link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BienDataService from "../../services/BienDataService";
export default {
  name: "bien",
  data() {
    return {
      currentBien: [],
      message: "",
    };
  },
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
  },
  mounted() {
    this.message = "";
    this.getBien(this.$route.params.id);
  },
};
</script>
