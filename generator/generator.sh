#1: Classe Java (atributos do micro serviço)
#2: Diretório target (micro serviço produzido)
#3: Diretório template de micro serviço
#4: Diretório api-gateway

rm -r $2/*
java -jar ./generator.jar $1 $2 $3 
cd $2/template-ws
mvn clean install

name=${1##*/} 
name=`echo "$name" | cut -d'.' -f1`
name=$(echo "${name}" | tr "A-Z" "a-z")

targetDir=$2/template-ws/target
tomcatDir=/usr/lib/jvm/apache-tomcat-8.0.27/webapps

cp $targetDir/template-ws-0.0.1-SNAPSHOT.war $tomcatDir/$name.war

pkill -f 'java -jar api-gateway'

echo "zuul.routes."${name}".path=/"${name}"/**" >> $4/src/main/resources/application.properties
echo "zuul.routes."${name}".url=http://localhost:8080/"${name} >> $4/src/main/resources/application.properties

cd $4
mvn clean install
cd target
java -jar api-gateway-0.0.1-SNAPSHOT.jar

