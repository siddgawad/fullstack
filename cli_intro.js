const { stdout } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

rl.question('What is your name? ', (name)=>{
    console.log(`Hello ${name}! Welcome to the journey!`);
    rl.question('How old are you? ',(age)=>{
        rl.question('Which city do you live in? ', (city)=>{
            rl.question('What’s your favorite programming language? ', (lang)=>{
                console.log(`Great! ${name}, you are ${age} years old, living in ${city}, and love ${lang}!`);
                rl.close();
            });
        });
    });
});

