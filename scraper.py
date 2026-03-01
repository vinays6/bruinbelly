
import requests
from bs4 import BeautifulSoup
import json
from tqdm import tqdm

maindict = {}

placeNames = ['De Neve Dining',
              'Bruin Plate',
              'Epicuria at Covel',
              'Bruin Bowl',
              'Bruin Cafe',
              'Cafe 1919',
              'Epicuria at Ackerman',
              'Feast at Rieber',
              #  'Food Trucks',
              'Rendezvous',
              'The Drey',
              'The Study at Hedrick']

baseurls = ["https://dining.ucla.edu/de-neve-dining/",
            "https://dining.ucla.edu/bruin-plate/",
            "https://dining.ucla.edu/epicuria-at-covel/",
            "https://dining.ucla.edu/bruin-bowl/",
            "https://dining.ucla.edu/bruin-cafe/",
            "https://dining.ucla.edu/cafe-1919/",
            "https://dining.ucla.edu/epicuria-at-ackerman/",
            "https://dining.ucla.edu/spice-kitchen/",
            # "https://dining.ucla.edu/meal-swipe-exchange/",
            "https://dining.ucla.edu/rendezvous/",
            "https://dining.ucla.edu/the-drey/",
            "https://dining.ucla.edu/the-study-at-hedrick/"]

dates = ['2026-02-26',
         '2026-02-27',
         '2026-02-28',
         '2026-03-01',
         '2026-03-02',
         '2026-03-03',
         '2026-03-04']


def get_items(url):
    response = requests.get(url)

    # 2. Parse the HTML
    soup = BeautifulSoup(response.text, 'html.parser')

    all_items = []

    # each recipeList is present
    recipeLists = soup.select('div.recipe-list')
    for recipeList in recipeLists:

        parentIdStr = str(recipeList.parent.get('id')) # type: ignore
        recipeListTime = parentIdStr.split('-')[0]

        for recipeCard in recipeList.select('section.recipe-card'):
            
            recipeCardItem = {}

            recipeCardItem['time'] = recipeListTime

            recipeCardItem['name'] = recipeCard.select_one('div.menu-item-title div.ucla-prose').get_text(strip=True) # type: ignore
            
            recipeCardItem['link'] = "https://dining.ucla.edu" + recipeCard.select_one('div a')['href'] # type: ignore

            all_items.append(recipeCardItem)

    return(all_items)

for i in range(len(placeNames)):
    daysDict = {}
    list1 = list(range(len(dates)))
    for j in tqdm(list1):
        daysDict[dates[j]] = get_items(baseurls[i] + "?date=" + dates[j])
    maindict[placeNames[i]] = daysDict

with open('scrapemenu2.json','w') as fp:
    json.dump(maindict,fp,indent=4,ensure_ascii=False)
    fp.close()