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

BeerMeDriver.getRecommendations()

try:
    error  = driver.find_element_by_class_name("form-label")
    if(error.text == "In order to view recommended, please"):
        print("Test successful")
    else:
        print("Test unsuccessful")
except:
    print("Test unsuccessful")