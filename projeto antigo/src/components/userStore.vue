<script setup>
import { useUserStore } from "../stores/userStore";

const store = useUserStore();

// criar um utilizador inicial
function criar(nome,pass) {
	store.createUser({
		id: 123,
		name: nome,
		password: pass,
		role: "user",
		profilepic: "image",
		disciplinas: [],
		lvl: 1,
		exp: 0,
		streak: 0,
		lembretes: [],
		eventosCalendario: []
	});
}

// adicionar um lembrete
function adicionarLembrete(nome,tempo) {
	store.addLembrete({
		id: Date.now(),
		texto: nome,
		data: tempo
	});
}

function adicionarDisciplina(nome) {
	store.addClass({
		name:nome
	})
}
</script>
