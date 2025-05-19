#!/bin/bash

# Папка поиска — только src (по твоей структуре)
SEARCH_PATHS="./src"

# --- Bebas Neue ---
find $SEARCH_PATHS -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.scss" -o -name "*.json" \) | \
xargs sed -i '' \
  -e "s/fontFamily: *['\"]BebasNeueRegular['\"]/fontFamily: 'Bebas Neue'/g" \
  -e "s/fontFamily: *['\"]BebasNeue['\"]/fontFamily: 'Bebas Neue'/g" \
  -e "s/fontFamily: *['\"]BebasNeue-Regular['\"]/fontFamily: 'Bebas Neue'/g" \
  -e "s/font-\\[\"Bebas_Neue\"\\]/font-bebas/g" \
  -e "s/font-\\['Bebas_Neue'\\]/font-bebas/g" \
  -e "s/font-\\[\\'Bebas_Neue\\'\\]/font-bebas/g" \
  -e "s/fontFamily: *['\"]Bebas Neue['\"]/fontFamily: 'Bebas Neue'/g"

# --- LabGrotesque ---
find $SEARCH_PATHS -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.scss" -o -name "*.json" \) | \
xargs sed -i '' \
  -e "s/fontFamily: *['\"]LabGrotesque-Light['\"]/fontFamily: 'LabGrotesque'/g" \
  -e "s/fontFamily: *['\"]LabGrotesque['\"]/fontFamily: 'LabGrotesque'/g"

# --- LabGrotesqueBold ---
find $SEARCH_PATHS -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.scss" -o -name "*.json" \) | \
xargs sed -i '' \
  -e "s/fontFamily: *['\"]LabGrotesque-Bold['\"]/fontFamily: 'LabGrotesqueBold'/g" \
  -e "s/fontFamily: *['\"]LabGrotesqueBold['\"]/fontFamily: 'LabGrotesqueBold'/g"

# --- AdventProRegular ---
find $SEARCH_PATHS -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.scss" -o -name "*.json" \) | \
xargs sed -i '' \
  -e "s/fontFamily: *['\"]Advent Pro['\"]/fontFamily: 'AdventProRegular'/g" \
  -e "s/fontFamily: *['\"]AdventPro-Regular['\"]/fontFamily: 'AdventProRegular'/g" \
  -e "s/fontFamily: *['\"]AdventProRegular['\"]/fontFamily: 'AdventProRegular'/g"

# --- AdventProLight ---
find $SEARCH_PATHS -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.scss" -o -name "*.json" \) | \
xargs sed -i '' \
  -e "s/fontFamily: *['\"]AdventPro-Light['\"]/fontFamily: 'AdventProLight'/g" \
  -e "s/fontFamily: *['\"]AdventProLight['\"]/fontFamily: 'AdventProLight'/g"

# --- BebasNeueLight ---
find $SEARCH_PATHS -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.scss" -o -name "*.json" \) | \
xargs sed -i '' \
  -e "s/fontFamily: *['\"]BebasNeue-Light['\"]/fontFamily: 'BebasNeueLight'/g" \
  -e "s/fontFamily: *['\"]BebasNeueLight['\"]/fontFamily: 'BebasNeueLight'/g"

# --- Tailwind классы ---
find $SEARCH_PATHS -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.scss" -o -name "*.json" \) | \
xargs sed -i '' \
  -e "s/font-\\[\"Bebas_Neue\"\\]/font-bebas/g" \
  -e "s/font-\\['Bebas_Neue'\\]/font-bebas/g" \
  -e "s/font-\\[\\'Bebas_Neue\\'\\]/font-bebas/g"

echo '✅ Массовая замена имён шрифтов завершена!'