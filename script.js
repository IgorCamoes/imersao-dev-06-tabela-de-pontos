const tabelaPrincipal = document.querySelector('.main-table');
const inputNome = document.querySelector('.input-nome');


let jogadores = JSON.parse(localStorage.getItem('jogadores'));

if(jogadores == null){
  jogadores = []
}



const AdicionarJogador = (id, nome) =>{
  jogadores.push({id: id, nome: nome, V: 0, E: 0, D: 0});
  AtualizarTabela()

}

const ChecarDisponibilidade = (id, nome) =>{
  if(jogadores.some(e => e.id == id)){
    GerarID();
  } else{
    AdicionarJogador(id, nome)
  }
}

const GerarID = () =>{
  let nome = inputNome.value;
  if(nome != ''){
    let uniq = ('000' + (parseInt(Math.random()*1000))).slice(-3);
    ChecarDisponibilidade(uniq, nome);
    inputNome.placeholder = '';
    inputNome.value = '';
  }else{
    inputNome.placeholder = 'Por favor insira um nome'
  }
}


const CalcularPontos = (index) =>{
  let jAtual = jogadores[index];
  console.log(jAtual)
  
  let pontos = ((jAtual.V * 2) + jAtual.E - jAtual.D)

  console.log(pontos)

  return pontos
}

const AtualizarTabela = () =>{
  localStorage.setItem('jogadores', JSON.stringify(jogadores));
  RenderizarJogadores()
}

const Adicionar = (categoria, i) =>{
  let jAtual = jogadores[i];

  switch(categoria){
    case 'V':
      jAtual.V ++;
      break;
    case 'E':
      jAtual.E ++;
      break;
    case 'D':
      jAtual.D ++;
      break;
  }

  AtualizarTabela();
}

const Subtrair = (categoria, i) =>{
  let jAtual = jogadores[i];

  switch(categoria){
    case 'V':
      jAtual.V --;
      break;
    case 'E':
      jAtual.E --;
      break;
    case 'D':
      jAtual.D --;
      break;
  }
  
  AtualizarTabela();
}

const DeletarJogador = (i) =>{
  jogadores.splice(jogadores.indexOf(jogadores.find(e => e == jogadores[i])), 1)
  AtualizarTabela()
}

const RenderizarJogadores = () =>{
  tabelaPrincipal.innerHTML = `
    <thead>
      <tr>
        <th>Nome</th>
        <th>Vitórias</th>
        <th>Empates</th>
        <th>Derrotas</th>
        <th>Pontos</th>
        <th>Ações</th>
      </tr>
    </thead>
  `;

  jogadores.forEach((jogador, i) =>{
    let templateJogador = `
      <tbody>
        <tr>
          <td>
            ${jogador.nome}
          </td>
          <td>
            <button onclick="Subtrair('V', ${i})">-</button> ${jogador.V} <button onclick="Adicionar('V', ${i})">+</button> 
          </td>
          <td>
            <button onclick="Subtrair('E', ${i})">-</button> ${jogador.E} <button onclick="Adicionar('E', ${i})">+</button> 
          </td>
          <td>
            <button onclick="Subtrair('D', ${i})">-</button> ${jogador.D} <button onclick="Adicionar('D', ${i})">+</button> 
          </td>
          <td>${CalcularPontos(i)}</td>
          <td><button onClick="DeletarJogador(${i})" class="show">Deletar Jogador</button></td>
        </tr>
      </tbody>
    `;

    tabelaPrincipal.insertAdjacentHTML('beforeend', templateJogador);
  })
}

RenderizarJogadores();