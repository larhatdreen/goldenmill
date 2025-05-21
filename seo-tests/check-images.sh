#!/bin/bash

echo "Starting image check..."
echo "----------------------------------------"

# Function to check image
check_image() {
    local url=$1
    echo "Checking $url"
    
    # Check if image exists
    if curl -s -f -I "$url" | grep -q "image/"; then
        echo "✓ Image exists"
        # Get content type and size
        content_type=$(curl -s -I "$url" | grep -i "content-type:" | cut -d' ' -f2)
        content_length=$(curl -s -I "$url" | grep -i "content-length:" | cut -d' ' -f2)
        echo "Content type: $content_type"
        echo "Size: $((content_length/1024))KB"
        
        # Warn if image is too large
        if [ "$content_length" -gt 1048576 ]; then
            echo "⚠ Warning: Image is larger than 1MB"
        fi
    else
        echo "✗ Image not found"
    fi
    echo "----------------------------------------"
}

# Check images on main page
echo "Checking main page images..."
if curl -s -f "http://localhost:3000" > /dev/null; then
    # Extract image sources
    images=$(curl -s "http://localhost:3000" | grep -o 'src="[^"]*"' | cut -d'"' -f2)
    for img in $images; do
        if [[ $img == http* ]]; then
            check_image "$img"
        else
            check_image "http://localhost:3000$img"
        fi
    done
else
    echo "✗ Main page not accessible"
fi

# Check alt tags
echo "Checking alt tags..."
if curl -s -f "http://localhost:3000" > /dev/null; then
    images=$(curl -s "http://localhost:3000" | grep -o '<img[^>]*>')
    for img in $images; do
        if echo "$img" | grep -q 'alt="[^"]*"'; then
            echo "✓ Image has alt tag: $(echo "$img" | grep -o 'alt="[^"]*"' | cut -d'"' -f2)"
        else
            echo "✗ Image missing alt tag: $(echo "$img" | grep -o 'src="[^"]*"' | cut -d'"' -f2)"
        fi
    done
else
    echo "✗ Main page not accessible"
fi
echo "----------------------------------------"

# Check image dimensions
echo "Checking image dimensions..."
if command -v identify >/dev/null 2>&1; then
    for img in $images; do
        if [[ $img == http* ]]; then
            url=$img
        else
            url="http://localhost:3000$img"
        fi
        dimensions=$(curl -s "$url" | identify -format "%wx%h" - 2>/dev/null)
        if [ $? -eq 0 ]; then
            echo "✓ Image dimensions: $dimensions"
        else
            echo "✗ Could not get image dimensions"
        fi
    done
else
    echo "⚠ ImageMagick not installed, skipping dimension check"
fi 