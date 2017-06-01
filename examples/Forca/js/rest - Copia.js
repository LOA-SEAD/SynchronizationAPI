
var ranking;

var maquina = 'localhost';

var server = 'http://'+maquina+':8080/REMAR/pontuacao/';

function compare(a,b) {
  if (a.pontos != b.pontos)
    return b.pontos - a.pontos;
  else {
    if (a.data < b.data)
      return -1
    if (a.data > b.data)
      return 1
  } 
  return 0;
}

function salvaPontuacao(nomeJogo, pontos) {

    var jogador = prompt("Qual seu nome?");

    console.log(server+'save/?jogo=' + nomeJogo + '&jogador=' + jogador+'&pontos='+pontos);

    $.ajax({
        url: server + 'save',
        type: 'POST',
        async: false,
        data: 'jogo=' + nomeJogo + '&jogador=' + jogador +'&pontos='+pontos,
        success: function(data) {            
            //if (data == "true") {
            //    destruirCamadaMenu();
            //    obtemRanking(nomeJogo)
            //}
        }
    });
}

function obtemRanking(){

    ranking = [
               {"nome":"Fulano", "pontos":"10", "data":"01/06/2017"}, 
               {"nome":"Sincrano", "pontos":"9", "data":"01/05/2017"},
               {"nome":"Fulano", "pontos":"10", "data":"01/04/2017"},
               {"nome":"Sincrano", "pontos":"9", "data":"01/03/2017"},
               {"nome":"Fulano", "pontos":"10", "data":"01/02/2017"},
               {"nome":"Sincrano", "pontos":"9", "data":"01/01/2017"}
              ];

    ranking.sort(compare);
    ranking = ranking.slice(0,5);
    criarCamadaRanking();
 

console.log(ranking);


    //console.log(server + 'show/?jogo=' + nomeJogo);

    //var jqxhr = $.get(server + 'show/?jogo=' + nomeJogo)
    //.error(function() {
    //    alert("error");
    //})
    //.complete(function(data) {
    //    ranking = eval ('(' + data.responseText + ')');
    //    var pages = (ranking.length - 1)/ 5;
    //    criarCamadaRanking(0, parseInt(pages));
    //});
}
