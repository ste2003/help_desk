angular.module('appTP').factory('homeService',
		['$http','$q','URL_HOME',
		 function($http,$q,baseUrl) {
		 	var _lista=[];
		 	var _listaExportar=[];
			var _listar= function(){
				console.log(toRowType(null));
				console.log(toRowType(/sdfsd/));
				console.log(toRowType('Hello Word'));
				console.log(toRowType(111));
				console.log(toRowType({}));
				console.log(toRowType(new Date()));
				console.log('en Listar de homeService');
				console.log('baseUrl '+baseUrl);
				var deffered = $q.defer();				
				$http.get(baseUrl).success(
					function(data, status, headers, config) {			
						_lista = data;
					  deffered.resolve();
				  }).
				  error(function(data, status, headers, config) {
				  		console.log('error en homeService');
					  deffered.reject(data);
				  });
				  return deffered.promise;			
			};
			var convertir = function(objArray){
			var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';

            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ','

                    line += array[i][index];
                }

                str += line + '\r\n';
            }
            return str;
        	};
        	function toRowType (value) {
        		let _toString = Object.prototype.toString;
        		let str = _toString.call(value);
        		return  str.slice(8, -1);
        	};

	
			return{
				listar:_listar,
				getLista : function(){return _lista; },
				getExportar: function(){return _listaExportar; }			
			}
}]);