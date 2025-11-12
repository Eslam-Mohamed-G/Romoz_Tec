import React, { useEffect, useRef, useState } from 'react';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import { pets } from '../../../data';

export default function PetsForm({ formik }) {
    const { values, setFieldValue, errors } = formik;
    const [isTagsOpen, setIsTagsOpen] = useState(false);
    const tagsDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutsidetagesDrop = (event) => {
            if (tagsDropdownRef.current && !tagsDropdownRef.current.contains(event.target)) {
                setIsTagsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutsidetagesDrop);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsidetagesDrop);
        };
    }, []);

    return (
        <div className="input_container">
            <header className="input_label">
                <span>معلومات اضافية</span>
                {errors.information?.pets?.animalType && (
                    <div className="info_error">{errors.information?.pets?.animalType}</div>
                )}
            </header>

            <div className="input_field" ref={tagsDropdownRef}>
                <input
                    type="text"
                    name="information.pets.animalType"
                    value={values.information?.pets?.animalType}
                    onChange={(e) => setFieldValue("information.pets.animalType", e.target.value)}
                    onClick={() => setIsTagsOpen(true)}
                    id="moreInfo"
                    className='input'
                    placeholder='أدخل معلومات اضافية'
                />
                <div className="arrow_up">
                    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={isTagsOpen ? "open" : ""}><path d="m18 15-6-6-6 6" /></svg>
                </div>
            </div>

            <CustomDropdown isOpen={isTagsOpen} setIsOpen={setIsTagsOpen} data={pets} formik={formik} name="information.pets.animalType" />
        </div>
    )
};