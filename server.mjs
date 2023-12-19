import express from 'express';
import { faker, fakerRU, fakerFR } from '@faker-js/faker';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import seedrandom from 'seedrandom';
//import createCsvWriter from 'csv-writer';
const app = express();

app.use(bodyParser.json());
let randomSeed = 0;

function generateFakeData(count, region, seed) {
  const users = [];
  const fakerInstance = getFakerInstance(region);
  let getRandomNumber = seedrandom(seed);  
  fakerInstance.seed(seed);
  for (let i = 1; i <= count; i++) {
    const user = {
      id: getNextUserId(),
      uniqueNumber: fakerInstance.string.nanoid(10),
      name: fakerInstance.person.fullName(),
      address: getFakerAddress( fakerInstance, region, getRandomNumber),
      phoneNumber: fakerInstance.phone.number()
    };
    users.push(user);
  }
  return users;
}

function getFakerAddress( fakerInstance, region, getRandomNumber ) {
  const street = fakerInstance.location.streetAddress(true);
  let city = getRandomNumber() < 0.5 ? fakerInstance.location.city() : fakerInstance.location.county();
  switch (region) {
    case 'Russia':
      city = fakerInstance.location.city();
      return city +', '+ street;
    case 'France':
      return city +', '+ street;
    default:
      const state = fakerInstance.location.state( {abbreviated: true} );
      return state +', '+ city + ', ' + street;
  }
}

function getFakerInstance(region) {
  switch (region) {
    case 'Russia':
      return fakerRU;
    case 'France':
      return fakerFR;
    default:
      return faker;
  }
}

let lastUserId = 0;
function getNextUserId() {
  lastUserId += 1;
  return lastUserId;
}

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const defaultRegion = 'USA';
  const defaultUsers = generateFakeData(20, defaultRegion, randomSeed);
  res.render('index', { users: defaultUsers, region: defaultRegion, seed: randomSeed});
});

app.get('/loadMore', (req, res) => {
  const count = 10;
  let seed = req.query.seed;
  const region = req.query.region || 'USA'; // Используйте значение по умолчанию, если регион не указан
  const additionalUsers = generateFakeData(count, region, seed);
  res.json(additionalUsers);
});

app.get('/reload', (req, res) => {
  const count = 20;
  lastUserId = 0;
  const region = req.query.region;
  let seed = Number(req.query.seed) || 0;
  const users = generateFakeData(count, region, seed);
  res.render('index', {users: users, region: region, seed: seed});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
