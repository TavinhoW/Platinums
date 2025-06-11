const STORAGE_KEY = "jogos_platina";
let jogos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Atualiza estrutura antiga (string) para objeto
if (typeof jogos[0] === "string") {
    jogos = jogos.map(nome => ({ nome, foco: false }));
}

function atualizarUI() {
    const lista = document.getElementById("lista-jogos");
    const remover = document.getElementById("lista-remover");
    const foco = document.getElementById("lista-foco");

    lista.innerHTML = "";
    remover.innerHTML = "";
    foco.innerHTML = "";

    // Primeiro ordena por nome
    jogos.sort((a, b) => a.nome.localeCompare(b.nome));
    // Depois ordena por foco (os com foco vêm primeiro)
    jogos.sort((a, b) => (b.foco === true) - (a.foco === true));

    jogos.forEach(jogo => {
        // Lista geral
        const li = document.createElement("li");
        li.innerHTML = `
            ${jogo.nome} ${jogo.foco ? '⭐' : ''}
            <button onclick="alternarFoco('${jogo.nome}')">⭐</button>
        `;
        lista.appendChild(li);

        // Lista de remoção
        const liRemove = document.createElement("li");
        liRemove.innerHTML = `
            ${jogo.nome}
            <button onclick="removerJogo('${jogo.nome}')">Remover</button>
        `;
        remover.appendChild(liRemove);

        // Lista de foco
        if (jogo.foco) {
            const liFoco = document.createElement("li");
            liFoco.textContent = jogo.nome;
            foco.appendChild(liFoco);
        }
    });
}

function adicionarJogo() {
    const input = document.getElementById("novo-jogo");
    const nome = input.value.trim();
    if (nome && !jogos.some(j => j.nome === nome)) {
        jogos.push({ nome, foco: false });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(jogos));
        input.value = "";
        atualizarUI();
    }
}

function removerJogo(nome) {
    jogos = jogos.filter(j => j.nome !== nome);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jogos));
    atualizarUI();
}

function alternarFoco(nome) {
    const jogo = jogos.find(j => j.nome === nome);
    if (jogo) {
        jogo.foco = !jogo.foco;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(jogos));
        atualizarUI();
    }
}

function mostrarSecao(id) {
    document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
    atualizarUI();
}

window.onload = () => {
    atualizarUI();
};
