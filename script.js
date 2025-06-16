const form = document.getElementById('formulario');
const senhaInput = document.getElementById('senha');
const confirmarSenhaInput = document.getElementById('confirmarSenha');
const statusSenha = document.getElementById('statusSenha');
const mostrarSenha = document.getElementById('mostrarSenha');
const forcaSenha = document.getElementById('forcaSenha');

mostrarSenha.addEventListener('change', () => {
  const tipo = mostrarSenha.checked ? 'text' : 'password';
  senhaInput.type = tipo;
  confirmarSenhaInput.type = tipo;
});

// Validação de senha
function validarSenha(senha) {
  const temLetra = /[a-zA-Z]/.test(senha);
  const temNumero = /[0-9]/.test(senha);
  return senha.length >= 6 && temLetra && temNumero;
}

// Barra de força da senha
senhaInput.addEventListener('input', () => {
  const senha = senhaInput.value;
  const barra = document.createElement('div');

  let forca = 0;
  if (senha.length >= 6) forca++;
  if (/[a-z]/.test(senha)) forca++;
  if (/[A-Z]/.test(senha)) forca++;
  if (/[0-9]/.test(senha)) forca++;
  if (/[@$!%*?&]/.test(senha)) forca++;

  let cor = '';
  let largura = '';

  switch (forca) {
    case 1:
    case 2:
      cor = 'red';
      largura = '25%';
      break;
    case 3:
      cor = 'orange';
      largura = '50%';
      break;
    case 4:
      cor = 'gold';
      largura = '75%';
      break;
    case 5:
      cor = 'green';
      largura = '100%';
      break;
  }

  forcaSenha.innerHTML = '';
  barra.style.width = largura;
  barra.style.backgroundColor = cor;
  forcaSenha.appendChild(barra);
});

// Confirmação de senha
confirmarSenhaInput.addEventListener('input', () => {
  if (confirmarSenhaInput.value === senhaInput.value) {
    statusSenha.textContent = '✔ Senhas conferem!';
    statusSenha.style.color = 'green';
  } else {
    statusSenha.textContent = '✖ Senhas diferentes';
    statusSenha.style.color = 'red';
  }
});

// Submissão
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('fname').value.trim();
  const sobrenome = document.getElementById('lname').value.trim();
  const email = document.getElementById('email').value.trim();
  const data = document.getElementById('data').value.trim();
  const senha = senhaInput.value;
  const confirmar = confirmarSenhaInput.value;

  if (!nome || !sobrenome || !email || !data || !senha || !confirmar) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  if (!validarSenha(senha)) {
    alert('A senha deve ter no mínimo 6 caracteres e conter letras e números!');
    return;
  }

  if (senha !== confirmar) {
    alert('As senhas não conferem!');
    return;
  }

  // Armazenamento temporário
  sessionStorage.setItem('cadastro', JSON.stringify({
    nome,
    sobrenome,
    email,
    data,
    senha
  }));

  alert('Cadastro realizado com sucesso!');
  form.reset();
  forcaSenha.innerHTML = '';
  statusSenha.textContent = '';
});
