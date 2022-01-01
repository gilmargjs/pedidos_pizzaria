//variavel para mostrar o numero da pizza
let modalKey = 0;

//variavel do carrinho
let cart = [];

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
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;

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

        ///***** adicionar carrinho *****/
        //atualizando o valor do numero da pizza
        modalKey = key;


        //adicionando imagem 
        c('.pizzaBig img').src = item.img;
        //adicionando nome
        c('.pizzaInfo h1').innerHTML = item.name;
        //adicionando descrição
        c('.pizzaInfo--desc').innerHTML = item.description;
        //adicionando preço
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
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

        c('.pizzaInfo--qt').innerHTML = modalQt;

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
function closeModal() {
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

//configurar botão de menos
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;

    };

});

//configurar botão de mais
c('.pizzaInfo--qtmais').addEventListener("click", () => {
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;

});

//selecionando para desabilitar todos e depois 
//selecionando especifico
cal('.pizzaInfo--size').forEach((size, indexsizes) => {
    //evento para selecionar os botoes de tamanho e depois removelos
    size.addEventListener('click', (e) => {
        //selecionando a classe para ser removida
        c('.pizzaInfo--size.selected').classList.remove('selected');
        //adicionando a classe selectede no botão clicado
        size.classList.add('selected')
    })
});


//******* adicionar ao carrinho ********/

c('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    //Valores do Carrinho

    //IDENTIFICADOR
    let identifier = pizzaJson[modalKey].id + '@' + size;

    //verificação se já existe o item no carrinho
    let key = cart.findIndex((item) => item.identifier == identifier);

    if (key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id, //identidade da pizza
            size, //tamanho da pizza
            qt: modalQt //quantidade de pizza
        })
    }
    //atualizar carrinho
    updateCart();
    //Fechando o Modal
    closeModal();
});
//fazer o aside aparecer
c('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0){
        c('aside').style.left = '0';
    }
});
c('.menu-closer').addEventListener('click', ()=>{
    c('aside').style.left = '100vw';
})
//***** atualização do carrinho *****

//função para atualizar oi carro
function updateCart() {
    //adicionando quantidades de tipos de pizza ao carrinho
    c('.menu-openner span').innerHTML = cart.length;

    //se o tamanho do carro for maior que 0
    //será adicionado a classe show
    if (cart.length > 0) {

        c('aside').classList.add('show');
        c('.cart').innerHTML = '';


        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        //loop percorrre o carrinho e procura se tem o item
        for (let i in cart) {

            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);

            subtotal += pizzaItem.price * cart[i].qt;

            //clonando o cart item
            let cartItem = c('.models .cart--item').cloneNode(true);

            //variavel que busca o tamanho da pizza
            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;

                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G'
                    break;
            }

            //VARIAVEL COM  NOME DA PIZZA  e TAMANHO  
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            //adicionando a imagem no carrinho
            cartItem.querySelector('img').src = pizzaItem.img;

            //adicionando o nome da pizza no carrinho
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;

            //adicionar quantidade do carrinho
            //obs:está pegando a quantidade no cart item
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();

            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            });
            c('.cart').append(cartItem);
        }
        //calculo de porcentagem
        desconto = subtotal * 0.1;
        total = subtotal - desconto;
        c('.subtotal span:last-child').innerHTML = subtotal.toFixed(2);
        c('.desconto span:last-child').innerHTML = desconto.toFixed(2);
        c('.total span:last-child').innerHTML = total.toFixed(2);

    } else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }

};