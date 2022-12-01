
<template>
    <v-container @click="viewImage" class="container shadow-hov">
        <v-card class="elevation-0">
            <div>
                <v-img :src="(api_url+'screenshot/'+data.image)" max-height="125" class="grey darken-4"></v-img>
            </div>
            <v-card-title class="d-flex flex-column">
                <span class="body-2"><span class="font-weight-bold">Name:</span>{{ data.username }}</span>
                <span class="body-2"><span class="font-weight-bold">Working on:</span>{{ data.working_on }}</span>
                <span class="body-2 blue-grey--text">{{ new Date(data.date_added).toLocaleString() }}</span>
            </v-card-title>
        </v-card>
    </v-container>
  </template>
  
  <script>
    export default {
      name: 'screenshot-item',
      props: ['data'],
      data: () => ({
      }),
      computed: {
        api_url(){
            return this.$store.state.api_url;
        },
      },
      methods: {
        viewImage(){
            this.$store.commit("setViewScreenhot", this.data);
            var modal = document.getElementById("modal-screenshot");
            var modalImg = document.getElementById("modal-screenshot-image");

            modal.style.display = "block";
            modalImg.src = this.api_url+'screenshot/'+this.data.image;
        },
        clearDateFromMongoose(){

        }
      }
    }
  </script>
<style lang="scss" scoped>

.container{
    cursor: pointer;
    border: 1px solid #ececec;
    border-radius: 4px;
}
</style>
  