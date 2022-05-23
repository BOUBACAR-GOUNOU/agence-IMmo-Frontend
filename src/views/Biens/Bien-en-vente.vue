<template>
  <section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">
      <div
        class="
          row
          gx-4 gx-lg-5
          row-cols-2 row-cols-md-3 row-cols-xl-4
          justify-content-center
        "
      >
        <div v-if="biens == ''">
          <section class="vp">
            <div class="vp-content">
              <h1>
                <strong>Aucun article disponible</strong>
              </h1>
            </div>
          </section>
        </div>
     
        <div v-else class="col mb-5" v-for="bien in biens" :key="bien.idBien">
          <div class="card h-100">
            <div
              class="badge bg-dark text-white position-absolute"
              style="top: 0.5rem; right: 0.5rem"
            >
              En vente
            </div>
            <!-- Product image-->
            <img class="card-img-top" v-bind:src="bien.imageBien" alt="..." />

            <!-- Product details-->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">
                  {{ bien.descriptionBien.slice(0, 35) }}[...]
                </h5>
                <!-- Product price-->
                {{ bien.prixBien }} FCFA
              </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <router-link :to="'/bien/details/' + bien.idBien">
                <div class="text-center">
                  <a class="btn btn-outline-dark mt-auto"
                    >Voir details <i class="bi bi-eye"></i
                  ></a>
                </div>
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
  name: "biens-list",
  data() {
    return {
      biens: [],
    };
  },
  methods: {
    retrieveBiens() {
      BienDataService.getBiensVente()
        .then((response) => {
          this.biens = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveBiens();
  },
};
</script>

<style>
</style>
