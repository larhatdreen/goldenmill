import xml.dom.minidom
import os
import re

def fix_xml_file(filename):
    try:
        # Читаем файл
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Удаляем лишние пробелы и переносы строк
        content = re.sub(r'\s+', ' ', content)
        content = re.sub(r'>\s+<', '><', content)
        
        # Заменяем неэкранированные амперсанды
        content = content.replace('& ', '&amp; ')
        
        # Парсим XML
        doc = xml.dom.minidom.parseString(content)
        
        # Форматируем и сохраняем
        pretty_xml = doc.toprettyxml(indent='  ')
        # Удаляем пустые строки
        pretty_xml = '\n'.join([line for line in pretty_xml.split('\n') if line.strip()])
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(pretty_xml)
        
        print(f"Successfully fixed {filename}")
    except Exception as e:
        print(f"Error processing {filename}: {str(e)}")

# Исправляем все sitemap файлы
files = ['public/sitemap.xml', 'public/sitemap_de.xml', 'public/sitemap_en.xml']
for file in files:
    fix_xml_file(file) 