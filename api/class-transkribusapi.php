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

        public function getRequest(string $method) {
            return  $this->httpClient->request("GET", $method, [
                "headers" => [
                    "Cookie" => "JSESSIONID=" . $this->sessionId
                ]
            ]);
        }

        public function login(string $username, string $password) {
            $req = $this->httpClient->request("POST", "auth/login", [
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