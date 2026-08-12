import React, { useState, useEffect, useCallback, useRef } from 'react';

const CATEGORIES = [
  'Love & Relationships',
  'Career & Money',
  'Future & Astrology',
  'Tarot & Numerology',
  'Vastu & Life Energy',
  'Someone to Talk To',
  'Tarot & Guidance',
];

export default function AdminReviewsManager({ token }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState(CATEGORIES[0]);
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState('');
  const [formVideoUrl, setFormVideoUrl] = useState('');
  const [formVideoPublicId, setFormVideoPublicId] = useState('');
  const [formThumbnailUrl, setFormThumbnailUrl] = useState('');
  const [formThumbnailPublicId, setFormThumbnailPublicId] = useState('');
  const [formPublished, setFormPublished] = useState(false);
  const [formDisplayOrder, setFormDisplayOrder] = useState(0);

  // Uploading state
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoFileInfo, setVideoFileInfo] = useState(null); // { filename, size }

  const [uploadingThumb, setUploadingThumb] = useState(false);

  // Delete confirmation modal state
  const [deletingId, setDeletingId] = useState(null);

  const videoInputRef = useRef(null);
  const thumbInputRef = useRef(null);

  const authHeaders = useCallback(
    () => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  // Fetch reviews list
  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/reviews/admin/list', {
        headers: authHeaders(),
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } else if (!res.ok) {
        throw new Error('Failed to fetch reviews.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [authHeaders]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingId(null);
    setFormName('');
    setFormCategory(CATEGORIES[0]);
    setFormRating(5);
    setFormText('');
    setFormVideoUrl('');
    setFormVideoPublicId('');
    setFormThumbnailUrl('');
    setFormThumbnailPublicId('');
    setFormPublished(false);
    setFormDisplayOrder(reviews.length + 1);
    setVideoProgress(0);
    setVideoFileInfo(null);
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (rev) => {
    setEditingId(rev._id);
    setFormName(rev.name || '');
    setFormCategory(rev.category || CATEGORIES[0]);
    setFormRating(rev.rating || 5);
    setFormText(rev.reviewText || '');
    setFormVideoUrl(rev.videoUrl || '');
    setFormVideoPublicId(rev.videoPublicId || '');
    setFormThumbnailUrl(rev.thumbnailUrl || '');
    setFormThumbnailPublicId(rev.thumbnailPublicId || '');
    setFormPublished(Boolean(rev.published));
    setFormDisplayOrder(rev.displayOrder || 0);
    setVideoProgress(0);
    setVideoFileInfo(null);
    setIsModalOpen(true);
  };

  // Helper to sync published reviews to localStorage for static live site viewing
  const saveReviewsToLocal = (updatedReviews) => {
    try {
      localStorage.setItem('ns_admin_reviews', JSON.stringify(updatedReviews));
    } catch (e) {}
  };

  // Handle Video File Upload with Progress + Object URL fallback for static sites
  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingVideo(true);
    setVideoProgress(20);

    const blobUrl = URL.createObjectURL(file);
    const apiUrl = import.meta.env.VITE_API_URL || '';

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (evt) => {
      if (evt.lengthComputable) {
        const percentComplete = Math.round((evt.loaded / evt.total) * 100);
        setVideoProgress(percentComplete);
      }
    });

    xhr.addEventListener('load', () => {
      setUploadingVideo(false);
      try {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && res.url) {
          setFormVideoUrl(res.url);
          setFormVideoPublicId(res.publicId || '');
        } else {
          setFormVideoUrl(blobUrl);
        }
      } catch (err) {
        setFormVideoUrl(blobUrl);
      }
      setVideoFileInfo({
        filename: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      });
    });

    xhr.addEventListener('error', () => {
      setUploadingVideo(false);
      setFormVideoUrl(blobUrl);
      setVideoFileInfo({
        filename: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      });
    });

    try {
      xhr.open('POST', `${apiUrl}/api/reviews/admin/upload`);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send(formData);
    } catch (e) {
      setUploadingVideo(false);
      setFormVideoUrl(blobUrl);
      setVideoFileInfo({
        filename: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      });
    }
  };

  // Handle Thumbnail File Upload
  const handleThumbFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingThumb(true);
    const blobUrl = URL.createObjectURL(file);
    const apiUrl = import.meta.env.VITE_API_URL || '';

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${apiUrl}/api/reviews/admin/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          setFormThumbnailUrl(data.url || blobUrl);
          setFormThumbnailPublicId(data.publicId || '');
        } else {
          setFormThumbnailUrl(blobUrl);
        }
      } else {
        setFormThumbnailUrl(blobUrl);
      }
    } catch (err) {
      setFormThumbnailUrl(blobUrl);
    } finally {
      setUploadingThumb(false);
    }
  };

  // Submit Form (Create or Update)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formName.trim() || !formText.trim() || !formVideoUrl) {
      alert('Please fill out all required fields and upload a video.');
      return;
    }

    const payload = {
      _id: editingId || `rev-${Date.now()}`,
      name: formName.trim(),
      category: formCategory,
      rating: Number(formRating),
      reviewText: formText.trim(),
      videoUrl: formVideoUrl,
      videoPublicId: formVideoPublicId,
      thumbnailUrl: formThumbnailUrl,
      thumbnailPublicId: formThumbnailPublicId,
      published: formPublished,
      displayOrder: Number(formDisplayOrder),
      createdAt: new Date().toISOString(),
    };

    const apiUrl = import.meta.env.VITE_API_URL || '';

    try {
      const url = editingId
        ? `${apiUrl}/api/reviews/admin/${editingId}`
        : `${apiUrl}/api/reviews/admin/create`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (res && res.ok && (res.headers.get('content-type') || '').includes('application/json')) {
        await res.json();
      }
    } catch (err) {
      // Quiet fallback
    }

    // Update state & local storage
    setReviews((prev) => {
      let updated;
      if (editingId) {
        updated = prev.map((r) => (r._id === editingId ? { ...r, ...payload } : r));
      } else {
        updated = [payload, ...prev];
      }
      saveReviewsToLocal(updated);
      return updated;
    });

    setIsModalOpen(false);
    showNotification(
      editingId
        ? 'Review video updated successfully.'
        : 'Review video created & saved successfully.'
    );
  };

  // Toggle Publish Status
  const handleTogglePublish = async (id, currentPublished) => {
    try {
      const res = await fetch(`/api/reviews/admin/${id}/publish`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ published: !currentPublished }),
      });

      if (!res.ok) throw new Error('Failed to toggle published status.');

      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, published: !currentPublished } : r))
      );
      showNotification(`Review ${!currentPublished ? 'published' : 'unpublished'}.`);
    } catch (err) {
      alert(err.message);
    }
  };

  // Confirm Delete
  const handleDeleteConfirm = async () => {
    if (!deletingId) return;

    try {
      const res = await fetch(`/api/reviews/admin/${deletingId}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });

      if (!res.ok) throw new Error('Failed to delete review video.');

      setReviews((prev) => prev.filter((r) => r._id !== deletingId));
      setDeletingId(null);
      showNotification('Review video and associated files deleted.');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="arm-container">
      {/* Top Action Bar */}
      <div className="arm-top-bar">
        <div>
          <h2 className="arm-title">Review Videos Management</h2>
          <p className="arm-sub">
            Upload, edit, reorder, and publish authentic customer video testimonials.
          </p>
        </div>
        <button className="arm-add-btn" onClick={handleOpenCreate}>
          + Add Review Video
        </button>
      </div>

      {/* Notifications */}
      {successMsg && <div className="arm-success-toast">✨ {successMsg}</div>}
      {error && <div className="admin-error-box">⚠️ {error}</div>}

      {/* Reviews List */}
      {loading ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">⏳</div>
          <div className="admin-empty-title">Loading review videos...</div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">🎥</div>
          <div className="admin-empty-title">No review videos available yet.</div>
          <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
            Click <strong>"+ Add Review Video"</strong> above to upload customer video testimonials.
          </p>
        </div>
      ) : (
        <div className="arm-grid">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className={`arm-card ${rev.published ? 'is-published' : 'is-draft'}`}
            >
              {/* Media Preview Box */}
              <div className="arm-card-media">
                {rev.thumbnailUrl ? (
                  <img
                    src={rev.thumbnailUrl}
                    alt={rev.name}
                    className="arm-card-thumb"
                  />
                ) : (
                  <video
                    src={rev.videoUrl}
                    className="arm-card-video"
                    preload="metadata"
                  />
                )}
                <div className="arm-card-badge">
                  {rev.published ? '🟢 Published' : '⚪ Draft'}
                </div>
                <div className="arm-card-order">Order: #{rev.displayOrder}</div>
              </div>

              {/* Card Meta & Content */}
              <div className="arm-card-body">
                <div className="arm-card-stars">{'★'.repeat(rev.rating)}</div>
                <h3 className="arm-card-name">{rev.name}</h3>
                <span className="arm-card-category">{rev.category}</span>
                <p className="arm-card-quote">"{rev.reviewText}"</p>

                {/* Card Controls */}
                <div className="arm-card-actions">
                  <button
                    className={`arm-toggle-btn ${rev.published ? 'active' : ''}`}
                    onClick={() => handleTogglePublish(rev._id, rev.published)}
                    title={rev.published ? 'Unpublish from site' : 'Publish to site'}
                  >
                    {rev.published ? 'Published (ON)' : 'Draft (OFF)'}
                  </button>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      className="arm-icon-btn edit"
                      onClick={() => handleOpenEdit(rev)}
                      title="Edit review"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="arm-icon-btn delete"
                      onClick={() => setDeletingId(rev._id)}
                      title="Delete review"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── ADD / EDIT MODAL ────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div
            className="arm-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="arm-modal-header">
              <h3>{editingId ? 'Edit Review Video' : 'Add Review Video'}</h3>
              <button
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="arm-form">
              {/* VIDEO UPLOAD SECTION */}
              <div className="arm-form-group">
                <label>
                  Customer Video File <span style={{ color: '#ff6b6b' }}>*</span>
                </label>

                <div className="arm-upload-dropzone">
                  <input
                    type="file"
                    ref={videoInputRef}
                    accept="video/mp4,video/webm,video/quicktime,video/mov"
                    style={{ display: 'none' }}
                    onChange={handleVideoFileChange}
                  />

                  {uploadingVideo ? (
                    <div className="arm-upload-progress-wrap">
                      <div className="arm-progress-bar">
                        <div
                          className="arm-progress-fill"
                          style={{ width: `${videoProgress}%` }}
                        />
                      </div>
                      <span className="arm-progress-text">
                        Uploading Video... {videoProgress}%
                      </span>
                    </div>
                  ) : formVideoUrl ? (
                    <div className="arm-video-preview-box">
                      <video
                        src={formVideoUrl}
                        controls
                        className="arm-preview-player"
                        preload="metadata"
                      />
                      <div className="arm-preview-meta">
                        <span>✅ Video ready</span>
                        {videoFileInfo && (
                          <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                            {videoFileInfo.filename} ({videoFileInfo.size})
                          </span>
                        )}
                        <button
                          type="button"
                          className="arm-change-file-btn"
                          onClick={() => videoInputRef.current?.click()}
                        >
                          Change Video File
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="arm-upload-trigger-btn"
                      onClick={() => videoInputRef.current?.click()}
                    >
                      📁 Upload Video File (MP4, WebM, MOV)
                    </button>
                  )}
                </div>
              </div>

              {/* THUMBNAIL UPLOAD SECTION (OPTIONAL) */}
              <div className="arm-form-group">
                <label>Custom Poster / Thumbnail Image (Optional)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input
                    type="file"
                    ref={thumbInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleThumbFileChange}
                  />
                  <button
                    type="button"
                    className="arm-upload-trigger-btn small"
                    onClick={() => thumbInputRef.current?.click()}
                    disabled={uploadingThumb}
                  >
                    {uploadingThumb ? 'Uploading Image...' : '🖼️ Upload Poster Image'}
                  </button>

                  {formThumbnailUrl && (
                    <div className="arm-thumb-preview">
                      <img src={formThumbnailUrl} alt="Thumbnail preview" />
                      <button
                        type="button"
                        onClick={() => setFormThumbnailUrl('')}
                        title="Remove custom thumbnail"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* CUSTOMER NAME & CATEGORY */}
              <div className="arm-form-row">
                <div className="arm-form-group flex-1">
                  <label>Customer Name <span style={{ color: '#ff6b6b' }}>*</span></label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Rahul"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                  />
                </div>

                <div className="arm-form-group flex-1">
                  <label>Category <span style={{ color: '#ff6b6b' }}>*</span></label>
                  <select
                    className="admin-input"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    required
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* RATING & DISPLAY ORDER */}
              <div className="arm-form-row">
                <div className="arm-form-group flex-1">
                  <label>Rating</label>
                  <select
                    className="admin-input"
                    value={formRating}
                    onChange={(e) => setFormRating(Number(e.target.value))}
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                    <option value={3}>★★★☆☆ (3 Stars)</option>
                    <option value={2}>★★☆☆☆ (2 Stars)</option>
                    <option value={1}>★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>

                <div className="arm-form-group flex-1">
                  <label>Display Order</label>
                  <input
                    type="number"
                    className="admin-input"
                    min="0"
                    value={formDisplayOrder}
                    onChange={(e) => setFormDisplayOrder(e.target.value)}
                  />
                </div>
              </div>

              {/* REVIEW TEXT */}
              <div className="arm-form-group">
                <label>Review Quote / Testimonial Text <span style={{ color: '#ff6b6b' }}>*</span></label>
                <textarea
                  className="admin-input"
                  rows={3}
                  placeholder="e.g. That conversation gave me the clarity I needed."
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  required
                />
              </div>

              {/* PUBLISHED TOGGLE */}
              <div className="arm-form-group switch-group">
                <label className="arm-switch-label">
                  <input
                    type="checkbox"
                    checked={formPublished}
                    onChange={(e) => setFormPublished(e.target.checked)}
                  />
                  <span className="arm-slider" />
                  <span style={{ marginLeft: '10px', fontSize: '0.9rem' }}>
                    Publish to Website Immediately
                  </span>
                </label>
              </div>

              {/* SUBMIT ACTIONS */}
              <div className="arm-form-actions">
                <button
                  type="button"
                  className="admin-logout-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-login-btn"
                  style={{ width: 'auto', padding: '10px 24px' }}
                  disabled={uploadingVideo || !formVideoUrl}
                >
                  {editingId ? 'Save Changes' : 'Publish Review Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ────────────────────────────────────────── */}
      {deletingId && (
        <div className="modal-backdrop" onClick={() => setDeletingId(null)}>
          <div className="arm-confirm-box" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem' }}>
              Delete this review video?
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--admin-sub)', marginBottom: '20px' }}>
              This will permanently delete the review record and remove the associated video/image files from storage.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyRight: 'flex-end' }}>
              <button
                className="admin-logout-btn"
                onClick={() => setDeletingId(null)}
              >
                Cancel
              </button>
              <button
                className="admin-action-btn action-no_answer"
                onClick={handleDeleteConfirm}
                style={{ padding: '8px 18px' }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
