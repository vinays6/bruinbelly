# this script is here to add the food info for each menu item
# icons
# allergens
# macros

# iterate over the json to find the links
# scrape that link
# put the info into respective arrays
# put the arrays into the json

from bs4 import BeautifulSoup
import requests
import json

with open('./backend/scrapemenu.json','r') as file:
    data = json.load(file)

recipes = {}

def scrapeRecipe(url):
    iconalts = []

    response = requests.get(url)
    soup = BeautifulSoup(response.text,'html.parser')

    icons = soup.select('div.single-metadata-item-wrapper img')
    for icon in icons:
        iconalts.append(icon['alt'])
    
    return iconalts

# print(scrapeRecipe("https://dining.ucla.edu/menu-item/?recipe=2640"))

i = 0

for diningHall,datemenus in data.items():
    for date,items in datemenus.items():
        for item in items:
            if(i%10 == 0):
                print(i)
            i += 1

            url = item['link']
            recipeCode = url.split('=')[-1]
            if recipeCode not in recipes:
                recipes[recipeCode] = scrapeRecipe(url)


with open('./backend/recipeinfo','w') as file:
    json.dump(recipes,file)