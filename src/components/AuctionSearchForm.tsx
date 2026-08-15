"use client";

import { useState } from "react";
import { CheckCircle, Loader2, Search } from "lucide-react";

interface AuctionRequestData {
    fullName: string;
    email: string;
    phone: string;
    make: string;
    model: string;
    yearRange: string;
    budgetRange: string;
    chassisCode: string;
    transmission: string;
    fuelType: string;
    condition: string;
    additionalRequirements: string;
    file: string;
}

const initialData: AuctionRequestData = {
    fullName: "",
    email: "",
    phone: "",
    make: "",
    model: "",
    yearRange: "",
    budgetRange: "",
    chassisCode: "",
    transmission: "",
    fuelType: "",
    condition: "",
    additionalRequirements: "",
    file: "",
};

const selectClass =
    "w-full bg-gray-50 border border-orange-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#F23410] focus:border-transparent outline-none transition-all";

const inputClass =
    "w-full bg-gray-50 border border-orange-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#F23410] focus:border-transparent outline-none transition-all";

const textareaClass =
    "w-full bg-gray-50 border border-orange-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#F23410] focus:border-transparent outline-none transition-all resize-none";

const labelClass =
    "text-[11px] font-bold text-gray-500 uppercase tracking-wider orb";

const AuctionSearchForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] =
        useState<AuctionRequestData>(initialData);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData(initialData);
            setTimeout(() => setIsSuccess(false), 6000);
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden border border-white/10 shadow-xl shadow-black/40">
            <div className="p-5 sm:p-8">
                {isSuccess ? (
                    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8 text-center animate-fade-in">
                        <div className="w-16 h-16 bg-[#F23410] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 orb mb-2">
                            Request Received
                        </h3>
                        <p className="text-gray-600">
                            Thank you for your vehicle search request. Our team
                            will review the details and get back to you shortly
                            with suitable Japanese auction options.
                        </p>
                        <button
                            onClick={() => setIsSuccess(false)}
                            className="mt-6 text-[#F23410] cursor-pointer font-semibold hover:text-[#E01D00] underline"
                        >
                            Send another request
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className={labelClass}>Full Name</label>
                                <input
                                    required
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="John Smith"
                                    className={inputClass}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className={labelClass}>Email Address</label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className={labelClass}>Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+61 400 000 000"
                                    className={inputClass}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className={labelClass}>Chassis Code (Optional)</label>
                                <input
                                    type="text"
                                    name="chassisCode"
                                    value={formData.chassisCode}
                                    onChange={handleChange}
                                    placeholder="e.g. JZX100"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className={labelClass}>Preferred Make</label>
                                <input
                                    required
                                    type="text"
                                    name="make"
                                    value={formData.make}
                                    onChange={handleChange}
                                    placeholder="e.g. Toyota"
                                    className={inputClass}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className={labelClass}>Preferred Model</label>
                                <input
                                    required
                                    type="text"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleChange}
                                    placeholder="e.g. Land Cruiser Prado"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className={labelClass}>Year Range</label>
                                <select
                                    required
                                    name="yearRange"
                                    value={formData.yearRange}
                                    onChange={handleChange}
                                    className={selectClass}
                                >
                                    <option value="">Select a year range</option>
                                    <option value="2005-2010">2005 - 2010</option>
                                    <option value="2011-2015">2011 - 2015</option>
                                    <option value="2016-2020">2016 - 2020</option>
                                    <option value="2021-2025">2021 - 2025</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className={labelClass}>Budget Range</label>
                                <select
                                    required
                                    name="budgetRange"
                                    value={formData.budgetRange}
                                    onChange={handleChange}
                                    className={selectClass}
                                >
                                    <option value="">Select a budget range</option>
                                    <option value="under-10000">Under $10,000</option>
                                    <option value="10000-15000">$10,000 - $15,000</option>
                                    <option value="15000-20000">$15,000 - $20,000</option>
                                    <option value="20000-30000">$20,000 - $30,000</option>
                                    <option value="30000-50000">$30,000 - $50,000</option>
                                    <option value="50000-plus">$50,000+</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <label className={labelClass}>Transmission</label>
                                <select
                                    name="transmission"
                                    value={formData.transmission}
                                    onChange={handleChange}
                                    className={selectClass}
                                >
                                    <option value="">Any</option>
                                    <option value="automatic">Automatic</option>
                                    <option value="manual">Manual</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className={labelClass}>Fuel Type</label>
                                <select
                                    name="fuelType"
                                    value={formData.fuelType}
                                    onChange={handleChange}
                                    className={selectClass}
                                >
                                    <option value="">Any</option>
                                    <option value="petrol">Petrol</option>
                                    <option value="diesel">Diesel</option>
                                    <option value="hybrid">Hybrid</option>
                                    <option value="electric">Electric</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className={labelClass}>Condition</label>
                                <select
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleChange}
                                    className={selectClass}
                                >
                                    <option value="">Any</option>
                                    <option value="good">Good</option>
                                    <option value="very-good">Very Good</option>
                                    <option value="excellent">Excellent</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className={labelClass}>
                                    Additional Requirements (Optional)
                                </label>
                                <textarea
                                    rows={3}
                                    name="additionalRequirements"
                                    value={formData.additionalRequirements}
                                    onChange={handleChange}
                                    placeholder="Specification, features, mileage limit..."
                                    className={textareaClass}
                                />
                            </div>
                            <div className="space-y-1.5 flex flex-col">
                                <label className={labelClass}>
                                    Upload a File (Optional)
                                </label>
                                <input
                                    type="file"
                                    name="file"
                                    value={formData.file}
                                    onChange={handleChange}
                                    className="w-full text-xs text-gray-500 bg-gray-50 border border-orange-200 rounded-xl file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#F23410] file:text-white hover:file:bg-[#E01D00] cursor-pointer file:cursor-pointer"
                                />
                                <p className="text-[11px] text-gray-400 mt-auto pt-1">
                                    Upload a file if it helps describe your
                                    requirements (optional).
                                </p>
                            </div>
                        </div>

                        <button
                            disabled={isSubmitting}
                            className="w-full bg-[#F23410] hover:bg-[#E01D00] text-white font-medium py-3.5 rounded-full shadow-lg shadow-[#F23410]/30 transition-all duration-300 hover:shadow-[#F23410]/50 active:scale-95 flex justify-center items-center gap-2 orb uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" /> Searching...
                                </>
                            
                            ) : (
                                <>
                                    Start My Japan Vehicle Search <Search size={18} />
                                </>
                            )}
                        </button>

                        <p className="text-[11px] text-gray-400 leading-5 text-center">
                            Submitting a sourcing request does not commit you to
                            purchasing a vehicle. We use your information to search
                            for suitable vehicles, confirm auction availability and
                            share options with you.
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuctionSearchForm;
