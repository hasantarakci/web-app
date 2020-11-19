<template>
  <header>
    <h1>{{ Header }}</h1>
  </header>
</template>

<script>
export default {
  props: {
    Header: {
      type: String,
      default: "Başlık"
    }
  }
};
</script>

<style lang="scss">
header {
  width: 100%;
  background-color: #e96e50;
  border-radius: 4px;
}
</style>
