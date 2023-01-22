// https://jsonplaceholder.typicode.com/posts

async function readPost(){
  // Inserindo o texto 'Carregando...' para simular carregamento de dados
  let postArea = document.querySelector('.post');
  postArea.innerHTML = '<p class="car">Carregando...</p>'

  //Realizando requisição, salvando a resposta e convertendo para Array
  let response = await fetch('https://jsonplaceholder.typicode.com/posts');
  let json = await response.json();

  //Verificando se veio dados
  if(json.length > 0){
    // Tirando a mensagem; 'carregando...'
    postArea.innerHTML = '';
    for(let i in json){
      let postHtml = `<div><h2>${json[i].title}</h2>${json[i].body}<hr/></div>`;
      postArea.innerHTML += postHtml;
    }
  }else{
    postArea.innerHTML = "Nenhum post para exibir"
  }
}
async function addNewPost(title, body){
  await fetch('https://jsonplaceholder.typicode.com/posts', 
  {
    method: 'POST',
    headers: {
      'content-type' : 'application/json'
    },
    body: JSON.stringify({
      title: title,
      body: body,
      userId: 3
    })
  });
  document.querySelector('#titleField').value = '';
  document.querySelector('#bodyField').value = '';
  readPost();
}
document.querySelector('#insertButton').addEventListener('click', () =>{
  let title = document.querySelector('#titleField').value;
  let body = document.querySelector('#bodyField');
  if(title && body){
    addNewPost(title, body);
  }else{
    alert("Prencha todos os campos")
  }
});

readPost();