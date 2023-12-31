"use client";
import Image from "next/image";
import NavBar from "@/components/NavBar";

const Blog = () => {
//  useEffect(() => {
//    return () => {};
//  }, []);

  return (
    <main className="scroll-smooth h-screen">
      <NavBar />
      <div className="logo flex justify-center items-center flex-col md:-mt-4 mt-16">
        <div className="my-auto transition-all duration-100">
          <Image src="/logo.svg" alt="logo" width="200" height="200" />
        </div>
      </div>
    </main>
  );
};

export default Blog;
