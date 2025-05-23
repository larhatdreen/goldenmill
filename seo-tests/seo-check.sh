#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Конфигурация
TEST_PORT=3000
PROJECT_URL="http://localhost:$TEST_PORT"
REPORT_DIR="seo-reports"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
REPORT_FILE="$REPORT_DIR/seo-report-$TIMESTAMP.md"
YARN_GLOBAL_DIR=$(yarn global dir)
YARN_GLOBAL_BIN=$(yarn global bin)
PATH="$YARN_GLOBAL_BIN:$PATH"
MAX_RETRIES=15
RETRY_INTERVAL=2

# Функция для логирования
log() {
    echo -e "${2:-$NC}$1${NC}"
}

# Функция для проверки доступности URL
check_url_availability() {
    local url=$1
    local retries=0
    
    log "Проверка доступности $url..." "$YELLOW"
    
    while [ $retries -lt $MAX_RETRIES ]; do
        if curl -s -f "$url" > /dev/null; then
            log "✅ URL $url доступен" "$GREEN"
            return 0
        fi
        retries=$((retries + 1))
        log "Попытка $retries из $MAX_RETRIES..." "$YELLOW"
        sleep $RETRY_INTERVAL
    done
    
    log "❌ URL $url недоступен после $MAX_RETRIES попыток" "$RED"
    return 1
}

# Функция для проверки наличия необходимых инструментов
check_dependencies() {
    log "Проверка зависимостей..." "$YELLOW"
    
    # Массив зависимостей
    deps=(
        "curl:Утилита для HTTP-запросов (проверка страниц, мета-тегов, sitemap)"
        "node:Среда выполнения JavaScript (запуск проекта)"
        "yarn:Пакетный менеджер (установка зависимостей, сборка)"
        "lighthouse:Инструмент анализа производительности и SEO"
        "serve:Статический веб-сервер для тестирования"
    )
    
    local missing_deps=()
    
    # Проверка каждой зависимости
    for dep_info in "${deps[@]}"; do
        dep_name="${dep_info%%:*}"
        dep_desc="${dep_info#*:}"
        
        if [ "$dep_name" = "lighthouse" ]; then
            # Специальная проверка для lighthouse
            if [ -f "$YARN_GLOBAL_DIR/node_modules/.bin/lighthouse" ]; then
                log "✅ $dep_name установлен" "$GREEN"
            else
                missing_deps+=("$dep_name")
                log "❌ $dep_name не установлен" "$RED"
                log "   Назначение: $dep_desc" "$YELLOW"
            fi
        elif [ "$dep_name" = "serve" ]; then
            if [ -f "$YARN_GLOBAL_DIR/node_modules/.bin/serve" ]; then
                log "✅ $dep_name установлен" "$GREEN"
            else
                missing_deps+=("$dep_name")
                log "❌ $dep_name не установлен" "$RED"
                log "   Назначение: $dep_desc" "$YELLOW"
            fi
        else
            if ! command -v "$dep_name" &> /dev/null; then
                missing_deps+=("$dep_name")
                log "❌ $dep_name не установлен" "$RED"
                log "   Назначение: $dep_desc" "$YELLOW"
            else
                log "✅ $dep_name установлен" "$GREEN"
            fi
        fi
    done
    
    # Если есть отсутствующие зависимости
    if [ ${#missing_deps[@]} -ne 0 ]; then
        log "\nДля установки отсутствующих зависимостей выполните:" "$YELLOW"
        
        for dep in "${missing_deps[@]}"; do
            case $dep in
                "curl")
                    log "  - curl: обычно предустановлен в системе" "$YELLOW"
                    ;;
                "node")
                    log "  - node: установите с https://nodejs.org/" "$YELLOW"
                    ;;
                "yarn")
                    log "  - yarn: npm install -g yarn" "$YELLOW"
                    ;;
                "lighthouse")
                    log "  - lighthouse: yarn global add lighthouse" "$YELLOW"
                    ;;
                "serve")
                    log "  - serve: yarn global add serve" "$YELLOW"
                    ;;
            esac
        done
        
        exit 1
    fi
}

# Функция для развертывания проекта
deploy_project() {
    log "Развертывание проекта..." "$YELLOW"
    
    # Проверяем, существует ли директория dist
    if [ ! -d "dist" ]; then
        log "❌ Директория dist не найдена. Сначала выполните сборку проекта: yarn build" "$RED"
        exit 1
    fi
    
    # Запуск тестового сервера
    log "Запуск тестового сервера на порту $TEST_PORT..." "$YELLOW"
    "$YARN_GLOBAL_BIN/serve" -s dist -l $TEST_PORT &
    SERVER_PID=$!
    
    # Ждем запуска сервера
    if ! check_url_availability "$PROJECT_URL"; then
        log "Не удалось запустить тестовый сервер" "$RED"
        cleanup
        exit 1
    fi
}

# Функция для проверки SEO
check_seo() {
    log "Проверка SEO параметров..." "$YELLOW"
    
    # Создаем директорию для отчетов если её нет
    mkdir -p "$REPORT_DIR"
    
    # Создаем отчет
    {
        echo "# SEO отчет от $(date)"
        echo "## Основные метрики"
        echo "URL проверки: $PROJECT_URL"
        echo "Время проверки: $(date)"
        echo ""
        
        echo "## Проверка базовых мета-тегов"
        echo "### Статические мета-теги:"
        curl -s "$PROJECT_URL" | grep -i "<meta" | while read -r line; do
            echo "- $line"
        done
        echo ""
        
        echo "## Проверка заголовков"
        echo "### Структура заголовков:"
        curl -s "$PROJECT_URL" | grep -i "<h[1-6]" | while read -r line; do
            echo "- $line"
        done
        echo ""
        
        echo "## Проверка изображений"
        echo "### Найденные изображения:"
        curl -s "$PROJECT_URL" | grep -i "<img" | while read -r line; do
            echo "- $line"
        done
        echo ""
        
        echo "## Проверка многоязычности"
        echo "### Проверка sitemap для разных языков:"
        for lang in en ru de; do
            echo "#### $lang:"
            if curl -s -f "$PROJECT_URL/sitemap_${lang}.xml" > /dev/null; then
                echo "✅ sitemap_${lang}.xml доступен"
            else
                echo "❌ sitemap_${lang}.xml недоступен"
            fi
        done
        echo ""
        
        echo "## Проверка PWA"
        echo "### Проверка webmanifest:"
        if curl -s -f "$PROJECT_URL/site.webmanifest" > /dev/null; then
            echo "✅ site.webmanifest доступен"
            curl -s "$PROJECT_URL/site.webmanifest" | jq '.' 2>/dev/null || echo "Не удалось распарсить webmanifest"
        else
            echo "❌ site.webmanifest недоступен"
        fi
        echo ""
        
        echo "## Проверка производительности"
        echo "### Результаты Lighthouse:"
        lighthouse "$PROJECT_URL" --output=json --output-path="$REPORT_DIR/lighthouse-$TIMESTAMP.json" 2>/dev/null
        if [ $? -eq 0 ]; then
            echo "✅ Отчет Lighthouse сохранен в $REPORT_DIR/lighthouse-$TIMESTAMP.json"
        else
            echo "❌ Не удалось сгенерировать отчет Lighthouse"
        fi
    } > "$REPORT_FILE"
    
    log "Отчет сохранен в $REPORT_FILE" "$GREEN"
}

# Функция для очистки
cleanup() {
    log "Очистка временных файлов..." "$YELLOW"
    if [ ! -z "$SERVER_PID" ]; then
        kill $SERVER_PID
    fi
}

# Функция для очистки старых отчетов
clean_old_reports() {
    log "Очистка старых отчетов..." "$YELLOW"
    if [ -d "$REPORT_DIR" ]; then
        rm -rf "$REPORT_DIR"/*
        log "✅ Старые отчеты удалены" "$GREEN"
    else
        log "ℹ️ Директория отчетов не существует, создание новой" "$YELLOW"
    fi
}

# Основной процесс
main() {
    log "Начало проверки SEO" "$GREEN"
    
    # Очищаем старые отчеты перед началом новой проверки
    clean_old_reports
    
    check_dependencies
    deploy_project
    check_seo
    cleanup
    
    log "Проверка SEO завершена" "$GREEN"
    log "Отчет доступен в: $REPORT_FILE" "$GREEN"
}

# Запуск скрипта
main
