<template>
  <div class="home">
    <NewForm />
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import NewForm from "@/components/NewForm.vue";
export default {
  name: "Home",
  components: {
    NewForm
  }
};
</script>
