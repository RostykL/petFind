import random

import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand, CommandError

from petsite.models import Pet

URL = 'https://www.pets4homes.co.uk/search/'

NAMES = ['Petya',
         'Vova',
         'Niga',
         'UFO',
         'Ostap Leonidovich',
         'Ostap Vyshnya',
         'Katya Osadcha',
         'Georg I',
         'Oleg Rurikovich',
         'Mister Monty Python'
          ]


class Command(BaseCommand):
    def handle(self, *args, **options):
        response = requests.get(URL)
        soup = BeautifulSoup(response.content, 'html.parser')
        elements = soup.find_all('div', 'col-xs-12 profilelisting')

        for element in elements:
          element = element.find('div', 'row display-flex')


          img_tag = element.find('div', 'col-xs-5 col-sm-4 col-md-4').find('div', 'imagecontainer').find('div', 'imageinner')
          image = 'https:' + img_tag.find('a').find('img').attrs['src']

          text_tag = element.find('div', 'col-xs-7 col-sm-8 col-md-8')
          last_location = text_tag.find('div', 'location').text
          if last_location == None: last_location = 'Levandovka'
          description = text_tag.find('div', 'description').text
          if description == None: description = 'No description today'
          name = NAMES[random.randint(0,9)]
          fame = random.randint(0,10)
          prize = random.randint(0, 9999)*10

          item = Pet(postedBy='me',description=description,last_seen_place=last_location,fame=fame,prize_for_help=prize,pet_name=name,image=image)
          item.save()