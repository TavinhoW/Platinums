const storageKey = "jogosPlatina";

function loadJogos() {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
}

function saveJogos(jogos) {
    localStorage.setItem(storageKey, JSON.stringify(jogos.sort((a, b) => a.localeCompare(b))));
}

function showMainMenu() {
    document.getElementById("main-menu").style.display = "block";
    document.getElementById("sub-menu").style.display = "none";
    document.getElementById("output").style.display = "none";
}

function showSubMenu() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("sub-menu").style.display = "block";
    document.getElementById("output").style.display = "none";
}

function verJogos() {
    const jogos = loadJogos();
    let html = "<h2>Jogos para Platinar</h2>";
    if (jogos.length === 0) {
        html += "<p>Nenhum jogo adicionado ainda.</p>";
    } else {
        html += "<ul>" + jogos.map(j => `<li>${j}</li>`).join('') + "</ul>";
    }
    html += '<button class="back" onclick="showSubMenu()">Voltar</button>';
    showOutput(html);
}

function adicionarJogo() {
    let jogo = prompt("Digite o nome do jogo para platinar:");
    if (!jogo) {
        alert("Nome inválido.");
        return;
    }
    let jogos = loadJogos();
    if (jogos.some(j => j.toLowerCase() === jogo.toLowerCase())) {
        alert("Jogo já existe.");
        return;
    }
    jogos.push(jogo);
    saveJogos(jogos);
    alert("Jogo adicionado com sucesso!");
}

function removerJogo() {
    const jogos = loadJogos();
    if (jogos.length === 0) {
        alert("Nenhum jogo para remover.");
        return;
    }

    let html = "<h2>Remover Jogo</h2><ul class='game-list'>";
    jogos.forEach((jogo, i) => {
        html += `<li>${jogo} <button class="remove-button" onclick="confirmRemover('${jogo}')">Remover</button></li>`;
    });
    html += "</ul><button class='back' onclick='showSubMenu()'>Voltar</button>";
    showOutput(html);
}

function confirmRemover(jogo) {
    let jogos = loadJogos();
    jogos = jogos.filter(j => j !== jogo);
    saveJogos(jogos);
    alert(`Jogo "${jogo}" removido com sucesso!`);
    removerJogo();
}

function showOutput(html) {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("sub-menu").style.display = "none";
    const out = document.getElementById("output");
    out.innerHTML = html;
    out.style.display = "block";
}

function exitApp() {
    alert("Saindo do Programa.");
    showMainMenu();
}
