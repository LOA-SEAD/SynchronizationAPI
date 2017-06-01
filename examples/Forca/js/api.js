

var verify = true;

function _get(url) {
    var d = $.Deferred();
    if (doesConnectionExist(url)) {        
        verifyLocalStorage();        
        $.getJSON(url, function (data) {
            //alert("nome:" + data[0].nome);
            //saveSession(data);            
            saveLocal('get', url, data);
            alert('url: ' + url);
            alert(data[0].jogador);
            d.resolve(data);
        });
        

        //o código abaixo também funciona
        /*var d = $.Deferred();

        $.ajax({
            type: 'GET',
            url: url,
            dataType: "json",
            success: function (data) {
                d.resolve(data);
                alert('dados do grid:' + data);
            },
            error: function (e) {
                alert("error: " + e.responseText);
            }
        });

        return d.promise();*/
    }
    else
    {
        //comparar a url salva em localStorage com a solicitada     
        alert('No connection!');
        for (var i = 0, len = localStorage.length; i < len; ++i) {
            var key = localStorage.key(i);
            if (key.split('_')[0] == 'get' && key.split('_')[2] == url) {
                var retorno = localStorage.getItem(key);
                d.resolve(JSON.parse(retorno));
                break;
                //return localStorage.getItem(key);
            }
            else
                alert('nao caiu');
        }
    }
    alert('retornou');
    return d.promise();
}

function _getid(url) {
    if (doesConnectionExist(url)) {
        verifyLocalStorage();
        $.getJSON(url, function (data) {
            saveLocal('get', url, data);
            d.resolve(data);
        });
    }
    else {
        //comparar a url salva em localStorage com a solicitada     
        alert('No connection!');
        for (var i = 0, len = localStorage.length; i < len; ++i) {
            var key = localStorage.key(i);
            if (key.split('_')[0] == 'get' && key.split('_')[2] == url) {
                var retorno = localStorage.getItem(key);
                d.resolve(JSON.parse(retorno));
                break;
                //return localStorage.getItem(key);
            }
            else
                alert('nao caiu');
        }
    }
    return d.promise();
}

function _post(url, json) {
    var data;
    if (doesConnectionExist(url)) {
        verifyLocalStorage();
        $.ajax({
            type: 'POST',
            url: url,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(json),
            //processData: false,
            dataType: 'json',
            cache: false,
            async: false,
            //headers: {"Access-Control-Allow-Origin":'*'},
            success: function (retorno) {
                console.log(retorno);
                alert('post - deu certo');
                data = retorno;
            },
            error: function (xhr) {
                console.log(xhr);
                alert('post - n deu certo');
                alert(xhr);
                dados = JSON.stringify(json);
                alert('post dados:' + dados);
                alert(dados.nome);
            }
        });
    }
    else       
        saveLocal('post', url, json);
    return data;
}

function _put(url, json) {
    if (doesConnectionExist(url)) {
        verifyLocalStorage();
        $.ajax({
            type: 'PUT',
            url: url,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(json),
            dataType: 'json',
            cache: false,
            async: false,
            success: function (data) {
                console.log(data);
                alert('put - deu certo');
            },
            error: function (xhr) {
                alert(' put - n deu certo');
                alert(url);
                alert('put' + 'id:' + json.id + 'nome:' + json.nome + 'telefone:' + json.telefone + 'email:' + json.email + 'logradouro:' + json.logradouro + 'numero:' + json.numero + 'complemento:' + json.complemento + 'cidade:' + json.cidade + 'estado:' + json.estado + 'cep:' + json.cep);
            }
        });
    }
    else {
        alert('put, url:' + url);
        saveLocal('put', url, json);        
    }
}

function _delete(url) {
    if (doesConnectionExist(url)) {
        verifyLocalStorage();
        $.ajax({
            type: 'DELETE',
            url: url,
            async: false,
            success: function (data) {
                console.log(data);
                alert('delete - deu certo')
            },
            error: function (xhr) {
                console.log(xhr);
                alert('delete  - n deu certo');
                return xhr;
            }
        });
    }
    else
        saveLocal('delete', url, null);
}


//----------------------

//web storage

window.onload = function () {
    if (typeof (Storage) != "undefined") {
        verifyLocalStorage();
    }        
    else {
        alert("Não há suporte para Web Storage");
    }
};

function verifyLocalStorage()
{
    //localStorage.clear();
    if (verify) {
        verify = false;
        //localStorage.getItem(localStorage.key(0));
        //var x = doesConnectionExist(url);                
        if (localStorage.length > 0) {
            alert('verifyLocalStorage');
            //var cont = localStorage.length;            
            //comecando do maior índice, pois ao adicionar uma nova chave ela vai para o índice zero. - Não vai, não tem ordem...
            //var index = localStorage.length - 1;

            var chave = localStorage.getItem('chave');
            if (chave != null) {
                chave = JSON.parse(localStorage.getItem('chave'));
                var chave_aux = chave.slice();
                for(var i=0, len = chave.length; i<len; i++)
                {
                    alert('i=' + i);
                    var url = chave[i].replace(chave[i].split('_')[0] + '_', '');
                    url = url.replace(chave[i].split('_')[1] + '_', '');
                    if(doesConnectionExist(url))
                    {
                        alert('i=' + i + chave[i].split('_')[0]);
                        if (chave[i].split('_')[0] == 'post') {
                            if(localStorage.getItem(chave[i]) != null)
                                _post(url, JSON.parse(localStorage.getItem(chave[i])));
                        }
                        else if (chave[i].split('_')[0] == 'put') {
                            if (localStorage.getItem(chave[i]) != null)
                                _put(url, JSON.parse(localStorage.getItem(chave[i])));
                        }
                        else if (chave[i].split('_')[0] == 'delete') {                            
                            _delete(url);
                        }

                        alert('chave[i] = ' + chave[i]);
                        localStorage.removeItem(chave[i]);
                        //remover
                        chave_aux.splice(i, 1);
                    }                    
                }
                chave = chave_aux.splice();                
                localStorage.removeItem('chave');
                localStorage.setItem('chave', JSON.stringify(chave));
            }

            //var url = localStorage.key(0).replace(localStorage.key(0).split('_')[0] + '_', '');
            //url = url.replace(localStorage.key(0).split('_')[1] + '_', '');

            //while (localStorage.length > 0 && doesConnectionExist(url)) {
            //    alert('caiu no while');
            //    alert(index);
            //    if (localStorage.key(index).split('_')[0] == 'post')
            //        _post(url, JSON.parse(localStorage.getItem(localStorage.key(index))));
            //    else if (localStorage.key(index).split('_')[0] == 'put')
            //        _put(url, JSON.parse(localStorage.getItem(localStorage.key(index))));
            //    else if (localStorage.key(index).split('_')[0] == 'delete')
            //        _delete(url);

            //    //se for get, não remove do localStorage. Cada vez que a chave n é excluída, a chave n+1 vira a chave n.
            //    if (localStorage.key(index).split('_')[0] != 'get' )
            //        localStorage.removeItem(localStorage.key(index));

            //    index--;
                    
            //}
        }
        else
            alert('localStorage.length == 0');
        verify = true;
    }   
}

function doesConnectionExist(url) {
    var xhr = new XMLHttpRequest();    
    var randomNum = Math.round(Math.random() * 10000);

    xhr.open('GET', url + "?rand=" + randomNum, false);

    try {
        xhr.send();

        if (xhr.status >= 200 && xhr.status < 304) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}


//the next two functions are written the same way as the previous two
//function saveLocal(object) {
//    var value = JSON.stringify(object);
//    localStorage.setItem(1, value);
//    //data = JSON.parse(localStorage.getItem(1));
//    //alert("primeiro" + data[0].nome);
//    getLocal();
//}

function removechave(key)
{
    var chave = localStorage.getItem('chave');
    if (chave != null) {
        chave = JSON.parse(localStorage.getItem('chave'));
        if (chave.indexOf(key) > -1) {
            chave.splice(chave.indexOf(key), 1);
        }
        localStorage.setItem('chave', JSON.stringify(chave));
    }
}

function saveLocal(verb, url, json)
{
    if (verb == 'get' || verb == 'put') {
        //comparar a url salva em localStorage com a solicitada   
        var j = 0;
        for (var i = 0, len = localStorage.length; i < len; ++i) {
            var key = localStorage.key(j);
            if (verb == 'get' && key.split('_')[0] == 'get' && key.split('_')[2] == url)
                localStorage.removeItem(key);
            else if (verb == 'put' && key.split('_')[0] == 'put' && key.split('_')[2] == url) {
                localStorage.removeItem(key);
                removechave(key);
            }
            else
                j++;
        }
        /*for (var key in localStorage.key) {
            alert('save local. key:' + key);
            if (key.split('_')[0] == 'get' && key.split('_')[2] == url)
                localStorage.removeItem(key);
        }*/
    }
    var data = new Date();
    var month = data.getMonth() + 1;
    var now = data.getDate() + '' + month + '' + data.getFullYear() + '|' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds() + ':' + data.getMilliseconds();
    localStorage.setItem(verb + '_' + now + '_' + url, JSON.stringify(json));
    if(verb == 'post' || verb == 'put' || verb == 'delete')
    {
        var chave = localStorage.getItem('chave');
        if (chave != null) {
            chave = JSON.parse(localStorage.getItem('chave'));
            chave.push(verb + '_' + now + '_' + url);
            localStorage.setItem('chave', JSON.stringify(chave));
        }
        else {
            chave = [];
            chave.push(verb + '_' + now + '_' + url);
            localStorage.setItem('chave', JSON.stringify(chave));
        }
    }
}