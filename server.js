const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();

app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));
app.get('/login.html', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));
app.get('/register.html', (req, res) => res.sendFile(path.join(__dirname, 'register.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.post('/save-database', async (req, res) => {
     try {
          const dataPath = path.join(__dirname, 'data.json');
          try {
               await fs.access(dataPath);
          } catch {
               await fs.writeFile(dataPath, '[]');
               console.log('data.json oluşturuldu');
          }
          await fs.writeFile(dataPath, JSON.stringify(req.body, null, 2));
          console.log('Veri tabanı sunucuda kaydedildi');
          res.json({ status: 'success' });
     } catch (err) {
          console.error('Veri tabanı kaydetme hatası:', err);
          res.status(500).json({ error: 'Veri tabanı kaydedilemedi: ' + err.message });
     }
});

app.post('/register-user', async (req, res) => {
     try {
          const { username, password } = req.body;
          if (!username || !password) {
               return res.status(400).json({ error: 'Kullanıcı adı ve şifre gerekli.' });
          }
          if (username.length < 3 || username.length > 20) {
               return res.status(400).json({ error: 'Kullanıcı adı 3-20 karakter olmalı.' });
          }
          if (password.length < 6) {
               return res.status(400).json({ error: 'Şifre en az 6 karakter olmalı.' });
          }
          
          const usersPath = path.join(__dirname, 'users.json');
          let users = [];
          try {
               await fs.access(usersPath);
               const data = await fs.readFile(usersPath, 'utf8');
               users = JSON.parse(data);
               if (!Array.isArray(users)) {
                    console.warn('users.json bozuk, sıfırlanıyor');
                    users = [];
               }
          } catch (err) {
               console.log('users.json bulunamadı, oluşturuluyor');
               await fs.writeFile(usersPath, '[]');
          }
          
          if (users.find(user => user.username === username)) {
               return res.status(400).json({ error: 'Kullanıcı adı zaten mevcut.' });
          }
          
          const hashedPassword = await bcrypt.hash(password, 10);
          users.push({ username, password: hashedPassword });
          try {
               await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
               console.log(`Kullanıcı kaydedildi: ${username}`);
               res.json({ status: 'success' });
          } catch (writeErr) {
               console.error('users.json yazma hatası:', writeErr);
               return res.status(500).json({ error: 'Kullanıcı kaydedilemedi: Dosya yazma hatası.' });
          }
     } catch (err) {
          console.error('Kullanıcı kayıt hatası:', err);
          res.status(500).json({ error: 'Kullanıcı kaydedilemedi: ' + err.message });
     }
});

app.post('/login-user', async (req, res) => {
     try {
          const { username, password } = req.body;
          if (!username || !password) {
               return res.status(400).json({ error: 'Kullanıcı adı ve şifre gerekli.' });
          }
          
          const usersPath = path.join(__dirname, 'users.json');
          let users = [];
          try {
               const data = await fs.readFile(usersPath, 'utf8');
               users = JSON.parse(data);
          } catch {
               return res.status(400).json({ error: 'Kullanıcı veritabanı bulunamadı.' });
          }
          
          const user = users.find(user => user.username === username);
          if (!user) {
               return res.status(400).json({ error: 'Kullanıcı bulunamadı.' });
          }
          
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
               return res.status(400).json({ error: 'Geçersiz şifre.' });
          }
          
          const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
          console.log(`Kullanıcı giriş yaptı: ${username}`);
          res.json({ status: 'success', token });
     } catch (err) {
          console.error('Giriş hatası:', err);
          res.status(500).json({ error: 'Giriş başarısız: ' + err.message });
     }
});

app.post('/verify-token', async (req, res) => {
     try {
          const { token } = req.body;
          if (!token) {
               return res.status(400).json({ error: 'Token gerekli.' });
          }
          
          const [username] = Buffer.from(token, 'base64').toString().split(':');
          const usersPath = path.join(__dirname, 'users.json');
          let users = [];
          try {
               const data = await fs.readFile(usersPath, 'utf8');
               users = JSON.parse(data);
          } catch {
               return res.status(400).json({ error: 'Kullanıcı veritabanı bulunamadı.' });
          }
          
          const user = users.find(user => user.username === username);
          if (!user) {
               return res.status(400).json({ error: 'Geçersiz token.' });
          }
          
          res.json({ status: 'success' });
     } catch (err) {
          console.error('Token doğrulama hatası:', err);
          res.status(500).json({ error: 'Token doğrulama başarısız: ' + err.message });
     }
});

app.listen(3000, () => console.log('Sunucu http://localhost:3000 adresinde çalışıyor'));