const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const i18next = require('i18next');
const fs = require('fs');
require('dotenv').config();

// Импортируем middleware для статических файлов
const { staticFileMiddleware, optimizeImage } = require('./staticFileMiddleware');

const prisma = new PrismaClient();
const app = express();
const port = 3002;
const host = '0.0.0.0';

// Resolve paths relative to server directory
const SERVER_DIR = __dirname;
const PUBLIC_DIR = path.join(SERVER_DIR, 'public');
const PRODUCTS_DIR = path.join(PUBLIC_DIR, 'img', 'products');

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://goldenmill.de'],
  credentials: true
}));
app.use(express.json());

// Логирование всех запросов
app.use((req, res, next) => {
  console.log(`[Server] Получен запрос: ${req.method} ${req.url}`);
  next();
});

// Обработка корневого пути
app.get('/', (req, res) => {
  res.redirect('https://goldenmill.de');
});

// Применяем middleware для статических файлов
app.use(staticFileMiddleware);

// Добавляем middleware для оптимизации изображений
app.use('/img', optimizeImage);

// Обслуживаем статические файлы из директории public
app.use(express.static(PUBLIC_DIR));
app.use('/img/products', express.static(PRODUCTS_DIR));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Processing file upload:', file.fieldname);
    // Убедимся, что директория существует
    if (!fs.existsSync(PRODUCTS_DIR)) {
      fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
    }
    cb(null, PRODUCTS_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + path.extname(file.originalname);
    console.log(`Generated filename for ${file.fieldname}:`, filename);
    cb(null, filename);
  }
});

// Обновляем конфигурацию полей для загрузки файлов
const productFileFields = [
  { name: 'image', maxCount: 1 },
  { name: 'activeImage', maxCount: 1 },
  { name: 'backgroundCircle_0', maxCount: 1 },
  { name: 'backgroundCircle_1', maxCount: 1 },
  { name: 'backgroundCircle_2', maxCount: 1 },
  { name: 'backgroundCircle_3', maxCount: 1 },
  { name: 'backgroundCircle_4', maxCount: 1 },
  { name: 'backgroundCircle_5', maxCount: 1 },
  { name: 'backgroundCircle_6', maxCount: 1 },
  { name: 'backgroundCircle_7', maxCount: 1 },
  { name: 'backgroundCircle_8', maxCount: 1 },
  { name: 'backgroundCircle_9', maxCount: 1 }
];

// Конфигурация для загрузки изображений продуктов
const productUpload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 12 // Увеличиваем лимит файлов до 12 (1 основное + 1 активное + до 10 фоновых)
  },
  fileFilter: (req, file, cb) => {
    console.log('Processing file:', {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype
    });
    
    // Allow only JPEG, JPG, PNG files
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      console.log('File accepted:', file.originalname);
      return cb(null, true);
    }
    console.log('File rejected:', file.originalname);
    cb(new Error(`Only JPEG, JPG, PNG files are allowed! Field: ${file.fieldname}`));
  }
});

// Конфигурация для email-вложений
const emailUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // Создаем временную директорию, если её нет
      const tempDir = path.join(__dirname, 'temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      cb(null, tempDir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Разрешаем PDF, Word, Excel, CSV, JPG, PNG
    const allowedTypes = /pdf|doc|docx|xls|xlsx|csv|jpg|jpeg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'image/jpeg',
      'image/png'
    ];

    if (extname && mimetypes.includes(file.mimetype)) {
      return cb(null, true);
    }
    cb(new Error(`Only PDF, Word, Excel, CSV, JPG, PNG files are allowed!`));
  }
});

// Error handling middleware for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('Multer error details:', {
      code: err.code,
      field: err.field,
      message: err.message,
      storageErrors: err.storageErrors
    });
    
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        error: `File size is too large. Max size is 5MB. Field: ${err.field}`,
        field: err.field
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ 
        error: `Too many files uploaded. Field: ${err.field}`,
        field: err.field
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ 
        error: `Unexpected field: ${err.field}`,
        field: err.field
      });
    }
    return res.status(400).json({ 
      error: `${err.message}. Field: ${err.field}`,
      field: err.field
    });
  } else if (err) {
    console.error('Non-Multer error:', err);
    return res.status(500).json({ error: err.message });
  }
  next();
});

// Helper function to get client IP
function getClientIP(req) {
  const ipHeaders = [
    'x-client-ip',
    'x-forwarded-for',
    'cf-connecting-ip',
    'fastly-client-ip',
    'x-real-ip',
    'x-cluster-client-ip',
    'x-forwarded',
    'forwarded-for',
    'forwarded'
  ];

  for (const header of ipHeaders) {
    const value = req.headers[header];
    if (value) {
      const ipList = value.split(',');
      const ip = ipList[0].trim();
      if (ip) {
        return ip;
      }
    }
  }

  const remoteAddress = req.connection?.remoteAddress ||
                       req.socket?.remoteAddress ||
                       req.connection?.socket?.remoteAddress;

  if (remoteAddress) {
    return remoteAddress.replace(/^::ffff:/, '');
  }

  return 'Неизвестный IP';
}

// API Routes
app.get('/api/products', async (req, res) => {
  try {
    const { category, search, application, granulation, type } = req.query;
    
    console.log('Received query params:', req.query);
    
    const where = {};
    
    if (category) {
      const categories = category.split(',').map(v => v.trim()).filter(Boolean);
      if (categories.length > 0) {
        where.category = { in: categories };
      }
    }
    
    if (application) {
      const applicationValues = application.split(',').map(v => v.trim()).filter(Boolean);
      console.log('Filtering by applications:', applicationValues);
      if (applicationValues.length > 0) {
        where.application = {
          hasSome: applicationValues // Using hasSome to match any of the selected values
        };
      }
    }
    
    if (granulation) {
      const granulationValues = granulation.split(',').map(v => v.trim()).filter(Boolean);
      console.log('Filtering by granulations:', granulationValues);
      if (granulationValues.length > 0) {
        where.granulation = {
          hasSome: granulationValues // Using hasSome to match any of the selected values
        };
      }
    }
    
    if (type) {
      const typeValues = type.split(',').map(v => v.trim()).filter(Boolean);
      console.log('Filtering by types:', typeValues);
      if (typeValues.length > 0) {
        where.type = {
          hasSome: typeValues // Using hasSome to match any of the selected values
        };
      }
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    console.log('Final where clause:', JSON.stringify(where, null, 2));
    
    const products = await prisma.product.findMany({ 
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log(`Found ${products.length} products`);
    if (products.length > 0) {
      console.log('Sample product:', {
        id: products[0].id,
        application: products[0].application,
        granulation: products[0].granulation,
        type: products[0].type
      });
    }
    
    res.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      error: 'Failed to fetch products',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? {
        stack: error.stack,
        query: req.query
      } : undefined
    });
  }
});

app.post('/api/products', productUpload.fields(productFileFields), async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      category,
      application,
      granulation,
      type,
      manufacturingSections,
      technicalTitle,
      technicalSubtitle,
      technicalDescription,
      technicalHint,
      price
    } = req.body;

    // Парсим JSON строки
    const parsedTitle = JSON.parse(title);
    const parsedSubtitle = subtitle ? JSON.parse(subtitle) : null;
    const parsedDescription = JSON.parse(description);
    const parsedApplication = application ? JSON.parse(application) : [];
    const parsedGranulation = granulation ? JSON.parse(granulation) : [];
    const parsedType = type ? JSON.parse(type) : [];
    const parsedManufacturingSections = manufacturingSections ? JSON.parse(manufacturingSections) : [];
    const parsedTechnicalTitle = technicalTitle ? JSON.parse(technicalTitle) : null;
    const parsedTechnicalSubtitle = technicalSubtitle ? JSON.parse(technicalSubtitle) : null;
    const parsedTechnicalDescription = technicalDescription ? JSON.parse(technicalDescription) : null;
    const parsedTechnicalHint = technicalHint ? JSON.parse(technicalHint) : null;

    // Обработка загруженных файлов
    const mainImagePath = req.files['image'] ? `/img/products/${req.files['image'][0].filename}` : null;
    const activeImagePath = req.files['activeImage'] ? `/img/products/${req.files['activeImage'][0].filename}` : null;
    
    // Обработка фоновых изображений для секций
    const backgroundCircleFiles = Object.entries(req.files || {})
      .filter(([key]) => key.startsWith('backgroundCircle_'))
      .sort((a, b) => {
        const indexA = parseInt(a[0].split('_')[1]);
        const indexB = parseInt(b[0].split('_')[1]);
        return indexA - indexB;
      })
      .map(([_, files]) => files[0]);
    
    // Создаем массив путей к изображениям
    const sectionImages = backgroundCircleFiles.map(file => `/img/products/${file.filename}`);
    
    // Обновляем пути к изображениям в секциях и сохраняем их в отдельном массиве
    backgroundCircleFiles.forEach((file, index) => {
      if (parsedManufacturingSections[index]) {
        parsedManufacturingSections[index].backgroundImage = `/img/products/${file.filename}`;
      }
    });

    const product = await prisma.product.create({
      data: {
        title: parsedTitle,
        subtitle: parsedSubtitle,
        description: parsedDescription,
        imageUrl: mainImagePath,
        activeImageUrl: activeImagePath,
        category,
        application: parsedApplication,
        granulation: parsedGranulation,
        type: parsedType,
        manufacturingSections: parsedManufacturingSections,
        sectionImages: sectionImages,
        technicalTitle: parsedTechnicalTitle,
        technicalSubtitle: parsedTechnicalSubtitle,
        technicalDescription: parsedTechnicalDescription,
        technicalHint: parsedTechnicalHint,
        price
      }
    });

    res.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/products/:id', productUpload.fields(productFileFields), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      subtitle,
      description,
      category,
      application,
      granulation,
      type,
      manufacturingSections,
      technicalTitle,
      technicalSubtitle,
      technicalDescription,
      technicalHint,
      price
    } = req.body;

    // Получаем текущий продукт
    const currentProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!currentProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Парсим JSON строки
    const parsedTitle = JSON.parse(title);
    const parsedSubtitle = subtitle ? JSON.parse(subtitle) : null;
    const parsedDescription = JSON.parse(description);
    const parsedApplication = application ? JSON.parse(application) : [];
    const parsedGranulation = granulation ? JSON.parse(granulation) : [];
    const parsedType = type ? JSON.parse(type) : [];
    const parsedManufacturingSections = manufacturingSections ? JSON.parse(manufacturingSections) : [];
    const parsedTechnicalTitle = technicalTitle ? JSON.parse(technicalTitle) : null;
    const parsedTechnicalSubtitle = technicalSubtitle ? JSON.parse(technicalSubtitle) : null;
    const parsedTechnicalDescription = technicalDescription ? JSON.parse(technicalDescription) : null;
    const parsedTechnicalHint = technicalHint ? JSON.parse(technicalHint) : null;

    // Обработка загруженных файлов
    const mainImagePath = req.files['image'] ? `/img/products/${req.files['image'][0].filename}` : currentProduct.imageUrl;
    const activeImagePath = req.files['activeImage'] ? `/img/products/${req.files['activeImage'][0].filename}` : currentProduct.activeImageUrl;
    
    // Обработка фоновых изображений для секций
    const backgroundCircleFiles = Object.entries(req.files || {})
      .filter(([key]) => key.startsWith('backgroundCircle_'))
      .sort((a, b) => {
        const indexA = parseInt(a[0].split('_')[1]);
        const indexB = parseInt(b[0].split('_')[1]);
        return indexA - indexB;
      })
      .map(([_, files]) => files[0]);
    
    // Создаем массив путей к изображениям
    const sectionImages = backgroundCircleFiles.map(file => `/img/products/${file.filename}`);
    
    // Обновляем пути к изображениям в секциях и сохраняем их в отдельном массиве
    backgroundCircleFiles.forEach((file, index) => {
      if (parsedManufacturingSections[index]) {
        parsedManufacturingSections[index].backgroundImage = `/img/products/${file.filename}`;
      }
    });

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title: parsedTitle,
        subtitle: parsedSubtitle,
        description: parsedDescription,
        imageUrl: mainImagePath,
        activeImageUrl: activeImagePath,
        category,
        application: parsedApplication,
        granulation: parsedGranulation,
        type: parsedType,
        manufacturingSections: parsedManufacturingSections,
        sectionImages: sectionImages,
        technicalTitle: parsedTechnicalTitle,
        technicalSubtitle: parsedTechnicalSubtitle,
        technicalDescription: parsedTechnicalDescription,
        technicalHint: parsedTechnicalHint,
        price
      }
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('\n=== Product Request Details ===');
    console.log('Fetching product with id:', id);
    
    const product = await prisma.product.findUnique({
      where: { id }
    });
    
    if (!product) {
      console.log('Product not found with id:', id);
      return res.status(404).json({ error: 'Product not found' });
    }
    
    console.log('\nProduct Data from Database:');
    console.log('- ID:', product.id);
    console.log('- Title:', product.title);
    console.log('- Image URL:', product.imageUrl);
    console.log('- Active Image URL:', product.activeImageUrl);
    console.log('- Background Circle Image:', product.backgroundCircleImage);
    console.log('\nFull product data:', JSON.stringify(product, null, 2));
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Auth endpoints
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await prisma.user.findUnique({ 
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
        role: true,
        lastLogin: true
      }
    });
    
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }
    
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });
    
    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Users API endpoints
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        lastLogin: true
      }
    });
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    
    if (!username || !password || !email || !role) {
      return res.status(400).json({ error: 'Отсутствуют обязательные поля' });
    }
    
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь с таким именем уже существует' });
    }
    
    const user = await prisma.user.create({
      data: {
        username,
        password,
        email,
        role,
        lastLogin: new Date()
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        lastLogin: true
      }
    });
    
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email, role } = req.body;
    
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    if (username && username !== user.username) {
      const existingUser = await prisma.user.findUnique({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: 'Пользователь с таким именем уже существует' });
      }
    }
    
    const updateData = {
      username: username || user.username,
      email: email || user.email,
      role: role || user.role
    };
    
    if (password) {
      updateData.password = password;
    }
    
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        lastLogin: true
      }
    });
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    if (user.username === 'admin') {
      return res.status(403).json({ error: 'Невозможно удалить главного администратора' });
    }
    
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Logs API endpoints
app.get('/api/logs', async (req, res) => {
  try {
    const { type, search, limit = 20, offset = 0 } = req.query;
    
    const where = {};
    if (type) where.type = type;
    if (search) {
      where.OR = [
        { message: { contains: search, mode: 'insensitive' } },
        { user: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    const [logs, total] = await Promise.all([
      prisma.log.findMany({
        where,
        take: Number(limit),
        skip: Number(offset),
        orderBy: { timestamp: 'desc' }
      }),
      prisma.log.count({ where })
    ]);
    
    res.json({ logs, total });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

app.delete('/api/logs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const log = await prisma.log.findUnique({ where: { id } });
    if (!log) {
      return res.status(404).json({ error: 'Лог не найден' });
    }
    
    await prisma.log.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting log:', error);
    res.status(500).json({ error: 'Failed to delete log' });
  }
});

// Cookie consent logging endpoint
app.post('/api/logs/cookie', async (req, res) => {
  try {
    const { 
      action, 
      preferences, 
      user = 'anonymous',
      device = {},
      location = {},
      publicIP
    } = req.body;
    
    const message = `Пользователь ${action === 'accept' ? 'принял' : 'отклонил'} использование cookies\n\n\n` +
      `Настройки cookie:\n` +
      `     Необходимые: ${preferences.necessary ? 'Да' : 'Нет'}\n\n` +
      `     Аналитика: ${preferences.analytics ? 'Да' : 'Нет'}\n\n` +
      `     Маркетинг: ${preferences.marketing ? 'Да' : 'Нет'}\n\n` +
      `     Функциональные: ${preferences.functional ? 'Да' : 'Нет'}\n\n` +
      `     Геолокация: ${preferences.geolocation ? 'Да' : 'Нет'}\n\n\n` +
      `Информация об устройстве:\n` +
      `     Тип: ${device.type}\n\n` +
      `     ОС: ${device.os}\n\n` +
      `     Браузер: ${device.browser}\n\n\n` +
      `Местоположение:\n` +
      `     Город: ${location.city}\n\n` +
      `     Страна: ${location.country}`;
    
    const ip = publicIP || getClientIP(req);
    
    const log = await prisma.log.create({
      data: {
        type: 'cookie',
        timestamp: new Date(),
        message,
        user,
        ip,
        metadata: {
          preferences,
          action,
          device,
          location,
          ip
        }
      }
    });
    
    res.json(log);
  } catch (error) {
    console.error('Error logging cookie consent:', error);
    res.status(500).json({ error: 'Failed to log cookie consent' });
  }
});

// Инициализация i18next
i18next.init({
  fallbackLng: 'ru',
  resources: {
    ru: {
      translation: require('./locales/ru/email.json')
    },
    en: {
      translation: require('./locales/en/email.json')
    },
    de: {
      translation: require('./locales/de/email.json')
    }
  },
  interpolation: {
    escapeValue: false
  }
});

// Email route handler
app.post('/api/send-email', express.json(), emailUpload.single('upload'), async (req, res) => {
  try {
    console.log('Received email request body:', req.body);
    console.log('Received file:', req.file);
    console.log('Headers:', req.headers);
    
    const { name, email, message, html, subject } = req.body;
    const lang = req.headers['accept-language'] || 'ru';
    
    // Устанавливаем язык для текущего запроса
    i18next.changeLanguage(lang);

    if (!email) {
      console.error('No email address provided');
      return res.status(400).json({ 
        success: false, 
        message: 'Email address is required' 
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    
    // Verify SMTP connection configuration
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (error) {
      console.error('SMTP connection verification failed:', error);
      throw error;
    }
    
    // Заменяем ключи локализации на переведенные значения
    let localizedHtml = html;

    // Заменяем все ключи вида ${t('emailContent.X')}
    const emailContentRegex = /\${t\('emailContent\.[^']+'\)}/g;
    localizedHtml = localizedHtml.replace(emailContentRegex, (match) => {
      const key = match.match(/emailContent\.[^']+/)[0];
      return i18next.t(key, { lng: lang });
    });

    // Заменяем все ключи вида ${t('products.X')}
    const productsRegex = /\${t\('products\.[^']+'\)}/g;
    localizedHtml = localizedHtml.replace(productsRegex, (match) => {
      const key = match.match(/products\.[^']+/)[0];
      return i18next.t(key, { lng: lang });
    });

    // Заменяем прямые ключи (без ${t()})
    const directKeysRegex = /\${t\('([^']+)'\)}/g;
    localizedHtml = localizedHtml.replace(directKeysRegex, (match, key) => {
      return i18next.t(key, { lng: lang });
    });

    // Заменяем слово "Страна" на перевод (если оно всё ещё осталось)
    localizedHtml = localizedHtml.replace(/Страна:/g, `${i18next.t('emailContent.country', { lng: lang })}:`);

    // Send email
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: i18next.t(subject, { lng: lang }),
      text: message,
      html: localizedHtml,
      attachments: req.file ? [
        {
          filename: req.file.originalname,
          path: req.file.path
        }
      ] : undefined
    };

    console.log('Sending email with options:', mailOptions);

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);

    // Удаляем временный файл после отправки
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting temporary file:', err);
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Initialize and start server
async function start() {
  try {
    // Проверяем наличие необходимых директорий
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
      console.log(`Created directory: ${PUBLIC_DIR}`);
    }
    if (!fs.existsSync(PRODUCTS_DIR)) {
      fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
      console.log(`Created directory: ${PRODUCTS_DIR}`);
    }

    app.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
      console.log(`Public directory: ${PUBLIC_DIR}`);
      console.log(`Products directory: ${PRODUCTS_DIR}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start(); 