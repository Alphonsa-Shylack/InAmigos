import urllib.request, re
req = urllib.request.Request('https://inamigosfoundation.org.in/', headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
html = urllib.request.urlopen(req).read().decode('utf-8')
links = re.findall(r'href=[\"']([^\"']+)[\"']', html, re.IGNORECASE)
for link in set(links):
    if 'volunteer' in link.lower() or 'team' in link.lower() or 'member' in link.lower() or 'about' in link.lower():
        print(link)
