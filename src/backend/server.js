const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect('mongodb://localhost:27017/cakewebsite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Kết nối MongoDB thành công!'))
.catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  summary: String,
  category: String,
  image_url: String,
  audioTestUrl: String,
  fileUrl: String,
  created_at: { type: Date, default: Date.now }
});
const Post = mongoose.model('Post', postSchema);

const registerSchema = new mongoose.Schema({
  full_name: String,
  gender: String,
  birthDate: String,
  birthPlace: String,
  address: String,
  phone: String,
  email: String,
  facebook: String,
  school: String,
  course: String,
  studyTime: String,
  testDate: String,
  startDate: String,
  referral: String,
  created_at: { type: Date, default: Date.now }
});
const RegisterForm = mongoose.model('RegisterForm', registerSchema);

const contactSchema = new mongoose.Schema({
  Name: String,
  Phone: String,
  Facebook: String,
  Email: String,
  Message: String,
  CreatedAt: { type: Date, default: Date.now }
});
const ContactMessage = mongoose.model('ContactMessage', contactSchema);

const introduceSchema = new mongoose.Schema({
  content: String,
  created_at: { type: Date, default: Date.now }
});
const Introduce = mongoose.model('Introduce', introduceSchema);

const schoolSystemSchema = new mongoose.Schema({
  title: String,
  content: String,
  summary: String,
  category: String,
  image_url: String,
  created_at: { type: Date, default: Date.now }
});
const SchoolSystem = mongoose.model('SchoolSystem', schoolSystemSchema);

const eventSchema = new mongoose.Schema({
  title: String,
  content: String,
  summary: String,
  image_url: String,
  created_at: { type: Date, default: Date.now }
});
const Event = mongoose.model('Event', eventSchema);

const ieltsSchema = new mongoose.Schema({
  title: String,
  content: String,
  summary: String,
  category: String,
  image_url: String,
  created_at: { type: Date, default: Date.now }
});
const IELTSJourney = mongoose.model('IELTSJourney', ieltsSchema);

const studyAbroadSchema = new mongoose.Schema({
  title: String,
  content: String,
  summary: String,
  category: String,
  image_url: String,
  created_at: { type: Date, default: Date.now }
});
const StudyAbroad = mongoose.model('StudyAbroad', studyAbroadSchema);

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ created_at: -1 });
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
    const regs = await RegisterForm.find().sort({ created_at: -1 });
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đăng ký!' });
  }
});

app.delete('/api/register/:id', async (req, res) => {
  try {
    await RegisterForm.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xóa thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa!' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const newMsg = new ContactMessage(req.body);
    await newMsg.save();
    res.status(201).json({ message: 'Gửi liên hệ thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi gửi liên hệ!' });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ CreatedAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy tin nhắn!' });
  }
});

app.delete('/api/contact/:id', async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xóa thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa!' });
  }
});

app.get('/api/introduce', async (req, res) => {
  try {
    const intro = await Introduce.find().sort({ created_at: -1 });
    res.json(intro);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin giới thiệu!' });
  }
});

app.post('/api/introduce', async (req, res) => {
  try {
    const newIntro = new Introduce(req.body);
    await newIntro.save();
    res.status(201).json({ message: 'Thêm thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi thêm!' });
  }
});

app.delete('/api/introduce/:id', async (req, res) => {
  try {
    await Introduce.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xóa thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa!' });
  }
});

app.get('/api/schoolsystem', async (req, res) => {
  try {
    const schools = await SchoolSystem.find().sort({ created_at: -1 });
    res.json(schools);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu!' });
  }
});

app.post('/api/schoolsystem', async (req, res) => {
  try {
    const newSchool = new SchoolSystem(req.body);
    await newSchool.save();
    res.status(201).json({ message: 'Thêm thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi thêm!' });
  }
});

app.delete('/api/schoolsystem/:id', async (req, res) => {
  try {
    await SchoolSystem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xóa thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa!' });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ created_at: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy sự kiện!' });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json({ message: 'Thêm thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi thêm!' });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xóa thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa!' });
  }
});

app.get('/api/ielts', async (req, res) => {
  try {
    const journey = await IELTSJourney.find().sort({ created_at: -1 });
    res.json(journey);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy lộ trình IELTS!' });
  }
});

app.post('/api/ielts', async (req, res) => {
  try {
    const newJourney = new IELTSJourney(req.body);
    await newJourney.save();
    res.status(201).json({ message: 'Thêm thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi thêm!' });
  }
});

app.delete('/api/ielts/:id', async (req, res) => {
  try {
    await IELTSJourney.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xóa thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa!' });
  }
});

app.get('/api/studyabroad', async (req, res) => {
  try {
    const abroad = await StudyAbroad.find().sort({ created_at: -1 });
    res.json(abroad);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin du học!' });
  }
});

app.post('/api/studyabroad', async (req, res) => {
  try {
    const newAbroad = new StudyAbroad(req.body);
    await newAbroad.save();
    res.status(201).json({ message: 'Thêm thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi thêm!' });
  }
});

app.delete('/api/studyabroad/:id', async (req, res) => {
  try {
    await StudyAbroad.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xóa thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa!' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});