"use client";

import { useParams } from "next/navigation";
import { coursesData } from "@/config/coursesData";
import CachedImage from "@/components/UI/cached-image";
import PreloadedBackground from "@/components/UI/preloaded-background";
import { publicPath } from "@/config/base-path";
import BackLink from "@/components/common/back-link";
import { toYoutubeEmbed } from "@/utils/youtube";

const CoursePage = () => {
  const params = useParams();
  const id = params?.id;
  const course = coursesData.find((c) => c.id === Number(id));

  if (!course) return <p>Курс не найден</p>;

  const videoSrc = course.video ? toYoutubeEmbed(course.video) : null;

  return (
    <PreloadedBackground
      src={publicPath("/course-bg.webp")}
      className="flex-1 w-full min-h-[calc(100dvh-6.5rem)] pb-8 md:pb-10"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-4 md:pt-6">
        <BackLink />

        <header className="bg-white shadow-md mb-6 md:mb-8 max-w-xl mx-auto rounded-xl flex items-center gap-4 md:gap-6 px-3 py-2 md:px-4">
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0">
            <CachedImage
              src={course.image}
              alt={course.title}
              width={80}
              height={80}
              unoptimized
              skeletonClassName="block w-full h-full rounded-xl"
              className="rounded-xl object-contain"
            />
          </div>

          <h1 className="text-xl md:text-3xl font-bold text-gray-800 leading-tight">
            {course.title}
          </h1>
        </header>

        <main className="flex flex-col gap-8 md:gap-10">
          <section className="w-full">
            <h2 className="text-xl md:text-2xl font-semibold mb-5 md:mb-7 text-white bg-green-700 p-4 rounded-xl shadow-md w-full md:w-[calc(100%+3rem)] md:-translate-x-6">
              Лекции:
            </h2>
            <ul className="flex flex-col gap-4 md:gap-5 font-bold">
              {course.lectures.map((lecture, idx) => (
                <li key={idx}>
                  <a
                    href={lecture.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white shadow-lg rounded-xl p-3 mx-0 md:mx-10 hover:bg-gray-50 transition-all text-sm md:text-base"
                  >
                    {lecture.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="w-full">
            <h2 className="text-xl md:text-2xl font-semibold mb-5 md:mb-6 text-white bg-green-700 p-4 rounded-xl shadow-md w-full md:w-[calc(100%+3rem)] md:-translate-x-6">
              Тесты:
            </h2>
            <div className="flex flex-wrap gap-4 md:gap-20">
              {course.tests.map((test, idx) => (
                <a
                  key={idx}
                  href={test.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[70px] text-center bg-white shadow-lg rounded-xl px-4 py-3 hover:shadow-2xl hover:bg-gray-50 transition-all font-semibold text-sm md:text-base"
                >
                  {test.title}
                </a>
              ))}
            </div>
          </section>

          {videoSrc && (
            <section className="w-full">
              <h2 className="text-xl md:text-2xl font-semibold mb-5 md:mb-6 text-white bg-green-700 p-4 rounded-xl shadow-md w-full md:w-[calc(100%+3rem)] md:-translate-x-6">
                Видеолекция
              </h2>

              <div className="bg-white rounded-2xl shadow-2xl p-2 mx-0 md:mx-6">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                  <iframe
                    src={videoSrc}
                    title={`Видеолекция — ${course.title}`}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </PreloadedBackground>
  );
};

export default CoursePage;
