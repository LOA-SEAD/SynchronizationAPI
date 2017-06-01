function _get(url) {
    if (doesConnectionExist(url)) {
        $.getJSON(url, function (data) {
            alert("nome:" + data[0].nome);
            saveSession(data);
            saveLocal('get', url, data);
        });
    }
    else
    {
        //comparar a url salva em localStorage com a solicitada       
        for (var key in localStorage) {
            if (key.split('_')[0] == 'get' && key.split('_')[2] == url)
                return localStorage.getItem(key);
        }
    }
}

function _getid(url) {
    if (doesConnectionExist(url)) {
        $.getJSON(url, function (data) {
            alert("Nome:" + data.nome + "Duracao:" + data.duracao);
            saveLocal('get', url, data);
        });
    }
    else {
        //comparar a url salva em localStorage com a solicitada       
        for (var key in localStorage) {
            if (key.split('_')[0] == 'get' && key.split('_')[2] == url)
                return localStorage.getItem(key);
        }
    }
}

function _post(url, json) {
    if (doesConnectionExist(url)) {
        $.ajax({
            type: 'POST',
            url: url,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(json),
            //processData: false,
            dataType: 'json',
            cache: false,
            //headers: {"Access-Control-Allow-Origin":'*'},
            success: function (data) {
                console.log(data);
            },
            error: function (xhr) {
                console.log(xhr);
            }
        });
    }
    else       
        saveLocal('post', url, json);    
}

function _put(url, json) {
    if (doesConnectionExist(url)) {
        $.ajax({
            type: 'PUT',
            url: url,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(json),
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log(data);
            },
            error: function (xhr) {
                console.log(xhr);
            }
        });
    }
    else
        saveLocal('put', url, json);
}

function _delete(url) {
    if (doesConnectionExist(url)) {
        $.ajax({
            type: 'DELETE',
            url: url,
            success: function (data) {
                console.log(data);
            },
            error: function (xhr) {
                console.log(xhr);
            }
        });
    }
    else
        saveLocal('delete', url, null);
}


//----------------------

//web storage

window.onload = function () {
    if (typeof (Storage) !== "undefined") {
        loadvalues();

        localStorage.getItem(localStorage.key(0));

        //var x = doesConnectionExist(url);
        //alert(x);
        if (localStorage.key(0) != null) {
            var url = localStorage.key(0).replace(localStorage.key(0).split('_')[0] + '_', '');
            url = url.replace(localStorage.key(0).split('_')[1] + '_', '');
            while (localStorage.key(0) != null && doesConnectionExist(url)) {
                if (localStorage.key(0).split('_')[0] == 'post')
                    _post(url, localStorage.getItem(localStorage.key(0)));
                else if (localStorage.key(0).split('_')[0] == 'put')
                    _put(url, localStorage.getItem(localStorage.key(0)));
                else if (localStorage.key(0).split('_')[0] == 'delete')
                    _delete(url);
                //if get only remove
                localStorage.removeItem(localStorage.key(0));
            }
        }
    }
    else {
        alert("Não há suporte para Web Storage");
    }
};

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

function loadvalues() {
    getSession(); //get the session storage data
    getLocal(); //get the local storage data
}

function saveSession(object) {
    var value = JSON.stringify(object); //get it's value
    sessionStorage.setItem(1, value); //store the value with a key as 1
    getSession(); //get loaded value and display on screen
}
function getSession() {
    var data;
    var thediv = document.getElementById("displaysession"); //get element
    data = sessionStorage.getItem(1); //select the value by searching for that key, in our case, 1
    if (data) { //if we got something
        thediv.innerHTML = "O valor é " + data; //change the innerHTML to refelect the senetence which posts the value
    }

}
//the next two functions are written the same way as the previous two
function saveLocal(object) {
    var value = JSON.stringify(object);
    localStorage.setItem(1, value);
    //data = JSON.parse(localStorage.getItem(1));
    //alert("primeiro" + data[0].nome);
    getLocal();
}
function getLocal() {
    var data;
    var thediv = document.getElementById("displaylocal");
    data = JSON.parse(localStorage.getItem(1));
    if (data) {
        //alert(JSON.stringify(data));
        //alert(data);
        thediv.innerHTML = "O valor é " + JSON.stringify(data, null, 2);
        for (var i = 0; data[i]; i++) {
            alert(data[i].nome);
            console.log(data[i].nome + data[i].descricao);
        }
    }
}

function saveLocal(verb, url, json)
{
    if (verb == 'get')
    {
        //comparar a url salva em localStorage com a solicitada       
        for (var key in localStorage) {
            if (key.split('_')[0] == 'get' && key.split('_')[2] == url)
                localStorage.removeItem(key);
        }
    }
    var data = new Date();
    var month = data.getMonth() + 1;
    var now = data.getDate() + '' + month + '' + data.getFullYear() + '|' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds() + ':' + data.getMilliseconds();
    localStorage.setItem(verb+'_' + now + '_' + url, json);    
}