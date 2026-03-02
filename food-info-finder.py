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

from tqdm import tqdm

allInfo = list(data.items())

for diningHall,datemenus in allInfo:
    for date,items in datemenus.items():
        for item in tqdm(list(items)):
            url = item['link']
            backpart = url.split('?')[-1]
            # iXXXX for ingrdient
            # rZZZZ for recipe
            recipeCode = backpart[0] + backpart.split('=')[-1]
            if recipeCode not in recipes:
                try:
                    recipes[recipeCode] = scrapeRecipe(url)
                except:
                    print("didnt work")
                    with open('./backend/recipeinfo3.json','w') as file:
                        json.dump(recipes,file,indent=4,ensure_ascii=False)

with open('./backend/recipeinfo3.json','w') as file:
    json.dump(recipes,file,indent=4,ensure_ascii=False)