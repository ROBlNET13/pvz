<?php
include_once 'config.php';
try{
	$dsn = "mysql:host={$config['dbHost']};port=3306;dbname={$config['dbName']}";
	$dbh = new PDO($dsn, $config['dbUser'], $config['dbPass'], $config['dbOptions']);
}catch (PDOException $e) {
	$json['status'] = false;
	$json['msg'] = "Error!";
	echo json_encode($json);
	die();
}