<script setup>
// Calenadarios em Vue com v-calendar 
// site com imformção sobre v-calendar: https://vcalendar.io/
// Now loads classes from the ClassesStore and maps a class `calendar` array into v-calendar `attributes`.

import { ref, computed, onMounted } from 'vue';
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import { useClassesStore } from '@/stores/classes';

const classesStore = useClassesStore();

const selectedClassIds = ref([]);

onMounted(async () => {
  await classesStore.fetchClasses();
  if (classesStore.classes.length && selectedClassIds.value.length === 0) {
    selectedClassIds.value = [classesStore.classes[0].id];
  }
});

const selectedClasses = computed(() => {
  return selectedClassIds.value
    .map(id => classesStore.getClassById(id))
    .filter(Boolean);
});

const allSelected = computed({
  get() {
    return classesStore.classes.length > 0 && selectedClassIds.value.length === classesStore.classes.length;
  },
  set(val) {
    if (val) selectedClassIds.value = classesStore.classes.map(c => c.id);
    else selectedClassIds.value = [];
  }
});

function toggleSelectAll() {
  if (selectedClassIds.value.length === classesStore.classes.length) {
    selectedClassIds.value = [];
  } else {
    selectedClassIds.value = classesStore.classes.map(c => c.id);
  }
}

function parseEventDate(Date) {
  if (Date === undefined || Date === null) return null;
  //código para datas simples
  if (typeof Date === 'string') return new Date(Date); 
  //código para datas com repeeat
  if (typeof Date === 'object') {
    if (Date.start) return new Date(Date.start);
    if (Date.date) return typeof Date.date === 'number' ? (Date.date > 1e12 ? new Date(Date.date) : new Date(Date.date * 1000)) : new Date(Date.date);
  }
  return null;
}

const mergedAttributes = computed(() => {
  const sel = selectedClasses.value;
  if (!sel.length) return [];

  const attrs = sel.flatMap(cls => {
    if (!Array.isArray(cls.calendar)) return [];
    return cls.calendar.map(ev => {
      const rawDate = ev.data ?? ev.date ?? ev.start ?? ev.dates ?? ev.datetime ?? ev;
      const date = parseEventDate(rawDate);

      const attr = {
        key: `class-${cls.id}-ev-${ev.id ?? Math.random().toString(36).slice(2,8)}`,
        dates: date || new Date(),
        dot: ev.color || cls.color || 'blue',
        popover: { label: ev.titulo ?? ev.title ?? ev.label ?? ev.name ?? cls.name ?? 'Evento' }
      };

      if (ev.repeat) {
        attr.dates = {
          start: date || new Date(),
          repeat: ev.repeat
        };
      }

      return attr;
    });
  });

  attrs.sort((a,b) => {
    const da = a.dates && a.dates.start ? new Date(a.dates.start) : new Date(a.dates);
    const db = b.dates && b.dates.start ? new Date(b.dates.start) : new Date(b.dates);
    return da - db;
  });

  return attrs;
});

</script>

<template>
  <div>
    <div class="class-picker">
    <p>Escolher Disciplinas:</p>
    <label style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.5rem;">
      <input type="checkbox" v-model="allSelected" />
      <strong>Selecionar todos</strong>
    </label>

    <label v-for="cls in classesStore.classes" :key="cls.id" style="display:flex;gap:0.5rem;align-items:center;">
      <input type="checkbox" :value="cls.id" v-model="selectedClassIds" />
      <span>{{ cls.name }}</span>
    </label>
  </div>

  <Calendar :attributes="mergedAttributes" />
  </div>
</template>



<style scoped>

</style>