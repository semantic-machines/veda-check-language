import fs from 'fs';

import {RussianStemmer} from 'snowball-stemmer.jsx/dest/russian-stemmer.common.js';
const russian = new RussianStemmer;

import {EnglishStemmer} from 'snowball-stemmer.jsx/dest/english-stemmer.common.js';
const english = new EnglishStemmer;

import {BloomFilter} from 'bloomfilter.js';
const bloom = new BloomFilter(8 * 1024 * 256, 1);

let russianDict = {};
const russianWords = fs.readFileSync('node_modules/russian-words/russian-words.txt', 'utf-8');
russianWords.split(/\r?\n/).forEach(word =>  {
  const stemmed = russian.stemWord(word.toLowerCase());
  russianDict[stemmed] = russianDict[stemmed] ? ++russianDict[stemmed] : 1;
});
russianDict = Object.keys(russianDict).sort().filter(Boolean);
// fs.writeFileSync('russian-stemmed.json', JSON.stringify(russianDict, null, 2));
console.log('Russian dictionary size:', russianDict.length);
russianDict.forEach(word => bloom.add(word));

let englishDict = {};
const englishWords = fs.readFileSync('node_modules/english-words/english-words.txt', 'utf-8');
englishWords.split(/\r?\n/).forEach(word =>  {
  const stemmed = english.stemWord(word.toLowerCase());
  englishDict[stemmed] = englishDict[stemmed] ? ++englishDict[stemmed] : 1;
});
englishDict = Object.keys(englishDict).sort().filter(Boolean);
// fs.writeFileSync('english-stemmed.json', JSON.stringify(englishDict, null, 2));
console.log('English dictionary size:', englishDict.length);
englishDict.forEach(word => bloom.add(word));

const bloomData = [].slice.call(bloom.buckets);
fs.writeFileSync('bloomData.js', 'export default ' + JSON.stringify(bloomData));
console.log('Bloom filter data serialized');
