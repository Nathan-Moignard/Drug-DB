from typing import List

CIS_bdpm_List: List = [
    'name',
    'denomination',
    'formes',
    'voies',
    'statusAdm',
    'type',
    'etat',
    'date',
    'statusBdm',
    'authorisation',
    'titulaire',
    'surveillance'
]

CIS_CIP_bdpm_List: List = [
    'name',
    'CIP7',
    'libelle',
    'statut',
    'etat',
    'date',
    'CIP13',
    'agrement',
    'remboursement',
    'prix',
    'indications'
]

CIS_COMPO_bdpm_List: List = [
    'name',
    'designation',
    'denominationSubstance',
    'dosageSubstance',
    'referenceDosage',
    'natureComposant',
    'numeroLien'
]

CIS_HAS_SMR_bdpm_List: List = [
    'name',
    'HAS',
    'motifEvaluation',
    'dateCommissionTransparence',
    'valeurSMR',
    'libelleSMR'
]

CIS_HAS_ASMR_bdpm_List: List = [
    'name',
    'HAS',
    'motifEvaluation',
    'dateCommissionTransparence',
    'valeurASMR',
    'libelleASMR'
]

HAS_LiensPageCT_bdpm_List: List = [
    'name',
    'lienAvisCT',
]

CIS_GENER_bdpm_List: List = [
    'identifiantGroupeGenerique',
    'libelleGroupeGenerique',
    'name',
    'typeGenerique',
    'numeroTri'
]

CIS_CPD_bdpm_List: List = [
    'name',
    'conditionPrescriptionDelivrance'
]

CIS_InfoImportantes_List: List = [
    'name',
    'beginSecurityInformation',
    'endSecurityInformation',
    'textLink'
]
