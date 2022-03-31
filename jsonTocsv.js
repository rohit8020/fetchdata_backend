const jsonTOcsv=(json)=>{
    var fields = Object.keys(json[0])
    var replacer = function(key, value) { return value === null ? '' : value } 
    var csv = json.map(function(row){
    return fields.map(function(fieldName){
        return JSON.stringify(row[fieldName], replacer)
    }).join(';')
    })
    csv.unshift(fields.join(';')) // add header column
    csv = csv.join('\r\n');
    return csv
}

module.exports.jsonTOcsv=jsonTOcsv