import { publicPath } from "./base-path";

export const coursesData = [
  {
    id: 1,
    title: "Возобновляемая энергия",
    image: publicPath("/course-icons/icon1.webp"),
    video: "https://www.youtube.com/embed/i7b9_5E2EwQ",
    lectures: [
      { title: "Лекция 1", link: publicPath("/pdfs/renewable-energy/lecture-1.pdf") },
      { title: "Лекция 2", link: publicPath("/pdfs/renewable-energy/lecture-2.pdf") },
      { title: "Лекция 3", link: publicPath("/pdfs/renewable-energy/lecture-3.pdf") },
      { title: "Лекция 4", link: publicPath("/pdfs/renewable-energy/lecture-4.pdf") }
    ],
    tests: [
      {
        title: "Тест 1",
        link: "https://docs.google.com/forms/d/e/1FAIpQLScA6kU97UWEe8ATsJ4VasLm9CvccvrhvNsR4NzfLo62jgaHVw/viewform?usp=publish-editor"
      },
      {
        title: "Тест 2",
        link: "https://docs.google.com/forms/d/e/1FAIpQLScKPUK9d4YPwT_JpFEzh6UQYUQuFAj760jVKZgdRelluQooNw/viewform?usp=publish-editor"
      },
      {
        title: "Тест 3",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSevbMI35_eEboA4CXMM9oFDSaTMWt7VgaJMpY46annzkyXZ1Q/viewform?usp=publish-editor"
      }
    ]
  },
  {
    id: 2,
    title: "Зеленые инновации",
    image: publicPath("/course-icons/icon2.webp"),
    video: "https://www.youtube.com/embed/HVJcRyTcQ1I",
    lectures: [
      {
        title: "1. Зелёные инновации - технологии и экономические импульсы устойчивого будущего",
        link: publicPath("/pdfs/green-innovations/lecture-1.pdf")
      },
      {
        title: "2. Зелёные инновации в энергетике: переход к низкоуглеродной экономике",
        link: publicPath("/pdfs/green-innovations/lecture-2.pdf")
      }
    ],
    tests: [
      {
        title: "Тест 1",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSezlm8W_x7rVD4CZAb8r6dJbqeGOa2R9EATEvisCa1ThugcqA/viewform?usp=publish-editor"
      },
      {
        title: "Тест 2",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSf21iOG0MQzN2-4f7zdDaVCapvtO_Yd5uMyUDIJTiWXEPSLUw/viewform?usp=publish-editor"
      }
    ]
  },
  {
    id: 3,
    title: "Климат и устойчивость",
    image: publicPath("/course-icons/icon3.webp"),
    video: "https://www.youtube.com/embed/a1Cpl0XzYUE",
    lectures: [
      { title: "Лекция 1", link: publicPath("/pdfs/climate-sustainability/lecture-1.pdf") },
      { title: "Лекция 2", link: publicPath("/pdfs/climate-sustainability/lecture-2.pdf") },
      { title: "Лекция 3", link: publicPath("/pdfs/climate-sustainability/lecture-3.pdf") }
    ],
    tests: [
      {
        title: "Тест 1",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSdbrC6tBAzP0Ed1SKxWoO4zgzE6j0v75rAA8gjiziKFWglFag/viewform?usp=publish-editor"
      },
      {
        title: "Тест 2",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSesFGvRjoJUu3psaYeown-igX6YcbRQE-imA-c3KI-D8L0LEg/viewform?usp=publish-editor"
      },
      {
        title: "Тест 3",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSfD-wfwdct68QJni-51Gyf1ROrdwTT5WpVohwBh2qe_3ffH5w/viewform?usp=publish-editor"
      }
    ]
  },
  {
    id: 4,
    title: "Переработка отходов",
    image: publicPath("/course-icons/icon4.webp"),
    video: "https://youtu.be/S6J_dodCUsg",
    lectures: [
      { title: "Лекция 1", link: publicPath("/pdfs/waste-recycling/lecture-1.pdf") }
    ],
    tests: [
      {
        title: "Тест 1",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSe19R1xciwQklBnNF4YBPNtegwTKgSUSgzzyIvnwFZV5znDjg/viewform?usp=publish-editor"
      }
    ]
  }
];
