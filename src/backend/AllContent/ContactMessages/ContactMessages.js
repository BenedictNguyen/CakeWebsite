import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Delete } from '@mui/icons-material';
import '../ContactMessages/ContactMessages.css';
import apiUrls from '../../mockAPI';

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editPost, setEditPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(apiUrls.contactMessages);
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError('Lỗi khi lấy dữ liệu từ API. Vui lòng kiểm tra lại!');
            }
        };

        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${apiUrls.contactMessages}/${id}`);
            
            if (response.status === 200) {
                setMessages(prevMessages => prevMessages.filter(post => post.id !== Number(id)));
                alert("Bài viết đã được xóa!");
            } else {
                alert("Không thể xóa bài viết!");
            }
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
        if (editPost.message.trim() === "") {
            alert("Nội dung không được để trống!");
            return;
        }

        try {
            await axios.put(`${apiUrls.contactMessages}/${editPost.id}`, { message: editPost.message });
            setMessages(prevMessages => prevMessages.map(post =>
                post.id === editPost.id ? { ...post, message: editPost.message } : post
            ));
            alert("Bài viết đã được cập nhật!");
            setIsEditing(false);
            setEditPost(null);
        } catch (error) {
            console.error("Error updating post: ", error);
            alert("Lỗi khi cập nhật bài viết!");
        }
    };

    return (
        <div className="contact-messages-postList">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {isEditing ? (
                <div className="contact-messages-editPost">
                    <textarea
                        placeholder="Sửa bài viết..."
                        value={editPost.message}
                        onChange={(e) => setEditPost({ ...editPost, message: e.target.value })}
                    />
                    <div className="contact-messages-buttonGroup">
                        <button onClick={handleUpdate} className="contact-messages-updateButton">Cập Nhật</button>
                        <button onClick={() => { setIsEditing(false); setEditPost(null); }} className="contact-messages-cancelButton">Hủy</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="contact-messages-postItem contact-messages-headerRow">
                        <div className="contact-messages-postColumn contact-messages-idColumn">ID</div>
                        <div className="contact-messages-postColumn contact-messages-titleColumn">HỌ TÊN</div>
                        <div className="contact-messages-postColumn contact-messages-contentColumn1">SỐ ĐIỆN THOẠI</div>
                        <div className="contact-messages-postColumn contact-messages-contentColumn1">FACEBOOK</div>
                        <div className="contact-messages-postColumn contact-messages-contentColumn1">EMAIL</div>
                        <div className="contact-messages-postColumn contact-messages-messageColumn">TIN NHẮN</div>
                        <div className="contact-messages-postColumn contact-messages-dateColumn">NGÀY GỬI</div>
                        <div className="contact-messages-postColumn contact-messages-actionsColumn">CẬP NHẬT</div>
                    </div>

                    {messages.length > 0 ? (
                        messages.map((post) => (
                            <div key={post.id} className="contact-messages-postItem">
                                <div className="contact-messages-postColumn contact-messages-idColumn">{post.id}</div>
                                <div className="contact-messages-postColumn contact-messages-titleColumn">{post.Name}</div>
                                <div className="contact-messages-postColumn contact-messages-contentColumn1">{post.Phone}</div>
                                <div className="contact-messages-postColumn contact-messages-contentColumn1">{post.Facebook}</div>
                                <div className="contact-messages-postColumn contact-messages-contentColumn1">{post.Email}</div>
                                <div className="contact-messages-postColumn contact-messages-messageColumn">{post.Message}</div>
                                <div className="contact-messages-postColumn contact-messages-dateColumn">{post.CreatedAt}</div>
                                <div className="contact-messages-postColumn contact-messages-actionsColumn">
                                    <button onClick={() => handleDelete(post.id)} className="contact-messages-deleteButton">
                                        <Delete />
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

export default ContactMessages;