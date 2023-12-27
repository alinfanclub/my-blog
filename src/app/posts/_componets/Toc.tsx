// TOC component는 게시물의 본문을 받아서 제목만 추출하여 목차를 만들어준다.
"use client";

import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import React, { useState } from "react";

interface Props {
  content: string;
}

const Toc = ({ content }: Props) => {
  // activeId는 화면 상단에 위치한 제목 element 다룰 state
  const [activeId, setActiveId] = useState("");

  // intersectionObserver를 이용해 만든 커스텀 훅으로 setState를 전달 하여
  // 화면 상단에 위치한 제목 element가 뭔지 알아낸다.
  useIntersectionObserver(setActiveId, content);

  // 게시물 본문을 줄바꿈 기준으로 나누고, 제목 요소인 것만 저장
  const titles = content.split(`\n`).filter((t) => t.includes("# "));

  // 예외처리 - 제목은 문자열 시작부터 #을 써야함
  const result = titles
    .filter((str) => str[0] === "#")
    .map((item) => {
      // #의 갯수에 따라 제목의 크기가 달라지므로 갯수를 센다.
      let count = item.match(/#/g)?.length;
      if (count) {
        // 갯수에 따라 목차에 그릴때 들여쓰기 하기위해 *10을 함.
        count = count * 10;
      }

      // 제목의 내용물만 꺼내기 위해 '# '을 기준으로 나누고, 백틱과 공백을 없애주고 count와 묶어서 리턴
      return { title: item.split("# ")[1].replace(/`/g, "").trim(), count };
    });

  return (
    <div className="w-full">
      <div className="h-full">
        <p className="border-b mb-4 text-gray-500">목차</p>
        <div />
        {/* 목차에 item이 너무 많은경우 화면 아래로 넘어갈수 있기때문에 ScrollBars를 이용하여
        스크롤을 만들어준다. */}
        <div>
          {result.map((item, idx) => {
            // count는 샾개수에 따른 들여쓰기용 변수
            if (item?.count && item.count <= 30 && item?.title) {
              return (
                <a
                  // href에 #title을 주어서 클릭시 해당 위치로 스크롤 이동하도록 구현
                  href={`#${item.title.replace(/ /g, "-")}`}
                  key={item.title + idx}
                  className={`${
                    activeId === item.title.replace(/ /g, "-")
                      ? "text-lime-500 border-l-4 border-lime-500 bg-white/20"
                      : "text-gray-500 border-l-4 border-transparent hover:text-lime-500 hover:scale-110"
                  } transition-all block p-0 border-lime-500`}
                >
                  <div
                    // 목차에 해당 하는 title을 넣는다.
                    style={{
                      marginLeft: `${item.count}px`,
                      overflow: "hidden",
                    }}
                  >
                    {item.title}
                  </div>
                </a>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Toc;
