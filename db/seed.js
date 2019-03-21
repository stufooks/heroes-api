const sqlDB = require('./mySQL')

let sqlCreateTable = 'CREATE TABLE IF NOT EXISTS heroes (id INT(5) NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(255), power varchar(255), universe varchar(255))'
let sqlSeed = 'INSERT INTO heroes (name, power, universe) VALUES ?'
let values = [
  ["Superman", "flying", "DC"],
  ["Batman", "durability", "DC"],
  ["Wonder Woman", "speed", "DC"],
  ["Aquagirl", "water breathing", "DC"],
  ["Aquaman", "water breathing", "DC"],
  ["Catwoman", "acrobatics", "DC"],
  ["Black Canary", "master hand-to-hand combatant", "DC"],
  ["Black Panther", "superhuman condition", "Marvel"],
  ["Moon Knight", "strength", "Marvel"],
  ["Jessica Jones", "strength", "Marvel"],
  ["Spider-Man", "web-shooters", "Marvel"],
  ["Iron Man", "powered armor", "Marvel"],
  ["Thor", "strength", "Marvel"],
  ["Hulk", "strength", "Marvel"],
  ["Wolverine", "accelerated healing", "Marvel"],
  ["Daredevil", "radar senses", "Marvel"],
  ["Black Widow", "biotechnology", "Marvel"],
  ["Copycat", "genetic metamorph", "Marvel"],
  ["Hellboy", "strength", "Hellboy"],
  ["Monster Girl", "strength", "Invincible"],
  ["Bliss", "neural manipulation", "Wildstorm"],
  ["Frostbite", "heat absorbtion", "Wildstorm"],
  ["Burnout", "generates flames", "Wildstorm"],
  ["Freefall", "manipulate gravity", "Wildstorm"],
  ["Powerhaus", "strength", "Wildstorm"],
  ["Sarah Rainmaker", "control weather", "Wildstorm"],
]

sqlDB.query(sqlCreateTable, (err, result) => {
  if (err){ 
    throw err
  }
  console.log('table created')
})

sqlDB.query(sqlSeed, [values], (err) => {
  if (err) {
    throw err
  }
  console.log('inserted to db')
})