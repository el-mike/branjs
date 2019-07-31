const page = document.querySelector('.page-container');
const formTypeEl = page.querySelector('.form-type');
const savePropertyBtn = page.querySelector('#savePropertyBtn');

const propertyFieldsIds = [
  'internalName',
  'internalDescription',
  'rooms',
  'size',
  'street',
  'houseNumber',
  'zipCode',
  'city',
  'region',
  'country',
  'basePrice'
];

const buildProperty = () => {
  const property = {} as any;
  propertyFieldsIds.forEach(field => {
    const inputEl = page.querySelector(`#${field}`);

    property[field] = (inputEl as any).value;
  });

  return property;
};

formTypeEl.innerHTML = 'Add Property';

savePropertyBtn.addEventListener('click', () => {
  console.log('CLICKED!');
  const property = buildProperty();

  chrome.storage.sync.get('properties', data => {
    const properties = data.properties;

    chrome.storage.sync.set({
      properties: [...properties, property]
    });
  });
});
