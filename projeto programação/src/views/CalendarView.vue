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
    selectedClassIds.value = [String(classesStore.classes[0].id)];
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
    if (val) selectedClassIds.value = classesStore.classes.map(c => String(c.id));
    else selectedClassIds.value = [];
  }
});

function toggleSelectAll() {
  if (selectedClassIds.value.length === classesStore.classes.length) {
    selectedClassIds.value = [];
  } else {
    selectedClassIds.value = classesStore.classes.map(c => String(c.id));
  }
}
function logState(label) {
  console.log(label, 'allSelected=', allSelected.value, 'selectedClassIds=', selectedClassIds.value);
}
function parseEventDate(input) {
  if (input === undefined || input === null) return null;
  // código para datas simples
  if (typeof input === 'string') return new Date(input);
  // código para datas com repeat
  if (typeof input === 'object') {
    if (input.start) return new Date(input.start);
    
  }
  return null;
}

const mergedAttributes = computed(() => {
  const sel = selectedClasses.value;
  if (!sel.length) return [];

  const attrs = sel.flatMap(cls => {
    if (!Array.isArray(cls.calendar)) return [];
    return cls.calendar.map(ev => {
      const rawDate = ev.data ?? ev.date ?? ev.start ?? ev;
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
  <aside class="side-bar">
				<h3>Disciplinas</h3>
				<div class="class-picker">
    <label style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.5rem;">
      <input type="checkbox" v-model="allSelected" @change="logState('allSelected')" />
      <strong>Selecionar todos</strong>
    </label>

    <label v-for="cls in classesStore.classes" :key="cls.id" style="display:flex;gap:0.5rem;align-items:center;">
      <input type="checkbox" :value="String(cls.id)" v-model="selectedClassIds" @change="logState(cls.id)" />
      <span>{{ cls.name }}</span>
    </label>
    <Calendar class="cal" :attributes="mergedAttributes"  view="weekly"/>
  </div>

   <DxList 
     :scrollingEnabled="false"
   />


	</aside>
  <main class="main-content">
    <Calendar class="cal" :attributes="mergedAttributes" expanded=""/>
  </main>
</template>



<style scoped>
  .main-content {
    margin-left: 17%;
    padding: 2rem;
  }

  .cal {
    position: static;
    height: 900px;
    margin: 2rem auto;
  }


</style>