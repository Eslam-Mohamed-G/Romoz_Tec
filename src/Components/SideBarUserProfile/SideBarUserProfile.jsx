import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./SideBarStyle.css";

export default function SideBarUserProfile({ toggleSidebar, setToggleSidebar, sidebarRef }) {
    const [cookie, , removeCookie] = useCookies(["token"]);
    const userID = cookie?.token?.data?.user?.id;

    const navigate = useNavigate();

    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setErrors] = useState("");

    const handleLogout = async () => {
        try {
            const token = cookie?.token?.data?.token;
            const response = await fetch(
                "/api/logout",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                removeCookie("token", { path: "/" });
                navigate("/");
            } else {
                setErrors("حدث خطأ أثناء تسجيل الخروج");
            }
        } catch {
            setErrors("حدث خطأ أثناء الاتصال بالسيرفر أثناء تسجيل الخروج");
        }
    };

    return (
        <div className={`userSideBar_container ${toggleSidebar ? "" : "hidden"}`} ref={sidebarRef}>
            <div className={`userSidebar_content  ${toggleSidebar ? "" : "hidden"}`}>
                <div className="userSidebar_links">
                    <ul className="userSidebar_links_group">
                        <li onClick={() => setToggleSidebar(false)}>
                            <NavLink to="/userProfile" end className="link">
                                <div className="link_icon">
                                    <img src="/Icons/house.svg" alt="house" />
                                </div>
                                <span>الرئيسيه</span>
                            </NavLink>
                        </li>
                        <li onClick={() => setToggleSidebar(false)}>
                            <NavLink to="userOffers" className={({ isActive }) => (isActive ? "link active" : "link")}>
                                <div className="link_icon">
                                    <img src="/Icons/offers.svg" alt="offers" />
                                </div>
                                <span>العروض</span>
                            </NavLink>
                        </li>
                        <li onClick={() => setToggleSidebar(false)}>
                            <NavLink to="userNotifactions" className={({ isActive }) => (isActive ? "link active" : "link")}>
                                <div className="link_icon">
                                    {/* <img src="/Icons/ChatTeardropGray.svg" alt="ChatTeardropGray" /> */}
                                    <img src="/Icons/Notification.svg" alt="Notification" />
                                </div>
                                <span>الإشعارات</span>
                            </NavLink>
                        </li>
                        <li onClick={() => setToggleSidebar(false)}>
                            <NavLink to="userFavorites" className={({ isActive }) => (isActive ? "link active" : "link")}>
                                <div className="link_icon">
                                    <img src="/Icons/heart.svg" alt="heart" />
                                </div>
                                <span>المفضلة</span>
                            </NavLink>
                        </li>
                    </ul>

                    <ul className="userSidebar_links_group">
                        <li onClick={() => setToggleSidebar(false)}>
                            <NavLink to="userSettings" className={({ isActive }) => (isActive ? "link active" : "link")}>
                                <div className="link_icon">
                                    <img src="/Icons/Setting.svg" alt="Setting" />
                                </div>
                                <span>الإعدادات</span>
                            </NavLink>
                        </li>
                        <li onClick={() => setToggleSidebar(false)}>
                            <NavLink to="blogUser" className={({ isActive }) => (isActive ? "link active" : "link")} >
                                <div className="link_icon">
                                    <img src="/Icons/Blogger.svg" alt="Blogger" />
                                </div>
                                <span>المدونة</span>
                            </NavLink>
                        </li>
                        <li onClick={() => setToggleSidebar(false)}>
                            <NavLink to="helpUser" className={({ isActive }) => (isActive ? "link active" : "link")}>
                                <div className="link_icon">
                                    <img src="/Icons/HelpCircle.svg" alt="HelpCircle" />
                                </div>
                                <span>المساعدة</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="userSidebar_buttons">
                    <div className="returntoWebSite" onClick={() => { setToggleSidebar(false); navigate("/") }}>
                        <div className="linkToMaaashi">
                            <span>الذهاب للموقع</span>
                        </div>
                        <div className="returntoWebSite_icon">
                            <img src="/images/logo.svg" alt="logo" />
                        </div>
                    </div>

                    <button className="logout_btn" onClick={() => setShowConfirm(true)}>
                        <div className="link_icon">
                            <img src="/Icons/SignOut.svg" alt="SignOut" />
                        </div>
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </div>

            {showConfirm && (
                <div className="confirm_overlay">
                    <div className="confirm_box">
                        <h3 className="confirm_box_title">
                            هل تريد تسجيل الخروج من حسابك؟
                        </h3>
                        <p className="confirm_box_par">
                            يمكنك دائمًا تسجيل الدخول مرة أخرى لمتابعة نشاطك.
                        </p>
                        <div className="confirm_actions">
                            <button
                                className="cancel_btn_confirm"
                                onClick={() => setShowConfirm(false)}
                            >
                                إلغاء
                            </button>
                            <button
                                className="confirm_btn"
                                onClick={() => {
                                    setShowConfirm(false);
                                    handleLogout();
                                }}
                            >
                                تسجيل الخروج
                            </button>
                            {error && <p className="error_message">{error}</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};