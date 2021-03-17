<?php
    class TranskribusApi {
        const API_ENDPOINT = "https://transkribus.eu/TrpServer/rest/";

        private $sessionId;
        private $httpClient;

        public function __construct() {
            $this->httpClient = new \GuzzleHttp\Client([
                "base_uri" => self::API_ENDPOINT
            ]);
        }

        public function getCollections() {
            $req = $this->httpClient->request("GET", "collections/list", [
                "headers" => [
                    "Cookie" => "JSESSIONID=" . $this->sessionId
                ]
            ]);

            $body = (string) $req->getBody();
            return json_decode($body);
        }

        public function login(string $username, string $password) {
            $req = $this->httpClient->request("POST", "auth/login", [
                "headers" => [
                    // "Content-Type" => "application/x-www-form-urlencoded"
                ],

                "form_params" => [
                    "user" => $username,
                    "pw" => $password
                ]
            ]);

            $body = (string) $req->getBody();

            // We need to extract the sessionID from the XML we get back
            $xml = new SimpleXMLElement($body);
            $this->sessionId = (string) $xml->sessionId;

            return "ok";
        }
    }