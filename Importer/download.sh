#!/bin/bash

ROOT="https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier="

curl "${ROOT}CIS_bdpm.txt" > sources/txt/CIS_bdpm.txt
curl "${ROOT}CIS_CIP_bdpm.txt" > sources/txt/CIS_CIP_bdpm.txt
curl "${ROOT}CIS_COMPO_bdpm.txt" > sources/txt/CIS_COMPO_bdpm.txt
curl "${ROOT}CIS_HAS_SMR_bdpm.txt" > sources/txt/CIS_HAS_SMR_bdpm.txt
curl "${ROOT}CIS_HAS_ASMR_bdpm.txt" > sources/txt/CIS_HAS_ASMR_bdpm.txt
curl "${ROOT}HAS_LiensPageCT_bdpm.txt" > sources/txt/HAS_LiensPageCT_bdpm.txt
curl "${ROOT}CIS_GENER_bdpm.txt" > sources/txt/CIS_GENER_bdpm.txt
curl "${ROOT}CIS_CPD_bdpm.txt" > sources/txt/CIS_CPD_bdpm.txt
curl "${ROOT}CIS_InfoImportantes.txt" > sources/txt/CIS_InfoImportantes.txt

echo "Download complete"
