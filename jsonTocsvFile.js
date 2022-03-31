const fs = require("fs");

const jsonTOcsvFile = (data,file,define) => {
    if(define){
        let str = Object.keys(data).join(";");
        fs.appendFile(file, str + "\n", function (err) {
            if (err) {
                return {result: "unable to add data"}
            }
            return {result:`${file} added`}
        });
    }else{
        let str = Object.values(data).join(";");
        fs.appendFile(file, str + "\n", function (err) {
            if (err) {
            return {result: "unable to add data"}
            }

            return {result:`${file} added`}
        });
    }
};

module.exports.jsonTOcsvFile = jsonTOcsvFile;
