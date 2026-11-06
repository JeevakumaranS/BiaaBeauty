import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateClientName,
  validatePhoneNumber,
  validateEventDate,
  validateServices,
  validateEnquiryForm,
  generateWhatsAppUrl,
  cleanIndianPhoneNumber,
  getTodayDateString,
} from './validation.ts';

test('validateClientName rejects empty or single letter names', () => {
  assert.equal(validateClientName('').isValid, false);
  assert.equal(validateClientName('   ').isValid, false);
  assert.equal(validateClientName('A').isValid, false);
  assert.equal(validateClientName('123').isValid, false);
  assert.equal(validateClientName('Ananya').isValid, true);
  assert.equal(validateClientName('P. Priya').isValid, true);
});

test('cleanIndianPhoneNumber normalizes prefixes', () => {
  assert.equal(cleanIndianPhoneNumber('9976855732'), '9976855732');
  assert.equal(cleanIndianPhoneNumber('+91 99768 55732'), '9976855732');
  assert.equal(cleanIndianPhoneNumber('09976855732'), '9976855732');
});

test('validatePhoneNumber validates Indian 10-digit mobile numbers', () => {
  assert.equal(validatePhoneNumber('9976855732').isValid, true);
  assert.equal(validatePhoneNumber('+91 98421 12345').isValid, false);
  assert.equal(validatePhoneNumber('12345').isValid, false);
  assert.equal(validatePhoneNumber('1234567890').isValid, false); // doesn't start with 6-9
  assert.equal(validatePhoneNumber('99768557321').isValid, false);
  assert.equal(validatePhoneNumber('abcdefghij').isValid, false);
});

test('validateEventDate rejects past dates and accepts today or future dates', () => {
  assert.equal(validateEventDate('').isValid, false);
  assert.equal(validateEventDate('2020-01-01').isValid, false);
  
  const today = getTodayDateString();
  assert.equal(validateEventDate(today).isValid, true);

  // Future year
  assert.equal(validateEventDate('2030-12-15').isValid, true);
});

test('validateServices strictly enforces authorized bridal services', () => {
  assert.equal(validateServices([]).isValid, false);
  assert.equal(validateServices(['Bridal Makeup']).isValid, true);
  assert.equal(validateServices(['Bridal Makeup', 'Hair Styling', 'Saree Draping']).isValid, true);
  assert.equal(validateServices(['Facial Treatment']).isValid, false);
});

test('validateEnquiryForm validates full form state correctly', () => {
  const invalid = validateEnquiryForm({
    clientName: 'A',
    phoneNumber: '123',
    eventDate: '2020-01-01',
    services: [],
    venueNotes: '',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.clientName);
  assert.ok(invalid.errors.phoneNumber);
  assert.ok(invalid.errors.eventDate);
  assert.ok(invalid.errors.services);

  const valid = validateEnquiryForm({
    clientName: 'Kavitha Ramasamy',
    phoneNumber: '9843212345',
    eventDate: '2028-11-20',
    services: ['Bridal Makeup', 'Saree Draping'],
    venueNotes: 'Muhurtham ceremony at Erode Mahal, 6:00 AM',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('generateWhatsAppUrl generates correct link to 99768 55732', () => {
  const url = generateWhatsAppUrl({
    clientName: 'Deepa Lakshmi',
    phoneNumber: '9976855732',
    eventDate: '2028-12-05',
    services: ['Bridal Makeup', 'Hair Styling'],
    venueNotes: 'Reception at Texvalley, Erode',
  });

  assert.ok(url.startsWith('https://wa.me/919976855732?text='));
  assert.ok(url.includes(encodeURIComponent('Deepa Lakshmi')));
  assert.ok(url.includes(encodeURIComponent('Bridal Makeup, Hair Styling')));
});
