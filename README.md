# Practica-PHP-con-apache
Implementación de una API RESTful con Laravel, Cliente React y Despliegue en AWS EC2, PHP Laravel, React, Apache, AWS EC2, REST API, JWT Authentication 


// Subir Archivo en el EC2 

scp -i C:/Users/CursosTardes/Documents/JJulissa/PHP/labsuser.pem -r C:/Users/CursosTardes/Documents/JJulissa/PHP/Practica-PHP-con-apache/productos-api ubuntu@34.205.25.178:/home/ubuntu/

scp -i LaRutaDelPem.pem -r RutaDeLaCarpetaQueQuiereSubir ubuntu@IPPublicaDeAWS:/home/ubuntu/

 
// Bajar los archivos del EC2 

scp -i C:/Users/CursosTardes/Documents/JJulissa/PHP/labsuser.pem -r ubuntu@34.205.25.178:/var/www/productos-api C:/Users/CursosTardes/Documents/JJulissa/PHP/Practica-PHP-con-apache/

scp -i LaRutaDelPem.pem -r ubuntu@IPPublicaDeAWS:/var/www/productos-api RutaDeLaCarpetaQueQuiereSubir/
