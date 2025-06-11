const STORAGE_KEY = "jogos_platina";
let jogos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function atualizarUI() {
    const lista = document.getElementById("lista-jogos");
    const remover = document.getElementById("lista-remover");
    lista.innerHTML = "";
    remover.innerHTML = "";

    jogos.forEach(jogo => {
        const li = document.createElement("li");
        li.textContent = jogo;
        lista.appendChild(li);

        const liRemove = document.createElement("li");
        liRemove.innerHTML = `${jogo} <button onclick="removerJogo('${jogo}')">Remover</button>`;
        remover.appendChild(liRemove);
    });
}

function adicionarJogo() {
    const input = document.getElementById("novo-jogo");
    const nome = input.value.trim();
    if (nome && !jogos.includes(nome)) {
        jogos.push(nome);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(jogos));
        input.value = "";
        atualizarUI();
    }
}

function removerJogo(jogo) {
    jogos = jogos.filter(j => j !== jogo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jogos));
    atualizarUI();
}

function mostrarSecao(id) {
    document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
    atualizarUI();
}

window.onload = () => {
    atualizarUI();
};
