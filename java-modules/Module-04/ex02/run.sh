cd ImageToChar

echo "compiling ..."
javac -d ./target -cp ./lib/JCDP-2.0.1.jar:lib/jcommander-1.82.jar ./src/java/fr/42/printer/*/*.java

if [[ $? -eq 0 ]]; then 
  echo " - copy resources to target folder"
  cp -R ./src/resources ./target/.

  echo " - create jar file"
  jar cmf ./src/manifest.txt ./target/images-to-chars-printer.jar -C ./target .
  chmod u+x ./target/images-to-chars-printer.jar

  echo "running jar file ..."
  echo "-------------------------"
  java -jar ./target/images-to-chars-printer.jar --white=RED --black=GREEN
fi
