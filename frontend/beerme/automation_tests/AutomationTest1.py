import time
import os
from selenium import webdriver
import selenium


URL = 'http://localhost:3003/'

driver = webdriver.Chrome(os.getcwd()+"\\chromedriver.exe")
driver.set_page_load_timeout(10)
driver.get(URL)

time.sleep(3)
driver.find_element_by_css_selector(".sc-bdVaJa.jwfbbd").send_keys("B")

time.sleep(2)
driver.find_element_by_class_name("react-search-box-dropdown-list-item").click()

try:
    starComponent = driver.find_element_by_class_name("star")
    print("Test unsuccessful")
except selenium.common.exceptions.NoSuchElementException:
    print("Test successful")




