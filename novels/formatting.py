import re

p = open('基督山伯爵-processed.txt', 'w', encoding='utf-8')

f = open('基督山伯爵.txt', 'r', encoding='utf-8')
for line in f.readlines():
    text = re.sub('\n','',line)
    text = text.strip()
    text = re.sub('伊夫堡','<span class="item-touch" id="Chateau-dIf">伊夫堡</span>',text)
    text = re.sub('法老号','<span class="item-touch" id="Pharaoh">法老号</span>',text)
    text = re.sub('主桅帆','<span class="item-touch" id="mainmast">主桅帆</span>',text)
    text = re.sub('大三角帆','<span class="item-touch" id="lateen">大三角帆</span>',text)
    text = re.sub('唐太斯','<span class="item-touch" id="Dantes">唐太斯</span>',text)
    text = re.sub('爱德蒙','<span class="item-touch" id="Dantes">爱德蒙</span>',text)

    if text != '':
      p.write('<p>'+ text +'</p>'+'\n'+'<br/>'+'\n')
f.close