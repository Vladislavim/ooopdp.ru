// Existing published project copy and local project materials only.
// Sources: projects-clients fragments, About project cards, document register.
export const casePages = {
  'red-october': {
    name:'Красный Октябрь', href:'05-project-red-october.html', initial:2,
    media:[
      ['cases/red-october.jpg','Промышленное оборудование Красного Октября'],
      ['cases/red-october-render-user.jpg','Проектное решение Красного Октября'],
      ['industrial-pickling-01.png','Травильное отделение'],
      ['industrial-pickling-02.png','Инженерные системы объекта'],
      ['cases/industrial-production-user.png','Рабочая документация на объекте']
    ],
    steps:['Сбор исходных данных','Разработка проектных решений','Согласование решений с заказчиком','Разработка рабочей документации','Передача документации заказчику']
  },
  'alan-kz': {
    name:'ALAN KZ', href:'project-alan-kz.html', title:'Футбольные поля ALAN KZ',
    description:'Проект предусматривает строительство и реконструкцию 20 футбольных полей в течение трёх лет.',
    hero:'cases/astana-arena.jpg', facts:[['Тип объекта','Спортивный объект'],['Направление','Спортивная инфраструктура'],['Регион','Казахстан']],
    media:[['cases/astana-arena.jpg','Спортивный объект ALAN KZ']]
  },
  'severstal': {
    name:'Северсталь', href:'project-severstal.html', title:'Инженерные решения для производства',
    description:'Комплексная работа с промышленной инфраструктурой и инженерными системами действующего объекта.',
    hero:'archive-optimized/PDP-OBJ-004.jpg', detailHero:'cases/severstal-after.webp', after:'cases/severstal-after.webp',facts:[['Тип объекта','Промышленный объект'],['Направление','Промышленное производство'],['Статус','Реализован']],
    media:[['cases/severstal-after.webp','Реализованное решение Северстали'],['archive-optimized/PDP-OBJ-004.jpg','Исходное состояние производственного объекта']]
  },
  'eurochem': {
    name:'ЕвроХим-Волгакалий',href:'project-eurochem.html',title:'Офисные помещения ЕвроХим',
    description:'Дизайн-проект офисных помещений и рабочая документация для действующего предприятия.',
    hero:'cases/eurochem-office.jpg',facts:[['Объект','Офисные помещения'],['Направление','Дизайн-проект']],
    media:[['cases/eurochem-office.jpg','Офисные помещения ЕвроХим-Волгакалий'],['documents/eurochem-office-design-preview.jpg','Титульный лист дизайн-проекта']],
    document:['eurochem-office-design','Дизайн-проект офисных помещений','PDF · 10,7 МБ']
  },
  'polyclinic-31': {
    name:'Поликлиника №31',href:'project-polyclinic-31.html',title:'Поликлиника №31',
    description:'Проектная и рабочая документация. Архитектурные решения, раздел АР1.',
    hero:'cases/polyclinic-render-front.jpg',facts:[['Тип объекта','Общественный объект'],['Раздел документации','АР1']],
    media:[['cases/polyclinic-render-front.jpg','Проектное решение · главный фасад'],['cases/polyclinic-render-side.jpg','Проектное решение · боковой фасад'],['cases/polyclinic-old-front.jpg','Исходное состояние · главный фасад'],['cases/polyclinic-old-side.jpg','Исходное состояние · боковой фасад']],
    document:['polyclinic-31-ar','Проектная и рабочая документация · АР1','PDF · 14,1 МБ']
  },
  'crmo': {
    name:'ЦРМО РМО',href:'project-crmo.html',title:'ЦРМО РМО, отделение №2',
    description:'Проектные решения. Эскизный проект отделения №2.',
    hero:'cases/crmo-overview.webp',facts:[['Объект','ЦРМО РМО, отделение №2'],['Материалы','Эскизный проект']],
    media:[
      ['cases/crmo-overview.webp','Проектное решение · раздевалка и брендированная зона'],
      ['cases/crmo-lockers.jpg','Проектное решение · душевые и раздевалки'],
      ['cases/crmo-washroom.jpg','Проектное решение · бытовые помещения'],
      ['cases/crmo-brand-wall.jpg','Проектное решение · коридор с айдентикой предприятия'],
      ['cases/crmo-rest-room.jpg','Проектное решение · комната отдыха'],
      ['cases/crmo-corridor.jpg','Проектное решение · коридор второго этажа']
    ],
    document:['crmo-sketch','Проектные решения · эскизный проект','PDF · 1,4 МБ']
  }
};
