const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'log in' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const monthToNumber = {
  January: 1, February: 2, March: 3, April: 4,
  May: 5, June: 6, July: 7, August: 8,
  September: 9, October: 10, November: 11, December: 12
};

const formatMonth = (monthStr) => monthToNumber[monthStr]; 

const createNote = async (page, content, date) => {
  await page.getByRole('button', { name: 'new note' }).click();
  await page.getByRole('textbox').first().fill(content);

  // Extract year, month, day from date
  const [day, month, year] = date.split('-');
  
  await page.click('div.react-datepicker__input-container'); // Open the calendar

  while (true) {
    const currentText = await page.locator('h2.react-datepicker__current-month').textContent();
    const [currentMonthStr, currentYear] = currentText.split(' ');
  
    const currentMonth = monthToNumber[currentMonthStr]; // Convert to number
    const targetMonth = parseInt(month); // Convert to number
  
    if (parseInt(currentYear) === parseInt(year) && currentMonth === targetMonth) {
      break; // Stop when the correct month and year are reached
    }
  
    if (parseInt(currentYear) > parseInt(year) || 
        (parseInt(currentYear) === parseInt(year) && targetMonth < currentMonth)) {
      // Move backward if the target month is earlier
      await page.click('button[aria-label="Previous Month"]');
    } else {
      // Move forward if the target month is later
      await page.click('button[aria-label="Next Month"]');
    }
  }  

  // Select the correct day
  await page.click(`.react-datepicker__day--0${day}`);
  console.log('YearMonthDay:', year, month, day);

  await page.getByRole('button', { name: 'save' }).click();
  await page.getByText(content).waitFor();
};

export { loginWith, createNote }