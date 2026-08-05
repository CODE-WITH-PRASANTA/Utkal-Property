import React, { useState, useRef } from 'react';
import { 
    IoDocumentTextOutline, 
    IoCloudUploadOutline, 
    IoClose, 
    IoPencil, 
    IoSquareOutline, 
    IoText, 
    IoArrowUndo, 
    IoTrashOutline, 
    IoEyeOutline,
    IoAdd 
} from 'react-icons/io5';
import './Document.css';

const Document = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        planTitle: 'Fourth Floor Plan',
        planType: 'Apartment',
        beds: 3,
        baths: 2,
        balconies: 1,
        pujaRoom: 0,
        servantRoom: 1,
        storeRoom: 0,
        sbaSqft: 3140,
        plotSqft: 1500,
        floorPlanSketch: null, 
    });

    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageFileName, setImageFileName] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file) => {
        if (!file.type.match('image.*')) {
            alert('Please select a valid image file (JPG, PNG, WebP)');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('File size exceeds 5MB limit.');
            return;
        }

        setImageFileName(file.name);
        const previewUrl = URL.createObjectURL(file);
        setUploadedImage(previewUrl);

        setFormData((prevData) => ({
            ...prevData,
            floorPlanSketch: file,
        }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        if (file) {
            processFile(file);
        }
    };

    const handleRemoveImage = (e) => {
        if (e) e.stopPropagation();
        setUploadedImage(null);
        setImageFileName('');
        setFormData((prevData) => ({
            ...prevData,
            floorPlanSketch: null,
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        alert('Floor plan saved successfully! Check console for data.');
        closeModal(); 
    };

    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; 
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'unset'; 
    };

    return (
        <div className="document-page-container">
            <div className="document-top-action-bar">
                <div className="document-header-left">
                    <IoDocumentTextOutline className="document-icon-purple" />
                    <h2 className="document-title">Documents</h2>
                </div>
                <button type="button" className="btn-add-document" onClick={openModal}>
                    <IoAdd className="add-icon" /> Add Document
                </button>
            </div>

            <div className="document-card" onClick={openModal}>
                <div className="upload-zone">
                    <IoCloudUploadOutline className="upload-icon-purple" />
                    <p className="upload-text">
                        <strong>Drag & drop files here</strong> or click to browse
                    </p>
                    <p className="upload-subtext">PDF, DOC, DOCX (Max 10MB)</p>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay fade-in">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">Add New Floor Plan</h2>
                            <button className="close-button" onClick={closeModal} type="button">
                                <IoClose />
                            </button>
                        </div>

                        <form className="modal-form" onSubmit={handleSubmit}>
                            <div className="form-grid">
                                {/* Left Column - Text Inputs & Room Configuration */}
                                <div className="form-column left-column">
                                    <div className="form-group">
                                        <label htmlFor="planTitle">Plan Title <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            id="planTitle"
                                            name="planTitle"
                                            value={formData.planTitle}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Fourth Floor Plan"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="planType">Select Plan Type <span className="required">*</span></label>
                                        <select
                                            id="planType"
                                            name="planType"
                                            value={formData.planType}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="" disabled>Select plan type</option>
                                            <option value="Apartment">Apartment</option>
                                            <option value="Duplex">Duplex</option>
                                            <option value="Penthouse">Penthouse</option>
                                        </select>
                                    </div>

                                    <div className="room-details-grid">
                                        {['beds', 'baths', 'balconies', 'pujaRoom', 'servantRoom', 'storeRoom'].map((field) => (
                                            <div className="form-group" key={field}>
                                                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1).replace('Room', ' Room')}</label>
                                                <input
                                                    type="number"
                                                    id={field}
                                                    name={field}
                                                    value={formData[field]}
                                                    onChange={handleInputChange}
                                                    min="0"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="size-inputs-row">
                                        <div className="form-group">
                                            <label htmlFor="sbaSqft">SBA (sqft)</label>
                                            <input
                                                type="number"
                                                id="sbaSqft"
                                                name="sbaSqft"
                                                value={formData.sbaSqft}
                                                onChange={handleInputChange}
                                                placeholder="e.g. 3140"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="plotSqft">Plot (sqft)</label>
                                            <input
                                                type="number"
                                                id="plotSqft"
                                                name="plotSqft"
                                                value={formData.plotSqft}
                                                onChange={handleInputChange}
                                                placeholder="e.g. 1500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Upload and Sketch Canvas */}
                                <div className="form-column right-column">
                                    <div className="form-group upload-container">
                                        <label>Upload Floor Plan Image <span className="required">*</span></label>
                                        
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            onChange={handleFileChange} 
                                            accept="image/png, image/jpeg, image/webp" 
                                            style={{ display: 'none' }} 
                                        />

                                        <div 
                                            className="upload-zone modal-upload-zone"
                                            onClick={handleUploadClick}
                                            onDragOver={handleDragOver}
                                            onDrop={handleDrop}
                                        >
                                            {uploadedImage ? (
                                                <div className="uploaded-preview-container">
                                                    <img 
                                                        src={uploadedImage} 
                                                        alt="Floor Plan Preview" 
                                                        className="mini-preview-img"
                                                    />
                                                    <p className="upload-text">
                                                        <strong>{imageFileName}</strong>
                                                    </p>
                                                    <button 
                                                        type="button" 
                                                        className="btn-remove-image" 
                                                        onClick={handleRemoveImage}
                                                    >
                                                        Remove Image
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <IoCloudUploadOutline className="upload-icon-purple" />
                                                    <p className="upload-text">
                                                        <strong>Click to upload</strong> or drag & drop
                                                    </p>
                                                    <p className="upload-subtext">JPG, PNG, WebP (Max. 5MB)</p>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="divider-or">OR</div>

                                    <div className="form-group sketch-container">
                                        <label>Upload Preview Image</label>
                                        <div className="sketch-box">
                                            <div className="sketch-toolbar">
                                                <button type="button" className="tool-btn active"><IoPencil /></button>
                                                <button type="button" className="tool-btn"><IoSquareOutline /></button>
                                                <button type="button" className="tool-btn"><IoText /></button>
                                                <div className="tool-divider"></div>
                                                <button type="button" className="tool-btn"><IoArrowUndo /></button>
                                                <button type="button" className="tool-btn text-danger"><IoTrashOutline /></button>
                                            </div>
                                            
                                            <div className="sketch-canvas">
                                                {uploadedImage ? (
                                                    <div className="canvas-image-wrapper">
                                                        <img 
                                                            src={uploadedImage} 
                                                            alt="Canvas Preview" 
                                                            className="canvas-synced-image" 
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="sketch-placeholder-text">
                                                        Canvas Drawing Area Ready
                                                    </div>
                                                )}
                                            </div>

                                            <div className="sketch-footer">
                                                <button 
                                                    type="button" 
                                                    className="footer-btn btn-outline-danger"
                                                    onClick={handleRemoveImage}
                                                >
                                                    <IoTrashOutline /> Clear
                                                </button>
                                                <button type="button" className="footer-btn btn-outline-primary">
                                                    <IoEyeOutline /> Preview
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn-save">Save Plan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}; 

export default Document;