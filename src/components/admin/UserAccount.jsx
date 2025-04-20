import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const UserAccount = () => {
  return (
    <div>
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <img
          src="https://api.dicebear.com/9.x/notionists/svg"
          alt="avatar"
          className="size-8 rounded shrink-0 bg-violet-500 shadow"
        />
        <div className="text-start">
          <span className="text-sm font-bold block">Tom Is Loading</span>
          <span className="text-xs block text-stone-500">tom@hover.dev</span>
        </div>      
      </button>
    </div>
  );
};

export default UserAccount;