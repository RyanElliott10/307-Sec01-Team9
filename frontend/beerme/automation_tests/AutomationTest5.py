import time
import os
from selenium import webdriver
import selenium

from automation_tests.BeerMeSurfingCommandsUsingSelenium import BeerMeSurfingCommandsUsingSelenium

URL = 'http://localhost:3000/'

driver = webdriver.Chrome(os.getcwd()+"\\chromedriver.exe")
driver.set_page_load_timeout(10)

BeerMeDriver = BeerMeSurfingCommandsUsingSelenium(driver)

BeerMeDriver.openHomepage(URL)
time.sleep(1)

BeerMeDriver.getExploredStyles(3,2,2)
time.sleep(2)

exploreResults = driver.find_elements_by_id("clickable-beer")

if(len(exploreResults)>0):
    print("Test Successful")
else:
    print("Test Unsuccessful")