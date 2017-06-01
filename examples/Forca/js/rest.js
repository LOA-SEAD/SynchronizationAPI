
var maquina = 'localhost';

var server = 'http://' + maquina + ':8080/REMAR/pontuacao/';

var ranking;

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

function salvaPontuacao(pontos) {

    var jogador = prompt("Qual seu nome?");

    console.log(server+'save/?jogador=' + jogador+'&pontos='+pontos);

    var json_post = { "jogador": jogador, "pontos": pontos, "data": new Date() };
    var retorno = _post('http://localhost:8080/api-gateway/ranking/ranking', json_post);

    /*
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
    */
}

function obtemRanking(){

    /*
    ranking = [
               {"nome":"Delano", "pontos":"10", "data":"01/06/2017"}, 
               {"nome":"Sincrano", "pontos":"9", "data":"01/05/2017"},
               {"nome":"Fulano", "pontos":"10", "data":"01/04/2017"},
               {"nome":"Sincrano", "pontos":"9", "data":"01/03/2017"},
               {"nome":"Fulano", "pontos":"10", "data":"01/02/2017"},
               {"nome":"Sincrano", "pontos":"9", "data":"01/01/2017"}
              ];
    */
    ranking = [{}];
    $.ajaxSetup({ async: false });
    _get('http://localhost:8080/api-gateway/ranking/ranking').then(function(data){
        // executado após a conclusão da execução
        ranking = data;
    });
    
    alert('aqui');
    alert(JSON.stringify(ranking));
    alert('ranking:' + ranking[0].jogador);
    ranking.sort(compare);
    ranking = ranking.slice(0,5);
    criarCamadaRanking();

    console.log(ranking);

    $.ajaxSetup({ async: true });

    //$.ajaxSetup({ async: true });

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
