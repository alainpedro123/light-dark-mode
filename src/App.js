import React, { useState, useEffect } from "react";
//import "./style.scss";

function App() {
    const [darkMode, setDarkMode] = useState(getInitialMode());

    useEffect(() => { // the "effect" function should only be executed when the "darkMode" value changes
        localStorage.setItem("dark", JSON.stringify(darkMode));
    }, [darkMode]); // we want only to change to dark mode in the browser storage when state values changes

    function getInitialMode() {
        const isReturningUser = "dark" in localStorage;
        const savedMode = JSON.parse(localStorage.getItem("dark"));
        const userPrefersDark = getPrefColorScheme();

        if (isReturningUser)
            return savedMode; // either mode was saved as dark / light

        else if (userPrefersDark)
            return true;

        else
            return false;
    }

    function getPrefColorScheme() {
        if (!window.matchMedia) return; // feature detection

        return window.matchMedia("(prefers-color-scheme: dark)").matches; // the color scheme is initially set to dark
    }

    return (
        <div className={darkMode ? "dark-mode" : "light-mode"}>
            <nav>
                <div className="toggle-container">
                    <span style={{ color: darkMode ? "grey" : "yellow" }}>☀︎</span>
                    <span className="toggle">
                        <input
                            checked={darkMode}
                            onChange={() => setDarkMode(prevMode => !prevMode)}
                            id="checkbox"
                            className="checkbox"
                            type="checkbox"
                        />
                        <label htmlFor="checkbox" />
                    </span>
                    <span style={{ color: darkMode ? "slateblue" : "grey" }}>☾</span>
                </div>
            </nav>

            <main>
                <h1>{darkMode ? "Dark Mode" : "Light Mode"}</h1>
                <h2>Toggle the switch to see some magic happen!</h2>
            </main>
        </div>
    );
}

export default App;
