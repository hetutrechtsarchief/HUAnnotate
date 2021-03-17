<?php
    class RestApi {
        private $api;

        public function __construct() {
            $this->api = new TranskribusApi();
        }

        private function request($verb) {
            try {
                $res = $this->api->$verb();
            } catch (Throwable $e) {
                $this->jsonError($e->getMessage(), 400);
            }

            $this->jsonResponse($res);
        }

        public function collections() {
            $this->request("getCollections");
        }

        public function jsonError(string $msg, int $code) {
            $this->jsonResponse([
                "error" => $msg
            ], $code);
        }

        public function jsonResponse($data, int $code = 200) {
            Flight::json(
                $data,
                $code,
                true,
                'utf-8',
                JSON_PARTIAL_OUTPUT_ON_ERROR
            );

            die();
        }

        public function login(string $username, string $password) {
            try {
                $this->api->login($username, $password);
            } catch (Exception $e) {
                $this->jsonError($e->getMessage(), 400);
            }
        }
    }