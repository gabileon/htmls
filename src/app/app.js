angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'ui.router','bchile-filters'
])
.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location,$filter,$http) {

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
    }

  });
  $scope.pesos = function(strCurrency){
      //pesos currency has decimal then round it to nearest value.
      numCurrency = Number(strCurrency);      
      if ( typeof strCurrency == 'undefined')
          strCurrency = '';
      if (strCurrency != '-0')
          strCurrency = Number(strCurrency);
      strCurrency = (strCurrency.toString()).trim();
      var strCurrencyNew = '';
      var i = 1;
      var isNegative = false;

      if (strCurrency.indexOf('.') != -1) {
          return "$" + strCurrency;
      }

      var splitter = "-";
      var oldCurrency = strCurrency.toString();
      var prefix = "$";

      if (oldCurrency.indexOf(splitter) != -1) {
          oldCurrency = oldCurrency.substr(1, oldCurrency.length);
          prefix = "$-";
      }

      while (1) {
          index = i * 3;

          if (oldCurrency.length > index) {
              suffix = oldCurrency.substring(oldCurrency.length - index);
              oldCurrency = oldCurrency.substring(0, oldCurrency.length - index);
              strCurrencyNew = suffix + "." + strCurrencyNew;
          } else {
              strCurrencyNew = oldCurrency + "." + strCurrencyNew;
              break;
          }
      }
      return prefix + strCurrencyNew.substr(0, strCurrencyNew.length - 1);
    };


    $scope.dolar = function(usdAmount){
      if(usdAmount == "0"){return 'US$0,00'}


      if(isNaN(Number(usdAmount))) return 'US$0,00';
      if (Number(usdAmount)% 1 == 0){
        var amount; 
        if (usdAmount.toString().indexOf(".") != -1) {
            amount = amount.toFixed(2);
        } else {
            amount = usdAmount;
        }
        var amountStr = amount.toString().trim().replace(".", ",").split(",");
        var modifiedAmt;
        if (amountStr.length > 1)
            modifiedAmt = $scope.pesos(amountStr[0]) + "," + amountStr[1];
        else
            modifiedAmt = $scope.pesos(amountStr.toString());
        return 'US'+modifiedAmt+',00';
      }

      var decimal = usdAmount.split(".");
      if(Number(decimal == 0 )) return 'US$0,00';
      
      var amount; 
      amount = Number(decimal[0]+decimal[1])/Math.pow(10,Number(decimal[1].length)); 
      if (usdAmount.toString().indexOf(".") != -1) {
          amount = amount.toFixed(2);
      } else {
          amount = usdAmount;
      }
      var amountStr = amount.toString().trim().replace(".", ",").split(",");
      var modifiedAmt;
      if (amountStr.length > 1)
          modifiedAmt = $scope.pesos(amountStr[0]) + "," + amountStr[1];
      else
          modifiedAmt = $scope.pesos(amountStr.toString());
      return 'US'+modifiedAmt;
    }
  
  

});

//// Tabs ////

var TabsDemoCtrl = function ($scope) {
  
};

//// Toggle ///////
function CollapseDemoCtrl($scope) {
  $scope.isCollapsed = true ;
  $scope.labelBotton = "Ver más";
  $scope.arrow = 'glyphicon glyphicon-chevron-down';
  $scope.select = function($event){ 
    if($scope.isCollapsed){
      $scope.isCollapsed = false;
      $scope.labelBotton = "Subir";
      $scope.arrow= 'glyphicon glyphicon-chevron-up';
    }
    else{
      $scope.isCollapsed = true;
      $scope.labelBotton = "Ver más";
      $scope.arrow = 'glyphicon glyphicon-chevron-down';
    }
  } 
}

//// slider /////

function CarouselDemoCtrl($scope) {
  $scope.myInterval = 999999999;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 600 + slides.length;
    slides.push({
      
    });
  };
  for (var i=0; i<1; i++) {
    $scope.addSlide();
  }
}

function GetData($scope,$http){
//  $http.get('http://localhost:8080/webapps/consultasaldos/home?numeroTarjeta=4152822090000220',$scope.tarjeta).
 // success(function(data, status, headers, config) {
 // console.debug("success",$scope.tarjeta);
  //$scope.tarjeta = data;
 // }).
 // error(function(data, status, headers, config) {
//  });  


      var res = $http.get('/json/1.json');
  //var res = $http.get('/service/consultasaldos/home?numeroTarjeta=4152822090000204&submit=Ingresar');        
        res.success(function(data, status, headers, config) {
            console.debug("success", data);
            $scope.tarjeta = data;
  //          alert("1");
        });

}   

function DropdownCtrl($scope) {
//alert("entroaS1");
  
  var defaul=0;
  $scope.OnItemClick = function(event) {
  //  alert("entroaS");
    $scope.selectedItem = event;
     defaul = 1;
  } 
  if(defaul!=1){
    $scope.selectedItem = "TIT Mastercard Nacional XXXX2682";

  } 

}