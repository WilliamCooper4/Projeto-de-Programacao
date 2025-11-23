const sidebar = document.getElementById('sidebar');
const sidebar0 = document.getElementById('sidebar0');
const testbtn = document.getElementById('testbtn');
const UnitName = document.getElementById('name');
const desc = document.getElementById('desc');
const execise = document.getElementById('execise');

var isSidebarVisible = true;
testbtn.addEventListener('click', function() {
    if (isSidebarVisible===false){
        sidebar.classList.remove("invisible");
        sidebar0.classList.remove("invisible");
        console.log("change to visible");
        isSidebarVisible=true;
    }
    else if (isSidebarVisible===true){
        sidebar.classList.add("invisible");
        sidebar0.classList.add("invisible");
        console.log("change to invisible");
        isSidebarVisible=false;
    }
});


// Pegar dados da disciplina~

UnitName.textContent = "Matemática Discreta";
desc.textContent = "Estudo dos conceitos fundamentais da matemática que são aplicados na ciência da computação, incluindo lógica, teoria dos conjuntos, relações, funções, grafos e combinatória.";
execise.textContent = "1. Prove que a soma dos primeiros n números naturais é dada pela fórmula n(n + 1)/2. \n 2. Determine o número de maneiras distintas de organizar os livros em uma prateleira. \n 3. Mostre que o conjunto dos números racionais é denso nos números reais.\n4. Resolva o problema do caixeiro viajante para um grafo completo com 5 vértices.\n5. Calcule o número de permutações de 7 elementos tomados 3 a 3.";

