import React from 'react'
import { FiCalendar, FiSearch } from 'react-icons/fi'
import UserAccount from './UserAccount'


function AdminManu() {
    return (
        <div className="border-b px-4 mb-4 pb-4 border-stone-200">
            <div className="flex items-center justify-between p-0.5">
                <div>
                    <span className="text-sm font-bold block">🚀 Good morning, Tom!</span>
                    <span className="text-xs block text-stone-500">
                        Tuesday, Aug 8th 2023
                    </span>
                </div>                
                <UserAccount />
            </div>
        </div>
    )
}

export default AdminManu