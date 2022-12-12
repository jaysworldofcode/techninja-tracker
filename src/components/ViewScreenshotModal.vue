
<template>
    <div id="modal-screenshot" class="modal">
        <span class="close" @click="close">&times;</span>
        <img class="modal-content" id="modal-screenshot-image">
        <div id="modal-screenshot-caption" class="d-flex justify-center mt-4 white--text">
            <span>Task: {{ view_screenshot? view_screenshot.working_on:'' }}</span>
        </div>
    </div>
</template>
  
<script>
    export default {
      name: 'view-screenshot-modal',
      data: () => ({
        api_url: process.env.VUE_APP_API_URL
      }),
      computed: {
        view_screenshot(){
            return this.$store.state.view_screenshot;
        },
      },
      methods: {
        close(){
            var modal = document.getElementById("modal-screenshot");
            modal.style.display = "none";
        }
      }
    }
  </script>
<style lang="scss" scoped>
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
}

/* Modal Content (image) */
.modal-content {
  margin: auto;
  display: block;
  width: 70%;
}

/* Caption of Modal Image */
#caption {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
  height: 150px;
}

/* Add Animation */
.modal-content, #caption {  
  -webkit-animation-name: zoom;
  -webkit-animation-duration: 0.6s;
  animation-name: zoom;
  animation-duration: 0.6s;
}

@-webkit-keyframes zoom {
  from {-webkit-transform:scale(0)} 
  to {-webkit-transform:scale(1)}
}

@keyframes zoom {
  from {transform:scale(0)} 
  to {transform:scale(1)}
}

/* The Close Button */
.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px){
  .modal-content {
    width: 100%;
  }
}
</style>
  