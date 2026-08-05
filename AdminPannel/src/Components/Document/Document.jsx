import React, { useState } from 'react';
import { IoDocumentTextOutline, IoCloudUploadOutline, IoClose, IoPencil, IoSquareOutline, IoText, IoArrowUndo, IoTrashOutline, IoEyeOutline } from 'react-icons/io5';
import './Document.css'; // Import the CSS file

const Document = () => {
    // State to control the visibility of the "Add New Floor Plan" modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State to hold the form data with initial dummy data
    const [formData, setFormData] = useState({
        planTitle: 'Fourth Floor Plan',
        planType: 'Apartment', // Value for select dropdown
        beds: 3,
        baths: 2,
        balconies: 1,
        pujaRoom: 0,
        servantRoom: 1,
        storeRoom: 0,
        sbaSqft: 3140,
        plotSqft: 1500,
        // Sketch data would be handled by a drawing library, represented as null here
        floorPlanSketch: null, 
    });

    // Handle input changes for text and number fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        alert('Floor plan saved successfully! Check console for data.');
        // Here you would typically call an API to save the data
        closeModal(); 
    };

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent scrolling the background when modal is open
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'unset'; // Restore scrolling
    };

    return (
        <div className="document-page-container">
            {/* --- 1st and 2nd Part: Document Upload Card --- */}
            {/* This card acts as the trigger for the modal */}
            <div className="document-card" onClick={openModal}>
                <div className="document-header">
                    <IoDocumentTextOutline className="document-icon-purple" />
                    <h2 className="document-title">Documents</h2>
                </div>

                <div className="upload-zone">
                    <IoCloudUploadOutline className="upload-icon-purple" />
                    <p className="upload-text">
                        <strong>Drag & drop files here</strong> or click to browse
                    </p>
                    <p className="upload-subtext">PDF, DOC, DOCX (Max 10MB)</p>
                </div>
            </div>

            {/* --- 3rd Part: Add New Floor Plan Modal (Popup) --- */}
            {/* This renders only when isModalOpen is true, with a fade-in animation */}
            {isModalOpen && (
                <div className={`modal-overlay ${isModalOpen ? 'fade-in' : ''}`}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">Add New Floor Plan</h2>
                            <button className="close-button" onClick={closeModal}>
                                <IoClose />
                            </button>
                        </div>

                        <form className="modal-form" onSubmit={handleSubmit}>
                            <div className="form-grid">
                                {/* Left Column - Text Inputs */}
                                <div className="form-column left-column">
                                    {/* Plan Title */}
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

                                    {/* Select Plan Type */}
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

                                    {/* Grid for Beds, Baths, etc. */}
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

                                    {/* SBA and Plot Sqft */}
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

                                {/* Right Column - Upload and Sketch */}
                                <div className="form-column right-column">
                                    {/* Upload Floor Plan Image */}
                                    <div className="form-group upload-container">
                                        <label>Upload Floor Plan Image <span className="required">*</span></label>
                                        <div className="upload-zone modal-upload-zone">
                                            <IoCloudUploadOutline className="upload-icon-purple" />
                                            <p className="upload-text">
                                                <strong>Click to upload</strong> or drag & drop
                                            </p>
                                            <p className="upload-subtext">JPG, PNG, WebP (Max. 5MB)</p>
                                        </div>
                                    </div>

                                    <div className="divider-or">OR</div>

                                    {/* Scratch Floor Plan (Quick Sketch) */}
                                    <div className="form-group sketch-container">
                                        <label>Scratch Floor Plan (Quick Sketch)</label>
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
                                                {/* Placeholder for the floor plan sketch image from image_2.png */}
                                                <img 
                                                    src="https://i.imgur.com/5Yj3r4C.png" 
                                                    alt="Floor Plan Sketch"
                                                    className="sketch-image-placeholder"
                                                />
                                            </div>
                                            <div className="sketch-footer">
                                                <button type="button" className="footer-btn btn-outline-danger"><IoTrashOutline /> Clear</button>
                                                <button type="button" className="footer-btn btn-outline-primary"><IoEyeOutline /> Preview</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Action Buttons */}
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