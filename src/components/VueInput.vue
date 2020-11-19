<template>
  <input
    class="inputWrapper"
    type="text"
    :placeholder="placeholder"
    :value="value"
    :ref="inputref"
  />
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "placeholder"
    },
    value: {
      type: String,
      default: "London"
    },
    inputref: {
      type: String,
      default: "inputRef"
    }
  }
};
</script>

<style lang="scss">
.inputWrapper {
  border: 1px solid transparent;
  border-radius: 3px;
  border-color: #c1593f;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  margin: 5px;
}
</style>
