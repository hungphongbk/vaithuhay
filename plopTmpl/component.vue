<style lang="scss" module>

</style>
<template lang="pug">

</template>
{{#xif "['tx','tsx'].indexOf(lang)"}}
<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({})
    export default class {{pascalCase name}} extends Vue {

    }
</script>
{{else}}
<script>
    export default {
        name: '{{dashCase name}}',
        props: {

        },
    };
</script>
{{/xif}}
