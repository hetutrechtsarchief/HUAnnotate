<?php
    require 'config.php';
    require 'vendor/autoload.php';
    require 'class-restapi.php';
    require 'class-transkribusapi.php';

    $api = new RestApi(TranskribusApi);

    Flight::set('flight.handle_errors', !DEBUG);
    Flight::set('flight.log_errors', DEBUG);
    Flight::set('flight.views.path', './');

    Flight::route('GET /', function() use ($api) {
        $doc = json_decode(file_get_contents("./doc.json"));
        $api->jsonResponse($doc);
    });

    // We match everything after the /get/ and just pass that on to the API
    Flight::route('GET /get/*', function($route) use ($api) {
        $api->request($route->splat);
    }, true);

    Flight::before('start', function() use ($api) {
        // Before we start we set up the API and login
        // because that needs to happen before every request
        $api->login(TRANSKRIBUS_USER, TRANSKRIBUS_PASS);
    });

    Flight::start();