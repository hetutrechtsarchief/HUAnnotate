<?php
    require 'config.php';
    require 'vendor/autoload.php';
    require 'class-transkribusapi.php';

    $api = new TranskribusApi();

    function json_error($msg, $code) {
        json_response([
            "error" => $msg
        ], $code);
    }

    function json_response($data, $code = 200) {
        Flight::json(
            $data,
            $code,
            true,
            'utf-8',
            JSON_PARTIAL_OUTPUT_ON_ERROR
        );
    }

    Flight::set('flight.handle_errors', !DEBUG);
    Flight::set('flight.log_errors', DEBUG);
    Flight::set('flight.views.path', './');

    Flight::route('GET /', function() use ($api) {
        json_response("ok");
    });

    Flight::route('GET /collections', function() use ($api) {
        try {
            $res = $api->getCollections();
        } catch (Exception $e) {
            json_error($e->getMessage(), 400);
        }

        json_response($res);
    });

    Flight::before('start', function() use ($api) {
        // Before we start we set up the API and login
        // because that needs to happen before every request
        $api->login(TRANSKRIBUS_USER, TRANSKRIBUS_PASS);
    });

    Flight::start();

    /*
    Flight::route('GET /config', function() use ($api) {
        try {
            $config = $api->getConfig();
        } catch (Exception $e) {
            json_response($e->getMessage(), 400);
            return;
        }

        json_response($config);
    });

    Flight::route('GET /search/@query', function($query) use ($api) {
        try {
            $limityear = (bool) Flight::request()->query->limityear;
            $results = $api->search($query, $limityear);
        } catch (Exception $e) {
            json_response($e->getMessage(), 400);
            return;
        }

        json_response($results);
    });

    Flight::route('GET /stats', function() use ($api) {
        try {
            $results = $api->getStats();
        } catch (Exception $e) {
            json_response($e->getMessage(), 400);
            return;
        }

        json_table($results);
    });

    Flight::route('POST /submit', function() use ($api) {
        // My really ugly way of preventing people hammering the API
        // Obviously doesn't really help if people do multithreading, but
        // it's something
        sleep(2);

        $data = Flight::request()->getBody();

        try {
            $results = $api->submitVotes($data);
        } catch (Exception $e) {
            json_response($e->getMessage(), 400);
            return;
        }

        json_response($results);
    });

    Flight::route('GET /verify/@id/@hash', function($id, $hash) use ($api) {
        // My really ugly way of preventing people hammering the API
        // Obviously doesn't really help if people do multithreading, but
        // it's something
        sleep(1);

        try {
            $results = $api->verifyVotes($id, $hash);
        } catch (Exception $e) {
            json_response($e->getMessage(), 400);
            return;
        }

        return json_response($results);
    });
    */