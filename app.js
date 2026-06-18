// app.js — KickStream
// Carrega jogos do DynamoDB via AWS SDK v3 (browser bundle)
// A IAM Role da EC2 fornece credenciais automaticamente

const REGION = "us-east-1";
const TABLE  = "kickstream-jogos";

// Dados estáticos de fallback (usados se o SDK não estiver disponível)
const JOGOS_FALLBACK = [
  { jogoId:"J001", titulo:"Flamengo x Fluminense", campeonato:"Campeonato Carioca", data:"2025-03-15", horario:"16:00", placar:"3 x 1", status:"Disponível", avaliacao:4.8, duracao_min:110, url_thumb:"https://placehold.co/300x170/141414/00e676?text=FLA+x+FLU" },
  { jogoId:"J002", titulo:"Palmeiras x Corinthians", campeonato:"Campeonato Paulista", data:"2025-03-22", horario:"18:30", placar:"2 x 2", status:"Disponível", avaliacao:4.9, duracao_min:113, url_thumb:"https://placehold.co/300x170/141414/00e676?text=PAL+x+COR" },
  { jogoId:"J003", titulo:"Grêmio x Internacional", campeonato:"Gauchão", data:"2025-04-05", horario:"16:00", placar:"1 x 0", status:"Disponível", avaliacao:4.7, duracao_min:108, url_thumb:"https://placehold.co/300x170/141414/00e676?text=GRE+x+INT" },
  { jogoId:"J004", titulo:"Atlético-MG x Cruzeiro", campeonato:"Campeonato Mineiro", data:"2025-04-12", horario:"18:30", placar:"0 x 1", status:"Disponível", avaliacao:4.6, duracao_min:106, url_thumb:"https://placehold.co/300x170/141414/00e676?text=ATL+x+CRU" },
  { jogoId:"J005", titulo:"São Paulo x Santos", campeonato:"Campeonato Paulista", data:"2025-04-19", horario:"16:00", placar:"2 x 0", status:"Disponível", avaliacao:4.5, duracao_min:104, url_thumb:"https://placehold.co/300x170/141414/00e676?text=SAO+x+SAN" },
  { jogoId:"J006", titulo:"Botafogo x Vasco", campeonato:"Campeonato Carioca", data:"2025-04-26", horario:"18:30", placar:"1 x 1", status:"Disponível", avaliacao:4.4, duracao_min:112, url_thumb:"https://placehold.co/300x170/141414/00e676?text=BOT+x+VAS" },
  { jogoId:"J007", titulo:"Bahia x Vitória", campeonato:"Campeonato Baiano", data:"2025-05-03", horario:"16:00", placar:"3 x 0", status:"Disponível", avaliacao:4.3, duracao_min:107, url_thumb:"https://placehold.co/300x170/141414/00e676?text=BAH+x+VIT" },
  { jogoId:"J008", titulo:"Sport x Náutico", campeonato:"Campeonato Pernambucano", data:"2025-05-10", horario:"16:00", placar:"2 x 1", status:"Disponível", avaliacao:4.2, duracao_min:105, url_thumb:"https://placehold.co/300x170/141414/00e676?text=SPO+x+NAU" },
  { jogoId:"J009", titulo:"Fortaleza x Ceará", campeonato:"Campeonato Cearense", data:"2025-05-17", horario:"18:30", placar:"1 x 2", status:"Disponível", avaliacao:4.6, duracao_min:109, url_thumb:"https://placehold.co/300x170/141414/00e676?text=FOR+x+CEA" },
  { jogoId:"J010", titulo:"Athletico-PR x Coritiba", campeonato:"Campeonato Paranaense", data:"2025-05-24", horario:"16:00", placar:"0 x 0", status:"Disponível", avaliacao:4.5, duracao_min:120, url_thumb:"https://placehold.co/300x170/141414/00e676?text=CAP+x+COR" },
  { jogoId:"J011", titulo:"Brasil x Argentina", campeonato:"Eliminatórias Copa 2026", data:"2025-06-05", horario:"21:45", placar:"—", status:"Em Breve", avaliacao:null, duracao_min:null, url_thumb:"https://placehold.co/300x170/141414/ffd600?text=BRA+x+ARG" },
  { jogoId:"J012", titulo:"Flamengo x PSG", campeonato:"Mundial de Clubes FIFA", data:"2025-06-20", horario:"15:00", placar:"—", status:"Em Breve", avaliacao:null, duracao_min:null, url_thumb:"https://placehold.co/300x170/141414/ffd600?text=FLA+x+PSG" },
];

let todosJogos = [];
let filtroStatus = "todos";
let filtroCampeonato = "";

async function carregarJogos() {
  // Tenta carregar do DynamoDB via SDK
  if (typeof AWS !== 'undefined') {
    try {
      AWS.config.region = REGION;
      // Credenciais via IAM Role (EC2 instance profile)
      const dynamo = new AWS.DynamoDB.DocumentClient();
      const result = await dynamo.scan({ TableName: TABLE }).promise();
      todosJogos = result.Items;
    } catch (e) {
      console.warn("DynamoDB indisponível, usando dados locais.", e);
      todosJogos = JOGOS_FALLBACK;
    }
  } else {
    todosJogos = JOGOS_FALLBACK;
  }

  popularFiltros();
  renderizar();
  document.getElementById('loading').style.display = 'none';
}

function popularFiltros() {
  const sel = document.getElementById('campeonato-filter');
  const camps = [...new Set(todosJogos.map(j => j.campeonato))].sort();
  camps.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
    sel.appendChild(opt);
  });
}

function badgeClass(status) {
  if (status === "Ao Vivo") return "badge-aovivo";
  if (status === "Em Breve") return "badge-embreve";
  return "badge-disponivel";
}

function renderizar() {
  const grid = document.getElementById('grid');
  const jogos = todosJogos.filter(j => {
    const okStatus = filtroStatus === "todos" || j.status === filtroStatus;
    const okCamp   = !filtroCampeonato || j.campeonato === filtroCampeonato;
    return okStatus && okCamp;
  });

  if (jogos.length === 0) {
    grid.innerHTML = '<p style="color:var(--muted);grid-column:1/-1">Nenhum jogo encontrado.</p>';
    return;
  }

  grid.innerHTML = jogos.map(j => {
    const btnLabel  = j.status === "Em Breve" ? "Em Breve" : "▶ Assistir";
    const btnDisabled = j.status === "Em Breve" ? "disabled" : "";
    const placarHtml = j.placar && j.placar !== "—"
      ? `<div class="card-placar">${j.placar}</div>`
      : "";
    const ratingHtml = j.avaliacao
      ? `<div class="card-rating">⭐ ${j.avaliacao} · ${j.duracao_min} min</div>`
      : "";

    return `
      <div class="card">
        <img class="card-thumb" src="${j.url_thumb}" alt="${j.titulo}" loading="lazy" />
        <div class="card-body">
          <div class="card-meta">
            <span class="campeonato">${j.campeonato}</span>
            <span class="badge ${badgeClass(j.status)}">${j.status}</span>
          </div>
          <div class="card-title">${j.titulo}</div>
          <div class="card-info">📅 ${j.data} · 🕐 ${j.horario}</div>
          ${placarHtml}
          ${ratingHtml}
        </div>
        <div class="card-footer">
          <button class="btn-watch" ${btnDisabled} onclick="assistir('${j.jogoId}')">${btnLabel}</button>
        </div>
      </div>`;
  }).join('');
}

function assistir(id) {
  document.getElementById('modal').style.display = 'flex';
}
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Filtros de status
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filtroStatus = btn.dataset.filter;
    renderizar();
  });
});

// Filtro de campeonato
document.getElementById('campeonato-filter').addEventListener('change', e => {
  filtroCampeonato = e.target.value;
  renderizar();
});

carregarJogos();
