#!/bin/bash

echo "Starting sitemap validation..."
echo "----------------------------------------"

# Check sitemap files
for sitemap in "../public/sitemap.xml.new" "../public/sitemap_index.xml.new" "../public/sitemap_de.xml.new" "../public/sitemap_en.xml.new" "../public/sitemap_ru.xml.new" "../public/products_sitemap.xml.new"; do
    echo "Checking $(basename $sitemap)..."
    if [ -f "$sitemap" ]; then
        echo "✓ File exists"
        if xmllint --noout "$sitemap" 2>/dev/null; then
            echo "✓ Valid XML"
        else
            echo "✗ Invalid XML"
        fi
    else
        echo "✗ File not found"
    fi
    echo "----------------------------------------"
done

# Check sitemap structure
echo "Checking sitemap structure..."
for sitemap in "../public/sitemap.xml" "../public/sitemap_index.xml" "../public/sitemap_de.xml" "../public/sitemap_en.xml" "../public/sitemap_ru.xml" "../public/products_sitemap.xml"; do
    if [ -f "$sitemap" ]; then
        if grep -q "<urlset" "$sitemap" || grep -q "<sitemapindex" "$sitemap"; then
            echo "✓ Valid sitemap structure in $(basename $sitemap)"
        else
            echo "✗ Invalid sitemap structure in $(basename $sitemap)"
        fi
    fi
done 