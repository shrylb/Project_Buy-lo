const key = "firebase:authUser:AIzaSyB9qifivcFXhoiUeoJUd4T-7jYVSDNgxKo:[DEFAULT]";
const user = sessionStorage.getItem(key);
    if (!user) {
        window.location.assign("/login.html");
    }