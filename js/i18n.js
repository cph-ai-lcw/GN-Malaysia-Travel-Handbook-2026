import {storage} from './storage.js';
let lang=storage.get('lang','both');
export function getLang(){return lang}
export function setLang(next){lang=next;storage.set('lang',next)}
export function bi(zh,vi){if(lang==='zh')return zh;if(lang==='vi')return vi||zh;return `${zh}<span class="bilingual-vi">${vi||zh}</span>`}
export function text(zh,vi){return lang==='vi'?(vi||zh):zh}
