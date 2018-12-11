<style lang="scss" module>
.date-time-picker :global {
  @import "./app__DateTimePicker.vue.scss";
}
</style>
<template lang="pug">
  div(:class="$style.dateTimePicker")
    date-picker(:value="value", @input="val=>$emit('input', val)", :config="config")
</template>
<script>
import datePicker from "vue-bootstrap-datetimepicker";

export default {
  name: "DateTimePicker",
  components: { datePicker },
  props: {
    value: {
      default: null,
      required: true
    }
  },
  data: () => ({
    config: {
      format: "DD/MM/YYYY",
      useCurrent: false
    }
  })
};
</script>
