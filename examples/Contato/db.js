(function() {
    var json;
    var db = {
                

        loadData: function (filter) {
            return $.grep(this.contatos, function(contato) {
                return (!filter.nome || contato.nome.indexOf(filter.nome) > -1)
                    && (!filter.telefone || contato.telefone.indexOf(filter.telefone) > -1)
                    && (!filter.email || contato.email.indexOf(filter.email) > -1)
                    && (!filter.logradouro || contato.logradouro.indexOf(filter.logradouro) > -1)
                    && (!filter.numero || contato.numero.indexOf(filter.numero) > -1)
                    && (!filter.complemento || contato.complemento.indexOf(filter.complemento) > -1)
                    && (!filter.cidade || contato.cidade.indexOf(filter.cidade) > -1)
                    && (!filter.estado || contato.estado.indexOf(filter.estado) > -1);
            });

        },

        loadData: function () {
            /*$.getJSON('http://localhost:8080/api-gateway/contato-ws/contato', function (data) {
                alert("nome:" + data[0].nome);
                //saveSession(data);
                saveLocal('get', 'http://localhost:8080/api-gateway/contato-ws/contato', data);
                alert(JSON.stringify(data));
                return JSON.stringify(data);
            });*/
            /*var json = _get('http://localhost:8080/api-gateway/contato-ws/contato');
            alert(JSON.stringify(json));            
            return (JSON.stringify(json));*/
            //return [{ "id": 3, "nome": "contato", "telefone": "(xx) 99999-1111", "email": "teste@teste.com", "logradouro": "rua teste", "numero": "1-2", "complemento": "", "cidade": "sao carlos", "estado": "sp", "cep": "0000-000" }];            
            
            json = _get('http://localhost:8080/api-gateway/contato-ws/contato');
            db.contatos = json;
            alert('loadData:' + json);
            return json;

            //o código abaixo também funciona:
            /*var d = $.Deferred();

            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/api-gateway/contato-ws/contato',
                dataType: "json",
                success: function (data) {
                    d.resolve(data);
                },
                error: function (e) {
                    alert("error: " + e.responseText);
                }
            });

            return d.promise();*/
        },


        insertItem: function(insertingClient) {            

            var json_post = { "nome": insertingClient.nome, "telefone": insertingClient.telefone, "email": insertingClient.email, "logradouro": insertingClient.logradouro, "numero": insertingClient.numero, "complemento": insertingClient.complemento, "cidade": insertingClient.cidade, "estado": insertingClient.estado, "cep": insertingClient.cep };
            var retorno = _post('http://localhost:8080/api-gateway/contato-ws/contato', json_post);
            if (retorno != undefined) {
                insertingClient.id = retorno.id;
                //alert(insertingClient.id);
                //alert(retorno.id);
            }
            this.contatos.push(insertingClient);            

        },

        updateItem: function (updatingClient) {
            var json_put = { "id": parseInt(updatingClient.id), "nome": updatingClient.nome, "telefone": updatingClient.telefone, "email": updatingClient.email, "logradouro": updatingClient.logradouro, "numero": updatingClient.numero, "complemento": updatingClient.complemento, "cidade": updatingClient.cidade, "estado": updatingClient.estado, "cep": updatingClient.cep };
            alert('updateItem:' + updatingClient.id);
            _put('http://localhost:8080/api-gateway/contato-ws/contato/' + updatingClient.id, json_put);
        },

        deleteItem: function(deletingClient) {
            var clientIndex = $.inArray(deletingClient, this.contatos);
            this.contatos.splice(clientIndex, 1);
            _delete('http://localhost:8080/api-gateway/contato-ws/contato/' + deletingClient.id);
        }

    };

    window.db = db;

    //alert(JSON.stringify(_getid('http://localhost:8080/api-gateway/contato-ws/contato/1')));

   db.contatos = [{ }];    

    }());