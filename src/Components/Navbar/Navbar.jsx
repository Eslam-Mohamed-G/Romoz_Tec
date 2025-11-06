import React, { useContext, useEffect, useRef, useState } from "react";
import "./header.css";
import { Link, NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { contextData } from "../../Context/Context";
import Logout from "../../Pages/Auth/Logout/Logout";

export default function Navbar() {
  const { userID, token, fetchUserData, userData } = useContext(contextData);
  const isLoggedIn = Boolean(token && token !== "undefined");
  const [showToast, setShowToast] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const [toggleProfileCard, setToggleProfileCard] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const mobileProfileRef = useRef(null);
  const desktopProfileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (mobileProfileRef.current && mobileProfileRef.current.contains(e.target)) ||
        (desktopProfileRef.current && desktopProfileRef.current.contains(e.target))
      ) {
        return;
      }
      setToggleProfileCard(false);
    };
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        setToggleProfileCard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e) => {
      const target = e.target;
      if (menuRef.current && menuRef.current.contains(target)) {
        return;
      }
      if (toggleRef.current && toggleRef.current.contains(target)) {
        return;
      }
      setMenuOpen(false);
    };
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        setToggleProfileCard(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (userID && token) {
      fetchUserData();
    }
  }, [userID, token]);

  return (
    <header className="navbar">
      <div className="navbar_container">
        <div className="logo">
          <NavLink to="/" onClick={closeMenu}>
            <img src="/images/logo.svg" alt="logo" />
          </NavLink>
        </div>
        {/* list-links */}
        <ul id="primary-navigation" ref={menuRef} className={`nav ${menuOpen ? "open" : ""}`} >
          <li><NavLink to="/"><span>الرئيسية</span></NavLink></li>
          <li><NavLink to="/contactUs"><span>اتصل بنا</span></NavLink></li>
          <li><NavLink to="/aboutUs"><span>من نحن</span></NavLink></li>
          <li><NavLink to="/blog"><span>المدونه</span></NavLink></li>
        </ul>

        <div className="navbar_buttons">
          {/* desktop */}
          <div className="desktop_buttons">
            {isLoggedIn ? (
              <button type="button" onClick={() => setToggleProfileCard(!toggleProfileCard)} className="btn_profile" ref={desktopProfileRef}>
                <span>حسابي</span>
                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down" ><path d="m6 9 6 6 6-6" /></svg>
              </button>
            ) : (
              <NavLink to="/login" className="login_link">
                <span>تسجيل الدخول</span>
              </NavLink>
            )}

            <NavLink to="/advertisements" className="advertisements_buttom">
              <span>اضف عرضك</span>
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            </NavLink>
          </div>

          <div className="menu-mobile-toggle">
            {/* لو المستخدم مسجل دخول */}
            <div className="mobile-login">
              {isLoggedIn ? (
                <div
                  role="button"
                  onClick={() => setToggleProfileCard(!toggleProfileCard)}
                  className="header_profile_img"
                  ref={mobileProfileRef}
                >
                  {userData?.profile_image === null ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round-icon lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx={12} cy={10} r={4} /><circle cx={12} cy={12} r={10} /></svg>
                  ) : (
                    <img src={userData?.profile_image} alt={userData?.name?.split(" ").map((word) => word[0]).join(" ").toUpperCase()} className="user_img" />
                  )}
                </div>
              ) : (
                <NavLink to="/login" className="mobile_loginBTN">
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-in"><path d="m10 17 5-5-5-5" /><path d="M15 12H3" /><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /></svg>
                </NavLink>
              )}
            </div>

            <div
              ref={toggleRef}
              className="menu_toggle"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-text-align-justify" ><path d="M3 5h18" /><path d="M3 12h18" /> <path d="M3 19h18" /></svg>
            </div>
          </div>
          {/* profile */}
          {isLoggedIn && (<ProfileCard toggleProfileCard={toggleProfileCard} userData={userData} setShowConfirm={setShowConfirm} />)}
        </div>
      </div>
      {isLoggedIn && showToast && userData?.area === null && (<ToastWarning message="الرجاء إضافة الموقع قبل المتابعة." onClose={() => setShowToast(false)} />)}
      {showConfirm && (<Logout setShowConfirm={setShowConfirm} />)}
    </header>
  );
};

export function ProfileCard({ toggleProfileCard, userData, setShowConfirm }) {

  return (
    <div className="profile_card" style={{ height: toggleProfileCard ? "280px" : "0" }}>
      <div className="user-info">
        {userData?.profile_image === null ? (
          <span className="two_char">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round-icon lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx={12} cy={10} r={4} /><circle cx={12} cy={12} r={10} /></svg>
          </span>
        ) : (
          <img src={userData.profile_image} alt={userData?.name?.split(" ").map((word) => word[0]).join(" ").toUpperCase()} className="user_img" />
        )}
        <div>
          <p className="greeting">أهلا</p>
          <p className="username">{userData?.name?.split(" ").slice(0, 2).join(" ")}</p>
        </div>
      </div>
      <Link to="/userProfile" className="show_accountUser"><span>عرض الملف الشخصي</span></Link>

      <Link to="/userProfile/userSettings" className="settings">
        <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" /><circle cx={12} cy={12} r={3} /></svg>
        <span>إعدادات الحساب</span>
      </Link>
      <button className="logout-btn" onClick={() => setShowConfirm(true)} >
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5" /> <path d="M21 12H9" /> <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /> </svg>
        <span>تسجيل الخروج</span>
      </button>
    </div>
  )
};

export function ToastWarning({ message = "الرجاء إضافة الموقع قبل المتابعة.", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div id="toast-warning" role="alert" className="toast_warning">
      <div className="toast_container">
        <div className="toast-icon">
          <svg className="toast-svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" /></svg>
        </div>

        <div className="toast-message">{message}</div>

        <button type="button" className="toast-close-btn" aria-label="Close" onClick={onClose} >
          <svg className="toast-close-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" ><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" /></svg>
        </button>

        <div className="progress-line" />
      </div>
    </div>
  );
};