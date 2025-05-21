import xml.dom.minidom
import sys

def format_xml_file(input_file):
    try:
        doc = xml.dom.minidom.parse(input_file)
        formatted_xml = doc.toprettyxml(indent='  ')
        with open(input_file, 'w', encoding='utf-8') as f:
            f.write(formatted_xml)
        print(f"Successfully formatted {input_file}")
    except Exception as e:
        print(f"Error formatting {input_file}: {str(e)}")

if __name__ == "__main__":
    files = [
        "public/sitemap.xml",
        "public/sitemap_de.xml",
        "public/sitemap_en.xml"
    ]
    for file in files:
        format_xml_file(file) 