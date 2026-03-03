import {Page,Locator,expect} from '@playwright/test';

type flexibleLocator = Locator|string;

export class ElementUtil{
    private page:Page;
    private defaultTimeOut: number=3000;
    constructor(page:Page,timeOut:number=3000){
        this.page=page;
        this. defaultTimeOut=timeOut;
    }

/**
 * 
 * @param locator this method to convert the string to locator
 * @returns 
 */

    private getLocator(locator:flexibleLocator,index?:number):Locator {
        
        if(typeof locator==='string'){
        if(index)
            {
            return this.page.locator(locator).nth(index);
          }
        else {
        return this.page.locator(locator).first();
          }
    }
    else
    {if(index)
            {
            return locator.nth(index);
          }
          else 
        return locator.first(); 
        }
    }

/**
 * click on element
 * @param locator 
 * @param options 
 */

async click(locator:flexibleLocator,options?:{force?:boolean,timeout?:number},index?:number):Promise<void>{
await this.getLocator(locator,index).click({
force:options?.force,
timeout:options?.timeout||this.defaultTimeOut
});
console.log(`clicked on element:${locator}`);

}
/**
 * Double click on element
 * @param locator
 */
async doubleClick(locator:flexibleLocator):Promise<void>{
await this.getLocator(locator).dblclick({
    timeout:this.defaultTimeOut
});
console.log(`Double clicked on element:${locator}`);

}

/**
 * Right clecked on element
 * @param locator
 */
async rightClick(locator:flexibleLocator):Promise<void>{
await this.getLocator(locator).click({
    button:'right',
    timeout:this.defaultTimeOut
});
console.log(`Right clicked on element:${locator}`);

}

/**
 * 
 * @param locator 
 * @param text 
 */

async fill(locator:flexibleLocator,text:string):Promise<void>{
    await this.getLocator(locator).fill(text,{timeout:this.defaultTimeOut});
    console.log(`filled text:${text} into element :${locator}`);
}

/**
 * Typed text with delay(default delay :500 ms)
 * @param locator
 * @param text 
 * @param delay 
 */
async type(locator:flexibleLocator,text:string,delay:number=500):Promise<void>{
    await this.getLocator(locator).pressSequentially(text,{delay, timeout:this.defaultTimeOut });
    console.log(`Typed text as human:${text} into element :${locator}`);
}
async clear(locator:flexibleLocator):Promise<void>{
    await this.getLocator(locator).clear({timeout:this.defaultTimeOut});
    console.log(`Cleared the element:${locator}`);
}

/**
 * Get the text contetnt of an element
 */

async getText(locator:flexibleLocator):Promise<string|null>{
    const text =await this.getLocator(locator).textContent({timeout:this.defaultTimeOut});
    return text;
}

/**
 * Get the inner text
 */
async getInnerText(locator:flexibleLocator):Promise<string>{
    const text =await this.getLocator(locator).innerText({timeout:this.defaultTimeOut});
    return text.trim();
}

/**
 * 
 * Get attribute value
 */
async getAttributeValue(locator:flexibleLocator, attributeName: string):Promise<string|null>{
     return await this.getLocator(locator).getAttribute(attributeName);
}

/**
 * Fetching input(entered) value in a text field
 */

async getInputValue(locator:flexibleLocator):Promise<string|null>{
    return await this.getLocator(locator).inputValue({timeout:this.defaultTimeOut});
    
}

/**
 * Get all text content from multiple element
 */
async getAllInnterText(locator:flexibleLocator):Promise<string[]>
{
    return await this.getLocator(locator).allInnerTexts();
}



//=============================Element visiility & State check=============//

/**Ckeck element is hidden
 * 
 * @param locator 
 * @param timeout 
 * @returns 
 */
async isHidden(locator:flexibleLocator):Promise<boolean>
    {
   return await this.getLocator(locator).isHidden({timeout:this.defaultTimeOut});

    }

/**
 * Check element is enabled
 * @param locator 
 * @returns 
 */
async isEnabled(locator:flexibleLocator):Promise<boolean>
    {
   return await this.getLocator(locator).isEnabled({timeout:this.defaultTimeOut});

    }
 /**
 * Check element is Disabled
 * @param locator 
 * @returns 
 */

async isDisabled(locator:flexibleLocator):Promise<boolean>
    {
   return await this.getLocator(locator).isDisabled({timeout:this.defaultTimeOut});

      }
/**
 * Element checked
 * @param locator 
 * @returns 
 */ 
async isChecked(locator:flexibleLocator):Promise<boolean>
    {
   return await this.getLocator(locator).isChecked({timeout:this.defaultTimeOut});

    }
//===========Wait uils============

/**
 * Check element is visible
 * @param locator 
 * @param timeout 
 * @returns 
 */
async waitForElementVisible(locator:flexibleLocator,timeout:number=5000):Promise<boolean>
{
    try{
    await this.getLocator(locator).waitFor({state:'visible',timeout});
    console.log("waited for element to be visible");
    return true;    
    }
    catch{
        return false;
    }
}

async waitForElementAttached(locator:flexibleLocator,timeout:number=5000):Promise<boolean>
{
    try{
    await this.getLocator(locator).waitFor({state:'attached',timeout});
    console.log("waited for element to be visible");
    return true;    
    }
    catch{
        return false;
    }
}

/**
 * wair for element to be attched to the DOM
 * @param locator 
 * @param timeout 
 * @returns 
 */
async waitForElementDetached(locator:flexibleLocator,timeout:number=5000):Promise<boolean>
{
    try{
    await this.getLocator(locator).waitFor({state:'detached',timeout});
    console.log("waited for element to be visible");
    return true;    
    }
    catch{
        return false;
    }
}
/**
 * wait for page load state
 */
 async waitForPageLoad(state:'load'|'domcontentloaded'|'networkidle'='load'):Promise<void>
 {
    await this.page.waitForLoadState(state);
    console.log(`waited for page load state:${state}`);

 }
 /**
  * Wait for  specific timeout (static)
  * @param timeOut 
  */
 
 async sleep(timeOut:number):Promise<void>
 {
    await this.page.waitForTimeout(timeOut);
    console.log(`waited for ${timeOut} ms`);

 }

//=======================Drop down utils================//


async selectByText(locator:flexibleLocator,text:string)
{
    await this.getLocator(locator).selectOption({label:text},{timeout:this.defaultTimeOut});
    console.log(`selected option ${text} from the frop down ${locator}`);
}

async selectByValue(locator:flexibleLocator,value:string)
{
    await this.getLocator(locator).selectOption({value:value},{timeout:this.defaultTimeOut});
    console.log(`selected option ${value} from the frop down ${locator}`);
}
async selectByIndex(locator:flexibleLocator,Index:number)
{
    await this.getLocator(locator).selectOption({index:Index},{timeout:this.defaultTimeOut});
    console.log(`selected option ${Index} from the frop down ${locator}`);
}




}



