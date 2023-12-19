import { slider, field } from "./table.js";


slider.addEventListener('input', () => generateError(slider, seed));
field.addEventListener('input', () => generateError(field, seed));


let seed = 0; 

function deleteRandomChar(str, getRandomNumber) {
  let randomPosition = Math.floor(getRandomNumber() * str.length); // Используем seed для воспроизводимости
  str = str.slice(0, randomPosition) + str.slice(randomPosition + 1);
  return str;
}

const getRandomDigit = (getRandomNumber) => String(Math.floor(getRandomNumber() * 10));
const getRandomCyrillicChar = (getRandomNumber) => String.fromCharCode(1040 + Math.floor(getRandomNumber() * 64));
const getRandomLatinChar = (getRandomNumber) => String.fromCharCode(65 + Math.floor(getRandomNumber() * 52));

const selectedRegion = document.querySelector('#regionSelect').value;

function getRandomChar(region, getRandomNumber ) {
  switch (region.toLowerCase()) {
      case 'usa' || 'france':
          return getRandomNumber() < 0.5 ? getRandomDigit(getRandomNumber) : getRandomLatinChar(getRandomNumber);
      case 'russia':
          return getRandomNumber() < 0.5 ? getRandomDigit(getRandomNumber) : getRandomCyrillicChar(getRandomNumber);
      default:
          return '';
  }
}

function addRandomChar(str, getRandomNumber) {
  let randomPosition = Math.floor(getRandomNumber() * str.length); // Используем seed для воспроизводимости
  str = str.slice(0, randomPosition) + getRandomChar(selectedRegion, getRandomNumber) + str.slice(randomPosition);
  return str;
}


function swapRandomChars(str, getRandomNumber) {
  const randomPosition1 = Math.floor(getRandomNumber() * str.length); // Используем seed для воспроизводимости
  const randomPosition2 = Math.floor(getRandomNumber() * str.length); // Используем seed для воспроизводимости
  const chars = str.split('');
  [chars[randomPosition1], chars[randomPosition2]] = [chars[randomPosition2], chars[randomPosition1]];
  return chars.join('');
}

const errors = [deleteRandomChar, addRandomChar, swapRandomChars];

function selectSmth(arr, getRandomNumber) {
  return arr[Math.floor(getRandomNumber() * arr.length)];
}

const nameCells = document.querySelectorAll('#userTable tbody tr td:nth-child(3)');
const addressCells = document.querySelectorAll('#userTable tbody tr td:nth-child(4)');
const phoneNumberCells = document.querySelectorAll('#userTable tbody tr td:nth-child(5)');

const fieldsErrors = [nameCells, addressCells, phoneNumberCells];

function generateError(input, seed) {
  let getRandomNumber = new Math.seedrandom(seed);  
    for (let i = 0; i < input.value; i++ ) {
      if (Math.random()+i < input.value) {
        let selectedError = selectSmth(errors, getRandomNumber);
        let selectedField = selectSmth(fieldsErrors, getRandomNumber);
        selectedField.forEach(field => {
          field.textContent = selectedError(field.textContent, getRandomNumber);
        })
      } 
    }
  seed ++;
}