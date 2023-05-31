import {BloomFilter} from 'bloomfilter.js/bloomfilter.js';
import bloomData from './bloomData.js';
const bloom = new BloomFilter(bloomData, 1);

import {RussianStemmer} from 'snowball-stemmer.jsx/dest/russian-stemmer.common.js';
const russian = new RussianStemmer;

import {EnglishStemmer} from 'snowball-stemmer.jsx/dest/english-stemmer.common.js';
const english = new EnglishStemmer;

export default function checkLanguage (word) {
  if (bloom.test(russian.stemWord(word))) return 'russian';
  if (bloom.test(english.stemWord(word))) return 'english';
}