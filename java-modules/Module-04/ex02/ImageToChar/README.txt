# compile
  javac -d ./target ./src/java/fr/42/printer/*/*.java

# create jar file
  jar cmf ./src/manifest.txt ./target/images-to-chars-printer.jar -C ./target .
  chmod u+x ./target/images-to-chars-printer.jar

# run
  java -jar images-to-chars-printer.jar --white=RED --black=GREEN

# packages
  - Jcommander
  - JCDP
