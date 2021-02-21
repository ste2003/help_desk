angular.module('appTP').factory('preguntaService',
		['$http','$q','URL_PREGUNTA',
		 function($http,$q,baseUrl) {
			var _lista=[];
			var _ltareas=[]
			var _elementoEncontrado;
			var _agregar = function(objeto){
				
				var deffered = $q.defer();
				
				$http.post(baseUrl,objeto).success(function(data, status, headers, config) {
				  		
				  		console.log(JSON.stringify(data));
				  		console.log(JSON.stringify(status));
				  		console.log(JSON.stringify(headers));
				  		console.log(JSON.stringify(config));
						_lista.push(objeto);
					  deffered.resolve();
				  }).error(function(data, status, headers, config) {
				  		
				  		console.log(JSON.stringify(data));
				  		console.log(JSON.stringify(status));
				  		console.log(JSON.stringify(headers));
				  		console.log(JSON.stringify(config));
				  			// 3
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
				
				console.log(baseUrl);
				console.log(JSON.stringify(objeto));
				$http.delete(baseUrl+"/"+objeto._id).
				  success(function(data, status, headers, config) {
				  	console.log('en _borrar service success');
					  // actualizo la lista
					  _listar();
					  deffered.resolve();
				  }).
				  error(function(data, status, headers, config) {
				  		console.log('en _borrar service error');
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
				console.log('antes del deffered en listar..');
				var deffered = $q.defer();
				console.log('despues del deffered en listar..');
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