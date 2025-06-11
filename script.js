function hideAll() {
    document.querySelectorAll("section.card").forEach(sec => sec.classList.add("hidden"));
}

function showMainMenu() {
    hideAll();
    document.getElementById("main-menu").classList.remove("hidden");
}

function showSubMenu() {
    hideAll();
    document.getElementById("sub-menu").classList.remove("hidden");
}

function carregarJogos() {
    const data = localStorage.getItem("jogosPlatina");
    return data ? JSON.parse(data) : [];
}

function salvarJogos(jogos) {
    localStorage.setItem("jogosPlatina", JSON.stringify(jogos));
}

function verJogos() {
    hideAll();
    const output = document.getElementById("output");
    const jogos = carregarJogos();
    output.innerHTML = `<h2>🎮 Lista de Jogos</h2>`;

    if (jogos.length === 0) {
        output.innerHTML += `<p>Nenhum jogo adicionado ainda.</p>`;
    } else {
        const ul = document.createElement("ul");
        jogos.forEach(jogo => {
            const li = document.createElement("li");
            li.textContent = jogo;
            ul.appendChild(li);
        });
        output.appendChild(ul);
    }

    output.innerHTML += `<button class="back" onclick="showSubMenu()">🔙 Voltar</button>`;
    output.classList.remove("hidden");
}

function adicionarJogo() {
    hideAll();
    document.getElementById('add-form').classList.remove('hidden');
    document.getElementById('inputJogo').value = "";
    document.getElementById('addMessage').textContent = "";
}

document.getElementById('formAdicionarJogo').addEventListener('submit', function (e) {
    e.preventDefault();
    const input = document.getElementById('inputJogo');
    const nome = input.value.trim();
    const msg = document.getElementById('addMessage');

    if (nome === "") {
        msg.textContent = "⚠️ Nome inválido.";
        return;
    }

    const jogos = carregarJogos();
    if (jogos.some(j => j.toLowerCase() === nome.toLowerCase())) {
        msg.textContent = "⚠️ Jogo já existe na lista.";
        return;
    }

    jogos.push(nome);
    jogos.sort();
    salvarJogos(jogos);
    msg.textContent = `✅ Jogo "${nome}" adicionado com sucesso!`;
    input.value = "";
});

function removerJogo() {
    const jogo = prompt("Nome do jogo a remover:");
    if (!jogo) return;

    let jogos = carregarJogos();
    const index = jogos.findIndex(j => j.toLowerCase() === jogo.toLowerCase());

    if (index !== -1) {
        jogos.splice(index, 1);
        salvarJogos(jogos);
        alert(`✅ Jogo "${jogo}" removido com sucesso!`);
    } else {
        alert("❌ Jogo não encontrado.");
    }

    showSubMenu();
}

function exitApp() {
    alert("👋 Até à próxima, Tavinho!");
}
