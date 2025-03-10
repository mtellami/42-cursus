cd ./ImageToChar

echo "Compiling ..."
javac -d ./target  ./src/java/fr/42/printer/*/*.java

if [[ $? -eq 0 ]]; then
  echo "running..."
  echo "--------------------------"
  java -cp ./target/ fr._42.printer.app.Program . 0 ../it.bmp
fi
