import time
import os
from selenium import webdriver
import selenium


URL = 'http://localhost:3000/'

driver = webdriver.Chrome(os.getcwd()+"\\chromedriver.exe")
driver.set_page_load_timeout(10)
driver.get(URL)

time.sleep(2)

driver.find_element_by_class_name("recommended_header_link").click()

try:
    error  = driver.find_element_by_class_name("form-label")
    if(error.text == "In order to view recommended, please"):
        print("Test successful")
    else:
        print("Test unsuccessful")
except:
    print("Test unsuccessful")