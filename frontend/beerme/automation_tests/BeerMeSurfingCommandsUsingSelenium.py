import time

class BeerMeSurfingCommandsUsingSelenium:
    def __init__(self,driver):
        self.driver = driver

    def openHomepage(self,URL):
        self.driver.get(URL)

    def login(self,email,password):
        self.driver.find_element_by_class_name("account_account_entry_header_link").click()
        time.sleep(2)
        authFields = self.driver.find_elements_by_class_name("form-group")
        authFields[0].find_element_by_class_name("form-control").send_keys(email)
        authFields[1].find_element_by_class_name("form-control").send_keys(password)
        time.sleep(2)
        self. driver.find_element_by_css_selector(".btn.btn-primary").click()

    def searchFirstBeerStartingWith(self,query):
        self.driver.find_element_by_css_selector(".sc-bdVaJa.jwfbbd").send_keys(query)
        time.sleep(2)
        self.driver.find_element_by_class_name("react-search-box-dropdown-list-item").click()

    def getRecommendations(self):
        self.driver.find_element_by_class_name("recommended_header_link").click()
        time.sleep(2)

    def getToHomepage(self):
        self.driver.find_element_by_class_name("beerme-homepage-clickable").click()
        time.sleep(2)


    def getExploredStyles(self,colorOption,ibuOption,abvOption):
        self.driver.find_element_by_class_name("explore_header_link").click()
        time.sleep(2)
        self.driver.find_elements_by_class_name("custom-control-label")[colorOption].click()
        self.driver.find_element_by_css_selector(".btn.btn-secondary").click()
        time.sleep(1)
        self.driver.find_elements_by_class_name("custom-control-label")[ibuOption].click()
        self.driver.find_elements_by_css_selector(".btn.btn-secondary")[1].click()
        time.sleep(1)
        self.driver.find_elements_by_class_name("custom-control-label")[abvOption].click()
        self.driver.find_elements_by_css_selector(".btn.btn-secondary")[1].click()





