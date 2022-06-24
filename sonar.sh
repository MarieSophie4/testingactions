#!/bin/bash
awk -F"=" -v newval="$SONARQUBE_URL" 'BEGIN{OFS="=";} /sonar.host.url/{$2=newval;print;next}1' sonar-project.properties > temp1.properties
awk -F"=" -v newval="$SONARQUBE_LOGIN" 'BEGIN{OFS="=";} /sonar.login/{$2=newval;print;next}1' temp1.properties > temp2.properties
mv temp2.properties sonar-project.properties
rm temp1.properties
echo SonarQube host url set to $SONARQUBE_URL in sonar-project.properties
npm install sonarqube-scanner --save-dev
echo "$INTERMEDIATE_CA" > AXA-Issuing-CA-PR1.pem
echo y | keytool -import -v -trustcacerts -alias axaintermediate -file AXA-Issuing-CA-PR1.pem -keystore /opt/jvm/amazon-corretto-11/lib/security/cacerts -storepass changeit
export SONAR_SCANNER_OPTS=-Djavax.net.ssl.trustStore=/opt/jvm/amazon-corretto-11/lib/security/cacerts
npm run sonar
