Acceder a una misma base de datos, colocar la siguiente linea en la consola.

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
