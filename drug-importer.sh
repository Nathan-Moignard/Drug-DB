#! /bin/bash

mongoimport --username $USERNAME --password $PASSWORD --authenticationDatabase admin --host mongo --db Drugs --type json --file ./sources/json/CIS_bdpm.json --jsonArray --mode=insert
mongoimport --username $USERNAME --password $PASSWORD --authenticationDatabase admin --host mongo --db Drugs --type json --file ./sources/json/CIS_CIP_bdpm.json --jsonArray --mode=insert
mongoimport --username $USERNAME --password $PASSWORD --authenticationDatabase admin --host mongo --db Drugs --type json --file ./sources/json/CIS_COMPO_bdpm.json --jsonArray --mode=insert
mongoimport --username $USERNAME --password $PASSWORD --authenticationDatabase admin --host mongo --db Drugs --type json --file ./sources/json/CIS_HAS_SMR_bdpm.json --jsonArray --mode=insert
mongoimport --username $USERNAME --password $PASSWORD --authenticationDatabase admin --host mongo --db Drugs --type json --file ./sources/json/CIS_HAS_ASMR_bdpm.json --jsonArray --mode=insert
mongoimport --username $USERNAME --password $PASSWORD --authenticationDatabase admin --host mongo --db Drugs --type json --file ./sources/json/HAS_LiensPageCT_bdpm.json --jsonArray --mode=insert
mongoimport --username $USERNAME --password $PASSWORD --authenticationDatabase admin --host mongo --db Drugs --type json --file ./sources/json/CIS_GENER_bdpm.json --jsonArray --mode=insert
mongoimport --username $USERNAME --password $PASSWORD --authenticationDatabase admin --host mongo --db Drugs --type json --file ./sources/json/CIS_CPD_bdpm.json --jsonArray --mode=insert
