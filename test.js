import assert from 'assert';
import fs from 'fs';
import {RussianStemmer} from 'snowball-stemmer.jsx/dest/russian-stemmer.common.js';
const russian = new RussianStemmer;
import {EnglishStemmer} from 'snowball-stemmer.jsx/dest/english-stemmer.common.js';
const english = new EnglishStemmer;

import {BloomFilter} from 'bloomfilter.js';
import bloomData from './bloomData.js';
const bloom = new BloomFilter(bloomData, 1);

// Positive russian
assert(bloom.test(russian.stemWord('привет')));
assert(bloom.test(russian.stemWord('мир')));
assert(bloom.test(russian.stemWord('колотить')));
assert(bloom.test(russian.stemWord('уравнение')));
assert(bloom.test(russian.stemWord('здесь')));
assert(bloom.test(russian.stemWord('как')));
assert(bloom.test(russian.stemWord('твои')));
assert(bloom.test(russian.stemWord('дела')));
assert(bloom.test(russian.stemWord('товарищ')));

// Negative russian
assert(!bloom.test(russian.stemWord('бармаглот')));
assert(!bloom.test(russian.stemWord('шворкалось')));
assert(!bloom.test(russian.stemWord('хливкие')));
assert(!bloom.test(russian.stemWord('ширьки')));
assert(!bloom.test(russian.stemWord('мюмзики')));

// Positive english
assert(bloom.test(english.stemWord('hello')));
assert(bloom.test(english.stemWord('new')));
assert(bloom.test(english.stemWord('wonderful')));
assert(bloom.test(english.stemWord('world')));
assert(bloom.test(english.stemWord('of')));
assert(bloom.test(english.stemWord('darkness')));

// Negative english
assert(!bloom.test(english.stemWord('manxome')));
assert(!bloom.test(english.stemWord('frumious')));
assert(!bloom.test(english.stemWord('jubjub')));
assert(!bloom.test(english.stemWord('brillig')));
assert(!bloom.test(english.stemWord('borogoves')));
assert(!bloom.test(english.stemWord('outgrabe')));
