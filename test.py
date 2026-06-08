import urllib.request, re
req = urllib.request.Request('https://inamigosfoundation.org.in/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')
matches = re.findall(r'<a[^>]+href=[\"']([^\"']+about[\"']*)', html, re.IGNORECASE)
print(set(matches))
