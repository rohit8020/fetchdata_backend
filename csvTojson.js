const csvTOjson=(data)=>{
    let d=data.split('\n')
    let t=d[0].split(';')
    
    let dataArray=[]
    let size=d.length-1;
    for(let i=1; i<size;i++){
        let p=d[i].split(';')
        let psize=p.length
        let obj={};
        for(let x=0;x<psize;x++){
            obj[`${t[x]}`]=p[x]
        }
        dataArray.push(Object(obj))
    }

    return dataArray;
}

module.exports.csvTOjson=csvTOjson