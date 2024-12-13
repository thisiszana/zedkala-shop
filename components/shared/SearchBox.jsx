"use client";

import { useState } from "react";

import CustomInp from "./CustomInp";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <CustomInp
        type="text"
        placeholder="جستجو"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        wrapperClassName="flex items-center w-[350px] h-[50px]"
      />
    </div>
  );
}
