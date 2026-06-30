
document.addEventListener('DOMContentLoaded', () => {
  // Só exibe o alerta/confirm de boas-vindas na página da Seleção
  // (identificada pela presença do elemento #titulo-selecao)
  if (document.getElementById('titulo-selecao')) {
    window.alert('Bem-vindo(a) ao Portal da Seleção Brasileira! 🇧🇷⚽');
    window.confirm('Você deseja entrar e saber mais sobre a Seleção Brasileira?');
  }
});

function alternarTema() {
  document.body.classList.toggle('dark');
  const escuro = document.body.classList.contains('dark');
  localStorage.setItem('temaEscuro', escuro ? '1' : '0');
}

(function aplicarTemaSalvo() {
  if (localStorage.getItem('temaEscuro') === '1') {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.add('dark');
    });
  }
})();


function mudarCorTitulo() {
  const titulo = document.getElementById('titulo-selecao');
  if (titulo) titulo.style.color = '#009c3b';
}

function restaurarCorTitulo() {
  const titulo = document.getElementById('titulo-selecao');
  if (titulo) titulo.style.color = '';
}

function mostrarIncentivo() {
  const msg = document.getElementById('clique-msg');
  if (msg) {
    msg.textContent = 'Seleção Brasileira — Vai Brasil! 🇧🇷⚽';
  }
}


const curiosidades = [
  'O Brasil é a única seleção que disputou todas as edições da Copa do Mundo, desde 1930.',
  'O Brasil é o país com mais títulos de Copa do Mundo: 5 conquistas (1958, 1962, 1970, 1994 e 2002).',
  'Pelé é o único jogador a ser tricampeão mundial (1958, 1962 e 1970).',
  'O apelido "Canarinho" vem das cores amarela e verde do uniforme, parecidas com as de um canário.',
  'A camisa amarela da Seleção só passou a ser usada após a derrota de 1950, conhecida como "Maracanaço".'
];
let indiceCuriosidade = 0;

function trocarCuriosidade() {
  const p = document.getElementById('curiosidade');
  if (!p) return;
  indiceCuriosidade = (indiceCuriosidade + 1) % curiosidades.length;
  p.textContent = curiosidades[indiceCuriosidade];
}


const imagensSelecao = [
  'https://s2-ge.glbimg.com/L2IGBnYIfUNDX5edfE7WQnzuFB8=/0x0:1000x666/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/Q/k/DNwjBuS3iABZurdTAVlA/foto-oficial.jpg',
  'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg',
  'https://s2-ge.glbimg.com/KpaEnXfwp_De1z7R6Yhn0wFKY74=/0x0:675x824/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2019/m/d/rn1G6RR3ACwATFaAMetw/d3vbl5jx4aafnci.jpg',
];
let indiceImagem = 0;

function trocarImagem() {
  const img = document.getElementById('img-selecao');
  if (!img) return;
  indiceImagem = (indiceImagem + 1) % imagensSelecao.length;
  img.src = imagensSelecao[indiceImagem];
}

document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('img-selecao');
  if (img) {
    img.onmouseover = () => { img.style.transform = 'scale(1.15)'; };
    img.onmouseout = () => { img.style.transform = 'scale(1)'; };
  }
});




document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formCadastro');
  if (!form) return;

  const nome = document.getElementById('nome');
  const dataNascimento = document.getElementById('dataNascimento');
  const email = document.getElementById('email');
  const senha = document.getElementById('senha');
  const confirmarSenha = document.getElementById('confirmarSenha');
  const pais = document.getElementById('pais');
  const jogadorFavorito = document.getElementById('jogadorFavorito');
  const contador = document.getElementById('contador-nome');
  const feedbackEmail = document.getElementById('feedback-email');
  const feedbackSenha = document.getElementById('feedback-senha');
  const feedbackConfirmarSenha = document.getElementById('feedback-confirmarSenha');

  nome.onfocus = () => { nome.style.background = '#fffbe6'; };

  nome.onblur = () => { nome.style.background = ''; };

  nome.onkeyup = () => {
    if (contador) contador.textContent = `${nome.value.length} caractere(s) digitado(s)`;
  };

  pais.onchange = () => {
    pais.style.borderColor = pais.value ? '#009c3b' : '';
  };

  email.onblur = () => {
    const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    feedbackEmail.textContent = email.value
      ? (valido ? '✅ E-mail válido' : '⚠️ E-mail inválido')
      : '';
    feedbackEmail.style.color = valido ? '#009c3b' : '#d92626';
  };

  senha.onkeyup = () => {
    const forte = senha.value.length >= 6;
    feedbackSenha.textContent = senha.value
      ? (forte ? '✅ Senha com tamanho adequado' : '⚠️ Use ao menos 6 caracteres')
      : '';
    feedbackSenha.style.color = forte ? '#009c3b' : '#d92626';

    if (confirmarSenha.value) confirmarSenha.onkeyup();
  };

  confirmarSenha.onkeyup = () => {
    if (!confirmarSenha.value) {
      feedbackConfirmarSenha.textContent = '';
      return;
    }
    const iguais = confirmarSenha.value === senha.value;
    feedbackConfirmarSenha.textContent = iguais ? '✅ Senhas coincidem' : '⚠️ As senhas não coincidem';
    feedbackConfirmarSenha.style.color = iguais ? '#009c3b' : '#d92626';
  };

  jogadorFavorito.ondblclick = () => {
    const sugestoes = ['Neymar Jr.', 'Vinícius Júnior', 'Rodrygo', 'Casemiro', 'Alisson'];
    jogadorFavorito.value = sugestoes[Math.floor(Math.random() * sugestoes.length)];
  };

  form.onsubmit = (event) => {
    event.preventDefault();

    if (!nome.value || !dataNascimento.value || !email.value || !senha.value ||
        !confirmarSenha.value || !pais.value || !jogadorFavorito.value) {
      alert('Por favor, preencha todos os campos antes de enviar.');
      return;
    }

    if (senha.value.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      senha.focus();
      return;
    }

    if (senha.value !== confirmarSenha.value) {
      alert('As senhas não coincidem. Verifique e tente novamente.');
      confirmarSenha.focus();
      return;
    }

    const torcedor = {
      nome: nome.value,
      dataNascimento: dataNascimento.value,
      email: email.value,
      senha: senha.value,
      pais: pais.value,
      jogadorFavorito: jogadorFavorito.value
    };

    sessionStorage.setItem('torcedor', JSON.stringify(torcedor));
    window.location.href = 'resultado.html';
  };
});

  

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formLogin');
  if (!form) return;

  const emailLogin = document.getElementById('emailLogin');
  const senhaLogin = document.getElementById('senhaLogin');
  const feedbackEmailLogin = document.getElementById('feedback-email-login');
  const feedbackSenhaLogin = document.getElementById('feedback-senha-login');

  emailLogin.onblur = () => {
    const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLogin.value);
    feedbackEmailLogin.textContent = emailLogin.value
      ? (valido ? '✅ E-mail válido' : '⚠️ E-mail inválido')
      : '';
    feedbackEmailLogin.style.color = valido ? '#009c3b' : '#d92626';
  };

  senhaLogin.onfocus = () => {
    feedbackSenhaLogin.textContent = '';
  };

  form.onsubmit = (event) => {
    event.preventDefault();

    if (!emailLogin.value || !senhaLogin.value) {
      alert('Preencha e-mail e senha para entrar.');
      return;
    }

    const dadosSalvos = sessionStorage.getItem('torcedor');
    const torcedor = dadosSalvos ? JSON.parse(dadosSalvos) : null;

    const credenciaisValidas =
      torcedor &&
      torcedor.email.toLowerCase() === emailLogin.value.toLowerCase() &&
      torcedor.senha === senhaLogin.value;

    if (credenciaisValidas) {
      feedbackSenhaLogin.style.color = '#009c3b';
      feedbackSenhaLogin.textContent = '✅ Login realizado! Redirecionando...';
      setTimeout(() => { window.location.href = 'resultado.html'; }, 800);
    } else {
      feedbackSenhaLogin.style.color = '#d92626';
      feedbackSenhaLogin.textContent = '⚠️ E-mail ou senha incorretos. Faça seu cadastro primeiro.';
    }
  };
});


/* ============================================================
   PÁGINA: resultado.html
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const area = document.getElementById('resultado-dados');
  if (!area) return;

  const dadosSalvos = sessionStorage.getItem('torcedor');

  if (!dadosSalvos) {
    area.innerHTML = '<p>Nenhum cadastro encontrado. <a href="cadastro.html">Voltar ao cadastro</a>.</p>';
    return;
  }

  const torcedor = JSON.parse(dadosSalvos);

  const idade = calcularIdade(torcedor.dataNascimento);
  const categoria = classificarTorcedor(idade);

  document.getElementById('res-nome').textContent = torcedor.nome;
  document.getElementById('res-nascimento').textContent = formatarData(torcedor.dataNascimento);
  document.getElementById('res-email').textContent = torcedor.email;
  document.getElementById('res-pais').textContent = torcedor.pais;
  document.getElementById('res-jogador').textContent = torcedor.jogadorFavorito;
  document.getElementById('res-idade').textContent = `${idade} anos`;
  document.getElementById('res-categoria').textContent = categoria;
});

function calcularIdade(dataNascimentoStr) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimentoStr + 'T00:00:00');
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const aindaNaoFezAniversario =
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate());
  if (aindaNaoFezAniversario) idade--;
  return idade;
}

function classificarTorcedor(idade) {
  if (idade <= 16) return 'Torcedor Mirim';
  if (idade <= 30) return 'Torcedor Novato';
  return 'Torcedor Experiente';
}

function formatarData(dataStr) {
  const [ano, mes, dia] = dataStr.split('-');
  return `${dia}/${mes}/${ano}`;
}
