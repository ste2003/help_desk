angular.module('appTP').factory('materiaService',
		['$http','$q','URL_MATERIA',
		 function($http,$q,baseUrl) {
			var _lista=[];
			var _elementoEncontrado;
			var dat_insert ;
			var _agregar = function(objeto){
				var deffered = $q.defer();
				$http.post(baseUrl,objeto).
				  success(function(data, status, headers, config) {
						_lista.push(objeto);
						console.log('encabezado y data:');
						console.log(headers);
						console.log(data.insertedIds);
						dat_insert = data.insertedIds;
					  deffered.resolve();
				  }).
				  error(function(data, status, headers, config) {
				  	console.log(JSON.stringify(headers));
					  deffered.reject(data);
				  });
				  return deffered.promise;			
			};
			var _devolverinsertado=function(){
				return dat_insert;
			}
			var _actualizar= function(objeto){
				var deffered = $q.defer();
				$http.put(baseUrl,objeto).
				  success(function(data, status, headers, config) {
					  console.log(data);
					  // actualizo la lista
					  _listar();
					  deffered.resolve();
				  }).
				  error(function(data, status, headers, config) {
					  deffered.reject(data);
				  });
				  return deffered.promise;			
			};
			var _borrar= function(objeto){
				var deffered = $q.defer();
				$http.delete(baseUrl+"/"+objeto._id).
				  success(function(data, status, headers, config) {
					  console.log(data);
					  deffered.resolve();
				  }).
				  error(function(data, status, headers, config) {
				  	console.log(data);
				  	console.log(status);
				  	console.log(headers);
					  deffered.reject(data);
				  });
				  return deffered.promise;			
			};
			var _buscar= function(objeto) {
				console.log("en buscar de clienteService... data sale???...");
				console.log(objeto);
				var deffered = $q.defer();
				$http.get(baseUrl+"/"+objeto).success(
					function(data, status, headers, config) {
						_elementoEncontrado = data;						
					  deffered.resolve();
				  }).
				  error(function(data, status, headers, config) {
					  deffered.reject(data);
				  });				  
				  return deffered.promise;			
			};			
			var _listar= function(){
				console.log('en _listar de clienteService');
				console.log('baseUrl '+baseUrl);
				var deffered = $q.defer();
				$http.get(baseUrl).success(
					function(data, status, headers, config) {
						console.log('en clienteService, success '+data);
						_lista = data;
					  deffered.resolve();
				  }).
				  error(function(data, status, headers, config) {
				  		console.log('error en clienteService');
					  deffered.reject(data);
				  });
				  return deffered.promise;			
			};
			return{
				buscar:_buscar,				
				guardar: _agregar,
				actualizar:_actualizar,
				borrar : _borrar,
				listar:_listar,
				devolverinsertado:_devolverinsertado,
				getLista : function(){return _lista; },
				get : function(){return _elementoEncontrado; }
			}
}]);