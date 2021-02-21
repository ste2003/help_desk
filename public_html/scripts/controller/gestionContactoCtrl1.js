angular.module('appTP')
.controller('GestionContactoCtrl',
		['$scope','$location','contactoService','$routeParams','materiaService',
		 function($scope,  $location,contactoService,$routeParams, materiaService) {
			//funcion inicializadora
			$scope.init = function(){
				console.log($routeParams);
				$scope.showMsgOk=false;
				$scope.showMsgError=false;
				$scope.edicionHabilitada = true;
					materiaService.listar().then(
						function() {
						$scope.listaMateria = materiaService.getLista();
						console.log($scope.listaMateria);
						}
					);
			};
				
	$scope.guardar = function(){
		$scope.contacto.aud_fecha = new Date().toISOString();
		if ($scope.file === undefined || $scope.file.length == 0) {
         
		} else {
			var nomAdj = new Date().toISOString()+$scope.file[0].name; 
			 var fd = new FormData();
			 console.log('en controlador si viene adjunto');
			console.log($scope.file[0].name);
			fd.append('file',$scope.file[0]);
			fd.append('nomAdj',nomAdj);
			fd.append('nombre', $scope.contacto.nombre);
			fd.append('correo', $scope.contacto.correo);
			fd.append('tema',$scope.contacto.tema.nombre);
			fd.append('resumen',$scope.contacto.resumen);
			fd.append('desc',$scope.contacto.desc);
			fd.append('aud_fecha',$scope.contacto.aud_fecha);
			$scope.contacto.adjunto=$scope.file[0].name;
			$scope.contacto.adj_unico=nomAdj;
			contactoService.subir(fd).then(
				function(){
					$scope.showMsgUpOk = true;
					$scope.msgUpOk = "Se envió archivo adjunto";
				},
				function(errMsg){
					$scope.showMsgUpError=true;
					$scope.msgUpError=errMsg;
				}
			);
		};
			contactoService.guardar($scope.contacto).then(
					function(){ 
						$scope.showMsgOk=true;
						$scope.msgOk="Actuación guardada correctamente";
					},
					function(errMsg){ 
						$scope.showMsgError=true;
						$scope.msgError=errMsg;
					}					
				);
				$scope.edicionHabilitada = false;	
			};
	$scope.actualizar = function(){
				contactoService.actualizar($scope.contacto);		
				$scope.edicionHabilitada = false;	
			}
			$scope.init();
		}]);
