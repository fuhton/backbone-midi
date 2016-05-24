// : main

var route  = require( './routers/base.js' );

var mainEl =  document.getElementById( 'main' );

if ( mainEl ) {
	var router = new route();
}
