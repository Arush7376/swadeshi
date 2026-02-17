// src/config/database.js
// Lightweight in-memory store so the app can run without external DB setup.

const users = [];
const destinations = [
  {
    id: 1,
    title: 'Rishikesh',
    region: 'North',
    description: 'Yoga, Ganga ghats, and adventure sports.',
    coordinates: null
  },
  {
    id: 2,
    title: 'Hampi',
    region: 'South',
    description: 'Ancient ruins and unique boulder landscapes.',
    coordinates: null
  },
  {
    id: 3,
    title: 'Puri',
    region: 'East',
    description: 'Coastal spirituality, temples, and local cuisine.',
    coordinates: null
  }
];
const products = [
  { id: 1, title: 'Handloom Shawl', price: 899, vendor: 'Artisan Co.' },
  { id: 2, title: 'Terracotta Set', price: 499, vendor: 'ClayWorks' },
  { id: 3, title: 'Spice Box', price: 299, vendor: 'TasteLocal' }
];

let userIdCounter = 1;
let destinationIdCounter = destinations.length + 1;
let productIdCounter = products.length + 1;

const User = {
  async findOne({ where }) {
    if (where && where.email) {
      return users.find((u) => u.email === where.email) || null;
    }
    if (where && where.id) {
      return users.find((u) => u.id === Number(where.id)) || null;
    }
    return null;
  },

  async create(payload) {
    const user = {
      id: userIdCounter++,
      name: payload.name,
      email: payload.email,
      password_hash: payload.password_hash,
      role: payload.role || 'tourist',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    users.push(user);
    return user;
  }
};

const Destination = {
  async findAll({ attributes } = {}) {
    if (!attributes || attributes.length === 0) {
      return destinations;
    }

    return destinations.map((d) => {
      const row = {};
      for (const key of attributes) {
        row[key] = d[key];
      }
      return row;
    });
  },

  async findByPk(id) {
    return destinations.find((d) => d.id === Number(id)) || null;
  },

  async create(payload) {
    const destination = {
      id: destinationIdCounter++,
      title: payload.title,
      description: payload.description,
      region: payload.region,
      coordinates: payload.coordinates || null
    };
    destinations.push(destination);
    return destination;
  }
};

const Product = {
  async findAll() {
    return products;
  },

  async create(payload) {
    const product = {
      id: productIdCounter++,
      title: payload.title,
      price: Number(payload.price || 0),
      vendor: payload.vendor || 'Local Seller'
    };
    products.push(product);
    return product;
  }
};

module.exports = {
  sequelize: {
    sync: async () => true
  },
  Sequelize: {},
  User,
  Destination,
  Product
};
