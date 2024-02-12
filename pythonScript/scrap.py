import requests
from bs4 import BeautifulSoup
from time import sleep
from pymongo import MongoClient
client = MongoClient('mongodb+srv://chaen328:scrumproject1@cluster0.coq8qi7.mongodb.net/?retryWrites=true&w=majority')
db = client.test

base_url = "https://www.khu.ac.kr/kor/notice/list.do"
start_page = 20
end_page = 11
for page in range(start_page, end_page-1, -1):
    url = f"{base_url}?page={page}&category=SCHOLARSHIP"
    html = requests.get(url).text
    soup = BeautifulSoup(html, "lxml")
    tags = soup.select("table tbody tr")
    itemlist = []
    for tag in tags:
        a_tag = tag.find('a')
        category = a_tag.find('span').text.strip()
        href = a_tag.get('href')
        link = 'https://www.khu.ac.kr/kor/notice/'+href
        writer = tag.find('td', class_='col03').text.strip()
        date = tag.find('td', class_='col04').text.strip()
        html2 = requests.get(link).text
        soup2 = BeautifulSoup(html2, "lxml")
        content = soup2.find_all('div', class_='row contents clearfix')
        for item in content:
            images = item.find_all('img')
            if images:
                for img in images:
                    if 'src' in img.attrs:
                        img['src'] = 'http://www.khu.ac.kr' + img['src']
        title = soup2.find('div', class_='tit').find('p').text
        file = soup2.find('div', class_='row addFile clearfix').find('a')
        if file==None:
            file=""
            fileName = ""
        else:
            fileName =file.find('p').text
            file = file.get('href')
            file = "https://www.khu.ac.kr"+file
        item = {
            'category': category,
            'title': title,
            'link': link,
            'writer': writer,
            'date': date,
            'content': str(content),
            'file' : file,
            'fileName' : fileName
        }
        itemlist.append(item)
    itemlist.reverse()
    db.scholarship.insert_many(itemlist)
    print(page)