import React from "react";

export default function Pagination({
  postsPerPage,
  totalPosts,
  setCurrentPage,
}: any) {
  let pages = [];

  for (let i = 1; i <= totalPosts / postsPerPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pageButton">
      {pages.map((page, index) => (
        <button key={index} onClick={() => setCurrentPage(page)}>
          {page}
        </button>
      ))}
    </div>
  );
}
