// Carregar do localStorage
let platina = JSON.parse(localStorage.getItem('platina')) || [];

// Guardar no localStorage
function salvarJogos() {
    localStorage.setItem('platina', JSON.stringify(platina));
}

// Mostrar jogos na lista
function atualizarLista() {
    const lista = document.getElementById('lista-jogos');
    lista.innerHTML = '';

    if (platina.length === 0) {
        lista.innerHTML = '<li>Nenhum jogo adicionado ainda.</li>';
    } else {
        platina.sort().forEach(jogo => {
            const li = document.createElement('li');
            li.textContent = jogo;
            lista.appendChild(li);
        });
    }
}

// Mostrar lista com botões para remover
function atualizarListaRemover() {
    const lista = document.getElementById('lista-remover');
    lista.innerHTML = '';

    if (platina.length === 0) {
        lista.innerHTML = '<li>Nenhum jogo para remover.</li>';
    } else {
        platina.sort().forEach(jogo => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.textContent = jogo;

            const btn = document.createElement('button');
            btn.textContent = 'Remover';
            btn.className = 'remove-button';
            btn.onclick = () => {
                removerJogo(jogo);
                atualizarListaRemover();
            };

            li.appendChild(span);
            li.appendChild(btn);
            lista.appendChild(li);
        });
    }
}

// Funções para adicionar/remover
function adicionarJogo() {
    const input = document.getElementById('novo-jogo');
    const jogo = input.value.trim();

    if (!jogo) {
        alert('Nome do jogo inválido.');
        return;
    }

    if (platina.some(j => j.toLowerCase() === jogo.toLowerCase())) {
        alert('Jogo já existe na lista.');
        return;
    }

    platina.push(jogo);
    salvarJogos();
    input.value = '';
    alert(`Jogo "${jogo}" adicionado com sucesso!`);
}

function removerJogo(jogo) {
    platina = platina.filter(j => j !== jogo);
    salvarJogos();
    alert(`Jogo "${jogo}" removido com sucesso!`);
}

// Navegação entre menus
function mostrarSecao(id) {
    document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function mostrarMenuPlatinar() {
    mostrarSecao('menu-platinar');
}

function mostrarVerJogos() {
    atualizarLista();
    mostrarSecao('ver-jogos');
}

function mostrarAdicionarJogo() {
    mostrarSecao('adicionar-jogo');
}

function mostrarRemoverJogo() {
    atualizarListaRemover();
    mostrarSecao('remover-jogo');
}

function voltarAoMenuPrincipal() {
    mostrarSecao('menu-principal');
}

function sair() {
    alert('Saindo do Programa...');
    location.reload();
}
