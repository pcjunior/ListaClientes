
    //Callback responsavel por mostrar lista de anotações
    function mostrarRegistros(transaction, result){

      var detalhescliente = document.getElementById("detalhescliente");
      var lista = '';

      if (result != null && result.rows != null) {

        for (var i = 0; i < result.rows.length; i++) {
          var row = result.rows.item(i);
           lista = lista + '<li class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c">';
           lista = lista + '<div class="ui-btn-inner ui-li"><div class="ui-btn-text">';
           lista = lista + '<a class="ui-link-inherit" href="visualizar.html?id=' + row.codcliente + '" >';
           lista = lista + '<h3 class="ui-li-heading">' + row.codcliente +' - '+ row.nomerazao+ '</h3>';
           lista = lista + '<p class="ui-li-desc">' + row.endereco + '<br />' + row.telefone + '</p>';
           lista = lista + '</a></div></div></li>';
        }
		
        detalhescliente.innerHTML = lista;

      }

    }

    //Função chamada ao clicar no botão para gravar um registro
    function gravarcliente(){

    	cliente = new Object();
        cliente.codcliente = document.getElementById('codcliente').value;
    	cliente.nomerazao = document.getElementById('nomerazao').value;
    	cliente.endereco = document.getElementById('endereco').value;
    	cliente.telefone = document.getElementById('telefone').value;
  
    	gravarBanco(cliente);

    }
	 function successCallBack2(){
      alert("Operação realizada com sucesso");
        VoltarIndex();
    }

	setInterval(sincronismo, 10000);
	
	function sincronismo(){
	
	//	apagarDadosCliente();	
	
		var codcliente = '';
		var nomerazao  = '';
		var endereco   = '';
		var telefone   = '';		

		$.getJSON("http://www.bartofil.com.br/site/sincronismo.php",function(retorno){	

			db.transaction(function(transaction) {
				for(i=0; i < retorno.clie.length; i++)
				{
				
					codcliente = retorno.clie[i].codpessoa;
					nomerazao  = retorno.clie[i].nomerazao;
					endereco   = retorno.clie[i].enderrua;
					telefone   = retorno.clie[i].foneddd1+' '+retorno.clie[i].fonenro1;
			
					//cliente.push("'INSERT INTO bcr_cliente(codcliente, nomerazao, endereco, telefone) VALUES (?,?,?,?)',['"+retorno.clie[i].codpessoa+"','"+retorno.clie[i].nomerazao+"','"+retorno.clie[i].enderrua+"','"+retorno.clie[i].foneddd1+"-"+retorno.clie[i].fonenro1+"']");
				

					transaction.executeSql('INSERT INTO bcr_cliente(codcliente, nomerazao, endereco, telefone) VALUES (?,?,?,?)',[codcliente, nomerazao, endereco, telefone], null,null);       
				}
			} ,errorHandler,successCallBack);

		
		
		});
		
		/*
			for(i=0; i < retorno.clie.length; i++)
			{
				
				cliente = new Object();
				cliente.codcliente = retorno.clie[i].codpessoa;
				cliente.nomerazao  = retorno.clie[i].nomerazao;
				cliente.endereco   = retorno.clie[i].enderrua;
				cliente.telefone   = retorno.clie[i].foneddd1 + ' ' +retorno.clie[i].fonenro1;
			}
		*/
  

    }

    // Funções reponsáveis pelas açoes da página de visualização
    $(document).on("pageshow",  function(){

            var url = $("#visualizar" ).attr("data-url");

            if (_GET("id", url) != null) 
			{
                visualizarcliente(_GET("id", url));
			}
            else
              ListDBValues();   
    }); 

    // Callback da função visualizarcliente exibe os detalhes da anotação
    function mostrarcliente(transaction, result) {

      cliente = '<strong>Cód.Cliente: </strong>' + result.rows.item(0).codcliente + "<br/>";
      cliente = cliente + '<strong>Descrição: </strong>' + result.rows.item(0).nomerazao + "<br/>";
      cliente = cliente + '<strong>Endereço: </strong>' + result.rows.item(0).endereco + "<br/>";
      cliente = cliente + '<strong>Telefone: </strong>' + result.rows.item(0).telefone;

      var detalhescliente = document.getElementById("detalhesAnotacao");
      detalhescliente.innerHTML = cliente;

    }

    //Capturar imagem
    function capturarImagem(){

        navigator.camera.getPicture(capturarSuccess, capturarFail,
            {
                destinationType : Camera.DestinationType.FILE_URI,
                sourceType : Camera.PictureSourceType.CAMERA
            }
        );
    }

    //Callback de capturado com sucesso
    function capturarSuccess(imageCaminho) {
        imagemURL = imageCaminho;

        img = document.getElementById('img');
        img.innerHTML = '<span>Imagem Capturada:</span><br/><img src="' + imageCaminho + '" />';
    }

    //Callback de erro ao capturar imagem
    function capturarFail(message) {
        alert('Erro: ' + message);
    }

