fs = require('fs');
const mariadb = require('mariadb');

var totalAmountDrugs = 0;
const fileName = "./data/medicaments.json";
const globalColumnNames = [
    ["ID", " INT,"],
    ["`CIS`", " TEXT(100),"],
    ["`Nom`", " TEXT(100),"],
    ["`Forme Pharmaceutique`", " TEXT(100),"],
    ["`Voies Admnistration`", " TEXT(100),"],
    ["`Status Autorisation`", " TEXT(100),"],
    ["`Type Autorisation`", " TEXT(100),"],
    ["`Etat Commercialisation`", " TEXT(100),"],
    ["`Date Mise Sur Le Marche`", " TEXT(100),"],
    ["`Statut Bdm`", " TEXT(100),"],
    ["`Numero Autorisation Europeen`", " TEXT(100),"],
    ["`Titulaire`", " TEXT(100),"],
    ["`Surveillance Renforcee`", " TEXT(100)"]]
const genericColumnNames = [
    ["ID", " INT,"],
    ["`Identifiant Generique`", " TEXT(100),"],
    ["`Libelle Generique`", " TEXT(100),"],
    ["`CIS`", " TEXT(100),"],
    ["`Type`", " TEXT(100)"]]
const globalPresentationColumnNames = [
    ["ID", " INT,"],
    ["`CIS`", " TEXT(100),"],
    ["`CIP`", " TEXT(100),"],
    ["`Libelle`", " TEXT(100),"],
    ["`Statut Administratif`", " TEXT(100),"],
    ["`Etat Commercialisation`", " TEXT(100),"],
    ["`Date Declaration`", " TEXT(100),"],
    ["`CIP13`", " TEXT(100),"],
    ["`Agrement Collectivite`", " TEXT(100),"],
    ["`Taux Remboursement`", " TEXT(100),"],
    ["`Prix`", " TEXT(100),"],
    ["`Indication Remboursement`", " TEXT(100)"]]
const globalCompositionColumnNames = [
    ["ID", " INT,"],
    ["`CIS`", " TEXT(100),"],
    ["`Element Pharmaceutique`", " TEXT(100),"],
    ["`Code Substance`", " TEXT(100),"],
    ["`Denomination Substance`", " TEXT(100),"],
    ["`Etat Commercialisation`", " TEXT(100),"],
    ["`Dosage Substance`", " TEXT(100),"],
    ["`Reference Dosage`", " TEXT(100),"],
    ["`Lien Subtance Actives Et Fractions Therapeutiques`", " TEXT(100)"]]
const globalNameTable = "Princeps";
const genericNameTable= "Generiques";
const globalPresentationNameTable = globalNameTable + "_Presentation";
const globalCompositionNameTable = globalNameTable + "_Composition";
const globalGeneriquesNameTable = globalNameTable + "_Generiques";

function getJsonFromFile() {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            }
            console.info("File Loaded");
            const obj = JSON.parse(data);
            resolve(obj)
        });
    });
}

const pool = mariadb.createPool({
    host: '127.0.0.1',
    user:'user',
    password: 'password',
    database: 'Drugs',
    acquireTimeout: 50000,
    connectionLimit: 5
});

function initTable(tableName, columnNames) {
    return new Promise(function (resolve, reject) {
        let request = "";
        for (let index = 0; index < columnNames.length; index++)
            request += columnNames[index][0] + columnNames[index][1]
        pool.query("CREATE OR REPLACE TABLE " + tableName + " (" + request + ");")
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            });
    });
}

function initRow(id, table, nbFields) {
    return new Promise(function (resolve, reject) {
        let request = ""
        for (let index = 0; index < nbFields - 1; index++)
            request += ", ''"
        pool.query("INSERT INTO " + table + " VALUES (" + id + request + ");")
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            });
    });
}

function sendDrug(id, value, column, table) {
    if (!value)
        value = "null"
    value = value.toString().replace(/\"/g, "'")
    return new Promise(function (resolve, reject) {
        pool.query("UPDATE " + table + " SET " + column + "=\"" + value + "\" WHERE ID=" + id + ";")
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            });
    });
}

async function pushComposition(id, composition) {
    const compositionKey = Object.keys(composition);
    const compositionAmount = compositionKey.length;
    for (let indexComposition = 0; indexComposition < compositionAmount; indexComposition++) {
        await initRow(id, globalCompositionNameTable, globalCompositionColumnNames.length).catch((err) => {
            console.log(err);
        })

        var value = composition[compositionKey[indexComposition]];
        var compositionValues = [
            value.cis,
            value.elementPharmaceutique,
            value.codeSubstance,
            value.denominationSubstance,
            value.etatCommercialisation,
            value.dosageSubstance,
            value.referenceDosage,
            value.LienSubtanceActivesEtFractionsTherapeutiques
        ]
        for (let indexValue = 0; indexValue < compositionValues.length; indexValue++)
            await sendDrug(id, compositionValues[indexValue], globalCompositionColumnNames[indexValue + 1][0], globalCompositionNameTable).catch((err) => {
                console.log(err);
            })
    }
}

async function pushPresentation(id, presentation) {
    const presentationKey = Object.keys(presentation);
    const presentationAmount = presentationKey.length;
    for (let indexPresentation = 0; indexPresentation < presentationAmount; indexPresentation++) {
        await initRow(id, globalPresentationNameTable, globalPresentationColumnNames.length).catch((err) => {
            console.log(err);
        })

        var value = presentation[presentationKey[indexPresentation]];
        var presentationValues = [
            value.cis,
            value.cip,
            value.libelle,
            value.statutAdministratif,
            value.etatCommercialisation,
            value.dateDeclaration,
            value.CIP13,
            value.agrementCollectivite,
            value.tauxRemboursement,
            value.prix,
            value.indicationRemboursement
        ]
        for (let indexValue = 0; indexValue < presentationValues.length; indexValue++)
            await sendDrug(id, presentationValues[indexValue], globalPresentationColumnNames[indexValue + 1][0], globalPresentationNameTable).catch((err) => {
                console.log(err);
            })
    }
}

async function pushGeneriques(id, generiques) {
    const generiquesKey = Object.keys(generiques);
    const generiquesAmount = generiquesKey.length;
    for (let indexGeneriques = 0; indexGeneriques < generiquesAmount; indexGeneriques++) {
        await initRow(id, globalGeneriquesNameTable, genericColumnNames.length).catch((err) => {
            console.log(err);
        })

        var value = generiques[generiquesKey[indexGeneriques]];
        var generiquesValues = [
            value.identifiantGenerique,
            value.libelleGenerique,
            value.cis,
            value.type
        ]
        for (let indexValue = 0; indexValue < generiquesValues.length; indexValue++)
            await sendDrug(id, generiquesValues[indexValue], genericColumnNames[indexValue + 1][0], globalGeneriquesNameTable).catch((err) => {
                console.log(err);
            })
    }
}

async function main() {
    await initTable(globalNameTable, globalColumnNames);
    await initTable(genericNameTable, genericColumnNames);
    await initTable(globalPresentationNameTable, globalPresentationColumnNames);
    await initTable(globalCompositionNameTable, globalCompositionColumnNames);
    await initTable(globalGeneriquesNameTable, genericColumnNames);
    const json = await getJsonFromFile();
    const globalKey = Object.keys(json);
    totalAmountDrugs = Object.keys(json).length;
    for (let index = 0; index < totalAmountDrugs; index++) {
        if (!json[globalKey[index]].cis && json[globalKey[index]].generique) {
            const genericKey = Object.keys(json[globalKey[index]].generique);
            const totalAmountGenerique = Object.keys(json[globalKey[index]].generique).length;


            await initRow(index, genericNameTable, genericColumnNames.length).catch((err) => {
                console.log(err)
            })

            for (let indexGeneric = 0; indexGeneric < totalAmountGenerique; indexGeneric++) {
                var jsonGenericFields = [
                    json[globalKey[index]].generique[genericKey[indexGeneric]].identifiantGenerique,
                    json[globalKey[index]].generique[genericKey[indexGeneric]].libelleGenerique,
                    json[globalKey[index]].generique[genericKey[indexGeneric]].cis,
                    json[globalKey[index]].generique[genericKey[indexGeneric]].type]
                for (let indexGenericColumn = 0; indexGenericColumn < genericColumnNames.length - 1; indexGenericColumn++)
                    await sendDrug(index, jsonGenericFields[indexGenericColumn], genericColumnNames[indexGenericColumn + 1][0], genericNameTable).catch((err) => {
                        console.log(err + indexGenericColumn)
                    })
            }
        } else {
            var jsonGlobalFields = [
                json[globalKey[index]].cis,
                json[globalKey[index]].nom,
                json[globalKey[index]].formePharmaceutique,
                json[globalKey[index]].voiesAdmnistration,
                json[globalKey[index]].statusAutorisation,
                json[globalKey[index]].typeAutorisation,
                json[globalKey[index]].etatCommercialisation,
                json[globalKey[index]].dateMiseSurLeMarche,
                json[globalKey[index]].StatutBdm,
                json[globalKey[index]].numeroAutorisationEuropeen,
                json[globalKey[index]].titulaire,
                json[globalKey[index]].surveillanceRenforcee]

            await initRow(index, globalNameTable, globalColumnNames.length).catch((err) => {
                console.log(err)
            })

            for (let col = 0; col < jsonGlobalFields.length; col++)
                if (jsonGlobalFields[col])
                    await sendDrug(index, jsonGlobalFields[col], globalColumnNames[col + 1][0], globalNameTable).catch((err) => {
                        console.log(err)
                    })
            if (json[globalKey[index]].composition)
                await pushComposition(index, json[globalKey[index]].composition)
            if (json[globalKey[index]].presentation)
                await pushPresentation(index, json[globalKey[index]].presentation)
            if (json[globalKey[index]].generique)
                await pushGeneriques(index, json[globalKey[index]].generique)
        }
    }
    process.exit()
}

main();
