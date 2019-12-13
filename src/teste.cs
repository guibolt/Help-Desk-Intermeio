using System;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;

namespace SeleniumTests
{
    [TestFixture]
    public class LogarNoOutlook
    {
        private IWebDriver driver;
        private StringBuilder verificationErrors;
        private string baseURL;
        private bool acceptNextAlert = true;
        
        [SetUp]
        public void SetupTest()
        {
            driver = new FirefoxDriver();
            baseURL = "https://www.katalon.com/";
            verificationErrors = new StringBuilder();
        }
        
        [TearDown]
        public void TeardownTest()
        {
            try
            {
                driver.Quit();
            }
            catch (Exception)
            {
                // Ignore errors if unable to close the browser
            }
            Assert.AreEqual("", verificationErrors.ToString());
        }
        
        [Test]
        public void TheLogarNoOutlookTest()
        {
            driver.Navigate().GoToUrl("https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1576170074&rver=7.0.6730.0&wp=LBI&wreply=https:%2f%2fwww.msn.com%2fpt-br%2fhomepage%2fSecure%2fPassport%3fru%3dhttps%253a%252f%252fwww.msn.com%252fpt-br%252f%253focid%253dmailsignout%2526pfr%253d1&lc=1033&id=1184&mkt=pt-br&pcexp=True");
            driver.FindElement(By.Id("i0116")).Click();
            driver.FindElement(By.Id("i0116")).Clear();
            driver.FindElement(By.Id("i0116")).SendKeys("rafaelzicote1@hotmail.com");
            driver.FindElement(By.Id("idSIButton9")).Click();
            driver.FindElement(By.Id("i0118")).Click();
            driver.FindElement(By.Id("i0118")).Clear();
            driver.FindElement(By.Id("idSIButton9")).Click();
            driver.FindElement(By.XPath("(.//*[normalize-space(text()) and normalize-space(.)='Navegação dos Portais'])[1]/following::h3[1]")).Click();
            // ERROR: Caught exception [ERROR: Unsupported command [selectWindow | win_ser_1 | ]]
            driver.FindElement(By.XPath("//img[@alt='RV']")).Click();
            driver.FindElement(By.Id("meControlSignoutLink")).Click();

             // segundo teste 
            driver.Navigate().GoToUrl("https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1576173731&rver=7.0.6737.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fnlp%3d1%26RpsCsrfState%3d3738eaa5-1954-242a-4270-576cd5d9e819&id=292841&aadredir=1&whr=hotmail.com&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=90015");
            driver.FindElement(By.Id("i0116")).Click();
            driver.FindElement(By.Id("i0116")).Clear();
            driver.FindElement(By.Id("i0116")).SendKeys("rafaelzicote1@hotmail.com");
            driver.FindElement(By.Id("idSIButton9")).Click();
            driver.FindElement(By.Id("i0118")).Click();
            driver.FindElement(By.Id("i0118")).Clear();

            driver.FindElement(By.Id("idSIButton9")).Click();
            //*[@id="O365_MainLink_MePhoto"]/div/div/div/div[2]/img
            //*[@id="O365_MainLink_MePhoto"]/div/div/div/div[2]
            driver.FindElement(By.XPath("//*[@id='O365_MainLink_MePhoto']/div/div/div/div[2]/img")).Click();
            driver.FindElement(By.Id("meControlSignoutLink")).Click();
            driver.Close();
        }
        private bool IsElementPresent(By by)
        {
            try
            {
                driver.FindElement(by);
                return true;
            }
            catch (NoSuchElementException)
            {
                return false;
            }
        }
        
        private bool IsAlertPresent()
        {
            try
            {
                driver.SwitchTo().Alert();
                return true;
            }
            catch (NoAlertPresentException)
            {
                return false;
            }
        }
        
        private string CloseAlertAndGetItsText() {
            try {
                IAlert alert = driver.SwitchTo().Alert();
                string alertText = alert.Text;
                if (acceptNextAlert) {
                    alert.Accept();
                } else {
                    alert.Dismiss();
                }
                return alertText;
            } finally {
                acceptNextAlert = true;
            }
        }
    }
}
