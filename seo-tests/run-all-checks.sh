#!/bin/bash

echo "Starting comprehensive SEO check..."
echo "----------------------------------------"

# Make all scripts executable
chmod +x check-sitemaps.sh
chmod +x check-languages.sh
chmod +x check-metadata.sh
chmod +x check-images.sh

# Run all checks
echo "Running sitemap checks..."
./check-sitemaps.sh > sitemap-report.txt

echo "Running language checks..."
./check-languages.sh > language-report.txt

echo "Running metadata checks..."
./check-metadata.sh > metadata-report.txt

echo "Running image checks..."
./check-images.sh > image-report.txt

# Generate final report
echo "Generating final report..."

# Count issues
SITEMAP_ISSUES=$(grep -c "✗" sitemap-report.txt)
LANGUAGE_ISSUES=$(grep -c "✗" language-report.txt)
METADATA_ISSUES=$(grep -c "✗" metadata-report.txt)
IMAGE_ISSUES=$(grep -c "✗" image-report.txt)
TOTAL_ISSUES=$((SITEMAP_ISSUES + LANGUAGE_ISSUES + METADATA_ISSUES + IMAGE_ISSUES))

# Count checks
SITEMAP_CHECKS=$(grep -c "Checking" sitemap-report.txt)
LANGUAGE_CHECKS=$(grep -c "Checking" language-report.txt)
METADATA_CHECKS=$(grep -c "Checking" metadata-report.txt)
IMAGE_CHECKS=$(grep -c "Checking" image-report.txt)

cat > seo-report.md << EOF
# SEO Check Report

## Sitemap Status
$(cat sitemap-report.txt)

## Language Versions
$(cat language-report.txt)

## Metadata
$(cat metadata-report.txt)

## Images
$(cat image-report.txt)

## Summary
- Sitemap files checked: $SITEMAP_CHECKS
- Language versions checked: $LANGUAGE_CHECKS
- Metadata files checked: $METADATA_CHECKS
- Images checked: $IMAGE_CHECKS

## Issues Found
$TOTAL_ISSUES issues found across all checks
- Sitemap issues: $SITEMAP_ISSUES
- Language issues: $LANGUAGE_ISSUES
- Metadata issues: $METADATA_ISSUES
- Image issues: $IMAGE_ISSUES

## Recommendations
1. Fix any missing files or invalid XML
2. Ensure all pages have proper meta tags
3. Optimize images if needed
4. Check language versions consistency
EOF

echo "Report generated: seo-report.md"
echo "----------------------------------------"
echo "Check individual reports for details:"
echo "- sitemap-report.txt"
echo "- language-report.txt"
echo "- metadata-report.txt"
echo "- image-report.txt"
echo "- seo-report.md" 