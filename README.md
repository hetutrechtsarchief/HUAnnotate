# HUAnnotate
Annotation tool to get data out of OCR-ed documents, written on top of the Transkribus API.

## Description
This application uses a PHP backend to interface with the Transkribus API (it's a pretty thin layer on top of that API), the frontend is built as a Vue.js application.

## Requirements
This application has been tested and works with:

* Node.js 14.16.1
* PHP 7.4.12 with [Composer](https://getcomposer.org/)
* Chrome 90

## Installation
Note that you need a `.env` file with a path to the API, by default this is set like this:

    VUE_APP_API_ENDPOINT=/api

1. Clone this repository
2. Install the node dependencies using `npm install` in the root
3. Install the PHP dependencies in `api` using `composer install`
4. Copy `config-sample.php` from the `api` directory to `config.php` and fill in the missing values
5. Make sure your webserver is configured [as documented here](https://flightphp.com/install) to make sure Flight PHP can serve proper URL's for the API
6. Run the application with `npm run serve`