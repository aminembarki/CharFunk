#!/bin/sh

cd src/java

javac GenCharFunkData.java
java GenCharFunkData

javac GenDoco.java
java GenDoco

cd ../..
grunt

cd tests
open index.html
open index-min.html