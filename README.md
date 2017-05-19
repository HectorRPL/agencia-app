Acceder a una misma base de datos, colocar la siguiente linea en la consola.

  COMANDO PARA LEVANTAR LOS PROYECTOS (AGENCIA Y DEMOS)
  meteor npm start
  
  Tajetas bancarías para pagar
  
      4000000000000002  declined
      4000000000000127  insufficient_funds
      4012888888881881  visa
      5105105105105100  mastercard
      371449635398431   amex

  Linux:
  export MONGO_URL=mongodb://localhost:27017/demos-dev1

  Windows:
  SET MONGO_URL=mongodb://localhost:27017/demos-dev1

  mongoexport --db demos-dev --collection tallas --out tallas.json

  mongoimport --host localhost --port 27017 --collection puestos --db demos-dev1 --file puestos.json


  Levantar dos servidores (agencia y demos)
  Levantar cualquiera de las dos con normalidad pero
  al levantar la segunda añadir --port 3001

  de tal manera que quedaría así:

  Si es demos:
  meteor --settings settings.json --port 3001

  Si es agencia:
  meteor --port 3001
