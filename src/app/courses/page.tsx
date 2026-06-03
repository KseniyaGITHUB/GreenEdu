"use client";

import CachedImage from "@/components/UI/cached-image";
import PreloadedBackground from "@/components/UI/preloaded-background";
import { publicPath } from "@/config/base-path";
import { coursesData } from "@/config/coursesData";
import { useRouter } from "next/navigation";
import BackLink from "@/components/common/back-link";

const CoursesPage = () => {
  const router = useRouter();

  return (
    <PreloadedBackground
      src={publicPath("/courses-bg.webp")}
      className="flex-1 w-full min-h-[calc(100dvh-6.5rem)]"
    >
      <div className="max-w-[1200px] mx-auto py-6 md:py-10 px-4 md:px-10">
        <BackLink href="/" label="← На главную" />

        <div className="relative flex flex-col gap-4 md:gap-6">
          {coursesData.map((course, index) => (
            <div
              key={course.id}
              className={`relative flex items-center p-2 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200 w-full md:w-[600px] ${
                index % 2 === 0
                  ? "self-center md:self-start"
                  : "self-center md:self-end"
              }`}
              style={{ backgroundColor: "#FFF0D1" }}
              onClick={() => router.push(`/courses/${course.id}`)}
            >
              <div className="flex-shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center mr-3 md:mr-4">
                <CachedImage
                  src={course.image}
                  alt={`Иконка курса ${course.id}`}
                  width={130}
                  height={130}
                  unoptimized
                  skeletonClassName="block w-full h-full rounded-full"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="bg-white rounded-lg p-3 md:p-4 flex-1 mr-2 md:mr-5 min-h-[80px]">
                <h3 className="text-green-800 text-lg md:text-xl font-bold mb-1">
                  {course.title}
                </h3>
                <p className="text-gray-700 text-xs md:text-sm">
                  {course.lectures.length} лекций · {course.tests.length} тестов
                </p>
              </div>

              <span className="absolute bottom-1 right-3 text-black font-bold text-sm">
                {course.id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PreloadedBackground>
  );
};

export default CoursesPage;
