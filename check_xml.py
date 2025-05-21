import xml.etree.ElementTree as ET
import sys

def check_xml_file(filename):
    try:
        # Пытаемся распарсить XML
        tree = ET.parse(filename)
        root = tree.getroot()
        print(f"✓ {filename} is valid XML")
        return True
    except ET.ParseError as e:
        print(f"✗ {filename} has invalid XML: {str(e)}")
        return False

# Проверяем все sitemap файлы
files = ['public/sitemap.xml', 'public/sitemap_de.xml', 'public/sitemap_en.xml', 'public/sitemap_ru.xml']
all_valid = True

for file in files:
    if not check_xml_file(file):
        all_valid = False

sys.exit(0 if all_valid else 1) 