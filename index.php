<?php

if( $_GET['page'] == 'index' ) {
    require 'views/index.html';
}
else if ( $_GET['page'] == 'gen' ) {
    require 'app/generator.php';
    require 'views/gen.html';
}

?>