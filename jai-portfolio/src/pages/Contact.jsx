import React, { useState, useEffect } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    const saved = localStorage.getItem("contactDraft");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);


  useEffect(() => {
    if (!submitted) {
      localStorage.setItem("contactDraft", JSON.stringify(formData));
    }
  }, [formData, submitted]);

  const validate = () => {
    const newErrors = {};

    const nameRegex = /^[\p{L} '-]+$/u;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const subjectRegex = /^[A-Za-z\s]+$/;
    const messageRegex = /^[^<>]+$/;

    if (!formData.name.trim() || !nameRegex.test(formData.name))
      newErrors.name = "Please enter a valid name.";
    if (!formData.email.trim() || !emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!formData.subject.trim() || !subjectRegex.test(formData.subject))
      newErrors.subject = "Subject should only contain letters.";
    if (!formData.message.trim() || !messageRegex.test(formData.message))
      newErrors.message = "Message cannot contain < or >.";
    if (!formData.consent)
      newErrors.consent = "You must consent before submitting.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5050/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Submission failed.");

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "", consent: false });
      localStorage.removeItem("contactDraft");
      alert("Message submitted!");
    } catch (err) {
      alert("Failed to submit. Try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="container mt-5">
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group mb-3">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>

        <div className="form-group mb-3">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <div className="form-group mb-3">
          <label>Subject</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="form-control" />
          {errors.subject && <small className="text-danger">{errors.subject}</small>}
        </div>

        <div className="form-group mb-3">
          <label>Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" rows={5} />
          {errors.message && <small className="text-danger">{errors.message}</small>}
        </div>

        <div className="form-check mb-3">
          <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="form-check-input" />
          <label className="form-check-label">
            I consent to be contacted and my info being securely stored.
          </label>
          {errors.consent && <small className="text-danger d-block">{errors.consent}</small>}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
