import React, { useContext, useEffect } from 'react';
import "./userSettingsStyle.css"
import { contextData } from '../../../Context/Context';

export default function UserSettings() {
    const { userID, token, fetchUserData, userData } = useContext(contextData);
    useEffect(() => {
        if (userID && token) {
            fetchUserData();
        }
    }, [userID, token]);
    return (
        <section className='UserSettings_container'>
            <header className='userProfile_header'>
                <h2>الإعدادات</h2>
                <p>تحكم في حسابك وإعداداتك بسهولة من هنا</p>
            </header>

            <div className="userSettings_body">
                <div className="user_data">
                    <div className="user_images">
                        <div className="cover_user_image">
                            {userData?.user?.cover_image ?
                                <img src={userData?.user?.cover_image} alt="img cover" loading="lazy" />
                                :
                                <svg className="skeleton-svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                </svg>
                            }
                            <label className="change_banner_btn">
                                <img src='/Icons/Camera.svg' alt='Camera' className="camera_icon" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleImageUpload(
                                            e,
                                            "cover_image",
                                            "https://api.mashy.sand.alrmoz.com/api/cover-image"
                                        )
                                    }
                                    disabled={imageLoading}
                                />
                                <span> تغيير البانر</span>
                            </label>
                        </div>

                        <div className="profile_user_image">
                            <div className="user_img_container">
                                {userData?.user?.profile_image ?
                                    <img src={userData?.user?.profile_image} alt="img" loading="lazy" />
                                    :
                                    <svg className="skeleton-user-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" >
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                    </svg>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="user_info">
                        <h3 className="user_name">{userData?.user?.name?.split(" ").slice(0, 2).join(" ")}</h3>
                    </div>
                </div>
            </div>
        </section>
    )
}