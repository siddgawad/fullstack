const { stdout } = require('process');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

rl.question('What is your name? ', (name)=>{
    console.log(`Hello ${name}! Welcome to the journey!`);
    rl.question('How old are you? ',(age)=>{
        rl.question('Which city do you live in? ', (city)=>{
            rl.question('What’s your favorite programming language? ', (lang)=>{

                const userData ={
                    name,
                    age,
                    city,
                    lang 
                };

                const data = JSON.stringify(userData, null, 2);

                fs.appendFile('user_data.json',data, (err)=>{
                    if(err){
                        console.log("Error saving data:",err);
                    }
                    else{
                        console.log("\n Data saved successfully!");
                    }
                    rl.close();
                });
                
               
            });
        });
    });
});

