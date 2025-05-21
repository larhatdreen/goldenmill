#!/bin/bash

echo "Starting language version check..."
echo "----------------------------------------"

# Base URL
BASE_URL="http://localhost:3000"

# Languages
LANGUAGES=("" "de" "en" "ru")

# Pages to check
PAGES=(
    "/"
    "/granulator"
    "/mixer"
    "/spare-parts"
    "/about"
    "/contacts"
    "/service-information"
    "/privacy-policy"
)

# Check each language version
for lang in "${LANGUAGES[@]}"; do
    lang_prefix=${lang:+$lang/}
    for page in "${PAGES[@]}"; do
        url="${BASE_URL}/${lang_prefix}${page#/}"
        echo "Checking $url"
        if curl -s -f "$url" > /dev/null; then
            echo "✓ Page exists"
            # Check for language-specific meta tags
            if curl -s "$url" | grep -q "lang=\"${lang:-en}\""; then
                echo "✓ Correct language tag"
            else
                echo "✗ Missing or incorrect language tag"
            fi
            # Check for hreflang tags
            if curl -s "$url" | grep -q "hreflang=\"${lang:-en}\""; then
                echo "✓ Has hreflang tag"
            else
                echo "✗ Missing hreflang tag"
            fi
        else
            echo "✗ Page not found"
        fi
        echo "----------------------------------------"
    done
done 