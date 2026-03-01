# this is to collapse the repeated icons
import json
with open('./backend/recipeinfo.json','r') as file:
    data = json.load(file)
    
for code,icons in data.items():
    data[code] = list(set(icons))

with open('./backend/recipeinfo.json','w') as file:
    json.dump(data,file,indent=4)