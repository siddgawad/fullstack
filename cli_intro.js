const fs = require('fs');
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let users = [];
try {
  const fileData = fs.readFileSync('user_data.json', 'utf8').trim();
  if (fileData) {
    const parsed = JSON.parse(fileData);
    if (Array.isArray(parsed)) {
      users = parsed;
    }
  }
  if (users.length > 0) {
    console.log("\nPreviously stored users:\n");
    console.log(JSON.stringify(users, null, 2));
  } else {
    console.log("\nNo previous user data found.");
  }
} catch (err) {
  console.log("\nNo or invalid user data found. Starting fresh.");
}

async function askQuestion(query, maxAttempts, validator) {
  let attempts = 0;

  while (attempts < maxAttempts) {
    const answer = await new Promise((resolve) => {
      rl.question(query, (resp) => resolve(resp));
    });

    if (validator(answer)) {
      return answer; 
    } else {
      attempts++;
      console.log(`Invalid input. ${maxAttempts - attempts} attempt(s) left.\n`);
    }
  }


  throw new Error(`Max attempts (${maxAttempts}) reached. Exiting...`);
}


async function getUserData() {
  console.log("\n🔹 Please provide new user details (3 attempts each):\n");

  try {

    const name = await askQuestion(
      "Name: ", 
      3, 
      (input) => input.trim().length > 0
    );

    const age = await askQuestion(
      "Age: ", 
      3, 
      (input) => !isNaN(input) && input.trim().length > 0
    );


    const city = await askQuestion(
      "City: ", 
      3, 
      (input) => input.trim().length > 0
    );


    const lang = await askQuestion(
      "Favorite programming language: ", 
      3, 
      (input) => input.trim().length > 0
    );


    const userData = { name, age, city, language: lang };


    users.push(userData);


    fs.writeFileSync('user_data.json', JSON.stringify(users, null, 2));
    console.log("\n✅ Data saved successfully!");
  } catch (err) {
  
    console.log(`\n${err.message}`);
  } finally {

    rl.close();
  }
}


getUserData();
