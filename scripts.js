//daily scripture

import { verses, passages } from './dailyScriptures.js';

//set the search index to today's day of the month.
const today = new Date();
const dayIndex = (today.getDate() - 1) % verses.length;
const dailyScripture = passages[dayIndex];
const dailyChapVerse = verses[dayIndex];

//set chapter/verse and scripture divs to the selected scripture from the array.
document.getElementById("chapVerse").innerText = dailyChapVerse;
document.getElementById("scripture").innerText = dailyScripture;