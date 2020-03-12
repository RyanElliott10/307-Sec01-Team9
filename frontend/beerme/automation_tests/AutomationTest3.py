import time
import os
from selenium import webdriver
import selenium

from automation_tests.BeerMeSurfingCommandsUsingSelenium import BeerMeSurfingCommandsUsingSelenium

URL = 'http://localhost:3007/'

driver = webdriver.Chrome(os.getcwd()+"\\chromedriver.exe")
driver.set_page_load_timeout(10)

BeerMeDriver = BeerMeSurfingCommandsUsingSelenium(driver)

BeerMeDriver.openHomepage(URL)
time.sleep(1)

BeerMeDriver.login("testUser@gmail.com","test123")
time.sleep(1)

BeerMeDriver.getToHomepage()
time.sleep(1)

BeerMeDriver.searchFirstBeerStartingWith("B")
time.sleep(1)


try:
    starComponent = driver.find_element_by_class_name("star")
    print("Test successful")
except selenium.common.exceptions.NoSuchElementException:
    print("Test unsuccessful")



try:
    error  = driver.find_element_by_class_name("form-label")
    if(error.text == "In order to view recommended, please"):
        print("Test successful")
    else:
        print("Test unsuccessful")
except:
    print("Test unsuccessful")