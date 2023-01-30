#!/bin/bash

#----- COLORS -----#
RED="\e[31m"
GREEN="\e[32m"
YELLOW="\e[33m"
BLUE="\e[34m"
MAGENTA="\e[35m"
WHITE="\e[0m"

#----- BACKEND -----#
cd backend
# shellcheck disable=SC2059
echo -e $(printf "${YELLOW}Installing backend dependencies...${WHITE}\n")
npm i --silent
if [[ $? == 0 ]]
then
  # shellcheck disable=SC2059
  echo -e $(printf "${GREEN}Backend dependencies successfully installed.${WHITE}\n")
  cd ..
else
  # shellcheck disable=SC2059
  echo -e $(printf "${RED}Failed to install backend dependencies.${WHITE}\n")
  exit
fi

#----- MOBILE -----#
cd mobile
# shellcheck disable=SC2059
echo -e $(printf "${YELLOW}Installing mobile dependencies...${WHITE}\n")
npm i --silent
if [[ $? == 0 ]]
then
  # shellcheck disable=SC2059
  echo -e $(printf "${GREEN}Mobile dependencies successfully installed.${WHITE}\n")
  cd ..
else
  # shellcheck disable=SC2059
  echo -e $(printf "${RED}Failed to install mobile dependencies.${WHITE}\n")
  exit
fi

#----- BACKEND -----#
cd web
# shellcheck disable=SC2059
echo -e $(printf "${YELLOW}Installing web dependencies...${WHITE}\n")
npm i --silent
if [[ $? == 0 ]]
then
  # shellcheck disable=SC2059
  echo -e $(printf "${GREEN}Web dependencies successfully installed.${WHITE}\n")
  cd ..
else
  # shellcheck disable=SC2059
  echo -e $(printf "${RED}Failed to install web dependencies.${WHITE}\n")
  exit
fi

# shellcheck disable=SC2059
echo -e $(printf "${MAGENTA}All dependencies installed !${WHITE}\n")