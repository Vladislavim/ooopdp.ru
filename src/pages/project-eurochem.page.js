import { casePages } from '../data/case-pages.js';
const project=casePages['eurochem'];
export default {
  id:'project-eurochem', caseId:'eurochem', output:'pages/'+project.href,
  sourceDir:'content/project-red-october', kind:'inner',
  seo:{title:project.title+' — ПДП',description:project.description,canonical:'https://ooopdp.ru/pages/'+project.href},
  order:['prod-container-5','div','div-2'],
  blocks:{'prod-container-5':'blocks/case/template.html'}
};
