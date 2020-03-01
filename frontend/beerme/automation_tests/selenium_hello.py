import os
import time

from selenium import webdriver

URL = 'http://localhost:3000/'
DRIVER_PATH = f"{os.getcwd()}/geckodriver"

driver = webdriver.Firefox(executable_path=DRIVER_PATH)
driver.set_page_load_timeout(10)
driver.get(URL)

header_link_names = ["explore_header_link",
                     "recommended_header_link", "account_account_entry_header_link"]
header_links = [driver.find_element_by_class_name(
    class_name) for class_name in header_link_names]

for header in header_links:
    time.sleep(2)
    header.click()

time.sleep(2)
driver.quit()
