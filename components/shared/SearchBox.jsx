"use client";

import { useState } from "react";

import CustomInp from "./CustomInp";
import CustomBtn from "./CustomBtn";
import { Search } from "../icons/Icons";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center gap-2">
      <div className="hidden sm:block">
        <CustomInp
          type="text"
          label="جستجو"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          wrapperClassName="w-[200px] h-[50px]"
        />
      </div>
      <div className="sm:hidden">
        <CustomBtn
          type="button"
          icon={<Search />}
          classNames="paddingIcon rounded-full text-dark1 transition-colors"
        />
      </div>
    </div>
  );
}
