const botaoConfirma = document.getElementById('botaoConfirma');

function insertNumber(num) {
    const botaoConfirma = document.getElementById('botaoConfirma');
    var numeroDig = document.getElementById('numeroDigitado').innerHTML;
    var numeroDig2 = document.getElementById('segundoNumeroDigitado').innerHTML;

    if (numeroDig.length < 1) {

        document.getElementById('numeroDigitado').innerHTML = numeroDig + num;
        somBip();

    }
    else if (numeroDig2.length < 1) {
        document.getElementById('segundoNumeroDigitado').innerHTML = numeroDig2 + num;
        somBip();
        retornaInfoCandidatoTela();
        botaoConfirma.removeAttribute('disabled');



    }
}

/* LIMPA OS CAMPOS DA TELA */
function limpaDigitado() {
    document.getElementById("numeroDigitado").innerHTML = "";
    document.getElementById("segundoNumeroDigitado").innerHTML = "";
    document.getElementById("text").innerHTML = "";
    document.getElementById("info").innerHTML = "";


}


function somRegistrado() {
    var audio = new Audio('Sounds/votoRegistrado.mp3');
    audio.play();

}
function somBip() {
    var audio = new Audio('Sounds/bip.mp3');
    audio.play();
}

/* RETORNA INFORMAÇÕES DO CANDIDATO EM TELA*/

async function retornaInfoCandidatoTela(branco) {


    var count = 0;
    var verificaCampoInfo = document.getElementById('text').innerHTML;
    num1 = document.getElementById('numeroDigitado').innerHTML;
    num2 = document.getElementById('segundoNumeroDigitado').innerHTML;
    numCandidato = num1 + num2;
    let userData = 0;
    if (verificaCampoInfo == "" && numCandidato != 0) {

        let response = await fetch("https://localhost:7120/candidate?numCandidato=" + numCandidato);
        try {
            userData = await response.json();
        }
        catch {
            document.getElementById('info').innerHTML = "Este candidato não está cadastrado em nossa base.";
        }
        if (userData.length > 0 && userData != undefined) {


            document.getElementById('text').innerHTML = "Candidato" + '<br/>' + userData[0].nomeCompleto;
            document.getElementById('info').innerHTML = "Vice" + '<br/>' +  userData[0].vice;
        } else {
            document.getElementById('info').innerHTML = "Este candidato não está cadastrado em nossa base.";
            
        }


        count = 1;


    } else if (branco == "Branco") {
        registraVoto(branco);
        document.getElementById('info').innerHTML = "Voto Branco Registrado !";
        setTimeout(function () {
            limpaDigitado();
            
        }, 1500);
        botaoConfirma.attributes('disabled');

    } else if (numCandidato != 0 && verificaCampoInfo != "") {
        setTimeout(function () {
            limpaDigitado();
           
        }, 1500);
        registraVoto(branco);
        botaoConfirma.attributes('disabled');
        
    } else {
        document.getElementById('text').innerHTML = "Por favor, digite um número."
    }





}


/* REGISTRA VOTOS */

function registraVoto(branco) {
    const botaoConfirma = document.getElementById('botaoConfirma');
    num1 = document.getElementById('numeroDigitado').innerHTML;
    num2 = document.getElementById('segundoNumeroDigitado').innerHTML;
    numCandidato = num1 + num2;

    if (num1.length != 0 && num2.length != 0 && branco == undefined) {

        var registra = insereVoto("https://localhost:7120/vote?num=" + numCandidato);


        data = registra;
        if (data == "Voto Registrado!") {
            limpaDigitado();
            somRegistrado();
            document.getElementById('info').innerHTML = "Voto registrado !";
            botaoConfirma.attributes('disabled');
            setTimeout(function () {
                limpaDigitado();
            }, 1500);
            
        } else {
            limpaDigitado();
            var msgmVazio = data;

            document.getElementById('info').innerHTML = msgmVazio;
        }
        /* Validando votos Brancos */
    } else if (branco === 'Branco') {

        numCandidato = 0;
        var registra = insereVoto("https://localhost:7120/vote?num=" + numCandidato);
        document.getElementById('info').innerHTML = "Voto Branco Registrado !";
        somRegistrado();
        setTimeout(function () {
            limpaDigitado();
        }, 1500);



        data = registra;
        if (data == "Voto Registrado!") {
            limpaDigitado();
            somRegistrado();
           
        } else {
            limpaDigitado();
            var msgmVazio = data;
            somRegistrado();
            document.getElementById('info').innerHTML = msgmVazio;
        }



    } else {
        limpaDigitado();
        var msgmVazio = "Por favor, digite um número.";
        botaoConfirma.attributes('disabled');

        document.getElementById('info').innerHTML = msgmVazio;
    }

}



function insereVoto(url) {
    let request = new XMLHttpRequest();
    request.open("POST", url, false);
    request.send();
    return request.responseText;


}


/* VOLTA PARA A TELA INICIAL */
function voltaInicial() {
    const boxVerVotos = document.getElementById('boxVerVotos');
    const box = document.getElementById('box');
    const boxCadastro = document.getElementById('boxCadastro');
    const boxVerCandidados = document.getElementById('boxVerCandidados');

    if (boxVerCandidados.style.display === 'block' || boxCadastro.style.display === 'block' || boxVerVotos.style.display === 'block') {
        boxVerCandidados.style.display = 'none';
        box.style.display = 'block';
        boxCadastro.style.display = 'none';
        boxVerVotos.style.display = 'none';
    }
}


/* VER CANDIDATOS */

async function abreTelaVerCandidatos() {

    const box = document.getElementById('box');
    const boxCadastro = document.getElementById('boxCadastro');
    const boxVerCandidados = document.getElementById('boxVerCandidados');
    boxVerCandidados.style.display = 'block';
    box.style.display = 'none';
    boxCadastro.style.display = 'none';
    lstCandidatos = [];

    let response = await fetch(`https://localhost:7120/candidate?numCandidato=` + 0);
    let userData = await response.json();
    console.log(userData[0].nomeCompleto)



    let tbody = document.getElementById("tbody");
    tbody.innerText = '';

    if (userData.length > 0) {

        for (var i = 0; i < userData.length; i++) {
            let tr = tbody.insertRow();

            let td_nome = tr.insertCell();
            let td_vice = tr.insertCell();
            let td_deleta = tr.insertCell();
            const btnDelete = document.createElement("button");
            btnDelete.innerHTML = "Deletar";
            btnDelete.setAttribute("onclick", "deletaCandidato(" + userData[i].idCandidato + ")");
            btnDelete.setAttribute("class", "btn btn-danger");
            btnDelete.setAttribute("font-weight", "900");

            td_nome.innerText = userData[i].nomeCompleto;
            td_vice.innerText = userData[i].vice;
            td_deleta.appendChild(btnDelete);

        }
    }

}
/* VER VOTOS */

async function abreTelaVerVotos() {

    const box = document.getElementById('box');
    const boxCadastro = document.getElementById('boxCadastro');
    const boxVerVotos = document.getElementById('boxVerVotos');
    const boxVerCandidados = document.getElementById('boxVerCandidados');
    boxVerCandidados.style.display = 'none';
    boxVerVotos.style.display = 'block';
    box.style.display = 'none';
    boxCadastro.style.display = 'none';
    lstCandidatos = [];

    let response = await fetch(`https://localhost:7120/votes?`);
    let userData = await response.json();
    


    let tbody = document.getElementById("tbodyVerVotos");
    tbody.innerText = '';

    if (userData.length > 0) {

        for (var i = 0; i < userData.length; i++) {
            let tr = tbody.insertRow();

            let td_nome = tr.insertCell();
            let td_vice = tr.insertCell();
            let td_info = tr.insertCell();
            let td_qtd = tr.insertCell();

            if( 10 > 1)
            {
            td_nome.innerText = userData[i].nomeCompleto;
            td_vice.innerText = userData[i].vice;
            td_info.innerText = userData[i].info;
            td_qtd.innerText = userData[i].qtdVotos;
            }

        }
    }

}


/* DELETA CANDIDATO */

async function deletaCandidato(id) {

    var deletaCand = await deleta("https://localhost:7120/candidate?id=" + id);
    var data = deletaCand;
    boxVerCandidados.style.display = 'none';
    box.style.display = 'block';
    boxCadastro.style.display = 'none';

    voltaInicial();



}

async function deleta(url) {
    let request = new XMLHttpRequest();
    request.open("DELETE", url, true);
    request.send();
    console.log(request.responseText);
    return request.responseText;
}


/* ABRE TELA CADASTRO*/
function abreTelaCadastro() {
    const box = document.getElementById('box');
    const boxCadastro = document.getElementById('boxCadastro');
    const boxVerCandidados = document.getElementById('boxVerCandidados');

    boxVerCandidados.style.display = 'none';
    box.style.display = 'none';
    boxCadastro.style.display = 'block';

}





function cadastraCandidato() {

    let form = document.getElementById('candidatoCad');
    
    let name = form.elements[0];
    let nomeCandidato = name.value;
    let vice = form.elements[1];
    let vicePre = vice.value;
    let numC = form.elements[2];
    let numCand = numC.value;
    let info = form.elements[3];
    let infoCad = info.value;




    if (nomeCandidato.length != 0 && vicePre.length != 0 && infoCad.length != 0 && numCand.length != 0) {

        var registraCand = cadCandidato("https://localhost:7120/candidate?NomeCom=" + nomeCandidato + '&VicePre=' + vicePre + '&NumCandidato=' + numCand + '&Legenda=' + infoCad);


        data = registraCand;
        if (data == "Candidato cadastrado !") {
            console.log("Candidato cadastrado !");
            somRegistrado();
        } else {
            limpaDigitado();
            alert(data);
        }
    } else {
        limpaDigitado();
        var msgmVazio = "Digite um número !";

        document.getElementById('info').innerHTML = msgmVazio;
    }

}



function cadCandidato(url) {
    let request = new XMLHttpRequest();
    request.open("POST", url, false);
    request.send();
    console.log(request.responseText);
    return request.responseText;


}