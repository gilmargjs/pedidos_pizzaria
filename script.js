//variavel para o modal
let modalQt = 1;

//constante para adicionar querySelect
const c = (el) => document.querySelector(el);

//constante para querySelectAll
const cal = (el) => document.querySelectorAll(el);


///////  LISTAGEM DAS PIZZAS  //////

//importando do pizza.js
pizzaJson.map((item, index) => {

    //selecionando a classe e clonando a estrutura 
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    //inserindo a chave das pizzas
    pizzaItem.setAttribute('data-key', index);
    //outra forma de pegar as imagens
    //c('.pizzaWindowArea .pizzaWindowBody .pizzaBig img').setAtribute('src',item.img)
    //trocar o src pela imagem
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;

    //pegar classe e colocar o valor
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2).replace('.',',')}`;

    //pegar a classe e colocar o nome do produto
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;

    //pegar a classe e colocar a descrição
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //pegar a classe e acrecentar os itens nas tag
    c('.pizza-area').append(pizzaItem);


    ////// EVENTOS DE CLICK //////

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        //previnir a  ação padrão 
        //ou seja não atualizar a tela
        e.preventDefault();

        //target = o proprio elemento
        //closest = acha o elemento mais proximo que tenha ('pizza-item')
        //getAttribute = pega o atributo 
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        //variavel para o modal
        modalQt = 1;




        //adicionando imagem 
        c('.pizzaBig img').src = item.img;
        //adicionando nome
        c('.pizzaInfo h1').innerHTML = item.name;
        //adicionando descrição
        c('.pizzaInfo--desc').innerHTML = item.description;
        //adicionando preço
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2).replace('.',',')}`;
        //tirando a seleção padrão da pizza grande
        c('.pizzaInfo--size.selected').classList.remove('selected');

        //adicionar as quantidas nas sinformações
        //forEach busca cada item na lista
        cal('.pizzaInfo--size').forEach((size, indexsizes) => {
            //colocando a seleção padrão para pizza grande
            //pra quando for reiniado abrir como padrão a grande
            if (indexsizes == 2) {
                size.classList.add('selected');
            };
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[indexsizes];
        });


        //acrecentando opacidade 0 ao menu
        c('.pizzaWindowArea').style.opacity = 0;
        //acrecentando o display flex 
        c('.pizzaWindowArea').style.display = 'flex';
        //intervalo para aparecer o conteudo na tela 
        setTimeout(() => {
            //acrecentando um valor 1 para mostrar o menu
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

});

///////  EVENTOS DO MODAL  ///////

//FECHAR O MODAL

//funçaõ para fechar modal
function closeModal()  {
    //efeito para fechar 
    c('.pizzaWindowArea').style.opacity = 0;
    //modificando o display none para sumir com o modal
    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);
}
//pegando os botoes para execultar o evento de click com função closeModal
cal('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
})