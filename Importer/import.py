import json

from src.resources import CIS_bdpm_List, CIS_CIP_bdpm_List, CIS_COMPO_bdpm_List, CIS_HAS_SMR_bdpm_List, CIS_HAS_ASMR_bdpm_List, HAS_LiensPageCT_bdpm_List, CIS_GENER_bdpm_List, CIS_CPD_bdpm_List


def importer(fileName, dictionary) -> None:
    fdRead = open("./sources/txt/" + fileName + ".txt", "r", encoding = "ISO-8859-1")
    tempList = []
    for line in fdRead.readlines():
        parsed = line.rsplit("\t")
        tempList.append(dict(zip(dictionary, parsed)))
    output = json.dumps(tempList, indent=2)
    fdWrite = open("./sources/json/" + fileName + ".json", "w")
    fdWrite.write(output)
    fdRead.close()
    fdWrite.close()

if __name__ == "__main__":
    importer("CIS_bdpm", CIS_bdpm_List)
    importer("CIS_CIP_bdpm", CIS_CIP_bdpm_List)
    importer("CIS_COMPO_bdpm", CIS_COMPO_bdpm_List)
    importer("CIS_HAS_SMR_bdpm", CIS_HAS_SMR_bdpm_List)
    importer("CIS_HAS_ASMR_bdpm", CIS_HAS_ASMR_bdpm_List)
    importer("HAS_LiensPageCT_bdpm", HAS_LiensPageCT_bdpm_List)
    importer("CIS_GENER_bdpm", CIS_GENER_bdpm_List)
    importer("CIS_CPD_bdpm", CIS_CPD_bdpm_List)
