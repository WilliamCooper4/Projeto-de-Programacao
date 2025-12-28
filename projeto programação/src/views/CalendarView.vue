<script setup>
// Calenadarios em Vue com v-calendar 
// site com imformção sobre v-calendar: https://vcalendar.io/
// quando o calendario ficar completo fazer com que os atributos venham possivelmente da ClassesStore sendo que cada disciplina tem uma lista de datas diferentes


import { ref } from 'vue';
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';


const attributes = ref([
  {
    dot: "blue",
    dates: {
      start: new Date(2025, 12, 7),
      repeat: {
        every: [1, 'weeks'],
        weekdays: 4,
      },
    },
    popover: {
      label: 'Aula de Matemática',
    },
  },
  {
    dot: "red",
    dates: new Date(2025, 12, 14),
    popover: {
      label: 'Entrega de Trabalho de História',
    },
  },
]);

</script>
<template>
  <Calendar :attributes="attributes" />
</template>



<style scoped>

</style>