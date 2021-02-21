angular.module('appTP').factory('actuaService',
		['$http','$q','URL_ACTUA',
		 function($http,$q,baseUrl) {
			var _lista=[];
			var _elementoEncontrado;
			var _agregar = function(objeto){
				var deffered = $q.defer();
				$http.post(baseUrl,objeto).
				  success(function(data, status, headers, config) {
						_lista.push(objeto);
						console.log('encabezado:');
						console.log(headers);
					  deffered.resolve();
				  }).
				  error(function(data, status, headers, config) {
				  	console.log(JSON.stringify(headers));
					  deffered.reject(data);
				  });
				  return deffered.promise;			
			};
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
				
				console.log('baseUrl '+baseUrl);
				var deffered = $q.defer();
				$http.get(baseUrl).success(
					function(data, status, headers, config) {
						
						_lista = data;
					  deffered.resolve();
				  }).
				  error(function(data, status, headers, config) {
				  		
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
				getLista : function(){return _lista; },
				get : function(){return _elementoEncontrado; }
			}
}]);