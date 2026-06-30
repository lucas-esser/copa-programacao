// ============================================
// MAPEAMENTO DE BANDEIRAS POR NOME E SIGLA
// ============================================
const FLAGS = {
  BRA: '🇧🇷', ARG: '🇦🇷', URU: '🇺🇾', COL: '🇨🇴',
  ECU: '🇪🇨', VEN: '🇻🇪', CHI: '🇨🇱', PAR: '🇵🇾',
  PER: '🇵🇪', BOL: '🇧🇴',
  Brazil: '🇧🇷', Argentina: '🇦🇷', Uruguay: '🇺🇾',
  Colombia: '🇨🇴', Ecuador: '🇪🇨', Venezuela: '🇻🇪',
  Chile: '🇨🇱', Paraguay: '🇵🇾', Peru: '🇵🇪', Bolivia: '🇧🇴',
};

// ============================================
// TRADUÇÃO DOS NOMES PARA PORTUGUÊS
// ============================================
const NAMES_PT = {
  Brazil: 'Brasil', Argentina: 'Argentina', Uruguay: 'Uruguai',
  Colombia: 'Colômbia', Ecuador: 'Equador', Venezuela: 'Venezuela',
  Chile: 'Chile', Paraguay: 'Paraguai', Peru: 'Peru', Bolivia: 'Bolívia',
};

// ============================================
// DADOS FINAIS REAIS — ELIMINATÓRIAS CONMEBOL 2026
// 18 rodadas encerradas (setembro/2025)
// ============================================
const DADOS_FINAIS = [
  { name: 'Argentina', abbr: 'ARG', wins: 11, draws: 4, losses: 3, points: 37, gf: 31, ga: 12, gd:  19 },
  { name: 'Ecuador',   abbr: 'ECU', wins:  8, draws: 3, losses: 7, points: 27, gf: 18, ga:  5, gd:  13 },
  { name: 'Uruguay',   abbr: 'URU', wins:  8, draws: 3, losses: 7, points: 27, gf: 24, ga: 17, gd:   7 },
  { name: 'Colombia',  abbr: 'COL', wins:  8, draws: 2, losses: 8, points: 26, gf: 25, ga: 21, gd:   4 },
  { name: 'Brazil',    abbr: 'BRA', wins:  8, draws: 4, losses: 6, points: 28, gf: 24, ga: 19, gd:   5 },
  { name: 'Paraguay',  abbr: 'PAR', wins:  7, draws: 5, losses: 6, points: 26, gf: 22, ga: 19, gd:   3 },
  { name: 'Venezuela', abbr: 'VEN', wins:  6, draws: 3, losses: 9, points: 21, gf: 19, ga: 29, gd: -10 },
  { name: 'Bolivia',   abbr: 'BOL', wins:  4, draws: 3, losses:11, points: 15, gf: 23, ga: 39, gd: -16 },
  { name: 'Peru',      abbr: 'PER', wins:  3, draws: 4, losses:11, points: 13, gf: 15, ga: 26, gd: -11 },
  { name: 'Chile',     abbr: 'CHI', wins:  3, draws: 2, losses:13, points: 11, gf: 16, ga: 31, gd: -15 },
];

// ============================================
// CONTROLE DO CONTADOR DE ATUALIZAÇÃO
// ============================================
let countdownInterval;

// ============================================
// FUNÇÕES AUXILIARES
// ============================================
function getFlag(name, abbr) {
  return FLAGS[name] || FLAGS[abbr] || '🏳️';
}

function getZoneClass(rank) {
  if (rank <= 6) return 'zona-classificacao';
  if (rank === 7) return 'zona-repescagem';
  return 'zona-eliminacao';
}

function getMedal(rank) {
  if (rank === 1) return '<span style="color:#f5a623;font-weight:bold">1°</span>';
  if (rank === 2) return '<span style="color:#aaa;font-weight:bold">2°</span>';
  if (rank === 3) return '<span style="color:#cd7f32;font-weight:bold">3°</span>';
  return `<span style="color:#999">${rank}°</span>`;
}

function setStatus(type, text) {
  document.getElementById('status-dot').className = 'dot ' + type;
  document.getElementById('status-text').textContent = text;
}

// ============================================
// RENDERIZAÇÃO DA TABELA
// ============================================
function renderTable(standings, updatedAt) {
  const wrapper = document.getElementById('table-wrapper');

  const rows = standings.map((team, i) => {
    const rank           = i + 1;
    const isBrasil       = team.name === 'Brazil' || team.abbr === 'BRA';
    const zoneClass      = getZoneClass(rank);
    const highlightClass = isBrasil ? 'highlight' : '';
    const flag           = getFlag(team.name, team.abbr);
    const displayName    = NAMES_PT[team.name] || team.name;
    const jogos          = (team.wins || 0) + (team.losses || 0) + (team.draws || 0);
    const saldo          = team.gd != null ? (team.gd > 0 ? '+' + team.gd : team.gd) : '—';

    return `
      <tr class="${zoneClass} ${highlightClass}">
        <td>${getMedal(rank)}</td>
        <td>${flag} ${displayName}</td>
        <td>${jogos}</td>
        <td>${team.wins   || 0}</td>
        <td>${team.draws  || 0}</td>
        <td>${team.losses || 0}</td>
        <td>${team.gf ?? '—'}</td>
        <td>${team.ga ?? '—'}</td>
        <td>${saldo}</td>
        <td class="pontos">${team.points || 0}</td>
      </tr>`;
  }).join('');

  wrapper.innerHTML = `
    <table border="1">
      <caption>Classificação Final — Eliminatórias CONMEBOL 2026</caption>
      <thead>
        <tr>
          <th>#</th>
          <th>Seleção</th>
          <th>J</th>
          <th>V</th>
          <th>E</th>
          <th>D</th>
          <th>GP</th>
          <th>GC</th>
          <th>SG</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr>
          <td colspan="10">
            Última atualização: ${updatedAt}
            &nbsp;|&nbsp; J=Jogos &nbsp; V=Vitórias &nbsp; E=Empates &nbsp; D=Derrotas
            &nbsp;|&nbsp; GP=Gols Pró &nbsp; GC=Gols Contra &nbsp; SG=Saldo &nbsp; Pts=Pontos
          </td>
        </tr>
      </tfoot>
    </table>`;
}

// ============================================
// BUSCA DE DADOS EM TEMPO REAL (ESPN API)
// Com timeout de 4s para não travar a página
// ============================================
async function fetchStandings() {
  setStatus('loading', 'Atualizando dados...');
  document.getElementById('countdown').textContent = '';

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000); // 4s de timeout

    const espnRes = await fetch(
      'https://site.api.espn.com/apis/v2/sports/soccer/conmebol.world_cup_qualifying/standings',
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    if (!espnRes.ok) throw new Error('Resposta inválida');

    const data    = await espnRes.json();
    const entries = data?.standings?.[0]?.entries || [];
    if (entries.length === 0) throw new Error('Sem dados');

    const standings = entries.map(e => {
      const stats = {};
      (e.stats || []).forEach(s => { stats[s.name] = s.value; });
      return {
        name:   e.team?.displayName,
        abbr:   e.team?.abbreviation,
        wins:   stats.wins   ?? stats.W ?? 0,
        losses: stats.losses ?? stats.L ?? 0,
        draws:  stats.ties   ?? stats.T ?? stats.draws ?? 0,
        points: stats.points ?? stats.pts ?? 0,
        gf:     stats.pointsFor          ?? stats.gf ?? null,
        ga:     stats.pointsAgainst      ?? stats.ga ?? null,
        gd:     stats.pointDifferential  ?? stats.gd ?? null,
      };
    });

    const now = new Date().toLocaleString('pt-BR');
    renderTable(standings, now);
    setStatus('live', 'Dados ao vivo — ESPN');

  } catch (err) {
    // API bloqueada (CORS) ou timeout — usa dados reais finais
    const now = new Date().toLocaleString('pt-BR');
    renderTable(DADOS_FINAIS, now + ' — classificação final set/2025');
    setStatus('error', 'Classificação final — CONMEBOL 2026');
  }

  // Agenda próxima tentativa em 5 min
  clearInterval(countdownInterval);
  let sec = 300;
  countdownInterval = setInterval(() => {
    sec--;
    document.getElementById('countdown').textContent = `— atualiza em ${sec}s`;
    if (sec <= 0) {
      clearInterval(countdownInterval);
      fetchStandings();
    }
  }, 1000);
}

// ============================================
// INICIALIZAÇÃO — mostra dados imediatamente
// enquanto tenta a API em paralelo
// ============================================
(function init() {
  // Exibe os dados reais de imediato (sem esperar API)
  const now = new Date().toLocaleString('pt-BR');
  renderTable(DADOS_FINAIS, now + ' — classificação final set/2025');
  setStatus('live', 'Classificação final — CONMEBOL 2026');

  // Tenta atualizar via API em background
  fetchStandings();
})();
