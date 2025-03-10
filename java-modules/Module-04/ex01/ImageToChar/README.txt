# Compile
  javac -d ./target ./src/java/fr/42/printer/*/*.java

# Copy resources
cp -R ./src/resources ./target/.

# create jar file
  jar cmf ./src/manifest.txt ./target/images-to-chars-printer.jar -C ./target .
  chmod u+x ./target/images-to-chars-printer.jar

# Run
  java -jar ./target/images-to-chars-printer.jar . 0
