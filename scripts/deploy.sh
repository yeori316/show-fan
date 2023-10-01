#!/bin/bash

echo "> #############################################################################"
cp showfan/target/showfan.war tomcat9/webapps/showfan.war

echo "> tomcat stop #################################################################"
tomcat9/bin/shutdown.sh

echo "> tomcat start ################################################################"
tomcat9/bin/startup.sh
