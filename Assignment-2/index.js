let fs = require('fs');
let http = require('http');

http.createServer((request,response ,err ) => {
    if(err){
        console.log("Error while creating the server");
    }
    else {
        let colorPaletteArray = [];
        let data =JSON.parse( fs.readFileSync("color_ palette.json", "utf-8", (err) => {
        if(err){
            console.log("Error while reading the file...");
        }
        }));
        let arr = [];
        while(arr.length < 5){
            let temp = Math.floor(Math.random()*data.length)
            if(arr.indexOf(temp) <0){
                arr.push(temp);
                colorPaletteArray.push(data[temp]);
            }
        }
        fs.writeFileSync("randomized_color_ palette.json",JSON.stringify(colorPaletteArray),(err) => {
        if(err)  console.log("Error Occured while writing to file....");
        });
    
        const randomColor = JSON.parse(fs.readFileSync("randomized_color_ palette.json", (err) => {
            if(err) {
                console.log("Error while reading the file");
            }
        }));
    
        // for(const element of randomColor) {
        //     response.write("<h1>"+element.color+"</h1>");
        //     // response.write(element.color);
        // }
        
        response.write(`<h1>${JSON.stringify(randomColor)}</h1>`);
        
    }
}).listen(4001);

