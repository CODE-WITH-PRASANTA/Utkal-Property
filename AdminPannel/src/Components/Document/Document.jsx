import React, { useRef, useState } from "react";

import {
  IoDocumentTextOutline,
  IoCloudUploadOutline,
  IoPencil,
  IoSquareOutline,
  IoText,
  IoArrowUndo,
  IoTrashOutline,
  IoEyeOutline,
  IoAdd,
} from "react-icons/io5";

import "./Document.css";

const Document = ({
  documents,
  setDocuments,
  floorPlans,
  setFloorPlans,
}) => {
  // =====================================================
  // FILE REFS
  // =====================================================

  const fileInputRef = useRef(null);
  const documentInputRef = useRef(null);

  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    planTitle: "",
    planType: "",
    beds: 0,
    baths: 0,
    balconies: 0,
    pujaRoom: 0,
    servantRoom: 0,
    storeRoom: 0,
    sbaSqft: 0,
    plotSqft: 0,
    floorPlanSketch: null,
  });

  // =====================================================
  // IMAGE PREVIEW
  // =====================================================

  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageFileName, setImageFileName] = useState("");

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // FLOOR PLAN UPLOAD CLICK
  // =====================================================

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // =====================================================
  // FLOOR PLAN FILE CHANGE
  // =====================================================

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      processFile(file);
    }
  };

  // =====================================================
  // PROCESS FLOOR PLAN IMAGE
  // =====================================================

  const processFile = (file) => {
    if (!file.type.match("image.*")) {
      alert(
        "Please select a valid image file (JPG, PNG, WebP)"
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }

    const previewUrl = URL.createObjectURL(file);

    setImageFileName(file.name);

    setUploadedImage(previewUrl);

    setFormData((previous) => ({
      ...previous,
      floorPlanSketch: file,
    }));
  };

  // =====================================================
  // DRAG OVER
  // =====================================================

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // =====================================================
  // DROP
  // =====================================================

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];

    if (file) {
      processFile(file);
    }
  };

  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  const handleRemoveImage = (e) => {
    if (e) {
      e.stopPropagation();
    }

    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }

    setUploadedImage(null);

    setImageFileName("");

    setFormData((previous) => ({
      ...previous,
      floorPlanSketch: null,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =====================================================
  // DOCUMENT UPLOAD CLICK
  // =====================================================

  const handleDocumentUploadClick = () => {
    documentInputRef.current?.click();
  };

  // =====================================================
  // DOCUMENT CHANGE
  // =====================================================

  const handleDocumentChange = (e) => {
    const selectedFiles = Array.from(
      e.target.files || []
    );

    if (selectedFiles.length === 0) {
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const validFiles = [];

    selectedFiles.forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        alert(
          `${file.name} is not a valid PDF, DOC or DOCX file.`
        );
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert(
          `${file.name} exceeds the 10MB limit.`
        );
        return;
      }

      validFiles.push(file);
    });

    if (validFiles.length === 0) {
      return;
    }

    setDocuments((previous) => [
      ...(previous || []),
      ...validFiles,
    ]);

    if (documentInputRef.current) {
      documentInputRef.current.value = "";
    }
  };

  // =====================================================
  // REMOVE DOCUMENT
  // =====================================================

  const handleRemoveDocument = (index) => {
    setDocuments((previous) =>
      previous.filter(
        (_, documentIndex) =>
          documentIndex !== index
      )
    );
  };

  // =====================================================
  // SUBMIT FLOOR PLAN
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    // ===================================================
    // VALIDATION
    // ===================================================

    if (!formData.planTitle.trim()) {
      alert("Plan title is required.");
      return;
    }

    if (!formData.planType) {
      alert("Plan type is required.");
      return;
    }

    if (!formData.floorPlanSketch) {
      alert("Please upload floor plan image.");
      return;
    }

    // ===================================================
    // CREATE FLOOR PLAN OBJECT
    // ===================================================

    const newFloorPlan = {
      planTitle: formData.planTitle.trim(),

      planType: formData.planType,

      beds: Number(formData.beds) || 0,

      baths: Number(formData.baths) || 0,

      balconies:
        Number(formData.balconies) || 0,

      pujaRoom:
        Number(formData.pujaRoom) || 0,

      servantRoom:
        Number(formData.servantRoom) || 0,

      storeRoom:
        Number(formData.storeRoom) || 0,

      sbaSqft:
        Number(formData.sbaSqft) || 0,

      plotSqft:
        Number(formData.plotSqft) || 0,

      // =================================================
      // IMPORTANT
      // KEEP THE ACTUAL FILE OBJECT
      // =================================================

      floorPlanSketch:
        formData.floorPlanSketch,

      // =================================================
      // FRONTEND PREVIEW ONLY
      // =================================================

      preview:
        uploadedImage || "",

      // =================================================
      // MARK AS NEW
      // =================================================

      isNew: true,
    };

    // ===================================================
    // SAVE INTO PARENT STATE
    // ===================================================

    setFloorPlans((previous) => {
      const updatedFloorPlans = [
        ...(previous || []),
        newFloorPlan,
      ];

      console.log(
        "FLOOR PLANS AFTER ADD:",
        updatedFloorPlans
      );

      return updatedFloorPlans;
    });

    // ===================================================
    // MESSAGE
    // ===================================================

    alert(
      "Floor plan added successfully. Click Publish / Update Property to save it."
    );

    // ===================================================
    // RESET FORM
    // ===================================================

    setFormData({
      planTitle: "",
      planType: "",
      beds: 0,
      baths: 0,
      balconies: 0,
      pujaRoom: 0,
      servantRoom: 0,
      storeRoom: 0,
      sbaSqft: 0,
      plotSqft: 0,
      floorPlanSketch: null,
    });

    // ===================================================
    // RESET PREVIEW
    // ===================================================

    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }

    setUploadedImage(null);

    setImageFileName("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =====================================================
  // CANCEL / RESET
  // =====================================================

  const handleCancel = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }

    setFormData({
      planTitle: "",
      planType: "",
      beds: 0,
      baths: 0,
      balconies: 0,
      pujaRoom: 0,
      servantRoom: 0,
      storeRoom: 0,
      sbaSqft: 0,
      plotSqft: 0,
      floorPlanSketch: null,
    });

    setUploadedImage(null);

    setImageFileName("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="document-page-container">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="document-top-action-bar">

        <div className="document-header-left">

          <IoDocumentTextOutline
            className="document-icon-purple"
          />

          <div>

            <h2 className="document-title">
              Add Document
            </h2>

            <p className="document-header-subtitle">
              Add floor plan and supporting documents
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          MAIN FORM
      ===================================================== */}

      <form
        className="document-normal-form"
        onSubmit={handleSubmit}
      >

        {/* =====================================================
            BASIC INFORMATION
        ===================================================== */}

        <div className="document-form-section">

          <div className="document-section-header">

            <div className="section-number">
              01
            </div>

            <div>

              <h3>
                Basic Information
              </h3>

              <p>
                Enter the basic floor plan details
              </p>

            </div>

          </div>


          <div className="document-form-table">

            <div className="document-form-row">

              <div className="document-form-label">

                <label>
                  Plan Title

                  <span className="required">
                    *
                  </span>
                </label>

              </div>


              <div className="document-form-field">

                <input
                  type="text"
                  name="planTitle"
                  value={formData.planTitle}
                  onChange={handleInputChange}
                  placeholder="e.g. Fourth Floor Plan"
                  required
                />

              </div>

            </div>


            <div className="document-form-row">

              <div className="document-form-label">

                <label>
                  Plan Type

                  <span className="required">
                    *
                  </span>
                </label>

              </div>


              <div className="document-form-field">

                <select
                  name="planType"
                  value={formData.planType}
                  onChange={handleInputChange}
                  required
                >

                  <option value="">
                    Select plan type
                  </option>

                  <option value="Apartment">
                    Apartment
                  </option>

                  <option value="Duplex">
                    Duplex
                  </option>

                  <option value="Penthouse">
                    Penthouse
                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            ROOM DETAILS
        ===================================================== */}

        <div className="document-form-section">

          <div className="document-section-header">

            <div className="section-number">
              02
            </div>

            <div>

              <h3>
                Room Details
              </h3>

              <p>
                Enter room and facility information
              </p>

            </div>

          </div>


          <div className="room-form-table">

            <div className="room-form-header">

              <span>
                Room / Facility
              </span>

              <span>
                Quantity
              </span>

            </div>


            {[
              ["beds", "Beds"],
              ["baths", "Baths"],
              ["balconies", "Balconies"],
              ["pujaRoom", "Puja Room"],
              ["servantRoom", "Servant Room"],
              ["storeRoom", "Store Room"],
            ].map(([field, label]) => (

              <div
                className="room-form-row"
                key={field}
              >

                <span>
                  {label}
                </span>

                <input
                  type="number"
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  min="0"
                />

              </div>

            ))}

          </div>

        </div>


        {/* =====================================================
            AREA DETAILS
        ===================================================== */}

        <div className="document-form-section">

          <div className="document-section-header">

            <div className="section-number">
              03
            </div>

            <div>

              <h3>
                Area Details
              </h3>

              <p>
                Enter property measurement
              </p>

            </div>

          </div>


          <div className="area-form-table">

            <div className="area-form-item">

              <label>
                SBA (sqft)
              </label>

              <input
                type="number"
                name="sbaSqft"
                value={formData.sbaSqft}
                onChange={handleInputChange}
                placeholder="e.g. 3140"
                min="0"
              />

            </div>


            <div className="area-form-item">

              <label>
                Plot (sqft)
              </label>

              <input
                type="number"
                name="plotSqft"
                value={formData.plotSqft}
                onChange={handleInputChange}
                placeholder="e.g. 1500"
                min="0"
              />

            </div>

          </div>

        </div>


        {/* =====================================================
            FLOOR PLAN IMAGE
        ===================================================== */}

        <div className="document-form-section">

          <div className="document-section-header">

            <div className="section-number">
              04
            </div>

            <div>

              <h3>
                Floor Plan Image
              </h3>

              <p>
                Upload the floor plan image
              </p>

            </div>

          </div>


          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/webp"
            style={{
              display: "none",
            }}
          />


          <div
            className="normal-upload-zone"
            onClick={handleUploadClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >

            {uploadedImage ? (

              <div className="normal-image-preview">

                <img
                  src={uploadedImage}
                  alt="Floor Plan"
                />


                <div className="normal-image-info">

                  <strong>
                    {imageFileName}
                  </strong>

                  <span>
                    Floor plan image uploaded
                  </span>


                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={handleRemoveImage}
                  >
                    <IoTrashOutline />

                    Remove Image
                  </button>

                </div>

              </div>

            ) : (

              <>

                <IoCloudUploadOutline />

                <strong>
                  Click to upload floor plan
                </strong>

                <span>
                  or drag & drop
                </span>

                <small>
                  JPG, PNG, WebP · Maximum 5MB
                </small>

              </>

            )}

          </div>

        </div>


        {/* =====================================================
            PREVIEW
        ===================================================== */}

        <div className="document-form-section">

          <div className="document-section-header">

            <div className="section-number">
              05
            </div>

            <div>

              <h3>
                Floor Plan Preview
              </h3>

              <p>
                Preview your uploaded floor plan
              </p>

            </div>

          </div>


          <div className="normal-preview-box">

            <div className="normal-preview-toolbar">

              <button
                type="button"
                className="preview-tool active"
              >
                <IoPencil />
              </button>


              <button
                type="button"
                className="preview-tool"
              >
                <IoSquareOutline />
              </button>


              <button
                type="button"
                className="preview-tool"
              >
                <IoText />
              </button>


              <span className="preview-divider" />


              <button
                type="button"
                className="preview-tool"
              >
                <IoArrowUndo />
              </button>


              <button
                type="button"
                className="preview-tool danger"
                onClick={handleRemoveImage}
              >
                <IoTrashOutline />
              </button>

            </div>


            <div className="normal-preview-canvas">

              {uploadedImage ? (

                <img
                  src={uploadedImage}
                  alt="Floor Plan Preview"
                />

              ) : (

                <div className="empty-preview">

                  <IoDocumentTextOutline />

                  <span>
                    No floor plan uploaded
                  </span>

                  <small>
                    Upload an image above
                  </small>

                </div>

              )}

            </div>


            <div className="normal-preview-footer">

              <button
                type="button"
                className="preview-clear"
                onClick={handleRemoveImage}
              >
                <IoTrashOutline />

                Clear
              </button>


              <button
                type="button"
                className="preview-button"
              >
                <IoEyeOutline />

                Preview
              </button>

            </div>

          </div>

        </div>


        {/* =====================================================
            SUPPORTING DOCUMENTS
        ===================================================== */}

        <div className="document-form-section">

          <div className="document-section-header">

            <div className="section-number">
              06
            </div>

            <div>

              <h3>
                Supporting Documents
              </h3>

              <p>
                Upload PDF, DOC or DOCX files
              </p>

            </div>

          </div>


          <input
            type="file"
            ref={documentInputRef}
            multiple
            accept=".pdf,.doc,.docx"
            style={{
              display: "none",
            }}
            onChange={handleDocumentChange}
          />


          <div
            className="support-document-upload"
            onClick={handleDocumentUploadClick}
          >

            <IoCloudUploadOutline />

            <strong>
              Upload Documents
            </strong>

            <span>
              PDF, DOC, DOCX
            </span>

            <small>
              Maximum 10MB per file
            </small>

          </div>


          {documents &&
            documents.length > 0 && (

              <div className="normal-document-list">

                <div className="normal-document-list-title">
                  Selected Documents
                </div>


                {documents.map(
                  (document, index) => (

                    <div
                      className="normal-document-row"
                      key={`${document.name}-${index}`}
                    >

                      <div className="normal-document-name">

                        <IoDocumentTextOutline />

                        <span>
                          {document.name}
                        </span>

                      </div>


                      <span className="normal-document-size">

                        {(
                          document.size /
                          1024 /
                          1024
                        ).toFixed(2)}{" "}
                        MB

                      </span>


                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveDocument(index)
                        }
                      >

                        <IoTrashOutline />

                        Remove

                      </button>

                    </div>

                  )
                )}

              </div>

            )}

        </div>


        {/* =====================================================
            FORM ACTIONS
        ===================================================== */}

        <div className="normal-form-actions">

          <button
            type="button"
            className="normal-cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>


          <button
            type="submit"
            className="normal-save-btn"
          >

            <IoAdd />

            Save Floor Plan

          </button>

        </div>

      </form>

    </div>
  );
};

export default Document;