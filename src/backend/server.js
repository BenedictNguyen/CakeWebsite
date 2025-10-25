// === IMPORT THƯ VIỆN ===
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// === KHỞI TẠO APP ===
const app = express();
const PORT = process.env.PORT || 5000;

// === MIDDLEWARE ===
app.use(cors());
app.use(express.json());

// === KẾT NỐI MONGODB ===
mongoose.connect('mongodb://localhost:27017/cakewebsite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Kết nối MongoDB thành công!'))
.catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

// === ĐỊNH NGHĨA SCHEMA ===

// Bài viết (Posts)
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  summary: String,
  category: String,
  image_url: String,
  createdAt: { type: Date, default: Date.now }
});
const Post = mongoose.model('Post', postSchema);

// Đăng ký form (Register)
const registerSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const RegisterForm = mongoose.model('RegisterForm', registerSchema);

// Liên hệ (Contact)
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const ContactMessage = mongoose.model('ContactMessage', contactSchema);

// Giới thiệu (Introduce)
const introduceSchema = new mongoose.Schema({
  title: String,
  content: String,
  image_url: String,
});
const Introduce = mongoose.model('Introduce', introduceSchema);

// Thông tin du học
const abroadSchema = new mongoose.Schema({
  country: String,
  description: String,
  image_url: String,
});
const StudyAbroad = mongoose.model('StudyAbroad', abroadSchema);

// Sự kiện
const eventSchema = new mongoose.Schema({
  title: String,
  content: String,
  image_url: String,
  event_date: String,
});
const Event = mongoose.model('Event', eventSchema);

// Lộ trình IELTS
const ieltsSchema = new mongoose.Schema({
  level: String,
  description: String,
  image_url: String,
});
const IELTSJourney = mongoose.model('IELTSJourney', ieltsSchema);

// === ROUTES API ===

// --- POSTs ---
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách bài viết!' });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json({ message: 'Thêm bài viết thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi thêm bài viết!' });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Cập nhật bài viết thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật bài viết!' });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xóa bài viết thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa bài viết!' });
  }
});

// --- REGISTER FORM ---
app.post('/api/register', async (req, res) => {
  try {
    const newReg = new RegisterForm(req.body);
    await newReg.save();
    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi gửi thông tin đăng ký!' });
  }
});

app.get('/api/register', async (req, res) => {
  try {
    const regs = await RegisterForm.find().sort({ createdAt: -1 });
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đăng ký!' });
  }
});

// --- CONTACT MESSAGES ---
app.post('/api/contact', async (req, res) => {
  try {
    const newMsg = new ContactMessage(req.body);
    await newMsg.save();
    res.status(201).json({ message: 'Gửi liên hệ thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi gửi liên hệ!' });
  }
});

// --- INTRODUCE ---
app.get('/api/introduce', async (req, res) => {
  try {
    const intro = await Introduce.find();
    res.json(intro);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin giới thiệu!' });
  }
});

// --- STUDY ABROAD ---
app.get('/api/studyabroad', async (req, res) => {
  try {
    const abroad = await StudyAbroad.find();
    res.json(abroad);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin du học!' });
  }
});

// --- EVENTS ---
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ event_date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy sự kiện!' });
  }
});

// --- IELTS JOURNEY ---
app.get('/api/ielts', async (req, res) => {
  try {
    const journey = await IELTSJourney.find();
    res.json(journey);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy lộ trình IELTS!' });
  }
});

// === KHỞI ĐỘNG SERVER ===
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
