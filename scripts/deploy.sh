#!/bin/bash

echo "> #############################################################################"
tar xvf tomcat9/webapps/showfan.tar

echo "> tomcat stop #################################################################"
tomcat9/bin/shutdown.sh

echo "> tomcat start ################################################################"
tomcat9/bin/startup.sh
