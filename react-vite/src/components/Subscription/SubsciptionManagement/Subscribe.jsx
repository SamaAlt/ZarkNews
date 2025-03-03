import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Subscribe.css';
const SubscriptionComponent = () => {
    const VALID_FREQUENCIES = ['Daily', 'Weekly', 'Monthly'];
    const VALID_SECTIONS = ['national', 'world', 'business', 'sports', 'entertainment', 'technology'];

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        frequency: '',
        sections: [],
        tags: []
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'tags') {
            const tagsArray = value.split(',').map(tag => tag.trim());
            setFormData({
                ...formData,
                [name]: tagsArray
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleListChange = (e, field) => {
        const values = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({
            ...formData,
            [field]: values
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form data:', formData);  // Log form data before sending it
        try {
            const response = await axios.post('/api/subscriptions', formData);
            console.log('Create response:', response.data);  // Log the response
            toast.success(`🎉 Subscription created successfully! Welcome aboard, ${response.data.first_name}!`);
            setIsSubmitted(true);  // Set the form as submitted
        } catch (error) {
            console.error('Error:', error.response.data);  // Log the error response
            toast.error(`❗ Error: ${JSON.stringify(error.response.data.errors)}`);
        }
    };

    const handleUpdate = async (email) => {
        console.log('Updating subscription with data:', formData);  // Log form data before sending it
        try {
            const response = await axios.put(`/api/subscriptions/${email}`, formData);
            console.log('Update response:', response.data);  // Log the response
            toast.success(`🔄 Subscription updated successfully! We’ve made the changes for you, ${response.data.first_name}.`);
        } catch (error) {
            console.error('Error:', error.response.data);  // Log the error response
            toast.error(`❗ Error: ${JSON.stringify(error.response.data.errors)}`);
        }
    };

    const handleDelete = async (email) => {
        try {
            await axios.delete(`/api/subscriptions/${email}`);
            toast.success('🗑️ Subscription deleted successfully. We’re sorry to see you go.');
        } catch (error) {
            console.error('Error:', error.response.data);  // Log the error response
            toast.error(`❗ Error: ${JSON.stringify(error.response.data.errors)}`);
        }
    };

    const fetchSubscription = async (email) => {
        try {
            const response = await axios.get(`/api/subscriptions/${email}`);
            console.log('Fetched subscription:', response.data);  // Log the fetched data
            setFormData({
                ...response.data,
                tags: response.data.tags || []  // Ensure tags is an array
            });
            toast.info('📬 Subscription details fetched successfully.');
        } catch (error) {
            console.error('Error:', error.response.data);  // Log the error response
            toast.error(`❗ Error: ${JSON.stringify(error.response.data.errors)}`);
        }
    };

    return (
        <div className="subscription-container">
            <h2>Subscribe for our latest news</h2>
            <form onSubmit={handleSubmit} className="subscription-form">
                <div>
                    <label>First Name:</label>
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        disabled={isSubmitted}
                    />
                </div>
                <div>
                    <label>Frequency:</label>
                    <select name="frequency" value={formData.frequency} onChange={handleChange} required>
                        <option value="">Select Frequency</option>
                        {VALID_FREQUENCIES.map((freq) => (
                            <option key={freq} value={freq}>{freq}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Sections:</label>
                    <select multiple name="sections" value={formData.sections} onChange={(e) => handleListChange(e, 'sections')}>
                        {VALID_SECTIONS.map((section) => (
                            <option key={section} value={section}>{section}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Tags (comma-separated):</label>
                    <input type="text" name="tags" value={formData.tags.join(', ')} onChange={handleChange} />
                </div>
                <button type="submit">Create Subscription</button>
            </form>
            <h4>Manage your Subscription</h4>
            <div className="manage-subscription">
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" onChange={handleChange} />
                    <button onClick={() => fetchSubscription(formData.email)}>Fetch Subscription</button>
                </div>
                <button onClick={() => handleUpdate(formData.email)}>Update Subscription</button>
                <button className="delete-button" onClick={() => handleDelete(formData.email)}>Delete Subscription</button>
            </div>
            <ToastContainer />
        </div>   
    );
};

export default SubscriptionComponent;