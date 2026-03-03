import{test,expect} from '@playwright/test';
import {ElementUtil} from '../Utils/ElementUtil.js'

test(' has title',async ({page})=>{
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login')
let eleUtil= new ElementUtil(page,10000);
await eleUtil.fill(`//input[@id='input-email']`,'test123@gmail.com');
await eleUtil.fill(`page.getByLabel('Password')`,'password123');
await eleUtil.click(`input[type="submit"][value="Login"]`,{force:true,timeout:5000});




});