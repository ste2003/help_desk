angular.module('appTP')
.directive('fileInput', ['$parse', function($parse){
  return {
    restrict: 'A',
    link: function(scope, elm, attrs){
      elm.bind('change', function(){
        $parse(attrs.fileInput)
        .assign(scope, elm[0].files)
        scope.$apply()
      })
    }
  }
}])
.controller('uploader',
    ['$scope','$http',
     function($scope, $http) {
      //
      $scope.filesChanged= function(elem){
        $scope.files=elm.files;
        $scope.$apply();  
      }   
      //      
      $scope.upload = function(){
        var fd = new FormData();
         console.log($scope.file[0]);
         fd.append('file',$scope.file[0]);
         console.log(fd);
/*        angular.forEach($scope.files, function(file){
         console.log(file);
          fd.append('file', file)
        })*/
        
        $http.post('http://localhost:8000/adjunto', fd,
        {
          transformRequest: angular.identity,  
          headers: {'Content-Type':undefined}
        })
        .success(function(d){
            console.log(d)
        })
       }
    }
  ])      
  