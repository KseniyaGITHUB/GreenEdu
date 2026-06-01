import PageContent from "@/components/common/page-content";
import BackLink from "@/components/common/back-link";

const About = () => {
  return (
    <section
      className="flex-1 w-full py-8 md:py-10 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #E8F5E9 0%, #F1F8E9 100%)"
      }}
    >
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-green-200 rounded-full blur-3xl opacity-40" />
      <div className="absolute top-1/3 -right-32 w-[350px] h-[350px] bg-lime-200 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        <BackLink href="/" label="← На главную" />

        <div className="mb-10 mt-2">
          <div className="inline-block bg-green-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4 shadow ml-2">
            О нас
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-green-900 leading-tight max-w-3xl px-3">
            Образовательная платформа для устойчивого будущего
          </h1>

          <p className="mt-6 text-base md:text-lg text-gray-700 max-w-2xl ml-3">
            Мы создаём пространство, где экологические знания становятся
            практикой, а осознанный выбор — привычкой.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-10">
          <PageContent />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {[
            {
              title: "Осознанность",
              text: "Мы помогаем понять влияние повседневных решений на планету."
            },
            {
              title: "Доступность",
              text: "Простые объяснения сложных экологических процессов."
            },
            {
              title: "Действие",
              text: "Не теория, а реальные шаги к устойчивому образу жизни."
            }
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-green-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
