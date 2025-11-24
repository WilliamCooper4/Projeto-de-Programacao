const sidebar = document.getElementById('sidebar');
const sidebar0 = document.getElementById('sidebar0');
const testbtn = document.getElementById('testbtn');
const testbtn2 = document.getElementById('testbtn2');
const UnitName = document.getElementById('name');
const desc = document.getElementById('desc');
const execise = document.getElementById('execise');
const test3 = document.getElementById('test3');
const test4 = document.getElementById('test4');

var isSidebarVisible = true;
var Visible=true;


//codigo dos butões de teste (retirarar depois)
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
testbtn2.addEventListener("click", function() {
    if (Visible===false){
        test3.classList.add("invisible");
        test4.classList.add("invisible");
        console.log("change to visible");
        Visible=true;
    }
    else if (Visible===true){
        test3.classList.remove("invisible");
        test4.classList.remove("invisible");
        console.log("change to invisible");
        Visible=false;
    }
});


// Pegar dados da disciplina (dados para testar integração, fazer os dados ser dependentes do que estiver no mockserver)

UnitName.textContent = "Matemática Discreta";
desc.textContent = "Estudo dos conceitos fundamentais da matemática que são aplicados na ciência da computação, incluindo lógica, teoria dos conjuntos, relações, funções, grafos e combinatória.";
execise.textContent = "1. Prove que a soma dos primeiros n números naturais é dada pela fórmula n(n + 1)/2. \n 2. Determine o número de maneiras distintas de organizar os livros em uma prateleira. \n 3. Mostre que o conjunto dos números racionais é denso nos números reais.\n4. Resolva o problema do caixeiro viajante para um grafo completo com 5 vértices.\n5. Calcule o número de permutações de 7 elementos tomados 3 a 3.";

