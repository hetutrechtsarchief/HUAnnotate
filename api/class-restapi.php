<?php
    class RestApi {
        private $api;

        // See < https://mattryall.net/blog/default-content-type >
        const DEFAULT_CONTENT_TYPE = "application/octet-stream";
        const JSON_CONTENT_TYPE = "application/json; charset=utf-8";

        public function __construct($api) {
            $this->api = new $api();
        }

        private function getContentType($res) {
            if ($res->hasHeader("Content-Type")) {
                $type = $res->getHeader("Content-Type")[0];

                if (strpos($type, "json") !== false) {
                    return self::JSON_CONTENT_TYPE;
                } else {
                    return $type;
                }
            } else {
                // No Content-type, let's just assume it's text
                return self::DEFAULT_CONTENT_TYPE;
            }
        }

        public function bodyResponse(string $body, string $type) {
            header("Content-Type: $type");
            die($body);
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

        public function request($method) {
            try {
                $res = $this->api->getRequest($method);
            } catch (Throwable $e) {
                $this->jsonError($e->getMessage(), 400);
            }

            // If this is JSON, decode and return that, otherwise just
            // return the body
            $body = (string) $res->getBody();
            $type = $this->getContentType($res);

            if ($type == self::JSON_CONTENT_TYPE) {
                $json = json_decode($body);

                if (!$json) {
                    $this->jsonError("Could not decode JSON response", 400);
                }

                $this->jsonResponse($json);
            } else {
                $this->bodyResponse($body, $type);
            }

        }
    }