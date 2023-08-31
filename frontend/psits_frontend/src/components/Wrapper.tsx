import React, { useEffect } from "react";

const Wrapper = ({
  className,
  noMargin,
  children,
  title,
}: {
  className?: string;
  noMargin?: boolean;
  children: React.ReactNode;
  title: string;
}) => {
  useEffect(() => {
    document.title = title; // Update the document title
    window.scrollTo(0, 0);
  }, [title]);

  return <section className={`${className} ${noMargin ? "" : "lg:mx-[150px]"}`}>{children}</section>;
};

export default Wrapper;
