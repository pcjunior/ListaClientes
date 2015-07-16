
    //Variáveis de conexão com banco
    var db;
    var shortName = 'sysbcr';
    var version = '1.0';
    var displayName = 'sysbcr';
    var maxSize = 65535;

    //Função responsável por iniciar conexão
    function iniciarBanco(){

     if (!window.openDatabase) {
       alert('Navegador não suporte SQLite.');
       return;
     }

     db = openDatabase(shortName, version, displayName,maxSize);

     db.transaction(function(tx){
       tx.executeSql( 'CREATE TABLE IF NOT EXISTS bcr_cliente(codcliente INTEGER NOT NULL PRIMARY KEY, nomerazao TEXT NOT NULL, endereco TEXT NOT NULL, telefone TEXT)',
       [],function(){},errorHandler);
              },errorHandler,function(){});

    }

    //Lista os registros existentes no banco de dados
    function ListDBValues() {

      iniciarBanco();

      db.transaction(function(transaction) {
        transaction.executeSql('SELECT * FROM bcr_cliente;', [],
          mostrarRegistros ,errorHandler);
      });

       return;

    }

    //Grava um novo registro no banco de dados
    function gravarBanco(cliente) {

      iniciarBanco();

    	db.transaction(function(transaction) {
       transaction.executeSql('INSERT INTO bcr_cliente(codcliente, nomerazao, endereco, telefone) VALUES (?,?,?,?)',
        [cliente.codcliente, cliente.nomerazao, cliente.endereco, cliente.telefone], function(){}, errorHandler);
       },errorHandler,successCallBack);

    }
	
	function gravarCliente(cliente) {

      iniciarBanco();

	
	/*	for(i=0; i < cliente.cliente.length; i++)
		{*/
			
			db.transaction(function(transaction) {
				transaction.executeSql('INSERT INTO bcr_cliente(codcliente, nomerazao, endereco, telefone) VALUES (?,?,?,?)',
				[cliente.codcliente, cliente.nomerazao, cliente.endereco, cliente.telefone], function(){}, errorHandler);       
			},errorHandler,successCallBack);
			
		/*}*/

    }
	
	function apagarDadosCliente() {

    	db.transaction(function(transaction) {
			transaction.executeSql('delete from bcr_cliente', [], successCallBack ,errorHandler);
        });	

    }

	
    //Callback indica que foi gravado com sucesso
    function successCallBack(){
      alert("Operação realizada com sucesso");
        VoltarIndex();
    }

    //Callback de erro
    function errorHandler(error){
    	alert('Código do erro: ' + error.code);  
    }

    //Função resposável por retornar um registro por id
    function visualizarcliente(id){

      db.transaction(function(transaction) {
       transaction.executeSql('SELECT * FROM bcr_cliente WHERE codcliente = ?', [id],
         mostrarcliente ,errorHandler);
     });

    }