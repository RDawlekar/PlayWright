import { test, expect, request } from '@playwright/test';
import excelData from 'exceljs';

// test.beforeAll(async () => {'

// const apiContext = await request.n'ewContext();
// const response =await apiContext.post("https://sso.teachable.com/secure/9521/identity/login/password?force=true",{
//   data:{
//     userEmail:"reshmadawlekar41@gmail.com",
//     userPassword:"Manvesh22@apr19"
//   }
// });
//   console.log(response.status());
//   expect(response.ok()).toBeTruthy();
//   return response.json();

// });
test('has title', async ({ page }) => {
  await page.goto('https://www.amazon.com/');
  await page.waitForLoadState('domcontentloaded');
  const searchTitle=await page.title();

  console.log(searchTitle);
  await expect(page).toHaveTitle("Amazon.com. Spend less. Smile more.");
  await page.getByRole('button', { name: 'Submit' }).first().click()
   const userSearch= page.locator("input#twotabsearchtextbox");
   const userSearchBUtton=page.locator("input#nav-search-submit-button");
  
  await userSearch.fill("mobiles");
  const searchInput =page.getByPlaceholder('Search Amazon');

  console.log(await searchInput.inputValue());
  console.log(await userSearch.textContent());
  await userSearchBUtton.click();
  // await userSearch.clear();
  const list=await page.locator("xpath=//span[@data-component-type='s-search-results']//h2//span");
  await list.first().waitFor();
  await page.waitForLoadState('domcontentloaded');
  const titles=await list.allTextContents();
  titles.forEach((title,index)=>{
    console.log(`${index+1} : ${title}`);
  } );
await page.locator("#s-result-sort-select").selectOption("price-asc-rank");
await page.locator("xpath=//div[@id='brandsRefinements']//i[contains(@class,'checkbox')]").first().click();
await expect(page.locator("xpath=//div[@id='brandsRefinements']//i[contains(@class,'checkbox')]").first()).toBeChecked();
console.log(await page.locator("xpath=//div[@id='brandsRefinements']//i[contains(@class,'checkbox')]").first().isChecked());
const addTOcart=await page.locator("[aria-label*='Add to cart']");
await addTOcart.first().click();
await page.waitForLoadState('domcontentloaded');
const navCart=await page.locator("#nav-cart-count");
await navCart.click();
});


test('hidden ELement test mouse hover', async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await page.waitForLoadState('domcontentloaded');
  const searchTitle=await page.title();
  console.log(searchTitle);
  await page.locator("#displayed-text").waitFor();
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#displayed-text").fill("Hello World");
  await page.locator("#mousehover").hover();

});


test('Frame switch', async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await page.waitForLoadState('domcontentloaded');
  const searchTitle=await page.title();
  console.log(searchTitle);
  const frames=page.frameLocator("#courses-iframe");
  await frames.locator("a[href*='mentorship']").first().click();

  
});


test.only('API Case1', async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await page.waitForLoadState('domcontentloaded');
  const searchTitle=await page.title();
  console.log(searchTitle);
  const frames=page.frameLocator("#courses-iframe");
  await frames.locator("a[href*='mentorship']").first().click();
  await DataRead  ();
  
});

async function DataRead () {
const workbook=new excelData.Workbook();
await workbook.xlsx.readFile("C:\\Playwright\\TestData\\TestData.xlsx");
const worksheet=workbook.getWorksheet("Sheet1");
const colcount=worksheet?.actualColumnCount;
const rowcount=worksheet?.actualRowCount;
for(let i=1;i<=rowcount!;i++){
  const username=worksheet?.getRow(i).getCell(1).value;
  const password=worksheet?.getRow(i).getCell(2).value;
  console.log(`Username: ${username} , Password: ${password}`); 
} 
}