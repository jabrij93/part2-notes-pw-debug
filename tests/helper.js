const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'log in' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const formatMonth = (month) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[parseInt(month) - 1];
};

const createNote = async (page, content, date) => {
  await page.getByRole('button', { name: 'new note' }).click()
  await page.getByRole('textbox').first().fill(content)

  // Extract year, month, day from date
  const [day, month, year] = date.split('-');
  
  await page.click('div.react-datepicker__input-container') // Open the calendar

  while (true) {
    const currentText = await page.locator('h2.react-datepicker__current-month').textContent()
    const [currentMonth, currentYear] = currentText.split(' ');

    if (parseInt(currentYear) === parseInt(year) && currentMonth === formatMonth(month)) {
      break;
    }

    await page.click('button[aria-label="Next Month"]');
  }
   // Select the correct day
   await page.click(`.react-datepicker__day--0${day}`);
   console.log('YearMonthDay:', year, month, day)

  // Select the date using the date picker
  // const datePicker = await page.locator('input.react-datepicker-ignore-onclickoutside') 
  // await datePicker.fill(date) // Format: "YYYY-MM-DD"

  await page.getByRole('button', { name: 'save' }).click()
  await page.getByText(content).waitFor()
}

export { loginWith, createNote }