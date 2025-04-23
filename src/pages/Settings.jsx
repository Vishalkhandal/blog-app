import React, { useState } from 'react'

function Settings() {
    const [settings, setSettings] = useState({
        siteTitle: 'My Blog',
        siteDescription: 'A place to share knowledge',
        theme: 'light',
        logoUrl: 'https://yourlogo.com/logo.png',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setSettings(prev => ({ ...prev, [name]: value }))
    }

    const handleThemeToggle = () => {
        setSettings(prev => ({
            ...prev,
            theme: prev.theme === 'light' ? 'dark' : 'light'
        }))
    }

    const handleSave = () => {
        // You can POST these settings to the backend
        console.log('Saved settings:', settings)
        alert('Settings saved (check console log).')
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <h1 className="text-2xl font-bold text-gray-800">Site Settings</h1>

            <div className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Site Title</label>
                    <input
                        type="text"
                        name="siteTitle"
                        value={settings.siteTitle}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-2"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Site Description</label>
                    <textarea
                        name="siteDescription"
                        value={settings.siteDescription}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-2"
                        rows="3"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Logo URL</label>
                    <input
                        type="text"
                        name="logoUrl"
                        value={settings.logoUrl}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-2"
                    />
                    <img src={settings.logoUrl} alt="Logo preview" className="h-16 mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <span className="font-semibold">Theme:</span>
                    <button
                        className={`px-4 py-2 rounded-xl shadow-sm ${
                            settings.theme === 'light'
                                ? 'bg-yellow-300 text-black'
                                : 'bg-gray-800 text-white'
                        }`}
                        onClick={handleThemeToggle}
                    >
                        {settings.theme === 'light' ? 'Light' : 'Dark'}
                    </button>
                </div>

                <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                >
                    Save Settings
                </button>
            </div>
        </div>
    )
}

export default Settings
