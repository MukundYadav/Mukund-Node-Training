let fs = require('fs');
let colorPaletteArray = [];
let data =JSON.parse(fs.readFileSync("color_ palette.json", "utf-8", (err) => {
    if(err){
        console.log("Error while reading the file...")
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
fs.writeFile("randomized_color_ palette.json",JSON.stringify(colorPaletteArray),(err) => {
    if(err) console.log("Error Occured while writing to file....");
});

fs.readFile("randomized_color_ palette.json",'utf-8',(err,data) => {
    if(err) console.log("Error occured here....");
    else{
        console.log(JSON.parse(data));
    }
})
