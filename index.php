<?php

if( $_GET['page'] == 'index' ) {
    require 'views/index.html';
}
else if ( $_GET['page'] == 'gen' ) {
    if ( $_GET['seed'] ) {
        $seed = $_GET['seed'];
    }
    require 'app/generator.php';
    require 'views/gen.html';
}
else if ( $_GET['page'] == '404' ) {
    require 'views/404.html';
}

?>