import React, { useState, useRef } from "react";

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
  IoAdd,
} from "react-icons/io5";

import "./Document.css";

const Document = ({
  documents,
  setDocuments,
  floorPlans,
  setFloorPlans,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Floor plan image input
  const fileInputRef = useRef(null);

  // Property PDF/DOC/DOCX input
  const documentInputRef = useRef(null);

  // ==========================================
  // FLOOR PLAN FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    planTitle: "Fourth Floor Plan",
    planType: "Apartment",

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

  // ==========================================
  // FLOOR PLAN IMAGE PREVIEW
  // ==========================================

  const [uploadedImage, setUploadedImage] =
    useState(null);

  const [imageFileName, setImageFileName] =
    useState("");

  // ==========================================
  // HANDLE FLOOR PLAN INPUT
  // ==========================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ==========================================
  // FLOOR PLAN IMAGE UPLOAD
  // ==========================================

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
    // Image validation
    if (!file.type.match("image.*")) {
      alert(
        "Please select a valid image file (JPG, PNG, WebP)"
      );
      return;
    }

    // 5 MB
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    setImageFileName(file.name);

    const previewUrl =
      URL.createObjectURL(file);

    setUploadedImage(previewUrl);

    // Store actual File
    setFormData((prevData) => ({
      ...prevData,
      floorPlanSketch: file,
    }));
  };

  // ==========================================
  // DRAG FLOOR PLAN IMAGE
  // ==========================================

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file =
      e.dataTransfer.files[0];

    if (file) {
      processFile(file);
    }
  };

  // ==========================================
  // REMOVE FLOOR PLAN IMAGE
  // ==========================================

  const handleRemoveImage = (e) => {
    if (e) {
      e.stopPropagation();
    }

    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }

    setUploadedImage(null);

    setImageFileName("");

    setFormData((prevData) => ({
      ...prevData,
      floorPlanSketch: null,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================
  // PROPERTY DOCUMENT UPLOAD
  // PDF / DOC / DOCX
  // ==========================================

  const handleDocumentUploadClick = () => {
    if (documentInputRef.current) {
      documentInputRef.current.click();
    }
  };

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
      // Type validation
      if (!allowedTypes.includes(file.type)) {
        alert(
          `${file.name} is not a valid PDF, DOC or DOCX file.`
        );

        return;
      }

      // 10MB validation
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

    console.log(
      "Documents selected:",
      validFiles
    );

    // Reset so same file can be selected again
    if (documentInputRef.current) {
      documentInputRef.current.value = "";
    }
  };

  // ==========================================
  // REMOVE PROPERTY DOCUMENT
  // ==========================================

  const handleRemoveDocument = (
    index,
    event
  ) => {
    if (event) {
      event.stopPropagation();
    }

    setDocuments((previous) =>
      previous.filter(
        (_, documentIndex) =>
          documentIndex !== index
      )
    );
  };

  // ==========================================
  // SAVE FLOOR PLAN
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.planTitle.trim()) {
      alert("Plan title is required.");
      return;
    }

    if (!formData.planType) {
      alert("Plan type is required.");
      return;
    }

    if (!formData.floorPlanSketch) {
      alert(
        "Please upload floor plan image."
      );

      return;
    }

    // Create floor plan object
    const newFloorPlan = {
      planTitle:
        formData.planTitle.trim(),

      planType:
        formData.planType,

      beds:
        Number(formData.beds) || 0,

      baths:
        Number(formData.baths) || 0,

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

      // Actual browser File
      floorPlanSketch:
        formData.floorPlanSketch,

      // Frontend preview
      preview:
        uploadedImage || "",
    };

    // Send floor plan to parent
    setFloorPlans((previous) => [
      ...(previous || []),
      newFloorPlan,
    ]);

    console.log(
      "Floor Plan Added:",
      newFloorPlan
    );

    alert(
      "Floor plan added successfully!"
    );

    // Reset form
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

    closeModal();
  };

  // ==========================================
  // OPEN MODAL
  // ==========================================

  const openModal = () => {
    setIsModalOpen(true);

    document.body.style.overflow =
      "hidden";
  };

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const closeModal = () => {
    setIsModalOpen(false);

    document.body.style.overflow =
      "unset";
  };

  return (
    <div className="document-page-container">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="document-top-action-bar">

        <div className="document-header-left">

          <IoDocumentTextOutline
            className="document-icon-purple"
          />

          <h2 className="document-title">
            Documents
          </h2>

        </div>

        <button
          type="button"
          className="btn-add-document"
          onClick={openModal}
        >
          <IoAdd className="add-icon" />

          Add Document
        </button>

      </div>

      {/* =====================================
          PROPERTY DOCUMENT INPUT
      ===================================== */}

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

      {/* =====================================
          PROPERTY DOCUMENT UPLOAD
      ===================================== */}

      <div
        className="document-card"
        onClick={
          handleDocumentUploadClick
        }
      >

        <div className="upload-zone">

          <IoCloudUploadOutline
            className="upload-icon-purple"
          />

          <p className="upload-text">

            <strong>
              Drag & drop files here
            </strong>{" "}

            or click to browse

          </p>

          <p className="upload-subtext">
            PDF, DOC, DOCX (Max 10MB)
          </p>

        </div>

      </div>

      {/* =====================================
          SELECTED DOCUMENTS
      ===================================== */}

      {documents &&
        documents.length > 0 && (

          <div>

            {documents.map(
              (document, index) => (

                <div
                  key={`${document.name}-${index}`}
                  className="document-card"
                >

                  <div className="upload-zone">

                    <IoDocumentTextOutline
                      className="document-icon-purple"
                    />

                    <p className="upload-text">

                      <strong>
                        {document.name}
                      </strong>

                    </p>

                    <p className="upload-subtext">

                      {(
                        document.size /
                        1024 /
                        1024
                      ).toFixed(2)}{" "}
                      MB

                    </p>

                    <button
                      type="button"
                      className="btn-remove-image"
                      onClick={(e) =>
                        handleRemoveDocument(
                          index,
                          e
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              )
            )}

          </div>
        )}

      {/* =====================================
          FLOOR PLAN MODAL
      ===================================== */}

      {isModalOpen && (

        <div className="modal-overlay fade-in">

          <div className="modal-content">

            {/* HEADER */}

            <div className="modal-header">

              <h2 className="modal-title">
                Add New Floor Plan
              </h2>

              <button
                className="close-button"
                onClick={closeModal}
                type="button"
              >
                <IoClose />
              </button>

            </div>

            {/* FORM */}

            <form
              className="modal-form"
              onSubmit={handleSubmit}
            >

              <div className="form-grid">

                {/* =================================
                    LEFT COLUMN
                ================================= */}

                <div className="form-column left-column">

                  {/* PLAN TITLE */}

                  <div className="form-group">

                    <label htmlFor="planTitle">

                      Plan Title{" "}

                      <span className="required">
                        *
                      </span>

                    </label>

                    <input
                      type="text"
                      id="planTitle"
                      name="planTitle"
                      value={
                        formData.planTitle
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. Fourth Floor Plan"
                      required
                    />

                  </div>

                  {/* PLAN TYPE */}

                  <div className="form-group">

                    <label htmlFor="planType">

                      Select Plan Type{" "}

                      <span className="required">
                        *
                      </span>

                    </label>

                    <select
                      id="planType"
                      name="planType"
                      value={
                        formData.planType
                      }
                      onChange={
                        handleInputChange
                      }
                      required
                    >

                      <option
                        value=""
                        disabled
                      >
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

                  {/* ROOM DETAILS */}

                  <div className="room-details-grid">

                    {[
                      "beds",
                      "baths",
                      "balconies",
                      "pujaRoom",
                      "servantRoom",
                      "storeRoom",
                    ].map((field) => (

                      <div
                        className="form-group"
                        key={field}
                      >

                        <label htmlFor={field}>

                          {field
                            .charAt(0)
                            .toUpperCase() +
                            field
                              .slice(1)
                              .replace(
                                "Room",
                                " Room"
                              )}

                        </label>

                        <input
                          type="number"
                          id={field}
                          name={field}
                          value={
                            formData[field]
                          }
                          onChange={
                            handleInputChange
                          }
                          min="0"
                        />

                      </div>

                    ))}

                  </div>

                  {/* SIZE */}

                  <div className="size-inputs-row">

                    <div className="form-group">

                      <label htmlFor="sbaSqft">
                        SBA (sqft)
                      </label>

                      <input
                        type="number"
                        id="sbaSqft"
                        name="sbaSqft"
                        value={
                          formData.sbaSqft
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="e.g. 3140"
                      />

                    </div>

                    <div className="form-group">

                      <label htmlFor="plotSqft">
                        Plot (sqft)
                      </label>

                      <input
                        type="number"
                        id="plotSqft"
                        name="plotSqft"
                        value={
                          formData.plotSqft
                        }
                        onChange={
                          handleInputChange
                        }
                        placeholder="e.g. 1500"
                      />

                    </div>

                  </div>

                </div>

                {/* =================================
                    RIGHT COLUMN
                ================================= */}

                <div className="form-column right-column">

                  {/* FLOOR PLAN IMAGE */}

                  <div className="form-group upload-container">

                    <label>

                      Upload Floor Plan Image{" "}

                      <span className="required">
                        *
                      </span>

                    </label>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={
                        handleFileChange
                      }
                      accept="image/png, image/jpeg, image/webp"
                      style={{
                        display: "none",
                      }}
                    />

                    <div
                      className="upload-zone modal-upload-zone"
                      onClick={
                        handleUploadClick
                      }
                      onDragOver={
                        handleDragOver
                      }
                      onDrop={handleDrop}
                    >

                      {uploadedImage ? (

                        <div className="uploaded-preview-container">

                          <img
                            src={
                              uploadedImage
                            }
                            alt="Floor Plan Preview"
                            className="mini-preview-img"
                          />

                          <p className="upload-text">

                            <strong>
                              {
                                imageFileName
                              }
                            </strong>

                          </p>

                          <button
                            type="button"
                            className="btn-remove-image"
                            onClick={
                              handleRemoveImage
                            }
                          >
                            Remove Image
                          </button>

                        </div>

                      ) : (

                        <>

                          <IoCloudUploadOutline
                            className="upload-icon-purple"
                          />

                          <p className="upload-text">

                            <strong>
                              Click to upload
                            </strong>{" "}

                            or drag & drop

                          </p>

                          <p className="upload-subtext">
                            JPG, PNG, WebP
                            (Max. 5MB)
                          </p>

                        </>

                      )}

                    </div>

                  </div>

                  <div className="divider-or">
                    OR
                  </div>

                  {/* =================================
                      PREVIEW / SKETCH
                  ================================= */}

                  <div className="form-group sketch-container">

                    <label>
                      Upload Preview Image
                    </label>

                    <div className="sketch-box">

                      {/* TOOLBAR */}

                      <div className="sketch-toolbar">

                        <button
                          type="button"
                          className="tool-btn active"
                        >
                          <IoPencil />
                        </button>

                        <button
                          type="button"
                          className="tool-btn"
                        >
                          <IoSquareOutline />
                        </button>

                        <button
                          type="button"
                          className="tool-btn"
                        >
                          <IoText />
                        </button>

                        <div className="tool-divider"></div>

                        <button
                          type="button"
                          className="tool-btn"
                        >
                          <IoArrowUndo />
                        </button>

                        <button
                          type="button"
                          className="tool-btn text-danger"
                          onClick={
                            handleRemoveImage
                          }
                        >
                          <IoTrashOutline />
                        </button>

                      </div>

                      {/* CANVAS */}

                      <div className="sketch-canvas">

                        {uploadedImage ? (

                          <div className="canvas-image-wrapper">

                            <img
                              src={
                                uploadedImage
                              }
                              alt="Canvas Preview"
                              className="canvas-synced-image"
                            />

                          </div>

                        ) : (

                          <div className="sketch-placeholder-text">
                            Canvas Drawing Area
                            Ready
                          </div>

                        )}

                      </div>

                      {/* FOOTER */}

                      <div className="sketch-footer">

                        <button
                          type="button"
                          className="footer-btn btn-outline-danger"
                          onClick={
                            handleRemoveImage
                          }
                        >
                          <IoTrashOutline />

                          Clear
                        </button>

                        <button
                          type="button"
                          className="footer-btn btn-outline-primary"
                        >
                          <IoEyeOutline />

                          Preview
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================
                  MODAL BUTTONS
              ================================= */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="btn-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-save"
                >
                  Save Plan
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Document;