import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Create, Delete, Print } from '@mui/icons-material';
import '../RegisterInfo/RegisterInfo.css';
import apiUrls from '../../mockAPI';
import { jsPDF } from 'jspdf';

const RegisterInfo = () => {
    const [intro, setIntro] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editPost, setEditPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIntro = async () => {
            try {
                const response = await axios.get(apiUrls.registerInfor);
                setIntro(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError('Lỗi khi lấy dữ liệu từ API. Vui lòng kiểm tra lại!');
            }
        };

        fetchIntro();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrls.registerInfor}/${id}`);
            setIntro(prevIntro => prevIntro.filter(post => post.id !== id));
            alert("Bài viết đã được xóa!");
        } catch (error) {
            console.error("Error deleting post: ", error);
            alert("Lỗi khi xóa bài viết!");
        }
    };

    const handleEdit = (post) => {
        setIsEditing(true);
        setEditPost(post);
    };

    const handleUpdate = async () => {
        if (editPost.content.trim() === "") {
            alert("Nội dung không được để trống!");
            return;
        }

        try {
            await axios.put(`${apiUrls.registerInfor}/${editPost.id}`, { content: editPost.content });
            setIntro(prevIntro => prevIntro.map(post =>
                post.id === editPost.id ? { ...post, content: editPost.content } : post
            ));
            alert("Bài viết đã được cập nhật!");
            setIsEditing(false);
            setEditPost(null);
        } catch (error) {
            console.error("Error updating post: ", error);
            alert("Lỗi khi cập nhật bài viết!");
        }
    };

    const generatePDF = (post) => {
        const doc = new jsPDF();
        doc.text('Thông tin đăng ký', 20, 10);
        doc.text(`Họ tên: ${post.full_name}`, 20, 20);
        doc.text(`Địa chỉ: ${post.address}`, 20, 30);
        doc.text(`Điện thoại: ${post.phone}`, 20, 40);
        doc.text(`Khóa học: ${post.course}`, 20, 50);
        doc.save(`registration_${post.id}.pdf`);
    };

    return (
        <div className="register-info-postList">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {isEditing ? (
                <div className="register-info-editPost">
                    <textarea
                        placeholder="Sửa bài viết..."
                        value={editPost.content}
                        onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                    />
                    <div className="register-info-buttonGroup">
                        <button onClick={handleUpdate} className="register-info-updateButton">Cập Nhật</button>
                        <button onClick={() => { setIsEditing(false); setEditPost(null); }} className="register-info-cancelButton">Hủy</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="register-info-postItem register-info-headerRow">
                        <div className="register-info-postColumn register-info-idColumn">ID</div>
                        <div className="register-info-postColumn register-info-titleColumn">HỌ TÊN</div>
                        <div className="register-info-postColumn register-info-contentColumn1">ĐỊA CHỈ</div>
                        <div className="register-info-postColumn register-info-contentColumn1">ĐIỆN THOẠI</div>
                        <div className="register-info-postColumn register-info-categoriesColumn">KHÓA HỌC</div>
                        <div className="register-info-postColumn register-info-actionsColumn">CẬP NHẬT</div>
                    </div>

                    {intro.length > 0 ? (
                        intro.map((post) => (
                            <div key={post.id} className="register-info-postItem">
                                <div className="register-info-postColumn register-info-idColumn">{post.id}</div>
                                <div className="register-info-postColumn register-info-titleColumn">{post.full_name}</div>
                                <div className="register-info-postColumn register-info-contentColumn1">{post.address}</div>
                                <div className="register-info-postColumn register-info-contentColumn1">{post.phone}</div>
                                <div className="register-info-postColumn register-info-contentColumn1">{post.course}</div>
                                <div className="register-info-postColumn register-info-actionsColumn">
                                    <button onClick={() => handleEdit(post)} className="register-info-editButton">
                                        <Create />
                                    </button>
                                    <button onClick={() => handleDelete(post.id)} className="register-info-deleteButton">
                                        <Delete />
                                    </button>
                                    <button onClick={() => generatePDF(post)} className="register-info-printButton">
                                        <Print />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Không có bài viết nào.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default RegisterInfo;