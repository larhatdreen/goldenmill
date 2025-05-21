#!/bin/bash

echo "Starting metadata check..."
echo "----------------------------------------"

# Check robots.txt
echo "Checking robots.txt..."
if [ -f "../public/robots.txt" ]; then
    echo "✓ File exists"
    echo "Content preview:"
    head -n 5 "../public/robots.txt"
else
    echo "✗ File not found"
fi
echo "----------------------------------------"

# Check site.webmanifest
echo "Checking site.webmanifest..."
if [ -f "../public/site.webmanifest" ]; then
    echo "✓ File exists"
    if jq . "../public/site.webmanifest" >/dev/null 2>&1; then
        echo "✓ Valid JSON"
    else
        echo "✗ Invalid JSON"
    fi
else
    echo "✗ File not found"
fi
echo "----------------------------------------"

# Check icons
echo "Checking icons..."
for icon in "../public/icon.svg" "../public/logo.svg" "../public/logo_mini.svg"; do
    if [ -f "$icon" ]; then
        echo "✓ $(basename $icon) exists"
        if grep -q "<svg" "$icon"; then
            echo "✓ Valid SVG"
        else
            echo "✗ Invalid SVG"
        fi
    else
        echo "✗ $(basename $icon) not found"
    fi
done
echo "----------------------------------------"

# Check meta tags in main page
echo "Checking meta tags in main page..."
if curl -s -f "http://localhost:3000" > /dev/null; then
    echo "✓ Main page accessible"
    # Check for required meta tags
    for tag in "title" "description" "keywords" "viewport" "robots" "canonical"; do
        if curl -s "http://localhost:3000" | grep -q "<meta.*$tag"; then
            echo "✓ Has $tag meta tag"
        else
            echo "✗ Missing $tag meta tag"
        fi
    done
else
    echo "✗ Main page not accessible"
fi 