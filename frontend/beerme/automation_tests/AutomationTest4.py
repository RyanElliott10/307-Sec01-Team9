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

BeerMeDriver.getRecommendations()
time.sleep(1)

try:
    error  = driver.find_element_by_class_name("form-label")
    print("Test unsuccessful")
except:
    print("Test successful")